import { Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';


const Deletemodal=(props)=>{

const deleteTable=()=>{
    axios.delete('http://localhost:8081/students/delete/'+props.id)
    .then(response=>{
               props.getTable();
               props.hide();
               props.success(<h4 className='Success' >Successfully deleted student with ID : {props.id}</h4>)

 })
}
return (
<div>
 <Modal show={props.show} onHide={props.hide}>
        <Modal.Header onClick={props.hide} closeButton>
          <Modal.Title>Delete Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div> Are you sure you want to delete the student with id {props.id}?</div>
         <p style={{color:'red'}}>This action cannot be reverted. </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteTable} variant="danger">Delete</Button>
          <Button onClick={props.hide} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
</div>
)
}
export default Deletemodal;