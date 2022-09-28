import "./style.css";
import {useState} from "react";
//import {useContext} from "react";
//import { UlogCtx } from "../appContext";

function NewMessage(props){
    const isLoggedIn = props.isLoggedIn;
    const [message, setMessage] = useState("");
    //const token = useContext(UlogCtx);

    const token = JSON.parse(localStorage.getItem("mytoken"));

    function handleMessage(){
        //console.log({message});

        fetch("http://localhost:5000/api/posts",{
            method: "POST",
            // withCredentials: true,
            // credentials: 'include',
            headers: {

                "Authorization":"Bearer "+token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({message})
        })
        .then(jsonResponse => jsonResponse.json())
        .then((res)=>{console.log(res.message)})
        .catch(error => console.log("error = ", error));

    }
    if(isLoggedIn){
        return(
            <div>
                <h2>Nouveau message</h2>
                <textarea 
                    rows="12" 
                    cols="80" 
                    onChange={(e)=> setMessage(e.target.value)}
                    value={message}
                    >
                    
                </textarea>
                <div className="message-hud">
                    <button type="button" onClick={handleMessage}>Envoyer</button>
                </div>
            </div>
        )
    }
    else{
        return(
            <div>Vous de devez vous connecter pour envoyer un message</div>
        )
    }
}

export default NewMessage;