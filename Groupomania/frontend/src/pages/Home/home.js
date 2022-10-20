import "./style.css";
import Nav from "../../components/Nav/nav"
import NewMessage from "../../components/Post/newMessage";
import ShowPosts from "../../components/Post/showPosts";
import Footer from "../../components/Footer/footer";
//import { useContext } from "react";
//import { UlogCtx } from "../../components/appContext";


function Home(){

    //const token = useContext(UlogCtx);
   
   
    function islogged(){
        // if(token){
        //     console.log("token from home = ", token);
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

    // Clear localStorage 
    // async function cls(){
    //     let promise = new Promise((resolve, reject)=>{
    //         setTimeout(() =>resolve(localStorage.clear()),5000)
    //     });
    //      await promise;
        
    // }
    //cls();

    return(
        <div className="homeContainer">
           {/* <h1> page d'accueil 🏠 </h1> */}
           <Nav />
           <NewMessage isLoggedIn={islogged()} /> 
           <ShowPosts />
           <Footer />
        </div>
    )

}

export default Home 