import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import CustomInput from "./CustomInput";
import CustomRadioButton from "./CustomRadioButton";
import closeIcon from "../../assets/icons/close.svg";
import { patientSchema } from "../../schemas/patientSchema";
import { postPatient } from "../PatientsList/PatientsListSlice";
import "./modalAddWindow.scss";

const ModalAddPatient = (props) => {
    const sexList = useSelector(state=> state.patients.sexList);
    function SelectArray(props) {
        return props.arr.map((item) =>
        (
            <option value={item.value}>{item.text}</option>

        ))
    }
    const { setModalActive, modalActive } = props;
    const token = useSelector((state) => state.account.token);
    const dispatch = useDispatch();
    const clickHandler = () => {
        setModalActive(true);
    };
    const onSubmit = async (values, actions) => {
        const newItem = { ...values, token };
        console.log(values)
        dispatch(postPatient(newItem));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
        // setModalActive(false);
      };



    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <Formik
                
                initialValues={{ name: "", surname: "", birthDate: "", sex: "", height: "", weight: "", email: "", phone: "" }}
                validationSchema={patientSchema}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="modal-add">
                        <h2 className="modal-add__header">Type information about patient</h2>
                        <CustomInput
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                        />
                        <CustomInput
                            label="Surname"
                            name="surname"
                            type="text"
                            placeholder="Enter your surname"
                        />
                        <CustomInput
                            label="Birth Date"
                            name="birthDate"
                            type="date"
                            placeholder="Enter your birth date"
                        />
                        <div className="modal-add__input__wrapper">
                            <label className="modal-add__input__label">Sex</label>
                            <div className="radio-buttons">
                                
                                <CustomRadioButton
                                    type="radio"
                                    name="sex"
                                    label="male"
                                    value="Male"
                                    id="male"
                                    
                                />
                               <CustomRadioButton
                                    type="radio"
                                    name="sex"
                                    label="female"
                                    value="Female"
                                    id="female"
                                    
                                />
                            </div>
                        </div>
                        
                        <CustomInput
                            label="Height"
                            name="height"
                            type="text"
                            placeholder="Enter your height"
                        />
                        <CustomInput
                            label="Weight"
                            name="weight"
                            type="text"
                            placeholder="Enter your weight"
                        />
                        <CustomInput
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                        />
                        <CustomInput
                            label="Phone"
                            name="phone"
                            type="text"
                            placeholder="Enter your phone"
                        />

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

export default ModalAddPatient;
