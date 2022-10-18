import {useState} from "react";
import {useEffect} from "react";

function EditPost(){

   
    const [message, setMessage] = useState("");
    const [img, setImg] = useState(null);
    
    /* get id from url */
    const url = window.location.href;
    console.log("url="+url);
    const urlstr = url.split("/");
    const id = urlstr.at(-1);
    console.log("id="+id);
    
    /* get token from storage */
    const token = JSON.parse(localStorage.getItem("mytoken"));
    //console.log("token = "+token);


    function handleEditedMessage(){

        /* get data for PUT */
        
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

    const [post, setPost] = useState(null);

    useEffect(()=>{
        getEditedPost();
    },[]);
    
    function getEditedPost(){
        fetch("http://localhost:5000/api/posts/"+id,{
            method: "GET",

            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token,
            }
        })
        .then((res)=>{
            if(res.ok){
                return res.json();
            }
        })
        .then((data)=>{
            console.log(data);
            setPost(data);
            //isDataLoaded = true;
            //console.log(`data loaded = ${isDataLoaded}`)
            //message = post.message;
        })
        .catch(error => console.log("error = ", error));
    }

    //Does useEffect run after every render? Yes! 
    //By default, it runs both after the first render and after every update
    //https://reactjs.org/docs/hooks-effect.html

    // useEffect(()=>{
    //     getEditedPost();
    // },[]); //the array arg at the end is to make run only once !!
  
    

    console.log(117);

    return(
        <div>
        <h1>Editer votre message</h1>
        <div>
            
                   <textarea 
                   //value={post?.message || "not loaded yet"}
                   rows="12" 
                   cols="80"
                   onChange={(e)=> setMessage(e.target.value)}
                   //value={((post?.message) && message)|| "not loaded yet"}
                   value={message}
                   >
               </textarea>
            
            
         
            {/* <p>{post.message}</p> */}
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