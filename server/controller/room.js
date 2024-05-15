
const room = (req, res) => {

    try {

        const { username, email, github } = req.user;
        res.status(200).json({ "User Data": `Room is now available to ${username} ( ${email} ) with ${github}` })

    } catch (error) {

        console.log(error);

    }
}

export { room }