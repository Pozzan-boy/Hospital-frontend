import { useField } from "formik";
const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="modal-add__input__wrapper">
      <label className="modal-add__input__label">{label}</label>
      <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "modal-add__input-error" : "modal-add__input"}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};
export default CustomSelect;