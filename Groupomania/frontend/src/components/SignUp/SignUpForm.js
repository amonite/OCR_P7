import {useState} from "react";
import "./style.css";

function SignUpForm(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignUp(e){
        e.preventDefault();

        const emailError = document.querySelector('.emailError');
        const passwordError = document.querySelector(".passwordError")

        fetch("http://localhost:5000/api/auth/signup",{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email, password})
        })
        .then(jsonResponse => jsonResponse.json())
        .then((res)=>{
            if(res.message === "cet email est déjà pris ! "){
                emailError.innerHTML = res.message;
            }
            else if(res.message === "votre mot de passe ne convient pas"){
                passwordError.innerHTML = res.message;
            }
            else{
                console.log("utilisateur enregistré :)");
                window.location = "/signin";
            }
        })
        .catch(error => console.log('error sign up = ', error));
    };
    

    return(
        <div>
            <h1>Veuillez vous enregistrer</h1>
            <form action="" onSubmit={handleSignUp} id="signUp-form">
                <label htmlFor="email">Email</label>
                <br/>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                />
                <div className="emailError"></div>
                <br/>
                <label htmlFor="password">Password</label>
                <br/>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                />
                <div className="passwordError"></div>
                <br/>
                <input type="submit" value="S'enregister"></input>
            </form>
            <div className="password-info">
               
                <p>
                <i className="fa-solid fa-circle-info"></i>
                    Pour être valide votre mot de passe doit comporter au moins 8 charactères,<br/>
                    une majuscule et deux chiffres.
                </p> 
            </div>
        </div>
    )
}

export default SignUpForm;