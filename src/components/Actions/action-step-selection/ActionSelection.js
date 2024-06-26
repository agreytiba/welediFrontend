import React, { Component } from 'react';
import './ActionSelection.scss';
import { CSSTransition } from 'react-transition-group';
import conf from '../../../conf/configuration'
import logo from '../../../assets/logo/logo.png'
import { Analytics } from '../../Analytics';
import { motion, AnimatePresence } from "framer-motion"
import AuthWrapper from '../../auth/authWrapper/AuthWrapper'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next';
class ActionSelection extends Component {
  constructor(props) {
    super(props);
    var AnalyticsObject = Analytics;
    AnalyticsObject("Template-selection");
  }
  render() {
    const { t } = this.props;
    return (
      <div className="action">
        <div className="action-introWrapper action-selection">
          <AnimatePresence>
         
          </AnimatePresence>
          <div className="head">
            <div className="brand">
              {conf.brand.useImg == false ? <span>{conf.brand.name}</span> : <img className="logo" src={logo} />}
            </div>
            <div className="authentication">
              {this.props.user == null && <Link style={{ textDecoration: "none" }} onClick={() => this.props.authBtnHandler()} to={{ pathname: "/" }} className="authenticationButton">    {t("login.login")} </Link>}
              {this.props.user != null && <Link style={{ textDecoration: "none" }} to={{ pathname: "/dashboard" }} className="authenticationButton">  {t("selectionAction.account")}</Link>}
              {this.props.user != null && <a style={{ textDecoration: "none" }} 
              onClick={()=>this.props.resetNavigation()}
               className="authenticationButton">Return</a>}
              {this.props.user != null && <a onClick={() => this.props.logout()} className="authenticationButton">   {t("dashboard.logout")} </a>}
            </div>
          </div>
          <CSSTransition appear={true} in={true} classNames="fade" timeout={1000}>
            <div className="body">
            { this.props.currentStep !== undefined && this.props.currentStep ===  'Template Selection' ? 
                            <h1>{t("selectionAction.titleLeft")} <span> {t("selectionAction.titleSpan")} </span> {t("selectionAction.titleRight")}</h1>
                            : this.props.currentStep ===  'Action Cover Selection' ?
                  <div>  <h2> How to create cover letter </h2>
                  <ul>
                    <li> 1.click the picture of template you want from  templates list</li>
                    <li>2. fill  <span>personal details form </span> and <span>employer details form</span></li>
                    <li>3. after fill the informations, below the template you will find two  save and Download</li>
                  </ul>
                  </div> : ""
                  

            }
              <button onClick={this.props.handlePreviewToggle} className="btn-default  mobile-only">
                {t("selectionAction.templates")}
              </button>
            </div>
          </CSSTransition>
          <div className="footer mobile-only">
          </div>
        </div>
      </div>
    );
  };

}
const MyComponent = withTranslation('common')(ActionSelection)
export default MyComponent;