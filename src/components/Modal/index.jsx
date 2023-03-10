import React, { useState } from 'react';
import './modal.css';
import propTypes from 'prop-types';
export default function ModalComponent(props) {
  return (
    <div class="modal">
      <div class="modal-content">{props.children}</div>
    </div>
  );
}
ModalComponent.propTypes = {
  children: propTypes.node,
};
