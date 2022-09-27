import "./style.css";
import Nav from "../../components/Nav/nav"
import NewMessage from "../../components/Post/newMessage";
import { UlogCtx } from "../../components/appContext";
import { useContext } from "react";

function Home(){

    const token = useContext(UlogCtx);
    console.log("token from home = ", token);
    //let isUserLoggedIn;
    
    function isUserLoggedIn(){
        if(token){
            console.log("hey ho ",token);
            return true;
            
        }
        else{
            return false;
        }
    }
    // function isUserLoggedIn(){
    //     if(token !==""){
    //         return false;
    //     }
    // }

    return(
        <div className="homeContainer">
           {/* <h1> page d'accueil 🏠 </h1> */}
           <Nav />
           <NewMessage isLoggedIn={isUserLoggedIn()} /> 
        </div>
    )

}

export default Home 