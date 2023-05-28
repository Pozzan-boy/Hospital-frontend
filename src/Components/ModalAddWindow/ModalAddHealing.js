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
import { postHealing } from "../HealingsList/HealingsListSlice";
import "./modalAddWindow.scss";
import axios from "axios";

const ModalAddHealing = (props) => {

    const { setModalActive, modalActive } = props;
    const token = useSelector((state) => state.account.token);
    const dispatch = useDispatch();
    const clickHandler = () => {
        setModalActive(true);
    };

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [wards, setWards] = useState([]);
    useEffect(() => {
        console.log(123);
        axios.get('/patient/getAllPatients', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setPatients(res.data.map((item) => <option value={item._id}>{item.name}</option>)))
            .catch((err) => console.log(err));

            console.log(props?.currentDoctor);
        if (props?.currentDoctor === undefined) {
            axios.get('/doctor/getAllDoctors', {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => setDoctors(res.data.map((item) => <option value={item._id}>{item.name}</option>)))
                .catch((err) => console.log(err));
        } else {
            setDoctors(<option value={props.currentDoctor._id}>{props.currentDoctor.name}</option>)
        }
        
        axios.get('/ward/getAllWards', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setWards(res.data.map((item) => <option value={item._id}>{item.number}</option>)))
            .catch((err) => console.log(err))
    }, [])
    
    const onSubmit = async (values, actions) => {
        const newItem = { ...values, preparations: values.preparations.split(','), token };
        console.log(values)
        dispatch(postHealing(newItem));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
        // setModalActive(false);
      };

    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <Formik
                
                initialValues={{ diagnos: "", diagnosDescription: "", date: "", healingInstruction: "", status: "", preparations: ""}}
                validationSchema={wardSchema}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="modal-add">
                        <h2 className="modal-add__header">Type information about healing</h2>
                        <CustomSelect
                            label="Patient"
                            name="patient"
                            placeholder="Please select a patient"
                        >
                            <option value="">Please select</option>
                            {patients}
                        </CustomSelect>
                        <CustomSelect
                            label="Doctor"
                            name="doctor"
                            placeholder="Please select a doctor"
                        >
                            <option value="">Please select</option>
                            {doctors}
                        </CustomSelect>
                        <CustomInput
                            label="Diagnos"
                            name="diagnos"
                            type="text"
                            placeholder="Enter diagnos"
                        />
                        <CustomInput
                            label="Description"
                            name="diagnosDescription"
                            type="text"
                            placeholder="Enter diagnos description"
                        />
                        <CustomInput
                            label="Date"
                            name="date"
                            type="date"
                            placeholder="Enter date"
                        />
                        <CustomInput
                            label="Instructions"
                            name="healingInstruction"
                            type="text"
                            placeholder="Enter healing instructions"
                        />
                        <CustomInput
                            label="Status"
                            name="status"
                            type="text"
                            placeholder="Select status"
                        />
                        <CustomInput
                            label="Preprations"
                            name="preparations"
                            type="text"
                            placeholder="Enter preparations"
                        />
                        <CustomSelect
                            label="Ward"
                            name="ward"
                            placeholder="Please select a ward"
                        >
                            <option value="">Please select</option>
                            {wards}
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

export default ModalAddHealing;
