const mongoose = require('mongoose');

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


module.exports =  mongoose.models.Note || mongoose.model('Note', NoteSchema);

