import Head from 'next/head'
import React from "react";
import { useLocalStore } from 'mobx-react' // 6.x or mobx-react-lite@1.4.0
import ServerRequests from '../utils/serverRequests'
import Note from '../models/Note'
import dbConnect from '../utils/dbConnect'

import NavbarView from '../components/navbarview'
import ListView from '../components/listview'
import { toJS } from 'mobx';

type TStore = ReturnType<typeof useLocalStore>;

export const storeContext = React.createContext<TStore | null>(null)


const Index = ({ notes }) => {

    const StoreProvider = ({ children }) => {
        const value = useLocalStore(
            source => ({
                noteslist: notes
                ,
                async addNote(note) {

                    await ServerRequests.addNote(note)
                        .then(res => this.noteslist.push(res))
                        .catch(err => alert('unable to fetch Note'));
                },
                toggleItem(lastnote, lastitem) {
                    this.noteslist.forEach((item, noteIndex) => {
                        if (item.id == lastnote) {
                            this.noteslist[noteIndex].itemsList.forEach(async (item, itemIndex) => {
                                if (item.id == lastitem) {
                                    this.noteslist[noteIndex].itemsList[itemIndex].checked = !this.noteslist[noteIndex].itemsList[itemIndex].checked
                                    this.noteslist[noteIndex].dateUpdated = new Date().toLocaleString();
                                    const newNote = toJS(this.noteslist[noteIndex]);
                                    await ServerRequests.updateNote(newNote)
                                        .catch(err => alert('Faild in update'))
                                }
                            })
                        }
                    })
                },
                async removeNote(selectedNote) {
                    await ServerRequests.deleteNote(selectedNote.id).then(
                        this.noteslist = this.noteslist.filter(note => note.id !== selectedNote.id)
                    ).catch(
                        err => alert('Faild to delete Note')
                    );
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
    )
}


export async function getServerSideProps() {

    await dbConnect()
    const result = await Note.find({})
    const notes = JSON.parse(JSON.stringify(result))
    return { props: { notes: notes } }
}
export default Index;

