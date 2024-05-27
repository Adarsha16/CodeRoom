
const callGithub = async (git_username) => {

    try {

        const response = await fetch("http://localhost:5001/api/github", {
            method: "POST",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ user_name: git_username })

        })
        const result = await response.json();
        return result


    } catch (error) {
        console.log(error);
        return;
    }
};


export default callGithub
