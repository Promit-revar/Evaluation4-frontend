/* eslint-disable */
import React from "react";
import "./HomePage.css";
import NavComponent from "../../components/navComponent";
import SideBarComponent from "../../components/sideBarComponent";
import makeRequest from "../../utils/makeRequest";
import { getAllCollectionByContentId,postCollection, BASE_URL } from "../../constants/backendEndpoints";
import CollectionCardComponent from "../../components/collectionCardComponent";
import ModalComponent from "../../components/Modal";
export default function HomePage() {
    const[data, setData]=React.useState({});
    const[showModal, setShowModal]=React.useState(false);
    const authToken = localStorage.getItem("token");
    const [formData, setFormData] = React.useState({});
    const handleSubmit=()=>{
        postCollection.url+=data.contentId;
        makeRequest(postCollection,BASE_URL,{headers:{authorization:authToken},data:formData})
        .then((res)=>{
            console.log(res);
            setShowModal(false);
            window.location.reload();
        }
        ).catch((err)=>{
            console.log(err);
        });
    }
    const handleAddData=()=>{
        setShowModal(true);
        setFormData({...data.collections[0].data});
    }
    const handleFormFill=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }   
    const handleItemClick=(id)=>{
        getAllCollectionByContentId.url+=id;
        makeRequest(getAllCollectionByContentId,BASE_URL,{headers:{authorization:authToken}})
        .then((res)=>{
            console.log(res);
            setData({...res});
        }
        ).catch((err)=>{
            console.log(err);
        });
    }
    if(!showModal){
    return (
        <div className="HomePage">
            <div className="left-side">
                <SideBarComponent handleListClick={handleItemClick}/>
            </div>
            <div className="right-side">
                <div className="nav">
                    {console.log(data.name)}
                    <NavComponent content={data.name}/>
                </div>
                <div className="card">
                    <div className={"counter"}>
                        <div className="entries">
                        {data.collections?data.collections.length:"0"} Entries Found
                        </div>
                        <div className="add-data">
                            {data.collections?<div onClick={handleAddData}>Add a new entry</div>:null}
                        </div>

                    </div>
                    <div className="attributes">
                        <div className="data-attr">
                        {
                          data.collections?Object.keys(data.collections[0].data).map((item)=>
                                (
                                    <div style={{width:"100%"}} key={item}>{item}</div>   
                                )):null
                        }
                        </div>
                        <div className="actions-tag">
                            {data.collections?<p style={{marginBottom:"0px"}}>Actions</p>:null}
                        </div>
                        
                    </div>
                    
                    {
                       data.collections?data.collections.map((item)=><CollectionCardComponent content={item}/>):null
                    }
                    
                </div>
                
            </div>
        
        </div>
    );
                }
                else{
                    return (
                        <ModalComponent>
                            <div className="header">
                                <h1>{data.name}</h1>
                            </div>
                            <div className="form">
                                {Object.keys(data.collections[0].data).map((item)=>
                                
                                    <div style={{width:"100%",display:"flex",flexDirection:"column"}} key={item}>
                                        <label>{item}</label>
                                        <input type="text" onChange={handleFormFill} name={item} />
                                    </div>
                                   )}
                                <button onClick={handleSubmit}>Submit</button>
                                <button onClick={()=>setShowModal(false)}>Cancel</button>
                            </div>
                        </ModalComponent>
                            
                    )
                }
}