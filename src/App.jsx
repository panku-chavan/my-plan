import { FaRegTrashAlt} from "react-icons/fa";
import { FiEdit } from 'react-icons/fi'
import { GrAdd } from "react-icons/gr";
import {GiCancel } from "react-icons/gi";
import { MdDone} from "react-icons/md";
import { nanoid } from 'nanoid';
import { useState } from 'react';
import './App.css';
import Modal from "react-bootstrap/Modal"

function App() {
  const [text,setText]=useState('');
  const [items,setItems]=useState(localStorage.getItem("items")? JSON.parse(localStorage.getItem("items")) : []);
  const [editvalue,seteditValue]=useState(null);
  const [popValue,editPopValue]=useState(null);
  const [show,setShow]=useState(false)
 

 const addItems=()=>{
  if(text===''){
    alert("Enter some text to add.")
    return;
  } 
  
  else{
    const arr=([
      ...items,{
        title:text,
        id:nanoid(1)
      }
    ])
    setItems(arr)
  localStorage.setItem("items",JSON.stringify(arr));
  }
  setText('')
  
 }
 const onDelete=(id)=>{
   alert("Are you sure to delete.")
     const arr=items.filter((e)=>{
          return e.id!==id
     })
     setItems(arr)
     localStorage.setItem("items",JSON.stringify(arr));
 }
  //console.log(items)
  const handleEdit=(id)=>{
    setShow(!show)
    const arr= items.find((e)=>{
      return e.id===id;
    })
    editPopValue(arr.title)
    seteditValue(id);
     console.log(arr)
  }
 const Done=()=>{
  setShow(!show)
   console.log(popValue)
    const arr= items.map((e)=>{
      if(e.id===editvalue){
        return {...e,title:popValue}
      }
      return e;
    });
    setItems(arr);
    localStorage.setItem("items",JSON.stringify(arr));
 }
  //console.log(popValue)
  return (
    <div className="container-fluid my-5">
      
        <div className="row">
          <div className="col-sm-6 mx-auto  shadow-lg p-3">
            <h2 className="text-center"> Today's Plan </h2>
            <div className="container-fluid">
              <div className="row">
                <div className="col-11">
                  <input type="text" className="form-control" value={text} placeholder="Write Plan Here" onChange={((e)=>setText(e.target.value))}  />
                </div>
                <div className="col-1" style={{
                   cursor:"pointer",
                   paddingTop:"4px",
                   
                   paddingLeft:"0px"
                }}>
                  <GrAdd onClick={addItems}></GrAdd>
                </div>
              </div>
              <div className="conatiner">
                {
                  items.map((e,i)=>{
                    return <div  key={e.id} className='row' style={{marginTop:"10px"}}>
                          <div className='col-1'></div>
                          <div className='col-1'>{i+1}</div>
                          <div className='col-5'>{e.title}</div>
                          <div className='col-1'> 
                             <FiEdit  onClick={()=>handleEdit(e.id)} style={{cursor:"pointer"}} ></FiEdit>
                          </div>
                          <div className='col-1'> 
                             <FaRegTrashAlt style={{cursor:"pointer"}} onClick={()=>onDelete(e.id)}></FaRegTrashAlt>
                          </div>
                         
                    </div>
                    
                  })
                  
                }
              </div>
            </div>

          </div>
        </div>
        <Modal show={show} >
            <Modal.Header>Edit Items</Modal.Header>
            <Modal.Body>
                <input type="text" className="form-control"   value={popValue} onChange={(e)=>editPopValue(e.target.value)}></input>

            </Modal.Body>
            <Modal.Footer>
               <div className="row">
                <div className="col-3">
                <MdDone onClick={Done} style={{cursor:"pointer"}} ></MdDone>
                </div>
                <div className="col-3">
                <GiCancel onClick={()=>setShow(!show)}  style={{cursor:"pointer"}}></GiCancel>
           
                </div>
               </div>
                </Modal.Footer>
        </Modal>
      </div>
  );
}

export default App;
