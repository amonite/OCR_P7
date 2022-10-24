import "./style.css";
import Nav from "../../components/Nav/nav"
import NewMessage from "../../components/Post/newMessage";
import ShowPosts from "../../components/Post/showPosts";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";


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
            {/* <Header /> */}
            <Nav />
            <NewMessage isLoggedIn={islogged()} /> 
            <ShowPosts />
            {/* <Footer /> */}

        </div>
    )

}

export default Home 