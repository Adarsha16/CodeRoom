import { python } from "./docker_compiler/docker_compiler.js";

const compiler = async (req, res) => {

    try {

        // const { lang } = req.params;////////////////////////////////////to be deleted
        const { InputText, extension } = (req.body);

        console.log(extension)
        console.log(InputText)

        const Output = await python(InputText, extension);

        console.log("Output from compiler", Output);

        return res.status(200).json({ Output })







        /***
         * GLOT API version 
        */

        /*
        
            const GLOT_API_TOKEN = 'de976840-e3bd-4cc6-8762-af5843f23d89'
             const input = { "files": [{ "name": `main${extension.trim()}`, "content": `${InputText}` }] }
     
             const response = await fetch(`https://glot.io/api/run/${lang}/latest`,
                 {
                     method: 'POST',
                     headers: {
                         'Authorization': `Token ${GLOT_API_TOKEN}`,
                         'Content-Type': 'application/x-www-form-urlencoded',
                     },
                     body: JSON.stringify(input),
                 });
     
     
     
         
             
             if (!response) {
             throw new Error("Something went wrong with compiler")
             }
             
             // console.log(response)
             const output = await response?.json();
             
             
             if (output) {
             
             // res.status(response?.status).json({
             //     output
             // })
              
             return res.status(200).json({ output })
             }
             
             } else {
             
             throw new Error({
             "error": "Compile",
             "output": output
             })
             }
     
             */


    } catch (error) {

        console.log(error)

    }

}

export { compiler }