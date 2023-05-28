import DoctorHeader from '../../components/DoctorHeader/DoctorHeader';
import Filters from '../../components/Filters/Filters'
import HealingsList from '../../components/HealingsList/HealingsList'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { deleteHealingsMany, postHealing,clearCheckedList, setSearchIdle, fetchHealings, searchHealing } from "../../components/HealingsList/HealingsListSlice";
import { healingSchema } from "../../schemas/healingSchema";
import { useNavigate } from 'react-router-dom';

const DoctorHealingsRoute = () => {
    const { healingsCount, checkedList } = useSelector((state) => state.healings);
    const doctor = useSelector((state) => state.doctors.doctor);
    const navigate = useNavigate();
    const inputs = ["patient", "doctor", "diagnos", "diagnosDescription", "date", "healingInstructions", "status", "preparations", "ward"];
    const searchTypeList = useSelector(state=> state.healings.selectSearchList);
    const itemsPerPage = useSelector(state=> state.healings.healingsPerPage);
    useEffect(() => {
        navigate('/doctor/healings');
    }, [navigate]);

    useEffect(() => {

    }, [doctor])

    return (
        <div className="admin-panel">
            <DoctorHeader role={"healing"}/>
            <Filters
                listCount={healingsCount}
                checkedList={checkedList}
                inputs={inputs}
                deleteItemsMany={deleteHealingsMany}
                postItemFunc={postHealing}
                itemSchema={healingSchema}
                tableName={'healing'}
                itemName={'healing'}
                clearCheckBoxes={clearCheckedList}
                currentDoctor={doctor}
                setSearchIdle={setSearchIdle}
                searchTypeList={searchTypeList}
                fetchItems={fetchHealings}
                searchItems={searchHealing}
                itemsPerPage={itemsPerPage}
            />
            <HealingsList />
        </div>
    )
}

export default DoctorHealingsRoute
