import dbConnect from '../../utils/dbConnect'
import Note from '../../models/Note'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {

        case 'POST':
            try {
                const note = await Note.create(
                    req.body
                )
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