import Log from "../../components/Log/log";

function Profil(){
    return(
        <div>
            <h1>page de profil <img src="./img/portrait.png"></img></h1>
            
            <Log signin={false} signup={true} />
        </div>
        
    )
}

export default Profil;