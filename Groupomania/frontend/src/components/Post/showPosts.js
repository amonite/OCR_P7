//import {useContext} from "react";
//import { UlogCtx } from "../appContext";
import {useEffect} from "react";
import {useState} from "react";

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
            setPosts(data);
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
                <p>{post._id}</p>
                <p>{post.userId}</p>
                {userId == post.userId ? (<div>same id</div>):(<div></div>)} 
                </div>
            ))}
            </div>):(<div>deconnecté</div>)}
            </div>
        </div>
    );
}

export default ShowPosts;