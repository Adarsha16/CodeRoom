
const callGetUser = async (token) => {

    try {

        const response = await fetch("http://localhost:5001/api/getuser", {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`

            }
        })
        const result = await response.json();
        return result


    } catch (error) {
        console.log(error);
        return;
    }
};


export default callGetUser
