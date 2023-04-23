import Search from "../Search/Search";
import Button from "../Button/Button";
import { doctorSchema } from "../../schemas/doctorSchema";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import closeIcon from "../../assets/icons/close.svg";
import { useFormik } from "formik";
import "./filters.scss";
import { postDoctor } from "../DoctorsList/DoctorsListSlice";

const Filters = () => {
    const token = useSelector((state) => state.account.token);
    const doctorsCount = useSelector((state) => state.doctors.doctorsCount);
    const [modalActive, setModalActive] = useState(false);
    const dispatch = useDispatch();

    const clickHandler = () => {
        setModalActive(true);
    };

    const onSubmit = async (values, actions) => {
        console.log("submitted");
        const newDoctor = {
            name: values.name,
            surname: values.surname,
            age: values.age,
            speciality: values.speciality,
            entryDate: values.entryDate,
            salary: values.salary,
            email: values.email,
            phone: values.phone,
            token,
        };
        dispatch(postDoctor(newDoctor));

        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
    };

    const {
        values,
        errors,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
    } = useFormik({
        initialValues: {
            name: "",
            surname: "",
            age: "",
            speciality: "",
            entryDate: "",
            salary: "",
            email: "",
            phone: "",
        },
        validationSchema: doctorSchema,
        onSubmit,
    });

    return (
        <div className="filters">
            <div className="filters_user-count">
                <span id="users_count">{doctorsCount}</span>
                <span id="users_type">doctors</span>
            </div>
            <Search />
            <Button onClick={clickHandler} width="170px" height="43px" borderRadius="14px" children="Add doctor" fontSize="20px" />
            <Modal active={modalActive} setActive={setModalActive}>

                <form onSubmit={handleSubmit} className="admin-add admin-add__doctor" action="">
                    <h2 className="admin-add__header">Type information about doctor</h2>
                    <div className="admin-add__inputs">
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Name</div>
                            <input
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__name"
                                type="text"
                                className={errors.name && touched.name ? "admin-add__input-error" : "admin-add__input"}
                                name="name" />
                            {errors.name && touched.name && <p className="error">{errors.name}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Surname</div>
                            <input
                                id="admin-add__doctor__surname"
                                type="text"
                                name="surname"
                                value={values.surname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.surname && touched.surname ? "admin-add__input-error" : "admin-add__input"}
                            />
                            {errors.surname && touched.surname && <p className="error">{errors.surname}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Age</div>
                            <input
                                value={values.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__age"
                                type="text"
                                className={errors.age && touched.age ? "admin-add__input-error" : "admin-add__input"}
                                name="age" />
                            {errors.age && touched.age && <p className="error">{errors.age}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Speciality</div>
                            <input
                                value={values.speciality}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__speciality"
                                type="text"
                                className={errors.speciality && touched.speciality ? "admin-add__input-error" : "admin-add__input"}
                                name="speciality" />
                            {errors.speciality && touched.speciality && <p className="error">{errors.speciality}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Date of entry</div>
                            <input
                                value={values.entryDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__entryDate"
                                type="date"
                                className={errors.entryDate && touched.entryDate ? "admin-add__input-error" : "admin-add__input"}
                                name="entryDate" />
                            {errors.entryDate && touched.entryDate && <p className="error">{errors.entryDate}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Salary</div>
                            <input
                                value={values.salary}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__salary"
                                type="text"
                                className={errors.salary && touched.salary ? "admin-add__input-error" : "admin-add__input"}
                                name="salary" />
                            {errors.salary && touched.salary && <p className="error">{errors.salary}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Email</div>
                            <input
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__email"
                                type="email"
                                className={errors.email && touched.email ? "admin-add__input-error" : "admin-add__input"}
                                name="email" />
                            {errors.email && touched.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className="admin-add__input__wrapper">
                            <div className="admin-add__input__label">Phone</div>
                            <input
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="admin-add__doctor__phone"
                                type="text"
                                className={errors.phone && touched.phone ? "admin-add__input-error" : "admin-add__input"}
                                name="phone" />
                            {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}
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
                        disabled={isSubmitting}
                        fontSize="20px" />
                    <button onClick={(e) => { e.preventDefault(); setModalActive(false) }}>
                        <img className="modal_close" src={closeIcon} alt="x" />
                    </button>
                </form>

            </Modal>

        </div>
    )
}
export default Filters;
