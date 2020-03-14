import React ,{useReducer}from 'react'
import axios from 'axios'
import NoteContext from './noteContext'
import noteReducer from './noteReducer'
import {
    GET_NOTE,
    ADD_NOTE,
    NOTE_ERROR,
    DELETE_NOTE,
    UPDATE_NOTE,
    EDIT_FORM,
    CLEAR_EDITFORM,
    CLEAR_SUCCESS,
    CLEAR_ERROR,
    LOG_OUT
} from '../type'

 const NoteState = (props) => {

    const initialState={
        notes:[],
        editForm:null,
        errors:null,
        success:null
    }

    const [state,dispatch]=useReducer(noteReducer,initialState)
//get note

const getNote=async()=>{
    try {
        const res=await axios.get('/user/note')
        dispatch({
          type:GET_NOTE,
          payload:res.data
         
        })
    } catch (error) {
        dispatch({
            type:NOTE_ERROR,
            payload:error.response.msg
        })
    }
}
//add note
const addNote=async (note)=>{
    const config={
        header:{
            'Content-Type':'application/json'
        }
    }
    try {
       const res=await axios.post('/user/note',note,config)
        dispatch({
            type:ADD_NOTE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:NOTE_ERROR,
            payload:error.response.data
        })
    }
   
}

//remove note
const deleteNote=async(id)=>{
    try {
      await axios.delete(`/user/delete/${id}`)
        dispatch({
            type:DELETE_NOTE,
            payload:id
        })   
    } catch (error) {
        dispatch({
            type:NOTE_ERROR,
            payload:error.response.msg
        })
    }
  

}

 //update note
 const updateNote=async(note)=>{
    const config={
        header:{
            'Content-Type':'application/json'
        }
    }
    const res=await axios.put(`/user/update/${note._id}`,note,config)
   
    try {
         
        dispatch({
            type:UPDATE_NOTE,
            payload:res.data
        }) 
    } catch (error) {
        dispatch({
            type:NOTE_ERROR,
            payload:error.response.msg
        })
    }
   
}

//edit note
const editFormFun=(note)=>{
console.log(note);
    dispatch({
        type:EDIT_FORM,
        payload:note
    })  
}

//clear edit form
const clearEditForm=()=>{
    dispatch({
        type:CLEAR_EDITFORM,
        
    }) 
}

//clear error

const clearError=()=>{
    dispatch(
        {
            type:CLEAR_ERROR,
            
        }
    )
}

//clear success
const clearSuccess =()=>{
     setTimeout(() => { 
     dispatch({
        type:CLEAR_SUCCESS,
     })
    }, 3000);
  }
//clear note state
  const clearNoteState=()=>{
    dispatch({
        type:LOG_OUT
    })
}

    return (
      <NoteContext.Provider
      value={{
        notes: state.notes,
        addNote,
        getNote,
        deleteNote,
        updateNote,
        editFormFun,
        editForm: state.editForm,
        clearEditForm,
        errors: state.errors,
        clearError,
        success:state.success,
        clearSuccess,
        clearNoteState
      }}
      
      >{props.children}</NoteContext.Provider>
    )
}
  export default NoteState; 