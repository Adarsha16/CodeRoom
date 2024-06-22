import fs from "fs";
import { Python_docker } from "./python/python_docker.js"
import { JavaScript_docker } from "./javascript/javascript_docker.js";
import { Cpp_docker } from "./cpp/cpp_docker.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config();



const python = async (InputText = "", extension) => {

    try {

        console.log("Run")

        let PATH = process.env.COMPILER_PATH;

        if (extension == ".py") {
            PATH = path.join(PATH, "python");
        } else if (extension == ".js") {
            PATH = path.join(PATH, "javascript");
        } else if (extension == ".cpp") {
            PATH = path.join(PATH, "cpp");
        }


        console.log("Selected path", PATH)

        const file = fs.writeFileSync(`${PATH}/app${extension}`, InputText)
        console.log("File after created", file);

        let data;
        if (extension == ".py") {
            data = (await Python_docker()).toString();
        }
        if (extension == ".js") {
            data = (await JavaScript_docker()).toString();
        }
        if (extension == ".cpp") {
            data = (await Cpp_docker()).toString();
        }

        console.log("docker_compiler", data);



        // delete file
        fs.unlinkSync(`${PATH}/app${extension}`, (err) => {
            if (err) {
                console.log("error on deleting file in python.js ", err)
            }
        });

        return data;


    } catch (error) {

        console.log("eerror", error.toString())

    }
}

export { python }