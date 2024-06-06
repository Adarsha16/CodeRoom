
const validateForm = (values) => {

    let errors = {};



    for (let key in values) {


        if (!values[key]) {
            errors[key] = `${key} is Required`
        }

        if (key === 'email' && !/\S+@\S+\.\S+/.test(values[key])) {

            errors[key] = `Invalid ${key} type`
        }

        if (key === 'password' && values[key].length < 8) {

            errors[key] = `Too short ${key}`
        }
    }

    return errors;
}

export default validateForm
