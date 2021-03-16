import React, { useEffect,useState } from 'react'
import axios from 'axios';
import MaterialTable from 'material-table'
import AddUniversity from './AddUniversity.js'

const University = () => {
   
    const fetchedData = []
    const [table, setTable] = useState('')
    const [show, setShow] = useState(false)
    const [successful, setSuccessful] = useState("")

    const updateSucess = (val) => {
        setSuccessful(val)
        setTimeout(function () {
            setSuccessful('')
        }, 4000);
    }

    const addUniversity = () => {
        setShow(true)
    }

    const addUniversityHide = () => {
        setShow(false)
    }

    useEffect(() => {
        getdata();
        setTimeout(() => {
            setTable(<MaterialTable title="UNIVERSITY DATABASE" data={fetchedData} columns={columns} />)
        }, 1000);
    },[]);

    const getdata = () => {
        axios.get('https://university-c0d51-default-rtdb.firebaseio.com/university.json')
            .then(response => {
                for (let key in response.data) {
                    fetchedData.push({ ...response.data[key], id: key })
                }
            })
    }
    const columns = [
        {title: "University Name", field: "name", headerStyle: {backgroundColor: 'purple', color:'white'}},
        { title: "Phone Number", field: "Phone", headerStyle: { backgroundColor: 'purple', color: 'white' }},
        { title: "Location", field: "location", headerStyle: { backgroundColor: 'purple', color: 'white' } },
        { title: "Number of students", field: "Count", headerStyle: { backgroundColor: 'purple', color: 'white' } }
        ]

    return (<div>
        {successful}
        {table}
        <button onClick={addUniversity} className="btn btn-primary">Add University</button>
        <AddUniversity show={show} hide={addUniversityHide} success={updateSucess}/>
    </div>)
}

export default University