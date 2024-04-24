import express from 'express'
import cors from 'cors'
const app = express();
import router from './router/route.js';

import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';


app.use(express.json());  //To parse the json file
app.use(cors());          //For cross origin resource sharing


/**
 * Routes 
 */
app.use("/", router)




/**
 * ERROR Handling MIDDLEWARE
 */

app.use(notFoundMiddleware)






/**
 * To startup the server
 */

const PORT = process.env.PORT || 5001;


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