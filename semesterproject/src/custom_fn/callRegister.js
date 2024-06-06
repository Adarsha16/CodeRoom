
const callRegister = async (values) => {

    try {

        const { name, github, email, password } = values;
        let username = name;

        const register = await fetch("http://localhost:5001/api/auth/register", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, github, email, password })
        })

        return register;


    } catch (error) {
        console.log(error)
    }
};

export default callRegister
