import * as yup from "yup";

export const healingSchema = yup.object().shape({
    patient: yup.string().required('Required'),
    doctor: yup.string().required('Required'),
    diagnos: yup.string()
                    .min(3, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required('Required'),
    diagnosDescription: yup.string()
                            .min(3, 'Too Short!')
                            .max(200, 'Too Long!')
                            .required('Required'),
    date: yup.string().required('Required'),
    healingInstruction: yup.string()
                            .min(3, 'Too Short!')
                            .max(200, 'Too Long!')
                            .required('Required'),
    status: yup.string().equals(['Sick', 'Recovered', 'Dead']).required('Required'),
    preparations: yup.string(),
    ward: yup.string()
})