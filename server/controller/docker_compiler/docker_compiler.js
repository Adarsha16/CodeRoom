import fs from "fs";
import { Python_docker } from "./python/python_docker.js"
import { JavaScript_docker } from "./javascript/javascript_docker.js";
import { Cpp_docker } from "./cpp/cpp_docker.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config();



const docker_compiler = async (InputText = "", extension) => {

    try {

        console.log("Run", InputText, extension)

        let PATH;

        if (extension == ".py") {
            PATH = path.join(process.env.PYTHON_PATH);
        }
        else
            if (extension == ".js") {
                console.log("path run")
                PATH = path.join(process.env.JS_PATH);
            }
            else
                if (extension == ".cpp") {
                    PATH = path.join(process.env.CPP_PATH);
                }


        console.log("Selected path", PATH)

        const file = fs.writeFileSync(`${PATH}/myapp${extension}`, InputText)
        console.log("File after created", file);

        let data;
        if (extension == ".py") {
            data = (await Python_docker()).toString();
        }
        if (extension == ".js") {
            console.log("docker run")
            data = (await JavaScript_docker()).toString();
        }
        if (extension == ".cpp") {
            data = (await Cpp_docker()).toString();
        }

        console.log("docker_compiler", data);




        // delete file
        fs.unlinkSync(`${PATH}/myapp${extension}`, (err) => {
            if (err) {
                console.log("error on deleting file in python.js ", err)
            }
        });

        return data;


    } catch (error) {

        console.log("eerror", error.toString())

    }
}

export { docker_compiler }