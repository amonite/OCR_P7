import {useState} from "react";

function EditPost(){

    // const url = new URL(window.location.href);
    // console.log("url="+url);
    // const id = url.searchParams.get("id");
    // console.log("id="+id);
    const [message, setMessage] = useState("");
    // const token = JSON.parse(localStorage.getItem("mytoken"));
    // console.log("token = "+token);

    function handleEditedMessage(){

        const url = window.location.href;
        console.log("url="+url);
        const urlstr = url.split("/");
        const id = urlstr.at(-1);
        console.log("id="+id);
        //const [message, setMessage] = useState("");
        const token = JSON.parse(localStorage.getItem("mytoken"));
        console.log("token = "+token);
        
        fetch("http://localhost:5000/api/posts/"+id,{
            method: "PUT",

            headers:{
                "Authorization":"Bearer "+token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({message})
        })
        .then(jsonResponse => jsonResponse.json())
        .then((res)=>{
            console.log(res.message)
            window.location= "/";
        })
        .catch(error => console.log("error = ", error));

    }


    return(
        <div>
        <h1>Editer votre message</h1>
        <div>
            <textarea 
                rows="12" 
                cols="80"
                onChange={(e)=> setMessage(e.target.value)}
                value={message}
                >


            </textarea>
        </div>
        <div>
            <button type="button" onClick={handleEditedMessage}>Envoyer</button>
        </div>
        </div>
    )
}

export default EditPost;