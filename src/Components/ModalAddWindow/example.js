import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import closeIcon from "../../assets/icons/close.svg";
import { Form, Formik } from "formik";
import { doctorSchema } from "../../schemas/doctorSchema";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import "./modalAddWindow.scss";
import { postDoctor } from "../DoctorsList/DoctorsListSlice";

const ModalAddWindow = ({props, children}) => {
    const selectedArr = [{
        value:'surgeon',
        text: "surgeon"
    },
    {
        value:'surgeon',
        text: "surgeon"
    },
    {
        value:'surgeon',
        text: "surgeon"
    }]
    function SelectArray(props){
        return props.arr.map((item) =>
        (
            <option value={item.value}>{item.text}</option>
            
        ) )
    }
    const { setModalActive,modalActive} = props;
    const token = useSelector((state) => state.account.token);
    const dispatch = useDispatch();
    const clickHandler = () => {
        setModalActive(true);
    };
    const onSubmit = async (values, actions) => {
        const {name, surname, age, speciality, entryDate, salary, email, phone} = values;
        console.log("submitted");
        console.log(values.age);
        const newItem = {
            name,
            surname,
            age,
            speciality,
            entryDate,
            salary,
            email,
            phone,
            token,
        };
        console.log(newItem);
        dispatch(postDoctor(newItem));

        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
    };

   

    return (
        <Modal active={modalActive} setActive={setModalActive}>
                 <Formik
                    initialValues={{ name: "", surname: "", age: 0, speciality: "", entryDate: "", salary: 0, email: "", phone: ""}}
                    validationSchema={doctorSchema}
                    onSubmit={onSubmit}>
                        {({ isSubmitting }) => (
                            <Form>
                            <CustomInput
                                label="Username"
                                name="name"
                                type="text"
                                placeholder="Enter your username"
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
                                placeholder="Enter your username"
                            />
                            <CustomSelect
                                label="speciality"
                                name="speciality"
                                placeholder="Please select a job">
                                    
                                <option value="">Please select</option>
                                <SelectArray arr={selectedArr}/>
                            </CustomSelect>
                            <CustomInput
                                label="entry Date"
                                name="entryDate"
                                type="date"
                                placeholder="Enter your entry date"
                            />
                            <CustomInput
                                label="salary"
                                name="salary"
                                type="text"
                                placeholder="Enter your salary"
                            />
                            <CustomInput
                                label="email"
                                name="email"
                                type="text"
                                placeholder="Enter your email"
                            />
                            <CustomInput
                                label="phone"
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
                                    
                            </Form>
                        )}
                </Formik>
            
            

        </Modal>
    )
}

export default ModalAddWindow
