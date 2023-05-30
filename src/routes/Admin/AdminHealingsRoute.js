import AdminHeader from '../../components/AdminHeader/AdminHeader';
import Filters from '../../components/Filters/Filters';
import HealingsList from '../../components/HealingsList/HealingsList';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { deleteHealingsMany, postHealing, clearCheckedList, setSearchIdle, fetchHealings, searchHealing } from "../../components/HealingsList/HealingsListSlice";
import { healingSchema } from "../../schemas/healingSchema";
import { useNavigate } from 'react-router-dom';


const AdminHealingsRoute = () => {
    const { healingsCount, checkedList } = useSelector((state) => state.healings);
    const navigate = useNavigate();
    const inputs = ["patient", "doctor", "diagnos", "diagnosDescription", "date", "healingInstructions", "status", "preparations", "ward"];
    const searchTypeList = useSelector(state=> state.healings.selectSearchList);
    const itemsPerPage = useSelector(state=> state.healings.healingsPerPage);
    useEffect(() => {
        navigate('/admin/healings');
    }, [navigate]);
    return (
        <div className="admin-panel">
            <AdminHeader role={"healing"}/>
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

export default AdminHealingsRoute

