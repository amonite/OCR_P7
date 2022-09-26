import {Link} from "react-router-dom";
import "./style.css";


function Nav(){


    return(
        <nav>
            <ul>
                <li><Link to="/"><i className="fa-solid fa-2xl fa-house-chimney-window"></i>Accueil</Link></li>
                <li><Link to="/signin"><i className="fa-solid fa-2xl fa-right-to-bracket"></i>Se connecter</Link> </li>
                <li><Link to="/signup"><i className="fa-solid fa-2xl fa-user-plus"></i>S'enregistrer</Link></li>
            </ul>
        </nav>
    )

}

export default Nav;