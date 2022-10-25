import SignUpForm from "../../components/SignUp/SignUpForm";
import Footer from "../../components/Footer/footer";
import "./style.css"

function SignUp(){

    return(
        <div className="signup-container">
            <SignUpForm />
            <Footer />
        </div>
    )

}

export default SignUp; 