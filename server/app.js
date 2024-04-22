import express from 'express'
import cors from 'cors'
const app = express();
import router from './router/route.js';


app.use(express.json());  //To parse the json file
app.use(cors());          //For cross origin resource sharing


/**
 * Routes 
 */
app.use("/", router)




/**
 * To startup the server
 */

const PORT = process.env.PORT || 5000;


const start = async (req, res) => {

    try {

        app.listen(PORT, () => {

            console.log(`Connecting to the server on port ${PORT}`)

        })


    } catch (error) {

        console.log(error);

    }

}

start();