import Search from "../Search/Search";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import deleteIcon from "../../assets/icons/delete.svg";
import ModalAddDoctor from "../ModalAddWindow/ModalAddDoctor";
import ModalAddWard from "../ModalAddWindow/ModalAddWard";
import clearIcon from "../../assets/icons/clear-all.svg";
import "./filters.scss";
import ModalAddPatient from "../ModalAddWindow/ModalAddPatient";
import ModalAddHealing from "../ModalAddWindow/ModalAddHealing";



const Filters = (props) => {

    const { listCount,
        currentDoctor,
        checkedList,
        deleteItemsMany,
        clearCheckBoxes,
        tableName } = props
       
    const token = useSelector((state) => state.account.token);
    const [modalActive, setModalActive] = useState(false);
    const isManyBtnDisabled = useMemo(() => checkedList.length === 0, [checkedList]);
    
    const dispatch = useDispatch();

    const clickHandler = () => {
        setModalActive(true);
    };

    const deleteMany = (e) => {

        e.preventDefault();
        console.log(checkedList);
        const data = {
            checkedList,
            token
        }
        console.log(data)
        dispatch(deleteItemsMany(data));

    }

    const ReturnModalWindow = (props)=>{
        switch(props.tableName){
            case "doctor":
                return(
                    <ModalAddDoctor
                        setModalActive={setModalActive}
                        modalActive={modalActive}
                    />
                )
            case "patient":
                return(
                    <ModalAddPatient
                        setModalActive={setModalActive}
                        modalActive={modalActive}
                    />
                )
            case "ward":
                return(
                    <ModalAddWard
                        setModalActive={setModalActive}
                        modalActive={modalActive}
                    />
                )
            case "healing":
                console.log(currentDoctor);
                return(
                    <ModalAddHealing
                        setModalActive={setModalActive}
                        modalActive={modalActive}
                        currentDoctor={currentDoctor}
                    />
                )
            default:
                return(<h2>No modal windows were found</h2>)
        }
         
    }
    const CheckBoxes = (e) => {

        e.preventDefault();

        dispatch(clearCheckBoxes());

    }
    return (
        <div className="filters patient-filters">
            <div className="filters_user-count">
                <span id="users_count">{listCount}</span>
                <span id="users_type">{`${tableName}s`}</span>
            </div>
            <Search 
                searchItems ={props.searchItems} 
                itemsPerPage={props.itemsPerPage} 
                searchTypeList={props.searchTypeList} 
                fetchItems={props.fetchItems} 
                setSearchIdle={props.setSearchIdle}/>
            <button onClick={deleteMany} id="delete-many-btn" disabled={isManyBtnDisabled}>
                <img src={deleteIcon} alt="" />
                
            </button>
            <button onClick={CheckBoxes} id="clear-many" disabled={isManyBtnDisabled}>
                <img src={clearIcon} alt="" />
            </button>
            <ReturnModalWindow tableName={tableName}/>
            <Button onClick={clickHandler} width="170px" height="43px" borderRadius="14px" children={`Add ${tableName}`} fontSize="20px" />

        </div>
    )
}
export default Filters;
