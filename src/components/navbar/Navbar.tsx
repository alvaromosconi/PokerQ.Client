import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { getUser } from "../../services/user-services"
import { Dropdown } from "./Dropdown"
import { IUser } from "../../types";
import { useLocation } from "react-router-dom";

export function Navbar() {
    const [user, setUser] = useState<IUser | null>(null);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUser()
                .then((response) => {
                    const userData: IUser = response.data;
                    localStorage.setItem('user', JSON.stringify(userData))
                    setUser(userData);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [])

    const renderUserSection = () => {
        if (user) {
            return (
                <div className="mr-4 h-full items-center flex">
                    <Dropdown
                        options={[
                            { text: 'Profile', to: '/profile' },
                            { text: 'Logout', to: '/logout' }
                        ]}
                        userName={user.userName}
                    />
                </div>
            );
        } 
        else {
            return (
                <div className="user text-4xl mr-4 h-full items-center flex">
                    <button className="btn-logout text-white text-2xl">
                        <Link to="/login"> Sign in </Link>
                    </button>
                </div>
            )
        }
    }


    return (
        <div className="w-screen h-screen flex flex-col">
            {location.pathname !== "/play" 
                ? (
                    <nav className="navbar relative top-0 w-screen max-h-fit">
                        <div className="bg-[#722e9f] h-10 p-4 grid grid-cols-[1fr_3fr] w-full content-center">
                            <div className="ml-10 h-full flex items-center">
                                <Link to='/' className="text-white">
                                    <h1 className="font-bold text-2xl h-full w-fit">PokerQ</h1>
                                </Link>
                                <img src="" alt="" />
                            </div>
                            <div className="right-column flex gap-4 justify-self-end items-center h-full z-20">
                                {renderUserSection()}
                            </div>
                        </div>
                    </nav>
                )
                : null
            }
            <div className="container relative min-w-full h-full mx-auto flex items-center justify-center">
                <Outlet />
            </div>
        </div>
    );
}
