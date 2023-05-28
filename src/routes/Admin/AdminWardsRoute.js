import AdminHeader from '../../components/AdminHeader/AdminHeader'
import Filters from '../../components/Filters/Filters'
import WardsList from '../../components/WardsList/WardsList'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { deleteWardsMany, postWard,clearCheckedList, searchWard,setSearchIdle } from "../../components/WardsList/WardsListSlice";
import { wardSchema } from "../../schemas/wardSchema";
import { fetchWards } from '../../components/WardsList/WardsListSlice';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import { useNavigate } from 'react-router-dom';

const AdminWardsRoute = () => {
    const { wardsCount, checkedList } = useSelector((state) => state.wards);
    const navigate = useNavigate();
    const inputs = ["number", "floor", "department", "purpose", "placeCount", "chief"];
    const searchTypeList = useSelector(state=> state.wards.selectSearchList);
    const itemsPerPage = useSelector(state=> state.wards.wardsPerPage);
    useEffect(() => {
        navigate('/admin/wards');
    }, [navigate]);
    return (
        <div className="admin-panel">
            <AdminHeader role={"ward"}/>
            <Filters
                listCount={wardsCount}
                checkedList={checkedList}
                inputs={inputs}
                deleteItemsMany={deleteWardsMany}
                postItemFunc={postWard}
                itemSchema={wardSchema}
                tableName={'ward'}
                itemName={'ward'}
                clearCheckBoxes={clearCheckedList}
                searchTypeList={searchTypeList}
                fetchItems={fetchWards}
                itemsPerPage={itemsPerPage}
                searchItems={searchWard}
                setSearchIdle={setSearchIdle}
            />
            <WardsList />
        </div>
    )
}

export default AdminWardsRoute

