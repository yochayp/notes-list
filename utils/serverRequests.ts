
class ServerRequests {

    addNote(newnote) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch('api/notes', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newnote)
                })
                const { data } = await res.json();

                res.ok ? resolve(data) : reject(Error);

            } catch (error) {
                reject(error);
            }
        });
    }

    deleteNote(noteid) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch('api/notes', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ noteid: noteid })
                })
                res.ok ? resolve(res) : reject(Error);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateNote(newNote) {
        return new Promise(async (resolve, reject) => {
            try {
            console
                const res = await fetch('api/notes', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newNote)
                })
                res.ok ? resolve(res) : reject(Error);
            } catch (error) {
                reject(error);
            }
        });
    }




}

export default new ServerRequests();