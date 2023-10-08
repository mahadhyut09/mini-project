import axios from 'axios';
import React, {useEffect,useState} from 'react'
import Form from './Form';
function Info() {
  const [data, setData] = useState();
  const [showData,setShowData] = useState(false)

  const getData = async (la,lo) => {
    const data = await axios.get('http://localhost:3000/doctor-api/get-nearby-doctors',{
      latitude: la,
      longitude: lo
    })
    setData(data.data.message[0])
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getData(position.coords.latitude,position.coords.longitude)
        console.log(position.coords.latitude,position.coords.longitude)
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <div className='bg-dark text-light' style={{minHeight: "100vh"}}>
      
      
      <Form/>

      <div className='p-4'>
        <button onClick={()=>{
          getData()
          setShowData(!showData)
        }} className='text-white bg-primary p-2 mx-auto d-block'>{showData ? "Hide nearby doctor" : "Show nearby doctor"}</button>
        { showData &&
        <div className='bg-white m-5 text-dark p-3'>
          <h4><b>Name:</b> {data?.name}</h4><br/>
          <h4><b>Designation:</b>{data?.designation}</h4><br/>
          <h4><b>Hospital Name:</b> {data?.hospital}</h4><br/>
          <h4><b>Location:</b> {data?.location}</h4><br/>
        </div>
        }

      </div>

    </div>
  )
}

export default Info