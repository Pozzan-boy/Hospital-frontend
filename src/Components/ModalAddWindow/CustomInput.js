import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="modal-add__input__wrapper">
            <label className="modal-add__input__label">{label}</label>
            <input
                {...field}
                {...props}
                className={meta.touched && meta.error ? "modal-add__input-error" : "modal-add__input"}
            />
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </div>
    );
};
export default CustomInput;