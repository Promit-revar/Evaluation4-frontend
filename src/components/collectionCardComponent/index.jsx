import React from 'react';
import './collectionCardComponent.css';
import '../../pages/HomePage/HomePage.css';
import makeRequest from '../../utils/makeRequest';
import { deleteCollection, BASE_URL } from '../../constants/backendEndpoints';
import propTypes from 'prop-types';
import ModalComponent from '../Modal';
import { updateCollections } from '../../constants/backendEndpoints';
export default function CollectionCardComponent(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [editData, setEditData] = React.useState({ ...props.content.data });
  const handleEditData = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const onSubmitChange = () => {
    const request = {
      ...updateCollections,
      url: updateCollections.url + props.content.collectionId,
    };
    makeRequest(request, BASE_URL, {
      headers: { authorization: localStorage.getItem('token') },
      data: { data: { ...editData } },
    })
      .then((res) => {
        console.log(res);
        alert('updated successfully');
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        alert('error occured while updating');
        console.log(err);
      });
    setShowModal(false);
  };
  const handleDelete = () => {
    const result = {
      ...deleteCollection,
      url: deleteCollection.url + props.content.collectionId,
    };
    makeRequest(result, BASE_URL, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then((res) => {
        alert('deleted successfully');
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        alert('error occured while deleting');
        console.log(err);
      });
  };
  if (props.content) {
    return (
      <div className="collection-card" data-testId="main-div">
        {showModal && (
          <ModalComponent>
            <div className="header">
              <h1>create a new content type</h1>
            </div>
            <div className="form">
              <div className="form-fields">
                {Object.keys(props.content.data).map((item) => (
                  <>
                    <label style={{ fontSize: '20px' }}>{item}</label>
                    <br />
                    <input
                      type="text"
                      defaultValue={props.content.data[item]}
                      name={item}
                      onChange={handleEditData}
                    />
                    <br />
                  </>
                ))}
              </div>
            </div>
            <div className="form-buttons">
              <button
                onClick={() => setAddType(false)}
                style={{ backgroundColor: '#fff', color: '#000' }}
              >
                Cancel
              </button>
              <button onClick={onSubmitChange}>Submit</button>
            </div>
          </ModalComponent>
        )}
        <div className="data">
          {Object.keys(props.content.data).map((item) => (
            <div>{props.content.data[item]}</div>
          ))}
        </div>
        <div className="actions">
          <img
            src={require('../../assets/images/note.png')}
            alt="edit"
            onClick={() => setShowModal(true)}
          />
          <img
            src={require('../../assets/images/delete-icon.png')}
            alt="delete"
            onClick={handleDelete}
          />
        </div>
      </div>
    );
  } else {
    return <div>loading ...</div>;
  }
}
CollectionCardComponent.propTypes = {
  content: propTypes.object,
};
