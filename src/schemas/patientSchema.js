import * as yup from "yup";
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
const dateRegExp = /^(0[1-9]|[12][0-9]|3[01])[- /.] (0[1-9]|1[012])[- /.] (19|20)\d\d$/
const patternOneDigitAfterComma = /^\d+(\.\d{0,1})?$/;
export const patientSchema = yup.object().shape({
    name: yup.string()
        .matches(/^\D*$/, "Name can't contain numbers")
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    surname: yup.string()
        .matches(/^\D*$/, "Surname can't contain numbers")
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    sex: yup.string().min(2, 'Too short').required("Required"),
    height:  yup
        .number()
        .positive()
        .test(
        "is-decimal",
        "The amount should be a decimal with maximum one digit after comma",
        (val) => {
            if (val !== undefined) {
            return patternOneDigitAfterComma.test(val);
            }
            return true;
        }
    )
    .min(1, "minimum 1")
    .required("Is required"),
    weight:yup
        .number()
        .positive()
        .test(
        "is-decimal",
        "The amount should be a decimal with maximum one digit after comma",
        (val) => {
            if (val !== undefined) {
            return patternOneDigitAfterComma.test(val);
            }
            return true;
        }
        )
        .min(1, "minimum 1")
        .required("Is required"),
  
  
    email: yup.string().email("Plese enter a valid email").required("Required"),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),
    
})