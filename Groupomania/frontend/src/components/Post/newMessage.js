import "./newMessage_style.css";
import { useState } from "react";

import jwt_decode from "jwt-decode"

function NewMessage(props){

    const isLoggedIn = props.isLoggedIn;
    const [message, setMessage] = useState("");
    const [img, setImg] = useState(null);
    
    /* ================================== */
    /* get user info from session storage */
    /* ================================== */

    const token = JSON.parse(sessionStorage.getItem("mytoken"));

    // let userId = "";
    // let isAdmin;
    let userName;
    if(token){
        const decodedToken = jwt_decode(token);
        // userId = decodedToken.userId;
        // isAdmin = decodedToken.isAdmin;
        userName = decodedToken.email;
    };

    function handleMessage(){
       
        console.log("img depuis handleMessage = ", img);
        const postObject ={
            message:message,
            email:userName
        }
        const formData = new FormData();
        formData.append("post", JSON.stringify(postObject));
        formData.append('image', img);

        fetch("http://localhost:5000/api/posts",{
            method: "POST",
            headers: {

                "Authorization":"Bearer "+token,
                //"Content-Type":"application/json"
                //"Content-Type": "multipart/form-data"
            },
            body:formData
           
        })
        .then(jsonResponse => jsonResponse.json())
        .then((res)=>{
            console.log(res.message)
            window.location = "/";
        })
        .catch(error => console.log("error = ", error));

    }


    if(isLoggedIn){
        return(
            <div className="main">
                <h2>Nouveau message :</h2>
                <div id="message-form">
                <form>
                    <textarea 
                        name="message"
                        rows="12" 
                        cols="86" 
                        onChange={(e)=> {setMessage(e.target.value)}}
                        value={message}
                        >
                        
                    </textarea>
                    <div className="message-hud">
                        <label htmlFor="file-input" className="file-input-label">
                            <i className="fa-solid fa-xl fa-paperclip"></i>
                            
                        </label>
                        <input
                            className="file-input"
                            id="file-input" 
                            type="file"
                            name="image"
                            onChange={(e)=>{
                                console.log("target = ", e.target.files[0]);
                                setImg(e.target.files[0]);

                                const[file] = e.target.files;
                                const {name: fileName, size } = file;
                                const fileSize = (size/1000).toFixed(2);
                                const fileNameAndSize = `${fileName} - ${fileSize}KB`;
                                document.querySelector(".file-name").textContent = fileNameAndSize;
                                //setTimeout(function(){console.log("img = ", img)}, 1000); // debug
                            }}
                        ></input>
                        <p className="file-name"></p>
                        
                        <button type="button" className="send-btn" onClick={handleMessage}>
                            <i className="fa-solid fa-xl fa-paper-plane"></i>
                        </button>
                        
                    </div>
                    
                </form>
                </div>

            </div>
        )
    }
    else{
        return(
            <div className="unlogged-msg">
                <p>Vous devez vous connecter pour envoyer un message</p>
            </div>
        )
    }
}

export default NewMessage;