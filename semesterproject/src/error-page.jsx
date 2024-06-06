import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {

    const error = useRouteError();
    const navigate = useNavigate();
    console.log(`%c  FOR DEVELOPER `, 'background: #555; color: yellow', { error });


    return (

        <div className="h-screen flex justify-center items-center bg-slate-400">

            <div id="error-page" className=" text-white rounded-lg p-20 flex justify-center items-center flex-col gap-4">

                <div className="text-3xl">

                    <h1 className="text-lg font-extrabold">Oops!</h1>
                    <p className="font-bold">Something went wrong</p>

                </div>


                <div className="flex flex-col border-2 p-5 font-medium">

                    <i> Error : {error?.status} - {error?.statusText} </i>
                    <i> Reason : {error?.error.message} </i>

                </div>


                <button className="bg-white text-black py-3 px-6 rounded-lg mt-10 font-semibold shadow-md shadow-slate-500 " onClick={() => { navigate("/") }}>Go Back!</button>

            </div>

        </div>

    )

}