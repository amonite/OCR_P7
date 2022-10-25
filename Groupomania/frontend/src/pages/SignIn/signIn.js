import SignInForm from "../../components/SignIn/SignInForm";
import Footer from "../../components/Footer/footer";
import "./style.css";

function SignIn(){
    return(
        <div className="signin-container">
            <SignInForm />
            <Footer />
        </div>
    )

}

export default SignIn;