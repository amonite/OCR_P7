import { useState } from "react";
import SignIn from "./signIn";
import SignUp from "./signUp";
import "./style.css";

function Log(props){

    const [signInModal, setSignInModal] = useState(props.signin);
    const [signUpModal, setSignUpModal] = useState(props.signup);

    function handleModals(e){
        if(e.target.id == "signUp"){
            setSignInModal(false);
            setSignUpModal(true);
        }
        else if(e.target.id == "signIn"){
            setSignInModal(true);
            setSignUpModal(false);
        };
    };

    return(
        <div className="form-container">
            
            <ul>
                <li onClick={handleModals} id="signUp" className={signUpModal ? "active-btn" : null}>Inscription</li>
                <li onClick={handleModals} id="signIn" className={signInModal ? "active-btn" : null}>Connexion</li>
            </ul>
            {signUpModal && <SignUp />}
            {signInModal && <SignIn />}
        </div>
        
    )
}

export default Log;