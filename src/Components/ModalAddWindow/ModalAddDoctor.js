import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import closeIcon from "../../assets/icons/close.svg";
import { doctorSchema } from "../../schemas/doctorSchema";
import { postDoctor } from "../DoctorsList/DoctorsListSlice";
import "./modalAddWindow.scss";

const ModalAddDoctor = (props) => {
    const specialitiesList = useSelector(state=> state.doctors.specialitiesList);
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
        console.log(typeof(values.age))
        dispatch(postDoctor(newItem));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
      };



    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <Formik
                
                initialValues={{ name: "", surname: "", age: "", speciality: "", entryDate: "", salary: "", email: "", phone: "" }}
                validationSchema={doctorSchema}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="modal-add">
                        <h2 className="modal-add__header">Type information about doctor</h2>
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
                            placeholder="Enter your username"
                        />
                        <CustomInput
                            label="Age"
                            name="age"
                            type="text"
                            placeholder="Enter your Age"
                        />
                        <CustomSelect
                            label="Speciality"
                            name="speciality"
                            placeholder="Please select a job"
                        >
                            <option value="">Please select</option>
                            <SelectArray arr={specialitiesList} />
                        </CustomSelect>
                        <CustomInput
                            label="Entry Date"
                            name="entryDate"
                            type="date"
                            placeholder="Enter your entry date"
                        />
                        <CustomInput
                            label="Salary"
                            name="salary"
                            type="text"
                            placeholder="Enter your salary"
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

export default ModalAddDoctor;
