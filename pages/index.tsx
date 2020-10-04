import Head from 'next/head'
import React from "react";
import { useLocalStore } from 'mobx-react' // 6.x or mobx-react-lite@1.4.0
import { TStore } from '../stores/notesStore'
import ServerRequests from '../utils/serverRequests'
import Note from '../models/Note'
import axios from 'axios';

import NavbarView from '../components/navbarview'
import ListView from '../components/listview'
import { toJS } from 'mobx';
import serverRequests from '../utils/serverRequests';


export const storeContext = React.createContext<TStore | null>(null)


const Index = ({ notes }) => {

    const StoreProvider = ({ children }) => {
        const value = useLocalStore(
            source => ({
                noteslist: notes
                ,
                addNote(note) {
                    ServerRequests.addNote(note);
                    this.noteslist.push(note);
                },
                toggleItem(lastnote, lastitem) {
                    this.noteslist.forEach((item, noteIndex) => {
                        if (item.id == lastnote) {
                            this.noteslist[noteIndex].itemsList.forEach((item, itemIndex) => {
                                if (item.id == lastitem) {
                                    this.noteslist[noteIndex].itemsList[itemIndex].checked = !this.noteslist[noteIndex].itemsList[itemIndex].checked
                                    const newNote = toJS(this.noteslist[noteIndex]);
                                    ServerRequests.updateNote(newNote);
                                }
                            })
                        }
                    })
                },
                removeNote(selectedNote) {
                    this.noteslist = this.noteslist.filter(note => note.id !== selectedNote.id);
                    ServerRequests.deleteNote(selectedNote.id);
                }
            }), { notes }
        )
        return <storeContext.Provider value={value}>{children}</storeContext.Provider>;
    };
    return (
       <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
            </Head>
            <StoreProvider>
                <NavbarView />
                <ListView />
            </StoreProvider>
        </>
       // <div>hello world!</div>
    )
}


export async function getServerSideProps() {
    let notes;
    //const result = await axios.get('http://localhost:3000/notes');//serverRequests.initNotes(); //
    const result = await Note.find({})
   notes = JSON.parse(JSON.stringify(result))
    console.log(notes)
    return { props: { notes: notes } }
}
export default Index;

