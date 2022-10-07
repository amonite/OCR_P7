import "./newMessage_style.css";
import { useState } from "react";
//import { useRef } from "react";
//import { useForm } from "react-hook-form";
//import {useContext} from "react";
//import { UlogCtx } from "../appContext";

function NewMessage(props){
    const isLoggedIn = props.isLoggedIn;
    const [message, setMessage] = useState("");
    const [img, setImg] = useState(null);
    //const token = useContext(UlogCtx);

    const token = JSON.parse(localStorage.getItem("mytoken"));

    //const formData = document.getElementById("imgForm");

    function handleMessage(){
       
        console.log("img depuis handleMessage = ", img);
        const postObject ={
            message:message
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
            //body: JSON.stringify(data)
            //body: JSON.stringify({message:message})
            //body: JSON.stringify({message:message, imageUrl:img})
           
        })
        .then(jsonResponse => jsonResponse.json())
        .then((res)=>{
            console.log(res.message)
            window.location = "/";
        })
        .catch(error => console.log("error = ", error));

    }
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  
    // const {
    //     register,
    //     handleSubmit,
    //     formState:{errors},
    // } = useForm();

    // const onformSubmit = (data) =>{
    //     console.log("new data =",data);
        
    //     fetch("http://localhost:5000/api/posts",{
    //     method: "POST",
    //     headers: {

    //         "Authorization":"Bearer "+token,
    //         "Content-Type":"application/json"
    //         //"Content-Type": "multipart/form-data"
    //     },
        
    //     body: new FormData(data)
    //     })
    //     .then(jsonResponse => jsonResponse.json())
    //     .then((res)=>{
    //         console.log(res.message)
    //         window.location = "/";
    //     })
    //     .catch(error => console.log("error = ", error));
    //};
   
    // const form = useRef(null);

    // const submit = e =>{
    //     e.preventDefault();
    //     const data = new FormData(form.current);
    //     console.log("data = ", data);
    //     // for(let [name, value] of data){
    //     //     alert(`${name} = ${value}`);
    //     // };
    //     fetch("http://localhost:5000/api/posts",{
    //         method: "POST",
    //         headers: {

    //             "Authorization":"Bearer "+token,
    //             //"Content-Type":"application/json"
    //             //"Content-Type": "multipart/form-data"
    //         },
            
    //         body: data
    //     })
    //     .then(jsonResponse => jsonResponse.json())
    //     .then((res)=>{
    //             console.log(res.message)
    //             window.location = "/";
    //     })
    //     .catch(error => console.log("error = ", error));
    //}

    if(isLoggedIn){
        return(
            <div>
                <h2>Nouveau message</h2>

                <form id="imgForm">
                    <textarea 
                        name="message"
                        rows="12" 
                        cols="80" 
                        onChange={(e)=> {setMessage(e.target.value)}}
                        value={message}
                        >
                        
                    </textarea>
                    <div className="message-hud">
                        
                            <input type="file"
                            name="image"
                            onChange={(e)=>{
                                console.log("target = ", e.target.files[0]);
                                setImg(e.target.files[0]);
                                //setTimeout(function(){console.log("img = ", img)}, 1000); 
                            }}
                            ></input>
                        
                        <button type="button" onClick={handleMessage}>Envoyer</button>
                        
                    </div>
                </form>


                 {/* <form ref={form} onSubmit={submit}>
                    <input type="text" name="message"></input>
                    <input type="file" name="image"></input>
                    <input type="submit"></input>
                </form> */}

                {/* <form onSubmit={handleSubmit(onformSubmit)}>
                    <label htmlFor="message">Enter Message</label>
                    <textarea rows="12" cols="80" id="message" name="message" {...register("message")}></textarea>
                    
                    <label htmlFor="image">Ajouter une image</label>
                    <input type="file" name="image" {...register("image")}></input>

                    <button>Send data</button>
                </form> */}
            </div>
        )
    }
    else{
        return(
            <div>Vous devez vous connecter pour envoyer un message</div>
        )
    }
}

export default NewMessage;