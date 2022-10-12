import { useState } from "react";
//import axios from "axios";


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
                localStorage.setItem("mytoken", JSON.stringify(res.token));
                localStorage.setItem("userId", res.userId);
                localStorage.setItem("userName",res.email);
                //localStorage.setItem("gm",JSON.stringify(res.isAdmin));
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



// axios({
        //     method: "post",
        //     url: "http://localhost:5000/api/auth/login",
        //     //withCredentials: true,
        //     data:{
        //         email,
        //         password,
        //     },
        //     headers:{
        //         "Content-Type": "application/json"
        //     }
        // })
        // .then((res)=>{
        //     //console.log(res.data);
        //     if(res.data.errors){
        //         emailError.innerHTML = res.data.errors.email;
        //         passwordError.innerHTML = res.data.errors.password;
        //     }
        //     else{
        //         window.location = "/";
        //     }
        // })
        // .catch((error)=>{
        //     console.log(error);
        // })