
import { exec, execFileSync, spawn } from 'node:child_process';
import dotenv from "dotenv";
import path from 'node:path';
dotenv.config();


const Cpp_docker = async () => {

    try {

        return new Promise((resolve, reject) => {

            console.log("Building")
            // const image = execFileSync("docker", ["build", "-q", `${path.join(process.env.COMPILER_PATH, "cpp")}`]).toString().trim();

            console.log("Running")
            const child = spawn("docker", ["run", "-v", `${process.env.CPP_PATH}:/usr/src/app`, "sha256:df11e1bb8f648c21e7207cd9eb55845e44213dbd09039068302ed481098e8d1e"]);


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

        console.log("error from cpp_docker", error);

    }

};


export { Cpp_docker }