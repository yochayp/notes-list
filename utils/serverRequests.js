import axios from 'axios';


class ServerRequests {

    addNote(newnote) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch('/api/pets', {
                    method: 'POST',
                    headers: {
                      Accept: contentType,
                      'Content-Type': contentType,
                    }
                  })
                const response = await axios({
                    method: 'post',
                    url: '/notes',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: newnote
                })
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteNote(noteid) {
        return new Promise(async (resolve, reject) => {
            console.log('delete')
            try {
                const response = await axios('/notes', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: {noteid: noteid}
                })
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateNote(newNote) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios('notes', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: newNote
                })
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    initNotes() {

        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get('http://localhost:3000/notes');
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        })
    }


}

export default new ServerRequests();