/* eslint-disable */
import React from "react";
import "./HomePage.css";
import NavComponent from "../../components/navComponent";
import SideBarComponent from "../../components/sideBarComponent";
import makeRequest from "../../utils/makeRequest";
import { getAllCollectionByContentId, BASE_URL } from "../../constants/backendEndpoints";
import CollectionCardComponent from "../../components/collectionCardComponent";
export default function HomePage() {
    const[data, setData]=React.useState({});
    const authToken = localStorage.getItem("token");
    
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
                        {data.collections?data.collections.length:"0"} Entries Found

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