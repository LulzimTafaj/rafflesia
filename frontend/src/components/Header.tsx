import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { SignOutButton } from "./SignOutButton";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-rose-900 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">
                    Rafflesia.com
                    </Link>
                </span>
                <span className="flex space-x-2 text-white md:my-2">
                    {isLoggedIn ? <>
                        <Link className="flex items-center text-white px-3 font-semibold hover:bg-rose-700 rounded-sm hover:cursor-pointer" to="/my-bookings">
                            My Bookings
                        </Link>
                        <Link className="flex items-center text-white px-3 font-semibold hover:bg-rose-700 rounded-sm hover:cursor-pointer" to="/my-hotels">
                            My Hotels
                        </Link>
                        <SignOutButton />
                    </> : <Link to="/sign-in" className="flex items-center text-rose-700 px-4 py-1 font-bold bg-white hover:bg-gray-100 rounded-sm text-sm border-none">
                        Sign In
                    </Link>}
                </span>
            </div>
        </div>
    )
}

export default Header;