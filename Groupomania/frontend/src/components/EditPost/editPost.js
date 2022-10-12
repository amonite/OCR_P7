import {useState} from "react";

function EditPost(){

    // const url = new URL(window.location.href);
    // console.log("url="+url);
    // const id = url.searchParams.get("id");
    // console.log("id="+id);
    const [message, setMessage] = useState("");
    const [img, setImg] = useState(null);
    // const token = JSON.parse(localStorage.getItem("mytoken"));
    // console.log("token = "+token);

    function handleEditedMessage(){
        
        /* get id from url */
        const url = window.location.href;
        console.log("url="+url);
        const urlstr = url.split("/");
        const id = urlstr.at(-1);
        console.log("id="+id);
        
        /* get token from storage */
        const token = JSON.parse(localStorage.getItem("mytoken"));
        console.log("token = "+token);

        // /* get data for PUT */
        // const postObject = {
        //     message: message
        // }
        // const formdata = new FormData();
        // formdata.append("post", JSON.stringify(postObject));
        // //console.log(`img = ${img}`);
        // formdata.append("image", img);
        let formdata = new FormData();
        let postObject;

        if(img !==null){
            postObject = {
                message:message
            }
            formdata.append("post", JSON.stringify(postObject));
            formdata.append("image", img);
        }
        else{
            postObject = {
                message:message,
                imageUrl:""
            }
            formdata.append("post", JSON.stringify(postObject));
        }
        
       
        fetch("http://localhost:5000/api/posts/"+id,{
            method: "PUT",

            headers:{
                "Authorization":"Bearer "+token,
                //"Content-Type":"application/json"
            },
            //body: JSON.stringify({message})
            body:formdata
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
            <input 
                type="file"
                name="image"
                onChange={(e)=>{
                    setImg(e.target.files[0]);
                }}
                > 
            </input>
        </div>
        <div>
            <button type="button" onClick={handleEditedMessage}>Envoyer</button>
        </div>
        </div>
    )
}

export default EditPost;