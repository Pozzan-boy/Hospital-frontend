import "./formInput.scss"
const FormInput = (props) => {
  return (
    <div className="form-input">
      <label>{props.label}</label>
      <input name={props.name} type="text"/>
      <label className="error-message">{props.errorMessage}</label>
    </div>
  )
}

export default FormInput
