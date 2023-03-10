/* eslint-disable */
import React from "react";
import "./sideBarComponent.css";
import makeRequest from "../../utils/makeRequest";
import { getContentTypes, BASE_URL } from "../../constants/backendEndpoints";
export default function SideBarComponent(props) {    
    const[contentTypes, setContentTypes]=React.useState([]);
    const authToken = localStorage.getItem("token");
    React.useEffect(()=>{
        makeRequest(getContentTypes,BASE_URL,{headers:{authorization:authToken}}).then((res)=>{
            console.log(res);
            setContentTypes([...res]);
        }
        ).catch((err)=>{
            console.log(err);
        });
    }, []);
    const handleClick=(e)=>{
        props.handleListClick(e.target.id);
    }
    const handleMouseEnter=(e)=>{
        console.log(e.target.className = "active");
    }
    return(
        <div className={"side-bar"}>
            <div className="side-bar-nav">
                CMS+
            </div>
            <div className="side-bar-body">
                <div className="side-bar-search">
                    <input type="text" placeholder="Search" />
                    <img src={require("../../assets/images/search-icon.png")} alt="search" />
                </div>
                <div className="list">
                    <ul>
                        {contentTypes.map((item)=>
                            (
                                <div key={item.contentId} onMouseEnter={handleMouseEnter} onMouseLeave={(e)=>e.target.className=null}>
                                    <li onClick={handleClick} id={item.contentId}>
                                        {item.name}
                                    </li>
                                </div>
                            ))      
                        }
                    </ul>
                </div>
                <div className="side-bar-footer" onMouseEnter={handleMouseEnter} onMouseLeave={(e)=>e.target.className="side-bar-footer"}>
                    <p>CONTENT TYPE BUILDER</p>
                </div>
            </div>
        </div>
    )
}


