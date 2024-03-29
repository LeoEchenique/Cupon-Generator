import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";


const Nav = ({token}: any) => {
    return (
        <nav className="h-32 flex justify-between bg-amber-800 items-center" >
           
            <Link to={token !== null? `/inicio/${token}` : "/"}>
            <img className="w-32 h-48 md:ml-20 ml-6  rounded-lg object-contain min-h-0" src={logo} alt="Santa_ines_logo" />
            </Link>
            <ul className="md:mr-20 ml-20 mr-0">
                <Link to="/about" className="text-white text-lg">Cómo utilizar la aplicación?</Link>
           </ul>
        </nav>
    )
}

export default Nav;

