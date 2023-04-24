import * as yup from "yup";
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
const dateRegExp = /^(0[1-9]|[12][0-9]|3[01])[- /.] (0[1-9]|1[012])[- /.] (19|20)\d\d$/
export const doctorSchema = yup.object().shape({
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
    age: yup.number().positive().integer().required('Required').typeError('Not a number'),
    speciality: yup.string().min(2, 'Too short').required("Required"),
    entryDate: yup.string().required("Required"),
    salary: yup.number().positive().integer().required("Required").typeError('Not a number'),
    email: yup.string().email("Plese enter a valid email").required("Required"),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),
    
})