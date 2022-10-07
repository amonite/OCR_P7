//import {useContext} from "react";
//import { UlogCtx } from "../appContext";
import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";


import "./showPosts_style.css";

function ShowPosts(){
    
    //const token = useContext(UlogCtx);

    const [posts, setPosts] = useState([]);

    const token = JSON.parse(localStorage.getItem("mytoken"));

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

    const userId = localStorage.getItem("userId");


    function deletePost(id){
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

    function showImages(){
        for(let i=0;i<posts.length;i++){
            if(posts[i].imageUrl !==""){
                return true;
            }
            else{
                return false;
            }
        }
    }

    return(
        <div>
            <h1>Messages</h1>
            {/* <div>
            {posts.map((post)=> (
                <p>{post.message}</p>
            ))}

            </div> */}
            <div className="postContainer">
            {userLogged ? (<div>{posts.slice(0).reverse().map((post)=> (
                <div className="post" key={post._id}>
                <p>{post.message}</p>
                <p>identifiant du message :{post._id}</p>
                <p>identifiant du posteur :{post.userId}</p>
                {showImages() ? (<img src={post.imageUrl}></img>):(<div></div>)}
                {/* <img src={post.imageUrl} alt="" width="512" height="384"></img> */}
                {userId === post.userId ? 
                    (<div>
                        <Link to={`/editPost/${post._id}`}>Editer</Link>
                        <button type="button" onClick={()=> deletePost(post._id)}>Supprimer</button>

                    </div>)
                    :
                    (<div></div>)} 
                </div>
            ))}
            </div>):(<div>deconnecté</div>)}
            </div>
        </div>
    );
}

export default ShowPosts;