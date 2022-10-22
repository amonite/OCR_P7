import { useState } from "react";

/* ================================= */
/* sign in componenent to login user */
/* ================================= */

function SignInForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e){
        e.preventDefault();

        const emailError = document.querySelector(".emailError");
        const passwordError = document.querySelector(".passwordError");

        
        fetch("http://localhost:5000/api/auth/login",{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email, password})
        })
        .then(jsonResponse => jsonResponse.json())
        .then((res)=>{
            //console.log(res.userId);
            emailError.innerHTML = "";
            passwordError.innerHTML = "";
            if(res.message === "utilisateur non trouvé :/"){
                emailError.innerHTML = res.message;
            }
            else if(res.message === "mot de passe incorect :/"){
                passwordError.innerHTML = res.message; 
            }
            else{
                
                console.log("token : "+ res.token);
                
                sessionStorage.setItem("mytoken", JSON.stringify(res.token));
                sessionStorage.setItem("userId", res.userId);
                sessionStorage.setItem("userName", res.email)
                
                console.log("utilisateur connecté :)");
                window.location = "/";
            }
            
        })
        .catch(error => console.log("error = ", error));

    };

    return(
        <div>
            <h1>Veuillez vous connecter</h1>
            <form action="" onSubmit={handleLogin} id="signIn-form">
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
                <label htmlFor="password">Mot de passe</label>
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
                <input type="submit" value="Se connecter"></input>
            </form>
        </div>
    )
};

export default SignInForm;

