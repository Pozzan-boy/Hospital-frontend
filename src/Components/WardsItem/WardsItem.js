
import "./wardsItem.scss";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateWard, deleteWardItem, removeCheckedListItem } from "../WardsList/WardsListSlice";
import { wardSchema } from "../../schemas/wardSchema";
import { Form, Formik } from "formik";
import { addCheckedListItem } from '../WardsList/WardsListSlice';
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import more from "../../assets/icons/more.svg";
import Modal from "../Modal/Modal";
import closeIcon from "../../assets/icons/close.svg";
import "../ListItem/listItem.scss";
import CustomInput from "../ModalAddWindow/CustomInput";
import CustomSelect from "../ModalAddWindow/CustomSelect";

const WardsItem = (props) => {

    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false);
    const [checkStatus, setCheckStatus] = useState(false);
    const formRef = useRef();
    const status = useSelector(state => state.wards.status);
    const token = useSelector(state => state.account.token);
    const checkedList = useSelector(state => state.wards.checkedList)
    const isChecked = checkedList.includes(props._id);

    useEffect(() => {
        if (checkedList.length === 0) {
            setCheckStatus(false);

        }

    }, [checkedList.length])

    useEffect(() => {
        setCheckStatus(isChecked);
    }, [props._id])
    const onSubmit = (values, actions) => {
        const id = props._id; 
        const updatedItem = { ...values, token };
        console.log();
        dispatch(updateWard([updatedItem, token, id]));
    };

    const checkStatusHandler = () => {
        if (checkStatus) {
            setCheckStatus(false);
            dispatch(removeCheckedListItem(props._id));
        } else {
            setCheckStatus(true);
            dispatch(addCheckedListItem(props._id));
        }
    };

    const clickHandler = () => {
        setModalActive(true);
    }

    const clickModalMessageHandler = () => {
        props.setModalMessageActive(true);
    }

    useEffect(() => {
        if (status !== "idle") {
            clickModalMessageHandler();
        }

    }, [status]);
    const handleDelete = useCallback((e) => {
        e.preventDefault();
        dispatch(deleteWardItem([props._id, token]));
    }, [dispatch, props._id, token]);

    return (
        <li
            className="list-item ward">

            <Checkbox checked={checkStatus} variant="square" id={props._id} onCheck={checkStatusHandler} />
            <div className="ward__number">{props.number}</div>
            <div className="ward__floor">{props.floor}</div>
            <div className="ward__department">{props.department}</div>
            <div className="ward__purpose">{props.purpose}</div>
            <div className="ward__placeCount">{props.placeCount}</div>
            <div className="ward__chief">{props.chief?.name}</div>
            <div className="ward__change">
                <img src={more} alt="" />
                <div className="dropdown-content">
                    <div className="ward__change__item" onClick={clickHandler}>
                        <img src={editIcon} alt="edit" />
                        <span>Edit ward</span>
                    </div>
                    <div className="ward__change__item" onClick={(e) => { handleDelete(e) }}>
                        <img src={deleteIcon} alt="delete" />
                        <span>Delete ward</span>
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
            <Formik
                innerRef={formRef}
                initialValues={{ number: props.number, floor:props.floor, department: props.department, purpose: props.purpose, placeCount: props.placeCount, chief: props.chief._id}}
                validationSchema={wardSchema}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="modal-add">
                        <h2 className="modal-add__header">Type information about ward</h2>
                        <CustomInput
                            label="Number"
                            name="number"
                            type="number"
                            placeholder="Enter ward number"
                        />
                        <CustomInput
                            label="Floor"
                            name="floor"
                            type="number"
                            placeholder="Enter ward floor"
                        />
                        <CustomInput
                            label="Department"
                            name="department"
                            type="text"
                            placeholder="Enter ward department"
                        />
                        <CustomInput
                            label="Purpose"
                            name="purpose"
                            type="text"
                            placeholder="Enter ward purpose"
                        />
                        <CustomInput
                            label="Place count"
                            name="placeCount"
                            type="number"
                            placeholder="Enter ward places"
                        />
                         <CustomSelect
                            label="Chief"
                            name="chief"
                            placeholder="Please select a chief"
                        >
                            <option value={props.chief._id}>{props.chief.name}</option>
                            {props.doctors}
                        </CustomSelect>
                        <Button
                            onClick={clickHandler}
                            width="227px"
                            height="50px"
                            marginTop="60px"
                            borderRadius="14px"
                            bgColor="#25B39E"
                            children="Submit"
                            disabled={isSubmitting}
                            fontSize="20px" />
                        <button onClick={(e) => { e.preventDefault(); setModalActive(false) }}>
                            <img className="modal_close" src={closeIcon} alt="x" />
                        </button>
                    </Form>
                )}
            </Formik>

        </Modal>
        </li>
    )
}
export default WardsItem;