import "./style.css";

function Header(){

    function getbackHome(){
        window.location = "/";
    }

    return(
        <div className="logo-container">
            <img src="./img/icon-left-font-monochrome-black.svg" onClick={getbackHome} alt="logo-groupomania"></img>
            
        </div>
    )

}

export default Header;