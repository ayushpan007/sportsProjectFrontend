import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../../assets/image.png";

function Header() {
    const token = localStorage.getItem('token');
    const [mobileMenu, setMobileMenu] = useState(false);

    const navigate = useNavigate();

    const handleSignOut = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    return (
        <div className="min-h-full">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <img className="h-8 w-8" src={image1} alt="Your Company" />
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                {token ? (
                                    <button
                                        onClick={handleSignOut}
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Sign Out
                                    </button>
                                ) : (
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        <Link to={`/login`} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Sign In
                                        </Link>
                                        <Link to={`/signup`} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                aria-controls="mobile-menu" aria-expanded="false"
                                onClick={() => setMobileMenu(!mobileMenu)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {mobileMenu && (
                    <div className="md:hidden bg-gray-800 absolute w-full" id="mobile-menu">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
                            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
                            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
                            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
                            <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Reports</a>
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            {token ? (
                                <button
                                    onClick={handleSignOut}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    Sign Out
                                </button>
                            ) : (
                                <div className="space-y-1 px-2">
                                    <Link to={`/`} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                        Sign In
                                    </Link>
                                    <Link to={`/signup`} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Header;
