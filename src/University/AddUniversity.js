import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const AddUniversity = (props) => {
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [phone, setPhone] = useState("")
    const [count, setCount] = useState("")
    let disable = true
    const [connectionError, setConnectionError] = useState("")

    const changeN = (event) => { setName(event.target.value) }
    const changeL = (event) => { setLocation(event.target.value) }
    const changeP = (event) => { setPhone(event.target.value) }
    const changeC = (event) => { setCount(event.target.value) }

    let validCount = 0
    const [invalidName, setInvalidName] = useState("")
    const [invalidLocation, setInvalidLocation] = useState("")
    const [invalidPhone, setInvalidPhone] = useState("")
    const [invalidCount, setInvalidCount] = useState("")

    const un = /^([a-zA-Z]{3,10}$)/
    const checkN = () => {
        if (!un.test(name)) {
            setInvalidName(<p style={{ color: 'red' }}>Please enter a valid University Name.</p>)
            validCount = validCount + 1;
        }
        else { setInvalidName("") }
    }

    const lc = /^([a-zA-Z]{3,10}$)/
    const checkL = () => {
        if (!lc.test(location)) {
            setInvalidLocation(<p style={{ color: 'red' }}>Please enter a valid Location.</p>)
            validCount = validCount + 1;
        }
        else { setInvalidLocation("") }
    }

    const ph = /^([0-9]{3,10}$)/
    const checkP = () => {
        if (!ph.test(phone)) {
            setInvalidPhone(<p style={{ color: 'red' }}>Please enter a valid Phone number.</p>)
            validCount = validCount + 1;
        }
        else { setInvalidPhone("") }
    }

    const cnt = /^([0-9]{1,3}$)/
    const checkC = () => {
        if (!cnt.test(count)) {
            setInvalidCount(<p style={{ color: 'red' }}>Please enter a valid Count.</p>)
            validCount = validCount + 1;
        }
        else { setInvalidCount("") }
    }
    if (validCount === 0) {
        disable = false
    }
    const updateUniversity = () => {
        axios.post('https://university-c0d51-default-rtdb.firebaseio.com/university.json', { "name": name, "location": location, "Phone": phone, "Count": count })
            .then(response => {
                props.hide();
                props.success(<h4 className='Success'>Successfully added university with Name : {name}</h4>)
            })
            .catch(error => {
                setConnectionError(<p style={{ color: 'red' }}>OOPS!!! Something went wrong. Please try again later. </p>)
            })
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.hide}>
                <Modal.Header onClick={props.hide} closeButton>
                    <Modal.Title>Add New University</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {connectionError}
                        <div className="form-group" id="editNParent">
                            <label>University Name *</label>
                            <input type="text" className="form-control"
                                 onChange={changeN} onBlur={checkN} ></input>
                            {invalidName}
                        </div>
                        <div className="form-group" id="editEParent">
                            <label>Location *</label>
                            <input type="text" className="form-control"
                                 onChange={changeL} onBlur={checkL}></input>
                            {invalidLocation}
                        </div>
                        <div className="form-group" id="editUParent">
                            <label>Phone Number *</label>
                            <input type="text" className="form-control"
                                onChange={changeP} onBlur={checkP}></input>
                            {invalidPhone}
                        </div>
                        <div className="form-group" id="editUParent">
                            <label>Number of Students *</label>
                            <input type="text" className="form-control"
                                onChange={changeC} onBlur={checkC}></input>
                            {invalidCount}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info" onClick={updateUniversity} disabled={disable}>Save</button>
                    <button className="btn btn-default" onClick={props.hide}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddUniversity