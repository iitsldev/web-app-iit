import React from 'react';
import { Modal, Alert } from 'react-bootstrap';
import styles from './AlertBox.module.css';
import useTranslation from 'next-translate/useTranslation';

function AlertBox({ show, handleClose, setShow, varient, alertTitle, alertDesc }) {  
    const { t } = useTranslation('alert-box');

    return(
        <Modal show={show} onHide={handleClose}>
            <Alert className={styles.customAlert} variant={ varient } onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{ t(alertTitle) }</Alert.Heading>
                <p>{ alertDesc }</p>
            </Alert>
        </Modal>
    );
}
    
export default AlertBox;