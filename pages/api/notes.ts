import dbConnect from '../../utils/dbConnect'
import Note from '../../models/Note'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                console.log('get')
                //const pets = await Pet.find({}) /* find all the data in our database */
                //res.status(200).json({ success: true, data: pets })
                res.status(200);
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                console.log('post')
                const note = await Note.create(
                    req.body
                ) /* create a new model in the database */
                res.status(200).json({ success: true, data: note })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                const deleteNote = await Note.deleteOne({ id: req.body.noteid })
                deleteNote ? res.status(200).json({ success: true, data: {} }) : res.status(400).json({ success: false });

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            console.log('update')
            try {
                const updateNote = await Note.findOneAndUpdate(
                    { id: req.body.id },
                    req.body
                );

                updateNote ? res.status(200).json({ success: true, data: {} }) : res.status(400).json({ success: false });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}