import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MaterialTable from 'material-table'

const UniversityStudent = () => {

    let fetchedData = []
    const [table, setTable] = useState('')


    useEffect(() => {
        getdata();
        setTimeout(() => {
            setTable(<MaterialTable title="UNIVERSITY-STUDENT DATABASE" data={fetchedData} columns={columns} />)
        }, 1000);
    }, []);

    const getdata = () => {
        axios.get('http://localhost:8081/students/list')
            .then(response => {
                    fetchedData=response.data
                
            })
    }

    const columns = [
        { title: "Student ID", field: "id", headerStyle: { backgroundColor: 'blue', color: 'white' } },
        { title: "Student Name", field: "name", headerStyle: { backgroundColor: 'blue', color: 'white' }},
        { title: "Email", field: "email", headerStyle: { backgroundColor: 'blue', color: 'white' }},
        { title: "University Name", field: "universityName", headerStyle: { backgroundColor: 'blue', color: 'white' }, defaultGroupOrder: 0 }
       
    ]

    console.log(fetchedData)
    return (<div>
        {table}
    </div>)
}

export default UniversityStudent