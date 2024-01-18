import React, { Component } from "react";
import "./ActionIntroduction.scss";
import logo from "../../../assets/logo/logo.png";
import conf from "../../../conf/configuration";
import { Link } from "react-router-dom";
// import LanguagePicker from '../../Form/language-picker/LanguagePicker';
import { withTranslation } from "react-i18next";
import { getPages } from "../../../firestore/dbOperations";
import TrustPilotImage from "../../../assets/trustpilot.png";
import HeadPNG from "../../../assets/headPNG.png";
import FeaturesPNG from "../../../assets/FeaturesPNG.png";
import resumeJpg from "../../../assets/resumesNew/Cv1.JPG";

import { ReactComponent as Stars } from "../../../assets/stars.svg";
import { HiMenuAlt2 } from "react-icons/hi";
import { get3Reviews, getWebsiteData } from "../../../firestore/dbOperations";

class ActionIntroduction extends Component {
  constructor(props) {
    super(props);
    if (document.location.search.substr(0, 7) === "?step=3") {
      this.props.goThirdStep();
    }

    this.getData();
    this.state = {
      pages: [],
      isMobileHeadToggle: false,
      reviews: [],
      reviewsNumber: 0,
    };
    window.location.pathname.substring(0, 8) === "/" && this.customStyles();

    this.customStyles = this.customStyles.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  authVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  handleToggleClick = () => {
    this.setState({ isMobileHeadToggle: !this.state.isMobileHeadToggle });
  };

  getData() {
    getWebsiteData().then((data) => {
      if (data) {
        this.setState({ reviewsNumber: data.rating });
      }
    });
  }

  customStyles() {
    document.getElementsByTagName("body")[0].style.height = "100%";
    document.getElementsByTagName("body")[0].style.overflow = "scroll";
  }

  componentDidMount() {
    getPages().then(
      (value) => value !== null && this.setState({ pages: value })
    );
    get3Reviews().then(
      (value) => value !== null && this.setState({ reviews: value })
    );
  }
  render() {
    const { t } = this.props;
    return (
      <div id="homepage" className="action-introWrapper">
        <div className="head">
          <div className="brand">
            {conf.brand.useImg === false ? (
              <span>{conf.brand.name}</span>
            ) : (
              <img className="logo" src={logo} />
            )}
          </div>
          <div className="authentication">
            {this.props.user !== null ? (
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: "./dashboard" }}
                className="authenticationButton"
              >
                {" "}
                {t("selectionAction.account")}
              </Link>
            ) : (
              <a
                onClick={() => this.props.authBtnHandler()}
                className="authenticationButton"
              >
                {" "}
                {t("intro.login")}{" "}
              </a>
            )}
            {this.props.values.email === conf.adminEmail && (
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: "./adm/dashboard" }}
                className="authenticationButton"
              >
                {" "}
                {t("selectionAction.admin")}
              </Link>
            )}
            {/* {this.props.user != null && <a onClick={() => this.props.logout()} className="authenticationButton">Logout</a>} */}
            {/* <LanguagePicker isHome={true} values={this.props.values} handleLanguageClick={this.props.handleLanguageClick} /> */}
          </div>
        </div>
        <div className="head-mobile">
          <div className="brand">
            {conf.brand.useImg === false ? (
              <span>{conf.brand.name}</span>
            ) : (
              <img className="logo" src={logo} />
            )}
          </div>
          {this.state.isMobileHeadToggle && (
            <div className="authentication">
              {this.props.user !== null ? (
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: "./dashboard" }}
                  className="authenticationButton"
                >
                  {" "}
                  {t("selectionAction.account")}
                </Link>
              ) : (
                <a
                  onClick={() => this.props.authBtnHandler()}
                  className="authenticationButton"
                >
                  {" "}
                  {t("intro.login")}{" "}
                </a>
              )}
              {this.props.values.email === conf.adminEmail && (
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: "./adm/dashboard" }}
                  className="authenticationButton"
                >
                  {" "}
                  {t("selectionAction.admin")}
                </Link>
              )}
              {/* {this.props.user != null && <a onClick={() => this.props.logout()} className="authenticationButton">Logout</a>} */}
              {/* <LanguagePicker isHome={true} values={this.props.values} handleLanguageClick={this.props.handleLanguageClick} /> */}
            </div>
          )}

          <HiMenuAlt2
            onClick={() => this.handleToggleClick()}
            className="head-toggle"
          />
        </div>
        <div className="body action-introBody">
          <div className="intro-left">
            <h2>Unlocking Your Professional Potential</h2>
            <div className="intro-head">
              <h3>Elevate Your Career with Expertly Crafted CVs</h3>
              <ul>
                <li>
                  🚀 Stand out in the job market with our tailored CV solutions!
                </li>

                <li>✨ Expertly written resumes that grab attention</li>

                <li>🔍 Customized CVs for every industry and career level</li>

                <li>🌟 Showcase your achievements and skills effectively</li>

                <li>
                  🤝 Personalized service to highlight your unique strengths
                </li>

                <li>
                  🔒 Secure your dream job with a standout curriculum vitae
                </li>
              </ul>
              <div className="intro-button-selection">
                {/* <a
                  className="light"
                  onClick={() => this.props.goToResumeSelectionStep()}
                >
                  {t("homepageText.text3")}
                  CREATE CV
                </a> */}
                <div style={{ position: `relative` }}>
                  <button
                    onClick={() => this.props.goToResumeSelectionStep()}
                    class="custom-btn btn-5"
                  >
                    <span>Create CV</span>
                  </button>
                </div>
                <div style={{ position: `relative` }}>
                  <button
                    onClick={() => {
                      this.props.goToCoverSelection();
                    }}
                    class="custom-btn btn-5"
                  >
                    <span>Cover letter</span>
                  </button>
                </div>
                {/* <a
                  className="dark"
                  onClick={() => {
                    this.props.goToCoverSelection();
                  }}
                >
                  {t("homepageText.text4")}{" "}
                 COVER LETTER
                </a> */}
              </div>
            </div>
          </div>
          <div className="intro-right">
            <img src={resumeJpg} />
          </div>
        </div>
      </div>
    );
  }
}
const MyComponent = withTranslation("common")(ActionIntroduction);
export default MyComponent;
