import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./patientsList.scss";
import Patient from "../Patient/Patient";
import { Pagination } from '../Pagination/Pagination';
import { fetchPatients, setCurrentPage, getPatientsCount, setStatusIdle, clearCheckedList } from './PatientsListSlice';
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import successIcon from "../../assets/icons/success.svg";
import errorIcon from "../../assets/icons/alert-error.svg"
import List from "../List/List";



const PatientsList = () => {
    const [modalMessageActive, setModalMessageActive] = useState(false);
    const clickModalMessageHandler = () => {
        setModalMessageActive(false);
        dispatch(setStatusIdle());
        if (checkedList !== 0) {
            dispatch(clearCheckedList())
        }

    }

    const { status, patients, error, patientsLoadingStatus, currentPage, patientsCount, checkedList } = useSelector(state => state.patients);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.account.token);
    const patientsPerPage = 5;
    let pageCount = Math.ceil(patientsCount / patientsPerPage);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        dispatch(fetchPatients([token, patientsPerPage, itemOffset]));
        dispatch(getPatientsCount(token));

    }, []);
    useEffect(() => {
        dispatch(fetchPatients([token, patientsPerPage, itemOffset]));
        dispatch(getPatientsCount(token));

    }, [token]);

    const handlePageClick = (event) => {
        dispatch(setCurrentPage(event.selected + 1));
        const newOffset = (event.selected * patientsPerPage) % patientsCount;
        setItemOffset(newOffset);
        dispatch(fetchPatients([token, patientsPerPage, newOffset]));

    };
    // console.log(patients);


    if (patientsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Loading</h5>

    } else if (patientsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }
    const renderPatientsList = (arr) => {
        if (arr.length === 0 && patientsCount === 0) {
            return (
                <h5 className="text-center mt-5">No Patients found</h5>
            )
        }


        return arr.map(({ ...props }, index) =>
        (

            <Patient
                key={index}
                setModalMessageActive={setModalMessageActive}
                {...props} />

        )
        )

    }
    const elements = renderPatientsList(patients);
    let statusIcon = 0;
    let statusMessage = '';

    switch (status) {
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
        case 'failed':
            statusMessage = `${error}`;
            statusIcon = errorIcon;
            break;
        case 'deletedMany':
            statusMessage = `${checkedList.length} items deleted successfully`;
            statusIcon = successIcon;
            break;
        default:
            break;
    }

    return (


        <List>
            <div className="list">
                <div className="list__headers">
                    <div id="patient-header-basic-info" className="list__headers__item">Basic info</div>
                    <div id="patient-header-phone" className="list__headers__item">Phone</div>
                    <div id="patient-header-sex" className="list__headers__item">Sex</div>
                    <div id="patient-header-birthDate" className="list__headers__item">Birth Date</div>
                    <div id="patient-header-height" className="list__headers__item">Height</div>
                    <div id="patient-header-weight" className="list__headers__item">Weight</div>
                </div>


                {elements}
                <Pagination pageCount={pageCount} currentPage={currentPage} onChangePage={handlePageClick} itemsPerPage={patientsPerPage} currentList={patients} />
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

                </Modal>
            </div>
        </List>
    )
}
export default PatientsList;