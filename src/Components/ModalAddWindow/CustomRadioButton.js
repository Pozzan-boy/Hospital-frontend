import { useField } from "formik";

const CustomRadioButton = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="modal-add__input__wrapper">
            <input 
                type="radio"
                {...field}
                {...props}
                
            />
          <label className="modal-add__input__label" htmlFor={props.id}>{label}</label>
        </div>
    );
};
export default CustomRadioButton;