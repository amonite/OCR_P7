//import {useContext} from "react";
//import { UlogCtx } from "../appContext";
import {useEffect} from "react";
import {useState} from "react";

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

    return(
        <div>
            <h1>posts</h1>
            {/* <div>
            {posts.map((post)=> (
                <p>{post.message}</p>
            ))}

            </div> */}
            {userLogged ? (<div>{posts.slice(0).reverse().map((post)=> (
                <div>
                <p key={post._id}>{post.message}</p>
                <p>{post._id}</p>
                </div>
            ))}</div>):(<div>deconnecté</div>)}
        </div>
    );
}

export default ShowPosts;