import React,{useContext,useEffect,useState} from 'react';
import NoteContext from '../../context/noteContext/noteContext'

const ShowData = () => {

const [data,setFormData]=useState({ type: 'password',})
const {type}=data
const showHide=(e)=>{
    setFormData({
      type: type === 'input' ? 'password' : 'input'
    })  
  }
  const {notes,deleteNote,editFormFun}=useContext(NoteContext);


  return (

    <table className="table table-sm ">
    <thead>
      <tr>
      
        <th scope="col">Site Name</th>
        <th scope="col">Site URL</th>
        <th scope="col">Site Password <span className="password__show" onClick={showHide}>{type === 'input' ?  <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i> }</span></th>
        <th scope="col">Edit</th>
        <th scope="col">Dlete</th>
      </tr>
    </thead>
    <tbody>
    


        {notes.map(
          note=>(
            <tr>
            <td>{note.websiteName}</td>
           <td >{note.websiteUrl}</td>
          <td><input type={type} className="border border-white bg-white"  value={note.websitePass} disabled/></td>
            <td><span onClick={()=>editFormFun(note)}><i className="fas fa-pencil-alt"></i></span></td> 
             <td><span onClick={()=>deleteNote(note._id)}><i  className="fas fa-trash-alt"></i></span></td>
            </tr>
          )
        )}
    
    </tbody>
  </table>
  )
}
export default ShowData; 
