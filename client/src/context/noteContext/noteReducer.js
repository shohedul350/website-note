
import {
    ADD_NOTE,
    GET_NOTE,
    DELETE_NOTE,
    NOTE_ERROR,
    UPDATE_NOTE,
    EDIT_FORM,
    CLEAR_EDITFORM,
    CLEAR_ERROR,
    SET_ERROR,
    CLEAR_SUCCESS,
    LOG_OUT
  } from '../type'
  
  export default (state,{type,payload})=>{
      switch(type){
        case GET_NOTE:
            return{
                ...state,  
                notes:payload
            }
      
         case ADD_NOTE:
              return{
                  ...state,
                  success:payload.msg,
                  notes:[...state.notes,payload.result]
              }
         case DELETE_NOTE:
                return{
                ...state,
                success:payload.msg,
                notes:state.notes.filter(note=>note._id !==payload)
                }
         case UPDATE_NOTE:
                 return{
                 ...state,
                success:payload.msg,
                notes:state.notes.map(note=>note._id === payload._id ? payload:note)
                    
                    }
         case NOTE_ERROR:
                return{
                ...state,
                notes:[],
                errors:payload
                            }
         case EDIT_FORM:
                return{
                ...state,
                editForm:payload
                         
                }

         case CLEAR_EDITFORM:
                return{
                ...state,
                 editForm:null} 

        case CLEAR_ERROR:
                   return{
                   ...state,
                   errors:null
                    }

            case CLEAR_SUCCESS:
                    return{
                    ...state,
                     success:null
                     }

            case LOG_OUT:
                     return{
                     ...state,
                      notes:[],
                      editForm:null,
                      errors:null,
                     success:null
       
                     }
      
          default:
              return state
      }
  }