import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  "./DoctorsList.scss";
import DoctorsItem from "../DoctorsItem/DoctorsItem";
import { useNavigate } from "react-router-dom";
import  Pagination from '../Pagination/Pagination';
import { fetchDoctors, setCurrentPage, setDoctors} from './DoctorsListSlice';
import ClipLoader from "react-spinners/ClipLoader";



const DoctorsList = ()=> {


    const {doctors, doctorsLoadingStatus, currentPage} = useSelector(state => state.doctors);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.account.token);
    const doctorsPerPage = 8;
    const pageCount = Object.values(doctors).length / doctorsPerPage;
    const currentEnd = currentPage * doctorsPerPage;
    const currentStart = (currentPage - 1) * doctorsPerPage ; 

    
    

    useEffect(() => {
        console.log('asdasda');
        dispatch(fetchDoctors(token));

        
    }, [currentPage]);
    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    };
    


    if (doctorsLoadingStatus === "loading") {
        
    } else if (doctorsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }
    const renderDoctorsList = (arr) => {
        if (arr.length === 0) {
            return (
                    <h5 className="text-center mt-5">No Doctors found</h5>
            )
        }

        return arr.slice(currentStart, currentEnd)    
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
                </div>
                
        
            </>
        
    )
    
}
export default DoctorsList;