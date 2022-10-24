import "./style.css";

function Header(){

    function getbackHome(){
        window.location = "/";
    }

    return(
        <header>
            <div className="logo-container">
                <img src="./img/icon-left-font-monochrome-black.svg" onClick={getbackHome} alt="logo-groupomania"></img>  
            </div>
        </header>
    )

}

export default Header;