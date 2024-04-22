const GLOT_API_TOKEN = 'de976840-e3bd-4cc6-8762-af5843f23d89'

const compiler = async (req, res) => {



    try {

        const { lang } = req.params;
        const { user_input } = req.body;


        const input = { "files": [{ "name": "main.py", "content": `${user_input}` }] }

        const response = await fetch(`https://glot.io/api/run/${lang}/latest`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${GLOT_API_TOKEN}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(input),
            }
        )

        console.log(response)
        const output = await response.json();



        if (output) {

            res.status(response.status).json({
                output
            })

        } else {

            throw new Error({
                "error": "Compile",
                "output": output
            })
        }



    } catch (error) {

        console.log(error)

    }

}

export { compiler }