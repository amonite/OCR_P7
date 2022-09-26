import {useState} from "react";

function SignUpForm(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignUp(e){
        e.preventDefault();

        const emailError = document.querySelector('.emailError');


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
            else{
                console.log("utilisateur enregistré :)");
                window.location = "/signin";
            }
        })
        .catch(error => console.log('error sign up = ', error));
    };
    

    return(
        <div>
            signUpForm is here :)
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
                <input type="submit" value="Se connecter"></input>
            </form>
        </div>
    )
}

export default SignUpForm;