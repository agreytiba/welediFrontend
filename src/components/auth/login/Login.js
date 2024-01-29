import React, { Component } from 'react';
import './Login.scss'
import GoogleImage from '../../../assets/google.png'
import FacebookImage from '../../../assets/facebook.png'
import Input from '../../Form/simple-input/SimpleInput'
import fire, { googleProvider, facebookProvider } from '../../../conf/fire';
import addUser from '../../../firestore/auth'
import { IncrementUsers } from '../../../firestore/dbOperations';
import { withTranslation } from 'react-i18next';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.handleInputs = this.handleInputs.bind(this);
        this.signInWithGoogle = this.signInWithGoogle.bind(this);
        this.signInWithFacebook = this.signInWithFacebook.bind(this);
        this.login = this.login.bind(this);
    }

    login(event) {
        event.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            // Successfully Logged in 

            

            this.props.closeModal();  // To close the login modal on success
        }).catch((error) => {
            this.props.throwError(error.message);
            console.log(error);
        });
    }

    handleInputs(title, value) {
        switch (title) {
            case "Email":
                this.setState({ email: value });
                break;
            case "Password":
                this.setState({ password: value });
                break;
            default:
                break;
        }
    }

    signInWithGoogle() {
        fire.auth().signInWithPopup(googleProvider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            
            addUser(user.uid, "Welcome", "back", user.email);
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
        this.props.closeModal();
    }

    signInWithFacebook() {
        fire.auth().signInWithPopup(facebookProvider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            addUser(user.uid, "Welcome", "back", user.email);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
        this.props.closeModal();
    }

    render() {
        const { t } = this.props;
        return (
            <div className="auth">
                <div className="head">
                    <span> {t("login.login")}</span>
                </div>
                <div className="body">
                    <div className="socialAuth">
                        <div onClick={() => { this.signInWithGoogle() }} className="googleAuthItem">
                            <img src={GoogleImage} alt="Google" />
                            <span>{t("login.googleLogin")} Google</span>
                        </div>
                        <div onClick={() => { this.signInWithFacebook() }} className="facebookAuthItem">
                            <img src={FacebookImage} alt="Facebook" />
                            <span>{t("login.facebookLogin")} Facebook</span>
                        </div>
                        <div className="devider">
                            <hr />
                            <span>{t("login.or")}</span>
                        </div>
                        <form onSubmit={this.login}>
                            <div>
                                <Input name="Email" title={t("login.email")} handleInputs={this.handleInputs} />
                            </div>
                            <div>
                                <Input name="Password" type="Password" title={t("login.password")} handleInputs={this.handleInputs} />
                            </div>
                            <input className="inputSubmit" value={t("login.login")} type="submit" />
                        </form>
                    </div>
                </div>
                <div className="modalFooter">
                    <span>{t("login.dontHaveAcc")}<a onClick={() => this.props.handleNavigationClick()}>{t("login.signup")}</a></span>
                    <span>{t("login.passwordLost")} <a onClick={() => this.props.showPasswordRecovery()}>{t("login.recoverPassword")}</a></span>
                </div>
            </div>
        );
    }
}

const MyComponent = withTranslation('common')(Login)
export default MyComponent;
