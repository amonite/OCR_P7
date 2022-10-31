import {Link} from "react-router-dom";
import "./style.css";
//import {useContext} from "react";
//import {UlogCtx} from "../appContext";
import jwt_decode from "jwt-decode";

/* ===================== */
/* application main menu */
/* ===================== */

function Nav(){


    const token = JSON.parse(sessionStorage.getItem("mytoken"));
   
    let userName;
    if(token){
        const decodedToken = jwt_decode(token);
       
        userName = decodedToken.email;
    };

    function isUserlogged(){
       
        if(sessionStorage.length !==0){
            return true;
        }
        else{
            return false;
        }
    }

    const userLogged = isUserlogged();


    function logout(){
        sessionStorage.clear();
        window.location = "/";
    }

    return(
       
        <nav>
            {userLogged ? (
                <div className="user-logged">
                    <div className="user-logged-name">
                        vous êtes connecté en tant que : {userName}
                    </div>
                    <div className="user-logged-unlog">
                        <button type="button" onClick={logout}><i className="fa-solid fa-xl fa-right-from-bracket"></i></button>
                    </div>
                </div>
            ):(
                <div className="user-unlogged">
                    <ul>
                        {/* <li><Link to="/"><i className="fa-solid fa-2xl fa-house-chimney-window"></i>Accueil</Link></li> */}
                        <li><Link style={{color:"inherit", textDecoration:"none"}} to="/signin"><i className="fa-solid fa-2xl fa-right-to-bracket"></i>Se connecter</Link> </li>
                        <li><Link style={{color:"inherit", textDecoration:"none"}} to="/signup"><i className="fa-solid fa-2xl fa-user-plus"></i>S'enregistrer</Link></li>
                    </ul>
                </div>
            )}
            
        </nav>
    )

}

export default Nav;