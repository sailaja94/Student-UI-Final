import React from 'react';

const Form=(props)=>{


return (
         <div>
         
             <div className="form-group" id="editNParent">
               <label>Name *</label>
            <input type="text" className="form-control"
                defaultValue={props.name} onChange={props.changeN} onBlur={props.checkN} ></input>
              {props.invalidName}
             </div>
             <div className="form-group" id="editEParent">
                <label>Email *</label>
                <input type="text"  className="form-control"
                defaultValue={props.email} onChange={props.changeE} onBlur={props.checkE}></input>
                {props.invalidEmail}{props.dupl}
             </div>
             <div className="form-group" id="editUParent">
                 <label>University Name *</label>
                 <input type="text"  className="form-control"
                defaultValue={props.uname} onChange={props.changeU} onBlur={props.checkU}></input>
                 {props.invalidUName}
             </div>
         </div>
)

}

export default Form;