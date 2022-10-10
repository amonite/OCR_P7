//import {useContext} from "react";
//import { UlogCtx } from "../appContext";
import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";


import "./showPosts_style.css";

function ShowPosts(){
    
    //const token = useContext(UlogCtx);
    //let count = useContext(UlogCtx);
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

    //var count = 0;
    //const [likes, setLikes] = useState(""); 

    async function likePost(id,usersLiked){
        // count = 1 - count; 
        // //setLikes(count);
        // console.log(`count : ${count}`);
        // console.l    og(`id : ${id}`);
        let ulike = 0;
        //if(postUser_id===userId){
        if(usersLiked.length !==0){
            for(let i=0;i<usersLiked.length;i++){
                console.log(102);
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
            console.log(116);
            ulike = 1;
        }
        //}
        
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
                
                {showImages() ? (<img className="post_images"src={post.imageUrl} alt=""></img>):(<div></div>)}
                <p>{post.message}</p>
                {/* <p>identifiant du message :{post._id}</p>
                <p>identifiant du posteur :{post.userId}</p> */}

                {userId === post.userId ? 
                    (<div className="postHud-owner">
                        <div className="postHud-owner-actions">
                            <Link to={`/editPost/${post._id}`}>Editer</Link>
                            <button type="button" onClick={()=> deletePost(post._id)}>Supprimer</button>
                        </div>
                        <i className="fa-regular fa-xl fa-heart" onClick={()=>likePost(post._id, post.usersLiked)}></i>
                        <div>{post.likes}</div>
                    </div>)
                    :
                    (<div className="postHud-other">
                        <i className="fa-regular fa-xl fa-heart" onClick={()=>likePost(post._id, post.usersLiked)}></i>
                        <div>{post.likes}</div>
                    </div>)} 
                </div>
            ))}
            </div>):(<div>deconnecté</div>)}
            </div>
        </div>
    );
}

export default ShowPosts;