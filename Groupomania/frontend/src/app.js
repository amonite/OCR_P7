import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css"

import { UlogCtx } from "./components/appContext";
import Home from './pages/Home/home';
import SignIn from "./pages/SignIn/signIn";
import SignUp from './pages/SignUp/signUp';
import Error from './components/Error/error';
import Header from './components/Header/header';


function App(){

    const [ulog, setUlog] = useState(null);
    useEffect(()=>{
        function getToken(){
            if(localStorage.length !==0){
                return localStorage.getItem("mytoken");
                // do not forget to delete token after !!!
            }
        }
        const token = getToken();
        setUlog(token);
    },[ulog]);
    
    //setUlog(token);
    //setUlog(getToken());
    //console.log(getToken());

    return(
        <Router>
        <Header />
        <UlogCtx.Provider value={ulog}>
            <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="*" element={<Error />}></Route>
            </Routes>
        </UlogCtx.Provider>
      </Router>

    )

}

export default App;