/* eslint-disable */
import React, { useState } from 'react';
import './modal.css';

export default function ModalComponent(props) {
    const handleClose = () => {
        window.location.reload();
    }
  return (
    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close" onClick={handleClose}>&times;</span>
            {props.children}
        </div>

    </div>
  );
}