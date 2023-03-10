import React from 'react';
import './navComponent.css';
import propTypes from 'prop-types';
export default function NavComponent(props) {
  const editName = () => {
    props.handleClick();
  };
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo">
          <h1>
            {props.content}
            {props.content ? (
              <img
                src={require('../../assets/images/pencil.png')}
                alt="edit-icon"
                onClick={editName}
              />
            ) : null}
          </h1>
        </div>
      </div>
    </nav>
  );
}
NavComponent.propTypes = {
  content: propTypes.string,
  handleClick: propTypes.func,
};
