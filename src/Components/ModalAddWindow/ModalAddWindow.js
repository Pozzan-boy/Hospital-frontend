import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import closeIcon from "../../assets/icons/close.svg";
import { useFormik } from "formik";
import "./modalAddWindow.scss";

const ModalAddWindow = (props) => {
    const { postItemFunc,
        itemSchema,
        inputs,
        setModalActive,
        modalActive,
        itemName
    } = props;
    const token = useSelector((state) => state.account.token);
    const dispatch = useDispatch();
    const clickHandler = () => {
        setModalActive(true);
    };
    const onSubmit = async (values, actions) => {

        console.log("submitted");
        const newItem = {
            [inputs[0]]: values[inputs[0]],
            [inputs[1]]: values[inputs[1]],
            [inputs[2]]: values[inputs[2]],
            [inputs[3]]: values[inputs[3]],
            [inputs[4]]: values[inputs[4]],
            [inputs[5]]: values[inputs[5]],
            [inputs[6]]: values[inputs[6]],
            [inputs[7]]: values[inputs[7]],
            token,
        };
        console.log(newItem);
        dispatch(postItemFunc(newItem));

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
        setFieldValue,
        Field
    } = useFormik({
        initialValues: {
            [inputs[0]]: "",
            [inputs[1]]: "",
            [inputs[2]]: "",
            [inputs[3]]: "",
            [inputs[4]]: "",
            [inputs[5]]: "",
            [inputs[6]]: "",
            [inputs[7]]: "",

        },
        validationSchema: itemSchema,
        onSubmit,
    });
    function Item({ ItemName, inputValue }) {
        if (ItemName === "patient") {
            return (
                <div className="modal-add__input__wrapper">
                    <div className="modal-add__input__label">{`${inputValue.charAt(
                        0
                    ).toUpperCase()}${inputValue.slice(1)}`}</div>
                    <div className="radio-buttons">
                        <div>
                            <input
                                type="radio"
                                name="gender"
                                checked={values[inputValue] === "Male"}
                                onChange={() => setFieldValue(inputValue, "Male")}
                                id="male"
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="gender"
                                checked={values[inputValue] === "Female"}
                                onChange={() => setFieldValue(inputValue, "Female")}
                                id="female"
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="modal-add__input__wrapper">
                    <div className="modal-add__input__label">{`${inputValue.charAt(
                        0
                    ).toUpperCase()}${inputValue.slice(1)}`}</div>
                    <input
                        checked={false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        className={
                            errors[inputValue] && touched[inputValue]
                                ? "modal-add__input-error"
                                : "modal-add__input"
                        }
                        name={`${inputValue}`}
                    />
                    {errors[inputValue] && touched[inputValue] && (
                        <p className="error">{errors[inputValue]}</p>
                    )}
                </div>
            );
        }
    }

    return (
        <Modal active={modalActive} setActive={setModalActive}>

            <form onSubmit={handleSubmit} className="modal-add" action="">
                <h2 className="modal-add__header">{`Type information about ${itemName}`}</h2>
                <div className="modal-add__inputs">
                    <div className="modal-add__input__wrapper">
                        <div className="modal-add__input__label">{`${inputs[0].charAt(0).toUpperCase()}${inputs[0].slice(1)}`}</div>
                        <input
                            value={values[inputs[0]]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            className={errors[inputs[0]] && touched[inputs[0]] ? "modal-add__input-error" : "modal-add__input"}
                            name={`${inputs[0]}`} />
                        {errors[inputs[0]] && touched[inputs[0]] && <p className="error">{errors[inputs[0]]}</p>}
                    </div>
                    <div className="modal-add__input__wrapper">
                        <div className="modal-add__input__label">{`${inputs[1].charAt(0).toUpperCase()}${inputs[1].slice(1)}`}</div>
                        <input
                            type="text"
                            name={`${inputs[1]}`}
                            value={values[inputs[1]]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors[inputs[1]] && touched[inputs[1]] ? "modal-add__input-error" : "modal-add__input"}
                        />
                        {errors[inputs[1]] && touched[inputs[1]] && <p className="error">{errors[inputs[1]]}</p>}
                    </div>
                    <div className="modal-add__input__wrapper">
                        <div className="modal-add__input__label">{`${inputs[2].charAt(0).toUpperCase()}${inputs[2].slice(1)}`}</div>
                        <input
                            value={values[inputs[2]]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="date"
                            className={errors[inputs[2]] && touched[inputs[2]] ? "modal-add__input-error" : "modal-add__input"}
                            name={`${inputs[2]}`} />
                        {errors[inputs[2]] && touched[inputs[2]] && <p className="error">{errors[inputs[2]]}</p>}
                    </div>
                    <Item ItemName={itemName} inputValue={inputs[3]} />
                    <div className="modal-add__input__wrapper">
                        <div className="modal-add__input__label">{`${inputs[4].charAt(0).toUpperCase()}${inputs[4].slice(1)}`}</div>
                        <input
                            value={values[inputs[4]]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            className={errors[inputs[4]] && touched[inputs[4]] ? "modal-add__input-error" : "modal-add__input"}
                            name={`${inputs[4]}`} />
                        {errors[inputs[4]] && touched[inputs[4]] && <p className="error">{errors[inputs[4]]}</p>}
                    </div>
                    <div className="modal-add__input__wrapper">
                        <div className="modal-add__input__label">{`${inputs[5].charAt(0).toUpperCase()}${inputs[5].slice(1)}`}</div>
                        <input
                            value={values[inputs[5]]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            className={errors[inputs[5]] && touched[inputs[5]] ? "modal-add__input-error" : "modal-add__input"}
                            name={`${inputs[5]}`} />
                        {errors[inputs[5]] && touched[inputs[5]] && <p className="error">{errors[inputs[5]]}</p>}
                    </div>
                    <div className="modal-add__input__wrapper">
                        <div className="modal-add__input__label">{`${inputs[6].charAt(0).toUpperCase()}${inputs[6].slice(1)}`}</div>
                        <input
                            value={values[inputs[6]]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            className={errors[inputs[6]] && touched[inputs[6]] ? "modal-add__input-error" : "modal-add__input"}
                            name={`${inputs[6]}`} />
                        {errors[inputs[6]] && touched[inputs[6]] && <p className="error">{errors[inputs[6]]}</p>}
                    </div>
                    <div className="modal-add__input__wrapper">
                        <div className="modal-add__input__label">{`${inputs[7].charAt(0).toUpperCase()}${inputs[7].slice(1)}`}</div>
                        <input
                            value={values[inputs[7]]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            className={errors[inputs[7]] && touched[inputs[7]] ? "modal-add__input-error" : "modal-add__input"}
                            name={`${inputs[7]}`} />
                        {errors[inputs[7]] && touched[inputs[7]] && <p className="error">{errors[inputs[7]]}</p>}
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
    )
}

export default ModalAddWindow
