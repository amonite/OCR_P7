//import {useContext} from "react";
//import { UlogCtx } from "../appContext";
import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";


import "./showPosts_style.css";
import jwt_decode from "jwt-decode";

function ShowPosts(){
    
    //const token = useContext(UlogCtx);
    //let count = useContext(UlogCtx);
    const [posts, setPosts] = useState([]);

    const token = JSON.parse(localStorage.getItem("mytoken"));
    //const userId = localStorage.getItem("userId");
    let userId = "";
    let isAdmin;
    let userName;
    if(token){
        const decodedToken = jwt_decode(token);
        userId = decodedToken.userId;
        isAdmin = decodedToken.isAdmin;
        userName = decodedToken.email;
    };

   // const decodedToken = parseJwt(token);

    //console.log(`decoded token = ${decodedToken}`);

    useEffect(()=>{
        getAllPosts();
    },[]);
    
    function getAllPosts(){
        fetch("http://localhost:5000/api/posts",{
            method: "GET",
            headers: { 
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
            setPosts(data);  // pass the data from the response to the state (var) posts 
            //logImages();
        })
        .catch(error => console.log("error = ", error));
    } 
    

    function isUserlogged(){
        // if(token){
        //     return true;
        // }
        // else{
        //     return false;
        // }
        if(localStorage.length !==0){
            return true;
        }
        else{
            return false;
        }
    }

    const userLogged = isUserlogged();

   


    function deletePost(id){

        if(window.confirm("Voulez vous vraiment supprimer votre message ?")){

            fetch("http://localhost:5000/api/posts/"+id,{
                method: "DELETE",
                headers: {
                    "Authorization":"Bearer "+token,
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>{
                    console.log(res.message)
                    window.location.reload(true);

            })
            .catch(error => console.log("error delete = ", error))

        }
        else{
            console.log("you canceled");
        }

    }

    function showImages(){
        for(let i=0;i<posts.length;i++){
            if(posts[i].imageUrl !==""){
                console.log(`imageUrl = ${posts[i].imageUrl}`)
                return true;

            }
            else{
                return false;
            }
        }
    }

    // function logImages(){
    //     for(let i=0;i<posts.length;i++){
            
    //             console.log(`imageUrl = ${posts[i].imageUrl}`);
           
    //     }
    // }

    

    async function likePost(id,usersLiked){
     
        let ulike = 0;
        
        if(usersLiked.length !==0){
            for(let i=0;i<usersLiked.length;i++){
                
                if(userId===usersLiked[i]){
                    ulike = 0;
                    console.log(`ulike 0 = ${ulike}`);
                }
                else{
                    ulike = 1;
                    console.log(`ulike 1 = ${ulike}`);

                }
            }
        }
        else{
        
            ulike = 1;
        }
        
        const postObject = {
            like: ulike,
            userId: userId
        }

        console.log(`postObject.like = ${postObject.like}`);

        await fetch("http://localhost:5000/api/posts/"+id+"/like",{
            method: "PUT",
            headers: {
                "Authorization":"Bearer "+token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(postObject)
        })
        // .then((res)=>{
        //     console.log(res.message)
        //     //window.location.reload(true);

        //  })
        .then(jsonResponse => jsonResponse.json())
        .then((res)=>{
            console.log(res.message);
            //getAllPosts();
            refetchData();
            //window.location="/";
        })
        .catch(error => console.log("error delete = ", error))

    }

   async function refetchData(){
        await getAllPosts();
   }

   const [isEdited,setisEdited] = useState(false);
   const [postId, setPostId] = useState('');
   const [message, setMessage] = useState("");
   const [img, setImg] = useState(null);

   function editPost(_postId){
        if(isEdited){
            setisEdited(false)
        }
        else{
        console.log(`post id from edt post = ${_postId}`);
        setisEdited(true);
        setPostId(_postId);
        }
   }

   /* this function is for testing only */
   function showMessage(){
    console.log("toto"+message);
   }

   function handleEditedMessage(_postId){

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
        
    
        fetch("http://localhost:5000/api/posts/"+_postId,{
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
            {/* <h1>Messages</h1> */}
            {/* <div>
            {posts.map((post)=> (
                <p>{post.message}</p>
            ))}

            </div> */}
            <div className="postContainer">
                {userLogged ? 
                    (<div>
                        {posts.slice(0).reverse().map((post)=> (
                            <div className="post" key={post._id}>
                                {showImages() ? 
                                    (<img className="post-image"src={post.imageUrl} alt=""></img>)
                                :
                                (<div className="post-noImage"></div>)
                                }
                                {/* <img className="post-images"src={post.imageUrl} alt=""></img> */}
                                <div className="post-message">
                                    {/* <p>{post.message}</p> */}
                                    {isEdited == false && <p>{post.message}</p>}
                                    {((isEdited && ((userId === post.userId) || (isAdmin === true) )) && (postId === post._id)) && (
                                        <div className="post-mesasge-edited">
                                            <textarea
                                                rows = "12"
                                                cols = "80"
                                                defaultValue = {post.message}
                                                onChange = {(e)=> setMessage(e.target.value)}
                                            >    
                                            </textarea>
                                            <div>
                                                <input type="file" 
                                                       name="image"
                                                       onChange={(e)=>{
                                                            setImg(e.target.files[0]);
                                                       }}
                                                >
                                                </input>
                                            </div>
                                            <div>
                                                <button type="button" onClick={()=>{
                                                    // showMessage()
                                                    handleEditedMessage(post._id)
                                                    }
                                                }>
                                                        Valider
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* <p>identifiant du message :{post._id}</p> */}
                                <p>auteur :{post.email}</p>

                                {(userId === post.userId) || (isAdmin === true) ? 
                                    (<div className="postHud-owner">
                                        <div className="postHud-owner-actions">
                                            {/* <Link to={`/editPost/${post._id}`}><i className="fa-regular fa-xl fa-pen-to-square"></i></Link> */}
                                            <button type="button" 
                                                    onClick={()=>{
                                                        editPost(post._id)
                                                    }}>
                                                    <i className="fa-regular fa-xl fa-pen-to-square"></i>
                                            </button>
                                            <button type="button" 
                                                    onClick={()=> {
                                                        deletePost(post._id)
                                                    }}>
                                                    <i className="fa-solid fa-xl fa-trash-can"></i>
                                            </button>
                                        </div>
                                        <div className="likeContainer">
                                            <i className="fa-regular fa-xl fa-heart" onClick={()=>likePost(post._id, post.usersLiked)}></i>
                                            <div className="likeCounter">
                                                {post.likes}
                                            </div>
                                        </div>
                                    </div>)
                                    :
                                    (<div className="postHud-other">
                                        <div className="likeContainer">
                                            <i className="fa-regular fa-xl fa-heart" onClick={()=>likePost(post._id, post.usersLiked)}></i>
                                            <div className="likeCounter">{post.likes}</div>
                                        </div>
                                    </div>)} 
                            </div>
                        ))}
                    </div>)
                    :
                    (<div>deconnecté</div>)}
            </div>
        </div>
    );
}

export default ShowPosts;