
const validateForm = (values) => {

    let errors = {};

    let { name, email, password, github } = values

    if (!name) {
        errors.name = 'Username is Required'
    }


    if (!email) {
        errors.email = 'Email is Required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Invalid Email type'
    }


    if (!password) {
        errors.password = 'Password is Required'
    } else if (password.length < 8) {
        errors.password = 'Password should be greater than 8 Characters'
    }

    if (!github) {
        errors.github = 'Github is Required'
    }

    return errors;
}

export default validateForm
