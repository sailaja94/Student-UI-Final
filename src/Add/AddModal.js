import { Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState} from 'react';
import FormA from './../StudentForm/StudentForm';
import axios from 'axios';

const Addmodal=(props)=>{

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [uname,setUName]=useState("")
let disable=true
const [connectionError,setConnectionError]=useState("")
const [dupl,setDupl]=useState("")

const changeName=(event)=>{setName(event.target.value)}
const changeEmail=(event)=>{setEmail(event.target.value)}
const changeUName=(event)=>{setUName(event.target.value)}

let validCount=0
const [invalidName,setInvalidName]=useState("")
const [invalidEmail,setInvalidEmail]=useState("")
const [invalidUName,setInvalidUName] =useState("")


const nm = /^([a-zA-Z]+)([a-zA-Z ]{3,30})$/
    const nameValidity = () => {
        console.log("validity check")
        if (!nm.test(name) || name.length > 45) {
            setInvalidName(<p style={{ color: 'red' }}>Please enter a valid name.</p>)
            validCount = validCount + 1;
        }
        else { setInvalidName("")}
    }

const eml = /^([a-zA-Z0-9]+)([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,4})$/
    const emailValidity = () => {
        if (!eml.test(email) || email.length > 45) {
            setInvalidEmail(<p style={{ color: 'red' }}>Please enter a valid email.</p>)
            validCount = validCount + 1;
        }
        else { setInvalidEmail("")}
    }


const un = /^([a-zA-Z]{3,10}$)/
    const unameValidity = () => {
        if (!un.test(uname)) {
            setInvalidUName(<p style={{ color: 'red' }}>Please enter a valid University Name.</p>)
            validCount = validCount + 1;
        }
        else { setInvalidUName("")}
    }

if(validCount===0){
 disable=false
}



const updateTable=()=>{

    axios.post('http://localhost:8081/students/create',{"name": name, "email": email, "universityName": uname})
     .then(response=>{
         props.getTable();
         props.hide();
         props.success(<h4 className='Success'>Successfully added student with Name : {name}</h4>)
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
 <Modal  show={props.show} onHide={props.hide}>
        <Modal.Header className="classes.addHeader" onClick={props.hide} closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {connectionError}
                <FormA className='classes.addForm' dupl={dupl} changeN={changeName} changeE={changeEmail} changeU={changeUName}
                    invalidEmail={invalidEmail} invalidName={invalidName} invalidUName={invalidUName}
                    checkN={() => nameValidity()} checkE={() => emailValidity()} checkU={() => { unameValidity()}}
                />
        </Modal.Body>
        <Modal.Footer className="classes.addFooter">
          <button className="btn btn-info" onClick={updateTable} disabled={disable}>Save</button>
          <button className="btn btn-default" onClick={props.hide}>Close</button>
        </Modal.Footer>
      </Modal>
</div>
)
}
export default Addmodal;