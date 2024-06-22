
import { execFileSync, spawn } from 'node:child_process';
import dotenv from "dotenv";
dotenv.config();


const Python_docker = async () => {

    try {

        return new Promise((resolve, reject) => {

            console.log("Building")
            // const image = execFileSync("docker", ["build", "-q", `${process.env.PYTHON_PATH}`]).toString().trim();
            console.log("Running")
            const child = spawn("docker", ["run", "-v", `${process.env.PYTHON_PATH}:/app`, "sha256:cf2cc275b16ff627ec194e286545ca9598ebc0eb652f72f61715e8d4280f981c"]);

            let output = '';

            child.stdout.on("data", data => {

                console.log("stdout", data.toString());
                output = data;
            })

            child.stderr.on("data", data => {

                console.log("stderr", data.toString());
                output = data;
            });

            child.on("close", code => {


                resolve(output);


            })

        })



    } catch (error) {

        console.log("error from Python_docker", error);

    }

};


export { Python_docker }