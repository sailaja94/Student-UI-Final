import React, { useEffect, useState } from 'react';
import '../App.css';
import Table from './Table';
import axios from 'axios';
import Add from '../Add/AddModal.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

const Student = () => {
    const [successful, setSuccessful] = useState("")

    const [state, setState] = useState({
        student: []
    })
    const [show, setShow] = useState(false);

    const updateSucess = (val) => {
        setSuccessful(val)
        setTimeout(function () {
            setSuccessful('')
        }, 4000);
    }

    

    useEffect(() => {
        setTimeout(() => {
               getTable();
        }, 10);
    }, []);

    useEffect(() => {
        $('#table').DataTable();
    }, [state.student]);

    const getTable = () => {
        $('#table').DataTable().destroy();
        axios.get('http://localhost:8081/students/list')
            .then(response => setState({ student: response.data }))
    }

   

    const addShow = () => {
        setShow(true)
    }

    const addhide = () => {
        setShow(false)
    }
    
    return (
    <div>
        <div className="table-title">
            <h1><i className="fas fa-database"></i> STUDENT DATABASE </h1>
        </div>
        <div className="App">
            {successful}
            <Table data={state.student} getTable={getTable} success={updateSucess} />
                <button className='button' onClick={addShow}><i className="fas fa-user-plus"></i>  Add New Student</button>
            <Add show={show} hide={addhide} getTable={getTable} success={updateSucess} />
        </div>
    </div>
    );}

export default Student;