/* eslint-disable */
import React from 'react';
import './HomePage.css';
import NavComponent from '../../components/navComponent';
import SideBarComponent from '../../components/sideBarComponent';
import makeRequest from '../../utils/makeRequest';
import {
  createAttribute,
  createContentType,
  getAllCollectionByContentId,
  postCollection,
  getAllAttributesByContentId,
  getAllContentTypes,
  deleteAttribute,
  updateContentTypeEndpoint,
  BASE_URL,
} from '../../constants/backendEndpoints';
import CollectionCardComponent from '../../components/collectionCardComponent';
import ModalComponent from '../../components/Modal';
export default function HomePage() {
  const [data, setData] = React.useState({});
  const [presentContentType, setPresentContentType] = React.useState({});
  const [contentTypeBuilder, setContentTypeBuilder] = React.useState(true);
  const [attributes, setAttributes] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [allContentTypes, setAllContentTypes] = React.useState([]);
  const [formData, setFormData] = React.useState({});
  const [addType, setAddType] = React.useState(false);
  const [addAttr, setAttr] = React.useState(false);
  const [newContentType, setNewContentType] = React.useState('');
  const [newAttribute, setNewAttribute] = React.useState({
    name: null,
    type: null,
  });
  const [changeContentType, setChangeContentType] = React.useState(false);
  const [updateContentType,setupdateContentType] = React.useState("");
  const authToken = localStorage.getItem('token');
  React.useEffect(() => {
    makeRequest(getAllContentTypes, BASE_URL, {
      headers: { authorization: authToken },
    })
      .then((res) => {
        console.log("content types",res);
        setAllContentTypes([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const handleChangeContentType = () => {
    setChangeContentType(true);
  };
  const onSubmitAttribute = () => {
    if(!presentContentType.contentId){
        window.alert("Please select a content type");
    }
    //createAttribute.url += presentContentType.contentId;
    const request = {...createAttribute,url:createAttribute.url+presentContentType.contentId}
    makeRequest(request, BASE_URL, {
      headers: { authorization: authToken },
      data: {...newAttribute},
    })
      .then((res) => {
        console.log(res);
        setAttr(false);
        //window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onAddAttribute = (e) => {
    setNewAttribute({ ...newAttribute, [e.target.name]: e.target.value });
  };
  const onSubmitContentType = () => {
    makeRequest(createContentType, BASE_URL, {
      headers: { authorization: authToken },
      data: { name: newContentType },
    })
      .then((res) => {
        console.log(res);
        setAddType(false);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = () => {
    const request = { ...postCollection, url: postCollection.url + data.contentId };
    makeRequest(request, BASE_URL, {
      headers: { authorization: authToken },
      data: formData,
    })
      .then((res) => {
        console.log(res);
        setShowModal(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleContentTypeBuilder = () => {
    setContentTypeBuilder(true);
  };
  const handleAddData = () => {
    setShowModal(true);
    setFormData({ ...data.collections[0].data });
  };
  const handleFormFill = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleItemClick = (id) => {
    
    const attrRequest = { ...getAllAttributesByContentId, url: getAllAttributesByContentId.url + id };
    makeRequest(attrRequest, BASE_URL, {
        headers: { authorization: authToken },
        })
        .then((res) => {
            console.log(res);
            setAttributes([...res]);
        })
        .catch((err) => {
            console.log(err);
        });
    const request = { ...getAllCollectionByContentId, url: getAllCollectionByContentId.url + id };
    makeRequest(request, BASE_URL, {
      headers: { authorization: authToken },
    })
      .then((res) => {
        console.log(res);
        if(res){
        setData({ ...res });
        }
        else{
            //console.log("all content types",allContentTypes)
            const contentData=allContentTypes.filter((item)=>{
                return item.contentId===id;
            });
            //console.log(contentData);
            setData({ ...contentData[0] });

        }
      })
      .catch((err) => {
        console.log(err);
      });
    setContentTypeBuilder(false);
  };
  const handleItemAttributesClick = (e) => {
    console.log(e.target.id, e.target.innerHTML)
    setPresentContentType({ name: e.target.innerHTML, contentId: e.target.id });
    const request ={...getAllAttributesByContentId, url: getAllAttributesByContentId.url + e.target.id};
    makeRequest(request, BASE_URL, {
      headers: { authorization: authToken },
    })
      .then((res) => {
        console.log(res);
        setAttributes([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addAttributeHandler = () => {
    setAttr(true);
  };
  const handleCreateNewContent = () => {
    setAddType(true);
  };
  const handleAddNewContentType = (e) => {
    setNewContentType(e.target.value);
  };
  const handleDeleteAttribute = (attributeId) => {
    const request = { ...deleteAttribute, url: deleteAttribute.url + attributeId };
    makeRequest(request, BASE_URL, {
      headers: { authorization: authToken },
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
    const handleUpdateContentType = (e) => {
        setupdateContentType(e.target.value);
    }
    const onSubmitUpdateContentType = () => {
        const request = { ...updateContentTypeEndpoint, url: updateContentTypeEndpoint.url + data.contentId };
        makeRequest(request, BASE_URL, {
            headers: { authorization: authToken },
            data: { name: updateContentType },
        })
            .then((res) => {
                console.log(res);
                setChangeContentType(false);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

  if (contentTypeBuilder) {
    return (
      <div className="HomePage">
        {addType && (
          <ModalComponent>
            <div className="header">
              <h1>create a new content type</h1>
            </div>
            <div className="form">
              <div className="form-fields">
                <label style={{ fontSize: '20px' }}>
                  Name of the content type
                </label>
                <br />
                <input type="text" onChange={handleAddNewContentType} />
              </div>
            </div>
            <div className="form-buttons">
              <button
                onClick={() => setAddType(false)}
                style={{ backgroundColor: '#fff', color: '#000' }}
              >
                Cancel
              </button>
              <button onClick={onSubmitContentType}>Submit</button>
            </div>
          </ModalComponent>
        )}
        { addAttr && (
          <ModalComponent>
            <div className="header">
              <h1>Add Attribute</h1>
            </div>
            <div className="form">
              <div className="form-fields">
                <label style={{ fontSize: '20px' }}>
                  Name of the Attribute
                </label>
                <br />
                <input type="text" name={'name'} onChange={onAddAttribute} />
                <br />
                <label style={{ fontSize: '20px' }}>Type of Attribute</label>
                <br />
                <input type="text" name={'type'} onChange={onAddAttribute} />
              </div>
            </div>
            <div className="form-buttons">
              <button
                onClick={() => setAttr(false)}
                style={{ backgroundColor: '#fff', color: '#000' }}
              >
                Cancel
              </button>
              <button onClick={onSubmitAttribute}>Submit</button>
            </div>
          </ModalComponent>
        )}
        <div className="left-side">
          <SideBarComponent
            handleListClick={handleItemClick}
            handleTypeBuild={handleContentTypeBuilder}
          />
        </div>
        <div className="right-side-whole">
          <div className="right-side">
            <div className="nav">
              {/* {console.log(data.name)} */}
              <NavComponent content={'CONTENT TYPE'}  handleClick={handleChangeContentType}/>
            </div>
            <div className="middle-section">
              <div className="middle-section-header">
                <div className="middle-section-types-number">
                  {allContentTypes.length} Types
                </div>
                <img
                  src={require('../../assets/images/search-icon.png')}
                  alt=""
                  className="search-icon"
                />
              </div>
              <div
                className="middle-section-button"
                onClick={handleCreateNewContent}
              >
                <span className="new-type-button">+ New Type</span>
              </div>
              <div className="middle-section-content-name-list">
                <ul className="middle-section-content-name-list">
                  {allContentTypes
                    ? allContentTypes.map((item) => (
                        <li
                          className="middle-section-content-name-list-item"
                          onClick={handleItemAttributesClick}
                          id={item.contentId}
                        >
                          {item.name}
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="nav">
            <NavComponent content={''} handleClick={handleChangeContentType} />
          </div>
          <div className="right">
            <div className="right-section-top">
              <div className="right-section-top-left">
                <h1>{presentContentType.name}</h1>
              </div>
              <div className="right-section-top-right">
                {attributes.length
                  ? attributes.length.toString() + ' Fields'
                  : ''}
              </div>
            </div>
            <div className="right-section-middle">
              <span
                className="add-another-field-button"
                onClick={addAttributeHandler}
              >
                Add another field
              </span>
            </div>
            <div className="right-section-bottom">
              {attributes.map((item) => (
                <div className="card-container">
                  <div className="tag">Ab</div>
                  <div className="data-section">
                    <div className="content-name">{item.name}</div>
                    <div className="content-type">{item.type}</div>
                  </div>
                  <div className="card-center"></div>
                  <div className="action-section">
                    <img
                      src={require('../../assets/images/delete-icon.png')}
                      style={{ height: '15px' }}
                      alt="delete-icon"
                      className="delete-icon"
                      onClick={()=>handleDeleteAttribute(item.attributeId)}
                    />
                    <img
                      src={require('../../assets/images/note.png')}
                      style={{ height: '15px' }}
                      alt="note-icon"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
      return (
        <div className="HomePage">
            {changeContentType && (
          <ModalComponent>
            <div className="form">
              <div className="form-fields">
                <label style={{ fontSize: '20px' }}>
                  Name of the content type
                </label>
                <br />
                <input type="text" onChange={handleUpdateContentType} />
              </div>
            </div>
            <div className="form-buttons">
              <button
                onClick={() => setChangeContentType(false)}
                style={{ backgroundColor: '#fff', color: '#000' }}
              >
                Cancel
              </button>
              <button onClick={onSubmitUpdateContentType}>Submit</button>
            </div>
          </ModalComponent>
        )}
            {showModal && <ModalComponent>
          <div className="header">
            <h1>{data.name}</h1>
          </div>
          <div className="form">
            <div className="form-fields">
              {attributes.map((item) => (
                <div key={item}>
                  <label key={item.contentId} style={{ fontSize: '20px' }}>{item.name}</label>
                  <br />
                  <input key={item.name} type="text" onChange={handleFormFill} name={item.name} />
                </div>
              ))}
            </div>
            <div className="form-buttons">
              <button
                onClick={() => setShowModal(false)}
                style={{ backgroundColor: '#fff', color: '#000' }}
              >
                Cancel
              </button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </ModalComponent>}
          <div className="left-side">
            <SideBarComponent
              handleListClick={handleItemClick}
              handleTypeBuild={handleContentTypeBuilder}
            />
          </div>
          <div className="right-side">
            <div className="nav">
              {/* {console.log(data.name)} */}
              <NavComponent content={data.name} handleClick={handleChangeContentType} />
            </div>
            <div className="card">
              <div className={'counter'}>
                <div className="entries">
                  {data.collections ? data.collections.length : '0'} Entries
                  Found
                </div>
                <div className="add-data">
                 
                    <div onClick={handleAddData}>Add a new entry</div>
                 
                </div>
              </div>
              <div className="attributes">
                <div className="data-attr">
                  {data.collections
                    ? Object.keys(data.collections[0].data).map((item) => (
                        <div style={{ width: '100%' }} key={item}>
                          {item}
                        </div>
                      ))
                    : null}
                </div>
                <div className="actions-tag">
                  {data.collections ? (
                    <p style={{ marginBottom: '0px' }}>Actions</p>
                  ) : null}
                </div>
              </div>

              {data.collections
                ? data.collections.map((item) => (
                    <CollectionCardComponent content={item} />
                  ))
                : null}
            </div>
          </div>
        </div>
      );
    } 
       
      
}

