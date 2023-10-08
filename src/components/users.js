import React, {useState,useEffect} from 'react'
import { FiLogIn } from 'react-icons/fi'
import {AiOutlineUserAdd} from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import axios from 'axios';

function Users() {
  const {register,handleSubmit,formState:{errors}}=useForm();
  let navigate=useNavigate();
  
  async function submit(e) {
    const res = await axios.post("http://localhost:3000/user-api/login", e)

    if (res.data.message === "success") {
      localStorage.setItem("token", res.data.payload)
      localStorage.setItem("userdata", JSON.stringify(res.data.userObj))
      navigate("/info")
    }
    else {
      setModalMessage(res.data.message)
      setModal(true) 
    }

  }

  const [modal,setModal]=useState(false)
  const [message,setModalMessage]=useState("")

  return (
   
      <div className='py-5 tgimg'>
    
    <Modal isOpen={modal} handleClose={()=>setModal(false)}>
        <div>
          {message}
        </div>
      </Modal>


    <div className='text-center card-box'>  
    <div className="card" style={{width :"18rem"}} >
      <h2 className='text-danger pt-5'>Login</h2>
  <div className="card-body">
  <form onSubmit={handleSubmit(submit)}>
        <div className="form-group">
          <label htmlFor="exampleInputrollno1">Name</label>
          <input type="name" className="form-control w-75 mx-auto mb-3" id="exampleInputrollno1" aria-describedby="emailHelp" placeholder="Enter Name" {...register("name",{required:true})}/>
         
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control w-75 mx-auto" id="exampleInputPassword1" placeholder="Password" {...register("password",{required:true})}/>
        </div>
        <div className="form-group form-check">
         
        </div>
        <button type="submit" className="btn btn-primary mb-3">Login</button>
      </form> 
    <span>Don't have account <a href="/usersign" className='text-danger'>Sign Up</a> </span>
  </div>
</div>
</div>
 </div>
 
      
  )
}

export default Users