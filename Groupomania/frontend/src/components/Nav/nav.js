import {Link} from "react-router-dom";
import "./style.css";
//import {useContext} from "react";
//import {UlogCtx} from "../appContext";
import jwt_decode from "jwt-decode";

function Nav(){

    //const token = useContext(UlogCtx);
    
    const userName = localStorage.getItem("userName");
    // const token = JSON.parse(localStorage.getItem("mytoken"));
    // const decodedToken = jwt_decode(token);
    // console.log(`decoded token = ${decodedToken.isAdmin}`);

    

    function isUserlogged(){
       
        if(localStorage.length !==0){
            return true;
        }
        else{
            return false;
        }
    }

    const userLogged = isUserlogged();

    console.log("userLogged = ",userLogged);

    function logout(){
        localStorage.clear();
        window.location = "/";
    }

    return(
        // <nav>
        //     <ul>
        //         <li><Link to="/"><i className="fa-solid fa-2xl fa-house-chimney-window"></i>Accueil</Link></li>
        //         <li><Link to="/signin"><i className="fa-solid fa-2xl fa-right-to-bracket"></i>Se connecter</Link> </li>
        //         <li><Link to="/signup"><i className="fa-solid fa-2xl fa-user-plus"></i>S'enregistrer</Link></li>
        //     </ul>
        // </nav>
        <nav>
            {userLogged ? (
                <div className="userLogged">
                    <div>vous êtes connecté en tant que : {userName}</div>
                    {/* <ul>
                        <li><Link to="/"><i className="fa-solid fa-2xl fa-house-chimney-window"></i>Accueil</Link></li>
                    </ul> */}
                    <button type="button" onClick={logout}>Se deconnecter</button>
                </div>
            ):(
                <div className="userUnlogged">
                    <ul>
                        <li><Link to="/"><i className="fa-solid fa-2xl fa-house-chimney-window"></i>Accueil</Link></li>
                        <li><Link to="/signin"><i className="fa-solid fa-2xl fa-right-to-bracket"></i>Se connecter</Link> </li>
                        <li><Link to="/signup"><i className="fa-solid fa-2xl fa-user-plus"></i>S'enregistrer</Link></li>
                    </ul>
                </div>
            )}
            
        </nav>
    )

}

export default Nav;