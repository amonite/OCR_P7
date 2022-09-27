import "./style.css";
import {useState} from "react";

function NewMessage(props){
    const isLoggedIn = props.isLoggedIn;
    const [message, setMessage] = useState("");

    function handleMessage(){
        //console.log({message});

        fetch("http://localhost:5000/api/posts",{
            method: "POST",
            // withCredentials: true,
            // credentials: 'include',
            headers: {
                "Authorization":"Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzI5ZTZiZjRhYzMzYTFjZjFkYmE5MzIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjQyOTAyNDAsImV4cCI6MTY2NDM3NjY0MH0.F8DapCu85lnTt622omNt5XAldQB9dKbLylYllQ_5Mow",
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