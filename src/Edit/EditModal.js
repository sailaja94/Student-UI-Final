import { Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState} from 'react';
import FormE from './../StudentForm/StudentForm';
import axios from 'axios';

const Editmodal=(props)=>{

const [name,setName]=useState(props.name)
const [email,setEmail]=useState(props.email)
const [uname,setUName]=useState(props.uname)
const [connectionError,setConnectionError]=useState("")
const [dupl,setDupl]=useState("")
let disable=true

const changeName=(event)=>{setName(event.target.value)}
const changeEmail=(event)=>{setEmail(event.target.value)}
const changeUName=(event)=>{setUName(event.target.value)}

let valid=0
let invalidName=""
let invalidEmail=""
let invalidUName=""

 const nm = /^([a-zA-Z]+)([a-zA-Z ]{3,30})$/;

 if (!nm.test(name) || name.length>45) {
     invalidName=<p style={{color:'red'}}>Please enter a valid name.</p>
     valid=valid+1;
 }

const eml = /^([a-zA-Z0-9]+)([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,4})$/;

if (!eml.test(email) || email.length > 45) {
   invalidEmail=<p style={{color:'red'}}>Please enter a valid email.</p>
   valid=valid+1;
 }

const un = /^([a-zA-Z]{3,10}$)/;

if (!un.test(uname)) {
   invalidUName=<p style={{color:'red'}}>Please enter a valid University Name.</p>
   valid=valid+1;
 }

if(valid===0){
 disable=false
}

const updateTable=()=>{
    let url='http://localhost:8081/students/update/'+ props.id
    axios.post(url,{"id":props.id, "name": name, "email": email, "universityName": uname})
     .then(response=>{
            props.getTable();
            props.hide();
            props.success(<h4 className='Success'>Successfully updated student with Name : {name}</h4>)
            })
      .catch(error=>{
          if(error.response.status===500){
                   setDupl(<p style={{color:'red'}}>Duplicate entry detected. Please recheck the value entered.</p>)
                   }
          else{
          setConnectionError(<p style={{color:'red'}}>There seems to be connection issue. Please retry later.</p>)
          }
       })
}
return (
<div>
 <Modal show={props.show} onHide={props.hide}>
        <Modal.Header onClick={props.hide} closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                {connectionError}
                <FormE dupl={dupl} changeN={changeName} changeE={changeEmail} changeU={changeUName}
                       name={name} email={email} uname={uname}
                       invalidEmail={invalidEmail} invalidName={invalidName} invalidUName={invalidUName}/>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-info" onClick={updateTable} disabled={disable}>Save</button>
          <button className="btn btn-default" onClick={props.hide}>Close</button>
        </Modal.Footer>
      </Modal>
</div>
)
}
export default Editmodal;