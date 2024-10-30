import * as yup from "yup"

export const signupSchema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(1).required(),
    confirmPassword:yup.string().oneOf([yup.ref('password'),'Password do not match']).required()
})


export const loginSchema = yup.object().shape({
    email:yup.string().required(),
    password:yup.string().required()
})

export const tradeSchema = yup.object().shape({
    quantity:yup.number().min(1).required(),
    price:yup.number().min(1).required(),
    tradeDate:yup.date().required(),
    type:yup.string().required(),

})
