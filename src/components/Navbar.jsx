import logo from "../assets/images/Logo.png"
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
const Navbar = () => {
    const {user, logOut} = useAuth()
    
    const handleLogOut = async() => {
        await logOut()
        toast.success("SignOut Successful!")
    }
    return (
        <div className="flex justify-between items-center px-3 bg-gray-50 shadow-md mb-6">
            <img src={logo} className="w-28" alt="" />
            {
                user ? <button onClick={()=> handleLogOut()} className="rounded px-4 py-3 font-semibold text-white bg-red-600 hover:bg-red-500">SignOut</button> : <Link to="login"><button className="rounded px-4 py-3 font-semibold text-white bg-green-600 hover:bg-green-500">SignIn</button></Link>
            }
            
        </div>
    );
};

export default Navbar;