
const callOTPandRegister = async (values) => {

    try {

        const { name, github, email, password, otp } = values;
        let username = name;

        const register = await fetch("http://localhost:5001/api/auth/otp/registeration", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, github, email, password, otp })
        })

        return register;


    } catch (error) {
        console.log(error)
    }
};

export default callOTPandRegister
