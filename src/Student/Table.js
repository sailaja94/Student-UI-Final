
import 'bootstrap/dist/css/bootstrap.min.css';
//import $ from 'jquery';

import React,{useState} from 'react';
import Edit from '../Edit/EditModal';
import Delete from '../Delete/DeleteModal';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import './ContextMenu.css'
import './Table.css'

 const Table=(props) =>{
const [eshow, seteShow] = useState(false);
const [dshow, setdShow] = useState(false);
const [students,setStudents]=useState({
student:[]})


let edit=null;
let dlt=null;

const eShow=()=>{
        seteShow(true);
}

const eHide=()=>{
        seteShow(false);
}

const dShow=()=>{
        setdShow(true);
}

const dHide=()=>{
        setdShow(false);
}

const selectedrow=(stdnt)=>{
   setStudents({student:stdnt})

}

if(eshow){
  edit=<Edit show={eshow} hide={eHide} getTable={props.getTable} success={props.success}
     id={students.student.id} name={students.student.name} email={students.student.email} uname={students.student.universityName}/>
}

if(dshow){
  dlt= <Delete show={dshow} hide={dHide} getTable={props.getTable}
      success={props.success} id={students.student.id}/>
}

const body=props.data.map((s,index)=>(
   <tr onClick={()=>selectedrow(s)} onContextMenu={()=>selectedrow(s)}  key={index}>
        <td >{s.id}</td>
        <td>{s.name}</td>
        <td>{s.email}</td>
        <td>{s.universityName}</td>
        <td> <button  onClick={eShow} className="btn edit"><i className="fas fa-user-edit"></i></button></td>
        <td> <button  onClick={dShow} className="btn delete"><i className="fas fa-user-minus"></i></button></td>
   </tr>
))

return (
          <div>
            <ContextMenuTrigger id="cntxtmenu">
                <table className="display" id='table' width="100%" style={{width:'100%', borderStyle: 'solid'}} >
                    <thead>
                    <tr>
                        <th><i className="fas fa-id-card-alt"></i> ID</th>
                        <th><i className="fas fa-file-signature"></i> Name</th>
                        <th><i className="far fa-envelope"></i> Email</th>
                        <th><i className="fas fa-university"></i> University Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {body}
                    </tbody>
               </table>
               </ContextMenuTrigger>
                <ContextMenu  id="cntxtmenu">
                           <MenuItem onClick={eShow}>
                             <i className="fas fa-user-edit"></i> Edit
                           </MenuItem>
                           <MenuItem onClick={dShow}>
                             <i className="fas fa-user-minus"></i> Delete
                           </MenuItem>
                </ContextMenu>
               {edit}
               {dlt}
          </div>
        );
    }
export default Table;