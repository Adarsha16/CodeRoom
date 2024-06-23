
import { execFileSync, spawn } from 'node:child_process';
import dotenv from "dotenv";
dotenv.config();


const JavaScript_docker = async () => {

    try {

        return new Promise((resolve, reject) => {

            console.log("Building image js")
            // const image = execFileSync("docker", ["build", "-q", `${process.env.JS_PATH}`]).toString().trim();
            console.log("Running")
            // console.log("image", image);
            const child = spawn("docker", ["run", "-v", `${process.env.JS_PATH}:/usr/source/app`, "sha256:2e875c567bf6bbb51a3e65cfe8d91440bb232029d76d76092ffa0a3a939b03bb"]);
            // const child = spawn("docker", ["run", image]);

            console.log("checking")
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
        console.log("error from docker js", error);
    }

};


export { JavaScript_docker }