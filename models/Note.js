import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
    id:  String,
    noteName: String,
    
    itemsList: [{
        id: Number,
        itemName: String,
        checked: Boolean
    }],
    dateCreated: String,
    dateUpdated: String
});


//const Note = mongoose.model('Note', NoteSchema);
//module.exports = Note;

export default mongoose.models.Note || mongoose.model('Note', NoteSchema)
