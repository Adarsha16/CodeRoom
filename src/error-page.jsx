import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {

    const error = useRouteError();
    const navigate = useNavigate();
    console.log(`Error : (${error.status})  ${error.error.message}`);


    return (

        <div className="h-screen flex justify-center items-center ">

            <div id="error-page" className=" text-white bg-black rounded-lg p-20 flex justify-center items-center flex-col gap-4">

                <div className="text-3xl">

                    <h1 className="text-lg font-bold">Oops!</h1>
                    <p className="font-medium">Something went wrong</p>

                </div>


                <div className="flex flex-col border p-5">

                    <i>Error : {error.status} - {error.statusText}</i>
                    <i>Reason : {error.error.message}</i>

                </div>


                <button className="bg-white text-black py-2 px-4 rounded-lg my-5 font-medium" onClick={() => { navigate("/") }}>Go Back</button>

            </div>

        </div>

    )

}