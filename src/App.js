import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [detail, setDetail] = useState(
    {
      BName: "",
      
    });
  const [details, setDetails] = useState([
    {
    BName: "",
    _id: "",
    },
]);

const [isPut, setIsPut] = useState(false);
  const [updatedDetail, setUpdatedDetail] = useState({
      BName: "",
      id: "",
  });
 
useEffect(() => {
  fetch('http://localhost:3001/details').then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(jsonRes => setDetails(jsonRes))
  .catch(err => console.log(err));
}, [details]);

function handleChange(event) {
  const { name, value } = event.target;
  setDetail((prevInput) => {
    return {
      ...prevInput, 
      [name]: value,
    };
  });

}

function addDetail(event) {
  event.preventDefault();
  const newDetail = {
    BName: detail.BName,
  };

  axios.post('/newdetail', newDetail);
  console.log(newDetail);
  alert('Details Saved');

  setDetail({
    BName: ""
  });
} 

function deleteDetail(id) {
  axios.delete("/delete/" + id);
  alert("Details Deleted");
  console.log(`Deleted details with id ${id}`);
} 

function openUpdate (id) {
  setIsPut(true);
  setUpdatedDetail(prevInput => {
    return(
      {
        ...prevInput,
        id: id,
      }
    )
  })
}

function updateDetail(id) {
  axios.put("/put/" + id, updatedDetail);
  alert("Details Updated");
  console.log(`details with id ${id} updated`);
 }

 function handleUpdate(event) {
  const { name, value } = event.target;
  setUpdatedDetail((prevInput) => {
    return {
      ...prevInput,
      [name]: value,
    };
  });
    console.log(updatedDetail);
 }

   

  return (
    <div className="App">
      <h1 className="head">Teacher Name</h1>
      {!isPut ?
      (<div className='formStyle'>
      <div className='formGroup'>
      <label className='formLabel' htmlFor="name">
            Teacher Name : 
          </label>
      <input className='formControl' onChange={handleChange} name="BName" value={detail.BName} placeholder="Enter Name"></input>
      </div>
      
      <button onClick={addDetail} className='button'>Save Name</button>
      </div>) : (
        <div className='formStyle'>
        <div className='formGroup'>
        <label className='formLabel' htmlFor="name">
              Teacher Name :
            </label>
        <input className='formControl' onChange={handleUpdate} name="BName" value={updatedDetail.BName} placeholder="Enter Name"></input>
        </div>
       
        <button onClick={() => updateDetail(updatedDetail.id)} className='button'>Update Name</button>
        </div>
      )}
    
      &nbsp; 
      {details.map((detail) => {
        return (
         <div key={detail._id}>
          <table className="table"> 
          <tbody>
           <tr>
            <td>{detail.BName}</td>
           
          <td className="bt">
          <button onClick={() => openUpdate(detail._id)} className="btn" >Update</button>
          <button onClick={() => deleteDetail(detail._id)} className="btn" >Delete</button>
          </td>
          </tr>
          </tbody>  
          </table>
          
        </div>
        )
      })}
      
    </div>
  );
}

export default App;
