import React,{useContext,useEffect} from 'react';
import AddData from './AddData';
import ShowData from './ShowData'
import AuthContext from '../../context/authContext/authContext'
import NoteContext from '../../context/noteContext/noteContext'


const Home = () => {
  const {getUser}=useContext(AuthContext)
  const {getNote}=useContext(NoteContext);
  useEffect(()=>{
    getUser();
    getNote();
   // eslint-disable-next-line
  },[])

  
  return (

<div class="container">
<div class="row">
  <div class="col-sm">
  <AddData/>
  </div>
  <div class="col-sm">
  <ShowData/>
  </div>

</div>
</div>
  )
}

export default Home