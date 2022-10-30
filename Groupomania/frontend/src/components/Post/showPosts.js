import {useEffect} from "react";
import {useState} from "react";
//import {useContext} from "react";
//import { UlogCtx } from "../appContext";
//import {Link} from "react-router-dom";
import "./showPosts_style.css";
import jwt_decode from "jwt-decode";

/* ======================================== */
/* display all posts within a single thread */
/* ======================================== */

function ShowPosts(props){
    const isLoggedIn = props.isLoggedIn;
    const [posts, setPosts] = useState([]);

    /* ================================== */
    /* get user info from session storage */
    /* ================================== */

    const token = JSON.parse(sessionStorage.getItem("mytoken"));

    let userId = "";
    let isAdmin;
    //let userName;

    if(token){
        const decodedToken = jwt_decode(token);
        userId = decodedToken.userId;
        isAdmin = decodedToken.isAdmin;
        //userName = decodedToken.email;
    };

    /* ================================= */
    /* fetch all posts from the database */
    /* ================================= */
    
    useEffect(()=>{
        if(isLoggedIn){
        getAllPosts();
        }
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
            logImages(); // debug test 
        })
        .catch(error => console.log("error = ", error));
    } 
    
    /* =========================== */
    /* checks if user is logged in */
    /* =========================== */

    function isUserlogged(){
       
        if(sessionStorage.length !==0){
            return true;
        }
        else{
            return false;
        }
    }

    const userLogged = isUserlogged();

    /* ============================= */
    /* delete post from the database */
    /* ============================= */

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

    /* ===================================================== */
    /* check if there is an image to display for every post  */
    /* currently not in use ... */
    /* ===================================================== */

    // function showImages(){
    //     for(let i=0;i<posts.length;i++){
    //         if(posts[i].imageUrl !==""){
    //             //console.log(`imageUrl = ${posts[i].imageUrl}`)
    //             return true;
    //         }
    //         else{
    //             return false;
    //         }
    //     }
    // }

    /* ======================== */
    /* left here for debug only */
    /* ======================== */

    function logImages(){
        for(let i=0;i<posts.length;i++){
                console.log(`imageUrl = ${posts[i].imageUrl}`);      
        }
    }

    /* ==================================== */
    /* check if user has liked/unliked post */
    /* ==================================== */

    // const [like, setLike] = useState(0)

    // function onOff(){
    //     setLike(1-like);
    //     return like
    // }

    async function likePost(id,usersLiked){
        
        let ulike = 0;
        
        if(usersLiked.length !==0){
            for(let i=0;i<usersLiked.length;i++){
                
                if(userId===usersLiked[i]){
                    ulike = 0;
                    //console.log(`ulike 0 = ${ulike}`);
                }
                else{
                    ulike = 1;
                    //console.log(`ulike 1 = ${ulike}`);
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
      
        //console.log(`postObject.like = ${postObject.like}`);

        await fetch("http://localhost:5000/api/posts/"+id+"/like",{
            method: "PUT",
            headers: {
                "Authorization":"Bearer "+token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(postObject)
        })
        .then(jsonResponse => jsonResponse.json())
        .then((res)=>{
            //console.log(res.message);
            refetchData();
            
        })
        .catch(error => console.log("error delete = ", error))

    }

    /* ================================================================== */
    /* refetch data is used to refresh page after user liked/unliked post */
    /* ================================================================== */

    async function refetchData(){
        await getAllPosts();
    }

    /* ============================= */
    /* check if post is being edited */
    /* ============================= */

    const [isEdited,setisEdited] = useState(false);
    const [postId, setPostId] = useState('');
    const [message, setMessage] = useState("");
    const [img, setImg] = useState(null);
       
    function editPost(_postId){
            if(isEdited){
                setisEdited(false)
            }
            else{
            console.log(`post id from edited post = ${_postId}`);
            setisEdited(true);
            setPostId(_postId);
            }
    }

    /* ================= */
    /* editing of a post */
    /* ================= */

    function handleEditedMessage(_postId, _postMessage){

        let date = new Date();
        let formdata = new FormData();
        let postObject;

        /* check if post message has been edited or not */
        if(message === ""){
            //alert("message vide");
            if(img !==null){
                postObject = {
                    message:_postMessage,
                    date:date.toString()
                }
                formdata.append("post", JSON.stringify(postObject));
                formdata.append("image", img);
            }
            else{
                postObject = {
                    message:_postMessage,
                    imageUrl:"",
                    date:date.toString()
                }
                formdata.append("post", JSON.stringify(postObject));
            }

        }
        else{
            if(img !==null){
                postObject = {
                    message:message,
                    date:date.toString()
                }
                formdata.append("post", JSON.stringify(postObject));
                formdata.append("image", img);
            }
            else{
                postObject = {
                    message:message,
                    imageUrl:"",
                    date:date.toString(),

                }
                formdata.append("post", JSON.stringify(postObject));
            }
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
            //console.log(res.message);  
            window.location= "/";
        })
    
        .catch(error => console.log("error = ", error));

    }
    if(isLoggedIn){
    return(
        
        <div className="main-container">
            {/* <h1>Messages</h1> */}
            {/* <div>
            {posts.map((post)=> (
                <p>{post.message}</p>
            ))}

            </div> */}
            <div className="post-container">
                {userLogged && posts.length !==0 ? 
                    (<div className="post-container-sub">
                        {posts.slice(0).reverse().map((post)=> (
                            <div className="post" key={post._id}>
                                <div className="post-info">
                                    <p className="post-author"><b>auteur : </b>{post.email}</p>
                                    <p className="post-date"><b>date : </b>{post.date}</p>
                                </div>
                                {/* {showImages() ? 
                                   
                                    (
                                    <div className="post-image-container">
                                        <img className="post-image"src={post.imageUrl} alt=""></img>
                                    </div>
                                    )
                                    
                                :
                                (<div className="post-noImage"></div>)
                                } */}
                                <div className="post-image-container">
                                    <img className="post-image"src={post.imageUrl} alt=""></img>
                                </div>
                             
                                <div className="post-message">
                                    {/* <p>{post.message}</p> */}
                                    {isEdited === false && <p>{post.message}</p>}
                                    {((isEdited && ((userId === post.userId) || (isAdmin === true) )) && (postId === post._id)) && (
                                        <div className="post-message-edited">
                                            <form>

                                                <textarea 
                                                    className="post-message-edited-textarea"
                                                    // rows = "12"
                                                    // cols = "80"
                                                    defaultValue = {post.message}
                                                    onChange = {(e)=> setMessage(e.target.value)}
                                                    
                                                >  
                                                
                                                </textarea>
                                                <div className="post-message-edited-hud">
                                                    <div>
                                                        <input type="file" 
                                                            name="image"
                                                            onChange={(e)=>{
                                                                    setImg(e.target.files[0]);
                                                            }}
                                                        >
                                                        </input>
                                                        {/* <label htmlFor="file-input" className="file-input-label">
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
                                                        ></input> */}
                                                    </div>
                                                    <div>
                                                        <button type="button" className="send-btn-edit" onClick={()=>{
                                                            // showMessage()
                                                            handleEditedMessage(post._id, post.message)
                                                            }
                                                        }>
                                                            <i className="fa-solid fa-xl fa-paper-plane fa-paper-plane-edit"></i>
                                                        </button>
                                                    </div>
                                                    {/* <p className="file-name"></p> */}
                                                </div>
                                                
                                            </form>
                                        </div>
                                    )}
                                </div>
                                {/* <p>identifiant du message :{post._id}</p> */}
                                {/* <p className="post-author">auteur : {post.email}</p> */}

                                {(userId === post.userId) || (isAdmin === true) ? 
                                    (<div className="post-hud-edit">
                                        <div className="post-hud-edit-buttons">
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
                                            <i className="fa-regular fa-xl fa-heart" onClick={()=>likePost(post._id, post.usersLiked)}>
                                                <i className="fa-solid fa-heart heart-back"></i>
                                            </i>
                                            <div className="likeCounter">
                                                {post.likes}
                                                {/* {post.usersLiked.length} */}
                                            </div>
                                        </div>
                                    </div>)
                                    :
                                    (<div className="postHud-other">
                                        <div className="likeContainer">
                                            <i className="fa-regular fa-xl fa-heart" onClick={()=>likePost(post._id, post.usersLiked)}>
                                                <i className="fa-solid fa-heart heart-back"></i>
                                            </i>
                                            <div className="likeCounter">
                                                {post.likes}
                                                {/* {post.usersLiked.length} */}
                                            </div>
                                        </div>
                                    </div>)} 
                            </div>
                        ))}
                    </div>)
                    :
                    (<div>
                        <p>Il n'y a aucun message à afficher</p>
                    </div>)}
            </div>
        </div>
                    
    );
    }
}

export default ShowPosts;