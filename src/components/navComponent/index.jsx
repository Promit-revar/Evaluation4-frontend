/* eslint-disable */
import React from "react";
import "./navComponent.css";

export default function NavComponent(props) {
    return (
        <nav>
            <div className="nav-container">
                <div className="nav-logo">
                    <h1>
                        {props.content}
                    </h1>
                </div>
            </div>
        </nav>
    );
}