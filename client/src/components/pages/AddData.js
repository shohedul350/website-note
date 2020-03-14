import React, { useState, useContext, useEffect,Fragment } from "react";
import NoteContext from '../../context/noteContext/noteContext'

const AddNote = () => {

const { addNote,updateNote,editForm,clearEditForm,getNote,errors,clearError,success,clearSuccess} = useContext(NoteContext);

useEffect(()=>{
  if(editForm !== null){
    setFormData(editForm);
  }else{
    setFormData({
      websiteName:"",
      websiteUrl:"",
      websitePass:"",
   
    })}},[editForm]);



const [formData,setFormData]=useState({
            websiteName:"",
          websiteUrl:"",
          websitePass:"",
       
      });
const {websiteName,websiteUrl,websitePass}=formData

const onSubmit=e=>{
    e.preventDefault();
    if(editForm === null){
      addNote(formData);
      getNote()
    }else{
      updateNote(formData);
       clearEditForm();
    }
    setFormData({
      websiteName:"",
      websiteUrl:"",
      websitePass:"",
   
    });
    
    }


        

const onChange=e=>{setFormData({...formData,[e.target.name]:e.target.value});}
    return <Fragment>
      
<div className="question">
              {errors !== null && <button className="danger">
              {errors.msg ? errors.msg : errors.errors[0].msg}
                 <span onClick={()=>clearError()}>X</span>
              </button>
                }
</div>
<div className="row">

        <div className="col-md-6 offset-md-3">
           {success !== null ?  <div className="card bg-success text-center"> {success} {clearSuccess()}</div>  : null}

          <h2 className="text-center display-6">Add Data</h2>
          <form onSubmit={e=>onSubmit(e)}>
           
            <div className="form-group">
              <label htmlFor="websiteName"> Website Name: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Website Name"
                name="websiteName"
                value={websiteName}
                onChange={e=> onChange(e)}

              />
            </div>

            <div className="form-group">
              <label htmlFor="websiteUrl"> Website Url: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Website Url"
                name="websiteUrl"
                value={websiteUrl}
                onChange={e=> onChange(e)}

              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Website Password: </label>
              <input
                type="websitePass"
                className="form-control"
                placeholder="Enter Your Website  Password"
                name="websitePass"
                value={websitePass}
                onChange={e=> onChange(e)}
               
              />
            </div>

            

            
<input type="submit" value={editForm !== null ? 'Update Note' : 'Add Note'} className="btn btn-success form-control" />
{editForm !== null ? < input onClick={clearEditForm} type="button" className="btn clear" value="Cancel" /> : null}
          </form>
        </div>
      </div>

    </Fragment>
}

export default AddNote;