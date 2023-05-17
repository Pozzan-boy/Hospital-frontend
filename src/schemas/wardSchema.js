import * as yup from "yup";

export const wardSchema = yup.object().shape({
    number: yup.number().positive().integer().required('Required'),
    floor: yup.number().positive().integer().required('Required'),
    department: yup.string()
                    .min(3, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
    purpose: yup.string()
                .min(3, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
    placeCount: yup.number().positive().integer().required('Required'),
    chief: yup.string()
})