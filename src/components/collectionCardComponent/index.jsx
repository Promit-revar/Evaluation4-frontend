/* eslint-disable */
import React from "react";
import "./collectionCardComponent.css";
import makeRequest from "../../utils/makeRequest";
import { deleteCollection, BASE_URL } from "../../constants/backendEndpoints";
export default function CollectionCardComponent(props) {
    const handleDelete=()=>{
        deleteCollection.url+=props.content.collectionId;
        makeRequest(deleteCollection,BASE_URL,{headers:{authorization:localStorage.getItem("token")}})
        .then((res)=>{
            alert("deleted successfully");
            window.location.reload();
            console.log(res);
        }
        ).catch((err)=>{
            alert("error occured while deleting");
            console.log(err);
        }
       

        );
    }
    if(props.content){
    return (
        <div className="collection-card">
             
            <div className="data">
                {Object.keys(props.content.data).map((item)=>(
                <div>{props.content.data[item]}</div>))
                }
            </div>
            <div className="actions">
                <img src={require("../../assets/images/note.png")} alt="edit" />
                <img src={require("../../assets/images/delete-icon.png")} alt="delete" onClick={handleDelete}/>
            </div>
            
        </div>
    )
    }
    else{
        return <div>loading ...</div>
    }
}