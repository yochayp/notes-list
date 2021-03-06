import { useObserver } from "mobx-react"
import { ListGroup, Card, Row, Col, Form } from "react-bootstrap"
import { AiOutlineDelete } from "react-icons/ai";

import useStore from "../stores/useStore";

const ListView = (props) => {

    const notes = useStore();

    const toggleChecked = (note, item) => {
        notes.toggleItem(note.id, item.id);
    }

    const removeNote = (note =>
        notes.removeNote(note));

    return useObserver(() => (
        <ListGroup style={{ margin: 20 }} variant="flush">
            {notes.noteslist.map((note, key) =>
             <Row key={key} className="justify-content-md-center">
                < Card key={key} border="primary" style={{ width: '500px', margin: '7px' }}>

                    <Card.Header>
                        <Row>
                            <Col><h3 style={{ marginLeft: '3%' }}>{note.noteName}</h3></Col>
                            <Col md='auto' className='ml-auto'>
                                <AiOutlineDelete className="icon" onClick={() => removeNote(note)} />
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body style={{ paddingLeft: 4 }}>
                        <ListGroup variant="flush">

                            {note.itemsList.map((item, key) =>
                                <ListGroup.Item key={key}>
                                    <Row>
                                        <Form.Check checked={item.checked} onChange={() => toggleChecked(note, item)} />
                                        {item.itemName}
                                    </Row>
                                </ListGroup.Item>

                            )}
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                        <Col md='auto' >
                          <b>Created : </b>  {note.dateCreated} </Col>
                          <Col md='auto' className='ml-auto'>
                          <b>Modified : </b>  {note.dateUpdated} </Col></Row>
                    </Card.Footer>
                </Card ></Row>
            )}
     
        </ListGroup >))

}

export default ListView

