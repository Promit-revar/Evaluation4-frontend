/* eslint-disable */
import React, { useState } from 'react';
import './modal.css';

export default function ModalComponent(props) {
  return (
    <div class="modal">
        <div class="modal-content">
            {props.children}
        </div>
    </div>
  );
}