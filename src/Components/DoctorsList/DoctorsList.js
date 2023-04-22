import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  "./DoctorsList.scss";
import DoctorsItem from "../DoctorsItem/DoctorsItem";
import { useNavigate } from "react-router-dom";
import  {Pagination} from '../Pagination/Pagination';
import { fetchDoctors, setCurrentPage, getDoctorsCount,setStatusIdle} from './DoctorsListSlice';
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import closeIcon from "../../assets/icons/close.svg";
import successIcon from "../../assets/icons/success.svg";
import errorIcon from "../../assets/icons/error.svg"
const DoctorsList = ()=> {
    const [modalMessageActive, setModalMessageActive] = useState(false);
    const clickModalMessageHandler = () => {
        setModalMessageActive(false);
        dispatch(setStatusIdle());
    }
    const status = useSelector(state=>state.doctors.status)
    const {doctors, doctorsLoadingStatus, currentPage, doctorsCount} = useSelector(state => state.doctors);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.account.token);
    const searchedDoctors = useSelector((state) => state.doctors.searchedDoctors);
    const doctorsPerPage = 1;
    let pageCount = Math.ceil(doctorsCount/ doctorsPerPage);
    const [itemOffset, setItemOffset] = useState(0);
    let currentEnd = currentPage * doctorsPerPage;

    useEffect(() => {
        dispatch(fetchDoctors([token, doctorsPerPage, itemOffset]));
        dispatch(getDoctorsCount(token));

        
    }, [currentPage, doctorsCount, itemOffset]);


  


    const handlePageClick = (event) => {
        dispatch(setCurrentPage(event.selected+1));
        const newOffset = (event.selected * doctorsPerPage) % doctorsCount;
        setItemOffset(newOffset);
        dispatch(fetchDoctors([token, doctorsPerPage, newOffset]));
        // renderDoctorsList(doctors);
        
      };


    if (doctorsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Loading</h5>
        
    } else if (doctorsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }
    const renderDoctorsList = (arr) => {
        if (arr.length === 0 && doctorsCount === 0) {
            return (
                    <h5 className="text-center mt-5">No Doctors found</h5>
            )
        }
        

        return arr.map(({id, ...props}) => 
                (
                        
                        <DoctorsItem 
                            id={id}
                            setModalMessageActive={setModalMessageActive}
                            {...props} />
                            
                )
                
                
            )
        

                
    }
    const elements = renderDoctorsList(doctors);
    // console.log(Object.values(doctors)
    console.log('render');
    let statusIcon = 0;
    let statusMessage='';
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
    // console.log(status);
    return (
        
           
                
                <div className="doctorsList__wrapper">
                    <div className="doctorsList__headers">
                        <div className="doctorsList__headers__info">Basic info</div>
                        <div className="doctorsList__headers__phone">Phone</div>
                        <div className="doctorsList__headers__speciality">Specialty</div>
                        <div className="doctorsList__headers__entry-date">Date of entry</div>
                        <div className="doctorsList__headers__salary">Salary</div>
                    </div>
                    {elements}
                    <Pagination  pageCount={pageCount} currentPage={currentPage} onChangePage={handlePageClick}/>
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
                
        
            
        
    )
    
}
export default DoctorsList;