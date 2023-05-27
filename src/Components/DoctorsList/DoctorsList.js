import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./DoctorsList.scss";
import DoctorsItem from "../DoctorsItem/DoctorsItem";
import { Pagination } from '../Pagination/Pagination';
import { fetchDoctors, setCurrentPage, getDoctorsCount, setStatusIdle, clearCheckedList } from './DoctorsListSlice';
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import successIcon from "../../assets/icons/success.svg";
import errorIcon from "../../assets/icons/alert-error.svg"
import List from "../List/List";



const DoctorsList = () => {
    const [modalMessageActive, setModalMessageActive] = useState(false);
    const clickModalMessageHandler = () => {
        setModalMessageActive(false);
        dispatch(setStatusIdle());
        if (checkedList !== 0) {
            dispatch(clearCheckedList())
        }

    }

    const status = useSelector(state => state.doctors.status)
    const searchStatus = useSelector(state => state.doctors.searchStatus)
    const searchedDoctors = useSelector(state => state.doctors.searchedDoctors)

    const { doctors, error, doctorsLoadingStatus, currentPage, doctorsCount, checkedList } = useSelector(state => state.doctors);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.account.token);
    const doctorsPerPage = 5;
    // let pageCount = Math.ceil(doctorsCount/doctorsPerPage);

    let pageCount = Math.ceil(searchStatus === "searched" ? searchedDoctors.length/doctorsPerPage : doctorsCount/doctorsPerPage);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        dispatch(fetchDoctors([token, doctorsPerPage, itemOffset]));

        dispatch(getDoctorsCount(token));

    }, []);
    useEffect(() => {
        dispatch(fetchDoctors([token, doctorsPerPage, itemOffset]));

        dispatch(getDoctorsCount(token));
    }, [token])
    const handlePageClick = (event) => {
        dispatch(setCurrentPage(event.selected + 1));
        const newOffset = (event.selected * doctorsPerPage) % doctorsCount;
        setItemOffset(newOffset);
        dispatch(fetchDoctors([token, doctorsPerPage, newOffset]));

    };


    if (doctorsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Loading</h5>

    } else if (doctorsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }
    // const renderDoctorsList = (arr) => {
    //     if (arr.length === 0 && doctorsCount === 0) {
    //         return (
    //             <h5 className="text-center mt-5">No Doctors found</h5>
    //         )
    //     }


    //     return arr.map(({ ...props }, index) =>
    //     (

    //         <DoctorsItem
    //             key={props._id}
    //             setModalMessageActive={setModalMessageActive}
    //             {...props} />

    //     )


    //     )



    // }
    const renderDoctorsList = (arr) => {
        const doctorsToRender = searchStatus === "searched" ? searchedDoctors : doctors;
        const startIndex = itemOffset;
        const endIndex = itemOffset + doctorsPerPage;
        const slicedDoctors = doctorsToRender.slice(startIndex, endIndex);
        if (arr.length === 0 && doctorsCount === 0) {
            return (
                <h5 className="text-center mt-5">No Doctors found</h5>
            );
        }
        if (searchStatus !== 'searched') {
            return arr.map(({ ...props }, index) =>
            (

                <DoctorsItem
                    key={props._id}
                    setModalMessageActive={setModalMessageActive}
                    {...props} />

            )
                

            )
        }else{
            return slicedDoctors.map(({ ...props }, index) => (
                <DoctorsItem
                    key={props._id}
                    setModalMessageActive={setModalMessageActive}
                    {...props}
                />
            ));
        }

        

        
    };

    const elements = renderDoctorsList(doctors);
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
                    <div id="doctor-header-basic-info" className="list__headers__item">Basic info</div>
                    <div id="doctor-header-phone" className="list__headers__item">Phone</div>
                    <div id="doctor-header-speciality" className="list__headers__item">Specialty</div>
                    <div id="doctor-header-entry-date" className="list__headers__item">Date of entry</div>
                    <div id="doctor-header-salary" className="list__headers__item">Salary</div>
                </div>


                {elements}
                <Pagination pageCount={pageCount} currentPage={currentPage} onChangePage={handlePageClick} itemsPerPage={doctorsPerPage} currentList={doctors} />
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
export default DoctorsList;