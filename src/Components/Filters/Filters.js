import Search from "../Search/Search";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import deleteIcon from "../../assets/icons/delete.svg";
import ModalAddWindow from "../ModalAddWindow/ModalAddWindow";
import clearIcon from "../../assets/icons/clear-all.svg";
import "./filters.scss";


const Filters = (props) => {
    const { listCount,
        checkedList,
        inputs,
        deleteItemsMany,
        clearCheckBoxes,
        postItemFunc,
        itemSchema,
        itemName } = props

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

    const CheckBoxes = (e) => {

        e.preventDefault();

        dispatch(clearCheckBoxes());

    }
    return (
        <div className="filters patient-filters">
            <div className="filters_user-count">
                <span id="users_count">{listCount}</span>
                <span id="users_type">{`${itemName}s`}</span>
            </div>
            <Search />
            <button onClick={deleteMany} id="delete-many-btn" disabled={isManyBtnDisabled}>
                <img src={deleteIcon} alt="" />
            </button>
            <button onClick={CheckBoxes} id="clear-many" disabled={isManyBtnDisabled}>
                <img src={clearIcon} alt="" />
            </button>
            <ModalAddWindow
                postItemFunc={postItemFunc}
                itemSchema={itemSchema}
                inputs={inputs}
                setModalActive={setModalActive}
                modalActive={modalActive}
                itemName={itemName}
            />
            <Button onClick={clickHandler} width="170px" height="43px" borderRadius="14px" children={`Add ${itemName}`} fontSize="20px" />

        </div>
    )
}
export default Filters;
