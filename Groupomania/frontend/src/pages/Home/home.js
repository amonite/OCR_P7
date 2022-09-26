import "./style.css";
import Nav from "../../components/Nav/nav"
import NewMessage from "../../components/Post/newMessage";

function Home(){
    return(
        <div className="homeContainer">
           {/* <h1> page d'accueil 🏠 </h1> */}
           <Nav />
           <NewMessage /> 
        </div>
    )

}

export default Home 