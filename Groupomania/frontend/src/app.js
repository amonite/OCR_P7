import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { useEffect, useState } from "react";
import "./style.css"

//import { UlogCtx } from "./components/appContext";
import Home from './pages/Home/home';
import SignIn from "./pages/SignIn/signIn";
import SignUp from './pages/SignUp/signUp';
import Error from './components/Error/error';
import Header from './components/Header/header';
import Footer from "./components/Footer/footer";
//import EditPost from "./components/EditPost/editPost";


function App(){

    /* this context is currently not in use, it is left here just in case I might need it */
    // const [ulog, setUlog] = useState(null);
    // useEffect(()=>{
    //     let cnt = 0;
    //     setUlog(cnt);
    // },[ulog]);
    

    return(
        <Router>
        <Header />
        {/* <UlogCtx.Provider value={ulog}> */}
            <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            {/* <Route path="/editPost/:id" element={<EditPost />}></Route> */}
            <Route path="*" element={<Error />}></Route>
            </Routes>
        {/* </UlogCtx.Provider> */}
        {/* <Footer /> */}

      </Router>

    )

}

export default App;