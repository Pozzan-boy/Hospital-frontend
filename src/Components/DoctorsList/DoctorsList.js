import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  "./DoctorsList.scss";
import DoctorsItem from "../DoctorsItem/DoctorsItem";
import { useNavigate } from "react-router-dom";
import  {Pagination} from '../Pagination/Pagination';
import { fetchDoctors, setCurrentPage, getDoctorsCount} from './DoctorsListSlice';
import ClipLoader from "react-spinners/ClipLoader";



const DoctorsList = ()=> {


    const {doctors, doctorsLoadingStatus, currentPage, doctorsCount} = useSelector(state => state.doctors);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.account.token);
    const searchedDoctors = useSelector((state) => state.doctors.searchedDoctors);
    const doctorsPerPage = 5;
    let pageCount = Math.ceil(doctorsCount/ doctorsPerPage);
    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        dispatch(fetchDoctors([token, doctorsPerPage, itemOffset]));

        
    }, [currentPage, doctorsCount]);

    useEffect(() => {
        

        
    }, [doctors.doctors]);

     useEffect(() => {
        dispatch(getDoctorsCount(token));

        
    }, []);
    // useLayoutEffect(()=>{
    //     dispatch(fetchDoctors([token, doctorsPerPage, itemOffset]));
    // },[doctorsCount])

    const handlePageClick = (event) => {
        dispatch(setCurrentPage(event.selected+1));
        const newOffset = (event.selected * doctorsPerPage) % doctorsCount;
        setItemOffset(newOffset);
        dispatch(fetchDoctors([token, doctorsPerPage, newOffset]));
        renderDoctorsList(Object.values(doctors));
        
      };


    if (doctorsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Loading</h5>
        
    } else if (doctorsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }
    const renderDoctorsList = (arr) => {
        if (arr.length === 0) {
            return (
                    <h5 className="text-center mt-5">No Doctors found</h5>
            )
        }

        return arr.filter(doctor => doctor.name
            .toLowerCase().includes(searchedDoctors.toLowerCase()))   
            .map(({id, ...props}) => 
                (
                        
                        <DoctorsItem 
                            id={id}
                            
                            {...props} />
                )
                
                
            )
        

                
    }
    const elements = renderDoctorsList(Object.values(doctors));


    
    return (
        
            <>
                
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
                </div>
                
        
            </>
        
    )
    
}
export default DoctorsList;