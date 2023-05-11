import "./wardsItem.scss";
import { useEffect, useState, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateWard, deleteWardItem, removeCheckedListItem } from "../WardsList/WardsListSlice";
import { wardSchema } from "../../schemas/wardSchema";
import { useFormik } from "formik";
import { addCheckedListItem } from '../WardsList/WardsListSlice';
import "../ListItem/listItem.scss"
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import keyIcon from "../../assets/icons/key.svg";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import more from "../../assets/icons/more.svg";
import Modal from "../Modal/Modal";
import closeIcon from "../../assets/icons/close.svg";

const WardsItem = (props) => {
    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false);
    const [modalRegisterActive, setModalRegisterActive] = useState(false);
    const [checkStatus, setCheckStatus] = useState(false);

    const status = useSelector(state => state.wards.status);
    const checkedList = useSelector(state => state.wards.checkedList)
    const token = useSelector(state => state.account.token);
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
        const updatedItem = {
            number: values.number,
            floor: values.floor,
            department: values.department,
            purpose: values.purpose,
            placeCount: values.placeCount,
            chief: values.chief,
            token,
        };

        dispatch(updateWard([updatedItem, token, id]));
        console.log('fomr');

    };
    const {
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
    } = useFormik({
        initialValues: {
            number: props.number,
            floor: props.floor,
            department: props.department,
            purpose: props.purpose,
            placeCount: props.placeCount,
            chief: props.chief,
        },
        validationSchema: wardSchema,
        onSubmit,
    });

    const checkStatusHandler = () => {
        if (checkStatus) {
            setCheckStatus(false);
            dispatch(removeCheckedListItem(props._id));
        } else {
            setCheckStatus(true);
            dispatch(addCheckedListItem(props._id));
        }
        console.log(checkStatus);
    };

    const clickHandler = () => {

        setModalActive(true);

    }
    const clickModalMessageHandler = () => {

        props.setModalMessageActive(true);
    }

    useEffect(() => {
        values.number = props.number;
        values.floor = props.floor;
        values.department = props.department;
        values.purpose = props.purpose;
        values.placeCount = props.placeCount;
        values.chief = props.chief;

    }, [props]);

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

            className="list-item">

            <Checkbox checked={checkStatus} variant="square" id={props._id} onCheck={checkStatusHandler} />
            <div className="wardItem__number">{props.number}</div>
            <div className="wardItem__floor">{props.floor}</div>
            <div className="wardItem__department">{props.department}</div>
            <div className="wardItem__purpose">{props.purpose}</div>
            <div className="wardItem__placeCount">{props.placeCount}</div>

            <div className="wardItem__change">
                <img src={more} alt="" />
                <div className="dropdown-content">
                    <div className="wardItem__change__item" onClick={clickHandler}>
                        <img src={editIcon} alt="edit" />
                        <span>Edit ward</span>
                    </div>
                    <div className="wardItem__change__item" onClick={(e) => { handleDelete(e) }}>
                        <img src={deleteIcon} alt="delete" />
                        <span>Delete ward</span>
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }} className="admin-add admin-add__ward" action="">
                    <h2 className="admin-add__header">Type information about ward</h2>
                    <div className="admin-add__inputs">
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Number</div>
                            <input
                                value={values.number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__ward__number"
                                type="number"
                                className={errors.number && touched.number ? "admin-add__input-error" : "admin-add__input"}
                                name="number" />
                            {errors.number && touched.number && <p className="error">{errors.number}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Floor</div>
                            <input
                                id="admin-add__ward__floor"
                                type="number"
                                name="floor"
                                value={values.floor}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.floor && touched.floor ? "admin-add__input-error" : "admin-add__input"}
                            />
                            {errors.floor && touched.floor && <p className="error">{errors.floor}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Department</div>
                            <input
                                value={values.department}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__ward__department"
                                type="text"
                                className={errors.department && touched.department ? "admin-add__input-error" : "admin-add__input"}
                                name="department" />
                            {errors.department && touched.department && <p className="error">{errors.department}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Purpose</div>
                            <input
                                value={values.purpose}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__ward__purpose"
                                type="text"
                                className={errors.purpose && touched.purpose ? "admin-add__input-error" : "admin-add__input"}
                                name="speciality" />
                            {errors.purpose && touched.purpose && <p className="error">{errors.purpose}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Place count</div>
                            <input
                                value={values.placeCount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__ward__placeCount"
                                type="number"
                                className={errors.placeCount && touched.placeCount ? "admin-add__input-error" : "admin-add__input"}
                                name="entryDate" />
                            {errors.placeCount && touched.placeCount && <p className="error">{errors.placeCount}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Chief</div>
                            <input
                                value={values?.chief?.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__ward__chief"
                                type="text"
                                className={errors.chief && touched.chief ? "admin-add__input-error" : "admin-add__input"}
                                name="salary" />
                            {errors.chief && touched.chief && <p className="error">{errors.chief}</p>}
                        </div>
                    </div>
                    <Button
                        onClick={clickHandler}
                        width="227px"
                        height="50px"
                        marginTop="60px"
                        borderRadius="14px"
                        bgColor="#25B39E"
                        children="Submit"
                        fontSize="20px" />
                    <button onClick={(e) => { e.preventDefault(); setModalActive(false) }}>
                        <img className="modal_close" src={closeIcon} alt="x" />
                    </button>
                </form>

            </Modal>
        </li>


    )

}

export default WardsItem;