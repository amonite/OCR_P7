import "./style.css";
import Nav from "../../components/Nav/nav"
import NewMessage from "../../components/Post/newMessage";
import ShowPosts from "../../components/Post/showPosts";
import Footer from "../../components/Footer/footer";



function Home(){

    /* check if user is logged */ 
    function islogged(){
     
        if(sessionStorage.length !==0){
            return true;
        }
        else{
            return false;
        }
    }

    return(
        <div className="homeContainer">
            
            <Nav />
            <NewMessage isLoggedIn={islogged()} /> 
            <ShowPosts isLoggedIn={islogged()}/>
            <Footer />

        </div>
    )

}

export default Home 