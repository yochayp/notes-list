import dbConnect from '../../utils/dbConnect'
import Note from '../../models/Note'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
          console.log('yesssssssssssssssss')
        //const pets = await Pet.find({}) /* find all the data in our database */
        //res.status(200).json({ success: true, data: pets })
        res.status(200);
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        console.log('yesssssssssssssssss')
        res.status(200);
       // const pet = await Pet.create(
         // req.body
        //) /* create a new model in the database */
        //res.status(201).json({ success: true, data: pet })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}