import React from 'react'
import Modal from '../Modal/Modal';
import { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import closeIcon from "../../assets/icons/close.svg";
import successIcon from "../../assets/icons/success.svg";
import errorIcon from "../../assets/icons/error.svg";
import Button from "../Button/Button";

const ModalMessage = (modalMessageActive, setModalMessageActive, clickModalMessageHandler) => {
    let statusIcon = 0;
    let statusMessage='';
    const status = useSelector(state => state.doctors.status);
    switch(status){
        case 'deleted':
            statusMessage = 'Doctor successfully deleted';
            statusIcon = successIcon;
            break
            
        case 'updated':
            statusMessage = 'Doctor successfully updated';
            statusIcon = successIcon;
            break;
        case 'added':
            statusMessage = 'Doctor successfully added';
            statusIcon = successIcon;
            break;
        case 'registered':
            statusMessage = 'Doctor successfully registered';
            statusIcon = successIcon;
        break;
        case 'error':
            statusMessage = 'ERROR';
            statusIcon = errorIcon;
            break;
        default:
            break;
    }
  return (
   
            <Modal active={modalMessageActive} setActive={setModalMessageActive} modalClass={"modal__status"}>
                    <img className="modal__status__img" src={statusIcon} alt="x" />
                    
                    <div className="modal__status__text">
                        <h2>{statusMessage}</h2>
                    </div>
                    <Button
                            onClick={clickModalMessageHandler}
                            width="80px"
                            height="40px"
                            marginTop="10px"
                            borderRadius="14px"
                            bgColor="#25AE88"
                            children="OK"
                            fontSize="20px" />
                        <button onClick={(e) => { e.preventDefault(); setModalMessageActive(false) }}>
                            <img className="modal_close" src={closeIcon} alt="x" />
                        </button>
            </Modal>
  )
}

export default ModalMessage
