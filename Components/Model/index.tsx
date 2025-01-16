import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import "./style.css"
import emoji from "data-base64:~assets/thinking.jpg"
import { delDomain  } from '~utitls/helping';
const index = ({setShowModal, setDomainList, domainToDelete}) => {
  return (
    <div id="modal">
       <div className="top-bar">
       <button className='btn' onClick={() => setShowModal(false)}><IoCloseSharp /></button>
       </div>
       <div className="modal-content">
        <h3 className="modal-heading">
            Are you sure you want to delete this ?
        </h3>
        <button className="modal-btn btn" onClick={() => {delDomain(domainToDelete.trim(), setDomainList); setShowModal(false)}}>Delete</button>
       </div>
    </div>
  )
}

export default index
