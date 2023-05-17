import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import CustomRadioButton from "./CustomRadioButton";
import closeIcon from "../../assets/icons/close.svg";
import { wardSchema } from "../../schemas/wardSchema";
import { postWard } from "../WardsList/WardsListSlice";
import "./modalAddWindow.scss";
import axios from "axios";

const ModalAddWard = (props) => {

    const { setModalActive, modalActive } = props;
    const token = useSelector((state) => state.account.token);
    const dispatch = useDispatch();
    const clickHandler = () => {
        setModalActive(true);
    };

    const [chiefs, setChiefs] = useState([]);

    useEffect(() => {
        axios.get('/doctor/getAllDoctors', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setChiefs(res.data.map((item) => <option value={item._id}>{item.name}</option>)))
            .catch((err) => console.log(err))
    }, [])
    
    const onSubmit = async (values, actions) => {
        const newItem = { ...values, token };
        console.log(values)
        dispatch(postWard(newItem));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
        // setModalActive(false);
      };

    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <Formik
                
                initialValues={{ number: "", floor: "", department: "", purpose: "", placeCount: "", chief: ""}}
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
                            <option value="">Please select</option>
                            {chiefs}
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
    )
}

export default ModalAddWard;
