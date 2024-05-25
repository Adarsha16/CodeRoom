
const Github = async (req, res) => {

    try {


        const { user_name } = req.body;   //Should be "value" when sending


        const response = await fetch(`https://api.github.com/users/${user_name}`)
        const data = await response.json();


        const GithubData =
        {
            status: response.status,
            status_info: response.statusText,
            name: data.login,
            profile: data.avatar_url,
            link: data.html_url
        }




        if (response) {

            res.status(200).json({ GithubData })

        } else {

            throw new Error("Cannot get github data")
            return;
        }


    } catch (error) {

        console.log(error);
        return

    }

}

export { Github }