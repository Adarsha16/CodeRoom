
const callLogin = async (values) => {

    try {

        const { email, password } = values;


        const login = await fetch("http://localhost:5001/api/auth/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        console.log("Login", login)

        return login;


    } catch (error) {
        console.log(error)

    }
};

export default callLogin
