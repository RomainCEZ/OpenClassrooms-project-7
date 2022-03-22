import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Logo } from '../assets/Logo'
import { SessionContext } from "../pages/Auth/context/SessionContext";
import { DropDownNav } from './NavMenu/DropDownNav';

export default function Header() {

    const { loggedIn, user } = useContext(SessionContext)
    
    return (
        <header className="flex items-center justify-between bg-blue-900 p-5">
            <Logo />
            <nav className='right-6 text-white'>
            {!loggedIn 
                ? 
                <Link to="./login" 
                    className="px-6 py-3.5 bg-blue-700 text-white text-md rounded shadow-md
                    hover:bg-blue-600 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    transition duration-150 ease-in-out"
                >Se connecter</Link>
                :
                <DropDownNav username={user.username} />
            }
            </nav> 
        </header>
    )
}