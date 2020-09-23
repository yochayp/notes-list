export const createStore = (source => ({
    
    noteslist: []
    ,
    addNote(note) {
        this.noteslist.push(note);

        console.log(this.noteslist);
    },

    toggleItem(lastnote, lastitem) {

        const newItem = { id: lastitem.id, name: lastitem.name, checked: !lastitem.checked };
        const newItemsList = lastnote.itemsList.map(item => {
            if (item.id !== lastitem.id) return item
            else return newItem
        })
        const newNote = {
            id: lastnote.id,
            name: lastnote.name,
            itemsList: newItemsList,
            dateCreated: lastnote.dateCreated,
            dateUpdated: new Date().toLocaleString()
        }
        this.noteslist = this.noteslist.map(note => {
            if (note.id !== lastnote.id) return note
            else return newNote
        })
    },
    removeNote(selectedNote) {
        this.noteslist = this.noteslist.filter(note => note.id !== selectedNote.id)
        }        }
));


export default createStore;
export type TStore = ReturnType<typeof createStore>