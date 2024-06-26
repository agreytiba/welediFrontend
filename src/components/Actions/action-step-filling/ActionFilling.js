import React, { Component } from "react";
import "./ActionFilling.scss";
import { Analytics } from "../../Analytics";
// Configuration data
import conf from "../../../conf/configuration";
// Components Needed
import LanguagePicker from "../../Form/language-picker/LanguagePicker";
import ProgressBar from "../../Form/progress-bar/ProgressBar";
import Employment from "../../Form/employment-component/Employment";
import Education from "../../Form/education-component/Education";
import Language from "../../Form/languages-component/Languages";
import Skill from "../../Form/skill-component/Skill";
// Form Components
import SimpleInput from "../../Form/simple-input/SimpleInput";
import ImgUploadInput from "../../Form/img-upload-input/ImgUploadInput";
import SimpleTextArea from "../../Form/simple-textarea/SimpleTextarea";
//Images
import PlusIcon from "../../../assets/plus.png";
import MinusIcon from "../../../assets/minus.png";
import Toasts from "../../Toasts/Toats";
import { withTranslation } from "react-i18next";
import { getAds, getAllCategories } from "../../../firestore/dbOperations";
import Autocomplete from "../../AutoComplete/AutoComplete";

import { BiPlus } from "react-icons/bi";
import { AiOutlineMinus } from "react-icons/ai";
import ReusableButton from "../../Form/reusablButton/ReusableButton";
class ActionFilling extends Component {
  // Handling the state
  constructor(props) {
    super(props);
    this.state = {
      additionalDetailsShowed: false,
      //  This arrays contains the components when a user click add new employment for example
      //  we add the the components to the its specefic array , and call the array using a function
      //   to render the number of components based on how many the user wants
      user: true,
      showForm: "personal",
      employments: [],
      educations: [],
      languages: [],
      skills: [],
      containAds: false,
      categories: [],
      ads: [],
      autoCompleteOptions: [
        "English",
        "Spanish",
        "French",
        "German",
        "Italian",
      ],
    };
    //  Binding  all functions to this context to be able to use them
    this.aditionalDetailHandler = this.aditionalDetailHandler.bind(this);
    this.newEmploymentField = this.newEmploymentField.bind(this);
    this.newEducationField = this.newEducationField.bind(this);
    this.newLanguageField = this.newLanguageField.bind(this);
    this.newSkillField = this.newSkillField.bind(this);
    this.skillsAdded = this.skillsAdded.bind(this);
    this.handleComponentDelete = this.handleComponentDelete.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.removeEmploymentJsx = this.removeEmploymentJsx.bind(this);
    this.removeEducationJsx = this.removeEducationJsx.bind(this);
    this.removeLanguageJsx = this.removeLanguageJsx.bind(this);
    this.removeSkillJsx = this.removeSkillJsx.bind(this);
    this.autoCompleteHandleChange = this.autoCompleteHandleChange.bind(this);
    var AnalyticsObject = Analytics;
    AnalyticsObject("Template-filling");
  }
  componentWillMount() {
    this.checkComplexFields();
  }
  componentDidMount() {
    getAds().then((value) => {
      value !== null && this.setState({ ads: value, containAds: true });
    });
    getAllCategories().then((value) => {
      this.setState({ categories: value });
    });
  }

  autoCompleteHandleChange(option) {
    console.log(`Selected option: ${option}`);
  }

  removeEmploymentJsx(id) {
    console.log(this.state.employments);
    console.log("in");
    let pos = null;
    for (let index = 0; index < this.state.employments.length; index++) {
      if (this.state.employments[index].props.id == id) {
        pos = index;
      }
    }
    if (pos !== null) {
      var tempArray = this.state.employments;
      var sliced = tempArray.splice(pos, 1);
      this.setState({ employments: tempArray });
    }
  }
  removeEducationJsx(id) {
    console.log("in");
    let pos = null;
    for (let index = 0; index < this.state.educations.length; index++) {
      if (this.state.educations[index].props.id == id) {
        pos = index;
      }
    }
    if (pos !== null) {
      var tempArray = this.state.educations;
      var sliced = tempArray.splice(pos, 1);
      this.setState({ educations: tempArray });
    }
  }
  removeLanguageJsx(id) {
    console.log("in");
    let pos = null;
    for (let index = 0; index < this.state.languages.length; index++) {
      if (this.state.languages[index].props.id == id) {
        pos = index;
      }
    }
    if (pos !== null) {
      var tempArray = this.state.languages;
      var sliced = tempArray.splice(pos, 1);
      this.setState({ languages: tempArray });
    }
  }
  removeSkillJsx(id) {
    console.log("in");
    let pos = null;
    for (let index = 0; index < this.state.skills.length; index++) {
      if (this.state.skills[index].props.id == id) {
        pos = index;
      }
    }
    if (pos !== null) {
      var tempArray = this.state.skills;
      var sliced = tempArray.splice(pos, 1);
      this.setState({ skills: tempArray });
    }
  }
  // Checking if there is already some ( employments-educations-skills) in state to add them to the form
  checkComplexFields() {
    // Cheking for employments
    if (this.props.values.employments.length > 0) {
      var jobs = [];
      var tempEmployments = [];
      tempEmployments = this.props.values.employments.sort(function (a, b) {
        return a.date - b.date;
      });
      tempEmployments.map((value, index) => {
        value != null &&
          jobs.push(
            <Employment
              removeEmploymentJsx={this.removeEmploymentJsx}
              removeEmployment={this.props.removeEmployment}
              jobTitle={value.jobTitle}
              employer={value.employer}
              description={value.description}
              begin={value.begin}
              end={value.end}
              handleInputs={this.props.handleInputs}
              id={value.id}
              key={index}
            />
          );
      });
      this.setState({ employments: jobs });
    }

    // checking for educations
    if (this.props.values.educations.length > 0) {
      var educations = [];
      var tempEducations = [];
      tempEducations = this.props.values.educations.sort(function (a, b) {
        return a.date - b.date;
      });
      tempEducations.map((value, index) => {
        value != null &&
          educations.push(
            <Education
              removeEducationJsx={this.removeEducationJsx}
              removeEducation={this.props.removeEducation}
              school={value.school}
              degree={value.degree}
              started={value.started}
              description={value.description}
              finished={value.finished}
              id={value.id}
              handleInputs={this.props.handleInputs}
              key={index}
            />
          );
      });
      this.setState({ educations: educations });
    }
    // checking for educations
    if (this.props.values.skills.length > 0) {
      var skills = [];
      var tempSkills = [];
      tempSkills = this.props.values.skills.sort(function (a, b) {
        return a.date - b.date;
      });

      tempSkills.map((value, index) => {
        value != null &&
          skills.push(
            <Skill
              removeSkillJsx={this.removeSkillJsx}
              removeSkill={this.props.removeSkill}
              skillName={value.name}
              rating={value.rating}
              handleComponentDelete={this.handleComponentDelete}
              handleDelete={this.props.handleDelete}
              id={value.id}
              handleInputs={this.props.handleInputs}
              key={index}
            />
          );
      });
      this.setState({ skills: skills });
    }

    // checking for Languages
    if (this.props.values.languages.length > 0) {
      var tempLanguages = [];
      tempLanguages = this.props.values.languages.sort(function (a, b) {
        return a.date - b.date;
      });

      var languages = [];
      tempLanguages.map((value, index) => {
        value != null &&
          languages.push(
            <Language
              removeLanguageJsx={this.removeLanguageJsx}
              removeLanguage={this.props.removeLanguage}
              title={value.name}
              level={value.level}
              handleComponentDelete={this.handleComponentDelete}
              handleDelete={this.props.handleDelete}
              id={value.id}
              handleInputs={this.props.handleInputs}
              key={index}
            />
          );
      });
      this.setState({ languages: languages });
    }
  }
  //Handling Additional Details click and changing the state on toggler click
  aditionalDetailHandler() {
    this.state.additionalDetailsShowed
      ? this.setState({ additionalDetailsShowed: false })
      : this.setState({ additionalDetailsShowed: true });
  }
  //  Employment History
  employmentHistory() {
    let jobs = [];
    this.state.employments.map((value, index) => {
      jobs.push(value);
    });
    return jobs;
  }
  // Add new employment field
  newEmploymentField() {
    // Giving a random id to give it to the DOM as a key y be identified , NOTE : this id is not accessable from child
    let randomId = Math.floor(Math.random() * 9000);
    // This id is  accesable from child and we can use it as a reference to edit the employment
    let employmentId = Math.floor(Math.random() * 200);
    this.setState({
      employments: this.state.employments.concat([
        <Employment
          removeEmploymentJsx={this.removeEmploymentJsx}
          removeEmployment={this.props.removeEmployment}
          handleInputs={this.props.handleInputs}
          id={randomId}
          key={randomId}
        />,
      ]),
    });
  }
  //  Education History
  educationHistory() {
    let educations = [];
    this.state.educations.map((value, index) => {
      educations.push(value);
    });
    return educations;
  }
  // Add new education field
  newEducationField() {
    let randomId = Math.floor(Math.random() * 100);
    this.setState({
      educations: this.state.educations.concat([
        <Education
          removeEducationJsx={this.removeEducationJsx}
          removeEducation={this.props.removeEducation}
          id={this.state.educations.length}
          handleInputs={this.props.handleInputs}
          key={randomId}
        />,
      ]),
    });
  }
  // Add new skill field
  newSkillField() {
    let randomId = Math.floor(Math.random() * 300);
    this.setState({
      skills: this.state.skills.concat([
        <Skill
          removeSkillJsx={this.removeSkillJsx}
          removeSkill={this.props.removeSkill}
          handleComponentDelete={this.handleComponentDelete}
          handleDelete={this.props.handleDelete}
          id={randomId}
          handleInputs={this.props.handleInputs}
          key={randomId}
        />,
      ]),
    });
  }
  // Handling Component Delete
  handleComponentDelete(inputType, id) {
    switch (inputType) {
      case "Skills":
        this.setState({
          skills: [],
        });
        break;
      default:
        break;
    }
  }
  //  Listing all skills History
  skillsAdded() {
    let skills = [];
    this.state.skills.map((value, index) => {
      skills.push(value);
    });
    return skills;
  }
  // Add new language field
  newLanguageField() {
    let randomId = Math.floor(Math.random() * 900);
    this.setState({
      languages: this.state.languages.concat([
        <Language
          removeLanguageJsx={this.removeLanguageJsx}
          removeLanguage={this.props.removeLanguage}
          id={this.state.languages.length}
          handleInputs={this.props.handleInputs}
          key={randomId}
        />,
      ]),
    });
  }
  //  Languages Added
  languagesAdded() {
    let languages = [];
    this.state.languages.map((value, index) => {
      languages.push(value);
    });
    return languages;
  }
  //  Handling title change , contentEditable
  handleTitleChange(e) {
    this.props.handleInputs("Title", e.currentTarget.textContent);
  }

  // handles show form
  handleShowForm(e, data) {
    e.preventDefault();
    switch (data) {
      case 1:
        this.setState({
          showForm: "personal",
        });
        break;
      case 2:
        this.setState({
          showForm: "summary",
        });
        break;

      case 3:
        this.setState({
          showForm: "history",
        });
        break;
      case 4:
        this.setState({
          showForm: "education",
        });
        break;
      case 5:
        this.setState({
          showForm: "lan",
        });
        break;
      case 6:
        this.setState({
          showForm: "skills",
        });
        break;
      default:
        this.setState({
          showForm: "personal",
        });
        break;
    }
  }
  render() {
    const { t } = this.props;
    const randomAdIndex = Math.floor(Math.random() * this.state.ads.length);
    return (
      <div id="introd" className="action-introWrapper filling">
        {/* Heading of form contains Language select, Title  */}
        <div className="formHead">
          <div className="cvTitle">
            <span
              spellCheck="false"
              onBlur={this.handleTitleChange}
              suppressContentEditableWarning={true}
              contentEditable={true}
            >
              {" "}
              {this.props.values.title}
            </span>
          </div>
          {/* {t("form.untitled")} */}
          <div className="actionFilling__headAction">
            {/* <LanguagePicker values={this.props.values} handleLanguageClick={this.props.handleLanguageClick} /> */}
            <a
              onClick={() => this.props.goToResumeSelectionStep()}
              className="authenticationButton"
            >
              return
            </a>
          </div>
        </div>
        {/* ProgressBar */}
        <ProgressBar
          textHidden={false}
          values={this.props.values}
          progress={this.props.progress}
        />
        {/* Form */}
        <form
          // make sure this form there is no autocomplete
          autoComplete="off"
        >
          {this.state.showForm == "personal" && (
            <div>
              <div className="sectionHeading">
                <h3
                  className="sectionTitle"
                  style={{
                    textAlign: `center`,
                    marginBottom: `5px`,
                  }}
                >
                  {t("form.personalDetails")}
                </h3>
              </div>
              <div className="grid-2-col">
                <SimpleInput
                  handleInputs={this.props.handleInputs}
                  value={this.props.values.firstname}
                  title={t("form.firstName")}
                  name="First Name"
                />
                <SimpleInput
                  handleInputs={this.props.handleInputs}
                  value={this.props.values.lastname}
                  title={t("form.lastName")}
                  name="Last Name"
                />
                <SimpleInput
                  handleInputs={this.props.handleInputs}
                  value={this.props.values.email}
                  title={t("form.email")}
                  name="Email"
                />
                <SimpleInput
                  handleInputs={this.props.handleInputs}
                  value={this.props.values.phone}
                  title={t("form.phone")}
                  name="Phone"
                />
                <SimpleInput
                  handleInputs={this.props.handleInputs}
                  value={this.props.values.occupation}
                  title={t("form.occupation")}
                  name="Occupation"
                />
                {this.props.currentResumeName === "Cv1" ||
                this.props.currentResumeName === "Cv5" ||
                this.props.currentResumeName === "Cv6" ||
                this.props.currentResumeName === "Cv14" ||
                this.props.currentResumeName === "Cv15" ? (
                  <ImgUploadInput
                    handleInputs={this.props.handleInputs}
                    name="Photo"
                    title={t("form.Photo")}
                  />
                ) : (
                  ""
                )}</div>

              {/* addition details form */}
              <div
            className={
              this.state.additionalDetailsShowed
                ? "additionalnfo grid-2-col "
                : "additionalnfo grid-2-col hidden"
            }
          >
            <SimpleInput
              handleInputs={this.props.handleInputs}
              value={this.props.values.country}
              title={t("form.country")}
              name="Country"
            />
            <SimpleInput
              handleInputs={this.props.handleInputs}
              value={this.props.values.city}
              title={t("form.city")}
              name="City"
            />
            <SimpleInput
              handleInputs={this.props.handleInputs}
              value={this.props.values.address}
              title={t("form.address")}
              name="Address"
            />

            {/* <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.postalcode} title={t("form.postalcode")} name="Postal Code" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.dateofbirth} title={t("form.dateOfBirth")} name="Date Of Birth" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.drivinglicense} title={t("form.drivingLicense")} name="Driving License" />
            <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.nationality} title={t("form.nationality")} name="Nationality" />
  */}
          </div>
    <div className="additionalDetailsToggle">
                    {this.state.additionalDetailsShowed ? (
                      <AiOutlineMinus className="toggle-icon" />
                    ) : (
                      <BiPlus className="toggle-icon" />
                    )}
                    <span onClick={this.aditionalDetailHandler}>
                      {" "}
                      {this.state.additionalDetailsShowed
                        ? t("form.hideDetails")
                        : t("form.showDetails")}
                    </span>
                  </div>

                <div className="btn-container" >
                
              
                    <ReusableButton
                    onClick={(e) => this.handleShowForm(e, 2)}
                    label="NEXT"
                  />
                </div>
              
            </div>
          )}

          {/* {this.state.containAds && (
                        <div className="ads-wrapper">
                            <div className="ads-area">
                                <a href={this.state.ads[randomAdIndex].destinationLink}>
                                    <img src={this.state.ads[randomAdIndex].imageLink} alt="image" />
                                </a>
                            </div>
                        </div>
                    )} */}
          {/* Checking whate state is on additionDetails toggler */}
          
          {/* on click hide or show additional details base on the previous state*/}

          {/* Professional Summary */}
          {this.state.showForm == "summary" && (
            <div>
              <div className="sectionHeading">
                <h3 className="sectionTitle" style={{ textAlign: `center` }}>
                  {t("form.profesionalSummary")}{" "}
                </h3>
                <p className="sectionDescription">
                  {t("form.profesionalSummarySubtitle")}{" "}
                </p>
              </div>

              <Autocomplete
                options={this.state.autoCompleteOptions}
                onChange={this.autoCompleteHandleChange}
              />
              <SimpleTextArea
                suggestions={true}
                categories={this.state.categories}
                addSummary={this.props.addSummary}
                name="Professional Summary"
                value={this.props.values.summary}
                handleInputs={this.props.handleInputs}
                title={t("form.profesionalSummary")}
              />

              <div>
                <div className="btn-container">
                  <ReusableButton
                    onClick={(e) => this.handleShowForm(e, 3)}
                    label="NEXT"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="componentsWrapper">
            {/* Employment History */}
            {this.state.showForm == "history" && (
              <div>
                {" "}
                <div className="sectionHeading">
                  <h3 className="sectionTitle">
                    {" "}
                    {t("form.employmentHistory")}{" "}
                  </h3>
                  <p className="sectionDescription">
                    {" "}
                    {t("form.employmentHistorySubtitle")}{" "}
                  </p>
                </div>
                {this.employmentHistory()}
                <div className="additionalDetailsToggle">
                  <BiPlus className="toggle-icon" />
                  <span onClick={this.newEmploymentField}>
                    {" "}
                    {t("form.addJob")}{" "}
                  </span>
                </div>
                <div>
                  <div className="btn-container">
                    <ReusableButton
                      onClick={(e) => this.handleShowForm(e, 4)}
                      label="NEXT"
                    />
                  </div>
                </div>
              </div>
            )}
            {/* {this.state.containAds && (
              <div className="ads-wrapper">
                <div className="ads-area">
                  <a href={this.state.ads[randomAdIndex].destinationLink}>
                    <img
                      src={this.state.ads[randomAdIndex].imageLink}
                      alt="image"
                    />
                  </a>
                </div>
              </div>
            )} */}
            {/* Education History */}
            {this.state.showForm == "education" && (
              <div>
                <div className="sectionHeading">
                  <h3 className="sectionTitle"> {t("form.education")} </h3>
                  <p className="sectionDescription">
                    {t("form.educationSubtitle")}
                  </p>
                </div>
                {this.educationHistory()}
                <div className="additionalDetailsToggle">
                  <BiPlus className="toggle-icon" />
                  <span onClick={this.newEducationField}>
                    {" "}
                    {t("form.addEducation")}{" "}
                  </span>
                </div>
                <div>
                  <div className="btn-container">
                    <ReusableButton
                      onClick={(e) => this.handleShowForm(e, 5)}
                      label="NEXT"
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Languages History */}
            {this.state.showForm == "lan" && (
              <div>
                <div className="sectionHeading">
                  <h3 className="sectionTitle">{t("form.languages")} </h3>
                  {/* <p className="sectionDescription">{t("form.languagesSubtitle")}</p> */}
                </div>
                {this.languagesAdded()}
                <div className="additionalDetailsToggle">
                  <BiPlus className="toggle-icon" />
                  <span onClick={this.newLanguageField}>
                    {t("form.addLanguage")}{" "}
                  </span>
                </div>
                <div>
                  <div className="btn-container">
                    <ReusableButton
                      onClick={(e) => this.handleShowForm(e, 6)}
                      label="NEXT"
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Skills */}
            {this.state.showForm == "skills" && (
              <div>
                <div className="sectionHeading">
                  <h3 className="sectionTitle">{t("form.skills")} </h3>
                  <p className="sectionDescription">
                    {" "}
                    {t("form.skillsSubtitle")}{" "}
                  </p>
                </div>
                {this.skillsAdded()}
                <div className="additionalDetailsToggle">
                  <BiPlus className="toggle-icon" />
                  <span onClick={this.newSkillField}>
                    {" "}
                    {t("form.addSkill")}{" "}
                  </span>
                </div>
                <h3>Note</h3>
                <p style={{ color: `#333`, padding: `10px 5px` }}>
                  please <span style={{ color: `purple` }}>DOWNLOAD</span> your
                  CV below the template
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}
const MyComponent = withTranslation("common")(ActionFilling);
export default MyComponent;
