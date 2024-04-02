import { Navbar } from "../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function Login() {
    return (
      <div className="flex flex-col items-center m-8">
        <div className="flex flex-col items-center w-full max-w-6xl">
          <Navbar />
          <div className="flex flex-col items-center max-w-[56rem]">
            <div className="mt-4 md:mt-8 bg-dark-900 p-8 rounded-3xl w-full flex flex-col items-center shadow-md opacity-0 animate-fade animation-delay-[50ms] fill-mode-forwards">
              <div className="w-full flex flex-col items-center">
                <h1 className="text-yellow font-lobster text-4xl">Welcome Back</h1>
                <p className="mt-2 text-white font-light">Don't have an account? <Link to={"/signup"} className="font-bold underline">Sign Up</Link></p>
              </div>
              <div className="mt-12 md:w-96 flex flex-col items-center">
                <div className="relative w-full">
                  <MdEmail className="absolute h-4 w-4 top-[50%] left-4 box-border translate-y-[-50%] fill-gray opacity-50" />
                  <input type="text" className="w-full bg-dark-600 pl-9 py-2 rounded-full focus:outline focus:outline-2 outline-yellow text-slate placeholder-gray" placeholder="email address" />
                </div>
                <div className="relative w-full mt-4">
                  <FaLock className="absolute h-4 w-4 top-[50%] left-4 box-border translate-y-[-50%] fill-gray opacity-50" />
                  <input type="password" className="w-full bg-dark-600 pl-9 py-2 rounded-full focus:outline focus:outline-2 outline-yellow text-slate placeholder-gray" placeholder="password" />
                </div>
                <button className="mt-4 w-full p-2 rounded-full font-lobster bg-yellow text-xl">Login</button>
              </div>
              <div className="relative mt-8 border border-b-0 border-gray w-full">
                <div className="absolute w-full flex flex-col items-center translate-y-[-50%]">
                  <div className="text-sm h-6 w-6 bg-dark-900 text-gray text-center">or</div>
                </div>
              </div>
              <button className="mt-8 w-full p-2 rounded-full bg-dark-600 flex justify-center items-center text-slate">
                <FcGoogle className="mr-2 text-xl" /> continue with Google
              </button>
            </div>
          </div>
        </div>
      </div> 
    )
}
