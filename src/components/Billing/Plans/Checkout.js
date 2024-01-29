import React, { Component } from "react";
// import { PayPalButton } from "react-paypal-button-v2";
import conf from "../../../conf/configuration";
import { CardElement } from "@stripe/react-stripe-js";
import CheckImage from "../../../assets/check.png";
// import AmericanExpress from "../../../assets/paiment/american-express.png";
// import Paypal from "../../../assets/paiment/paypal.png";
// import Visa from "../../../assets/paiment/visa.png";
// import MasterCard from "../../../assets/paiment/mastercard.png";
import airtel from "../../../assets/provider/airtel.png";
import Halopesa from "../../../assets/provider/halopesa.png";
import Mpesa from "../../../assets/provider/mpesa.jpg";
import Tigopesa from "../../../assets/provider/tigopesa.png";
// import JCB from "../../../assets/paiment/jcb.png";
// import DropdownInput from "../../Form/dropdown-input/DropdownInput";
import SimpleInput from "../../Form/simple-input/SimpleInput";
import axios from "axios";
import { addSbs } from "../../../firestore/dbOperations";
import SuccessAnimation from "../../../assets/animations/50049-nfc-successful.json";
import { withTranslation } from "react-i18next";
import Lottie from "lottie-react";
import { useLottie } from "lottie-react";

const successOptions = {
  loop: false,
  autoplay: true,
  animationData: SuccessAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const View = () => {
  const options = {
    loop: false,
    autoplay: true,
    animationData: SuccessAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { View } = useLottie(options);
  return View;
};

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.countries = [
      "Algeria",
      "Angola",
      "Botswana",
      "Burkina Faso",
      "Burundi",
      "Cameroon",
      "Cape Verde",
      "Central African Republic",
      "Chad",
      "Comoros",
      "Congo-Brazzaville",
      "Congo-Kinshasa",
      "Djibouti",
      "Egypt",
      "Equatorial Guinea",
      "Eritrea",
      "Ethiopia",
      "Gabon",
      "Gambia",
      "Ghana",
      "Guinea",
      "Guinea-Bissau",
      "Kenya",
      "Lesotho",
      "Liberia",
      "Libya",
      "Mali",
      "Mauritania",
      "Mauritius",
      "Morocco",
      "Mozambique",
      "Namibia",
      "Niger",
      "Nigeria",
      "Rwanda",
      "Senegal",
      "Sierra Leone",
      "Somalia",
      "South Africa",
      "Sudan",
      "Tanzania",
      "Togo",
      "Tunisia",
      "Uganda",
      "Western Sahara",
      "Zambia",
      "Zimbabwe",
    ];
    this.state = {
      step: 0,
      isLoading: false,
      accountNumber: "",
      currency: "TZS",
      provider: "",
      info: null,
    };
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleInput = this.handleInput.bind(this);
  
  }
  // handleInput(name, event) {
  //   switch (name) {
  //     case "accountNumber":
  //       this.setState({
  //         accountNumber: event.target.value,
  //       });
  //       break;
  //     // case "Country":
  //     //     this.setState({
  //     //         postalCode: event.target.value
  //     //     })
  //     //     break;
  //     // case "CardHolder":
  //     //     this.setState({
  //     //         cardHolder: event.target.value
  //     //     })
  //     //     break;
  //     // case "Address":
  //     //     this.setState({
  //     //         address: event.target.value
  //     //     })
  //     //     break;
  //     default:
  //       break;
  //   }
  // }

   
 handleSubmit = async () => {
    
   const { accountNumber, currency, provider } = this.state
   const amount = 5000
     const  generateRandomNumber = () => {
        return Math.floor(10000000 + Math.random() * 90000000);
   };
    //  const user = JSON.parse(localStorage.getItem('auth'));
    //     const uid =user.current._id
    try {
       this.setState({ isLoading: true });
        const randomExternalId = generateRandomNumber().toString().substring(0, 8);
       
      const result = await axios.post("http://localhost:8080/api/checkout", { accountNumber, currency,provider,amount, externalId: randomExternalId });
  
      if (result.data) {
        const time = result.data.date;
      
     const currentUser = localStorage.getItem('user')

 addSbs(
        this.props.selectedPlan,
        "AzamPay",
        new Date().toDateString(),
        this.props.selectedPlan == "monthly"
        ? this.props.monthly
        : this.props.selectedPlan == "halfYear"
         ? this.props.quartarly
         : this.props.selectedPlan == "yearly"
        ? this.props.yearly
         : 0,
        currentUser
      );
          this.setState({ info: result.data });
          this.setState({ isLoading: false });
          this.nextStep()
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
       this.setState({ isLoading: false });
    }
  };
//   handleSubmit = async () => {
//     const { stripe, elements } = this.props;
//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }
//     this.setState({ isLoading: true });
//     const res = await axios.post(
//       conf.provider + "://" + conf.backendUrl + "/api/pay",
//       {
//         price:
//           this.props.selectedPlan == "monthly"
//             ? this.props.monthly
//             : this.props.selectedPlan == "halfYear"
//             ? this.props.quartarly
//             : this.props.selectedPlan == "yearly"
//             ? this.props.yearly
//             : 0,
//       }
//     );
//     const clientSecret = res.data["client_secret"];
//     const time = res.data["server_time"];
//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: this.state.cardHolder,
//         },
//       },
//       // receipt_email: "ja3tar@gmail.com"
//     });
//     if (result.error) {
//       // Show error to your customer (e.g., insufficient funds)
//       alert("Error");
//       console.log(result.error.message);
//     } else {
//       // The payment has been processed!
//       if (result.paymentIntent.status === "succeeded") {
//         console.log("adding subscription");
//         addSbs(
//           this.props.selectedPlan,
//           "Visa",
//           new Date(time).toDateString(),
//           this.props.selectedPlan == "monthly"
//             ? this.props.monthly
//             : this.props.selectedPlan == "halfYear"
//             ? this.props.quartarly
//             : this.props.selectedPlan == "yearly"
//             ? this.props.yearly
//             : 0,
//           localStorage.getItem("user")
//         );
//         this.setState({ step: 3 });
//         // Show a success message to your customer
//       }
//     }
//   };
  
    
    
    nextStep() {
    this.setState((prevStat, props) => ({
      step: prevStat.step + 1,
    }));
  }
  previousStep() {
    this.setState((prevStat, props) => ({
      step: prevStat.step - 1,
    }));
  }

  render() {
    const { t } = this.props;

    return (
      <div className="checkout__content">
        {/* Left */}
        <div className="checkout__content-left">
          <div className="checkout__content-left-wrapper">
            <h2 className="checkout__content-leftTitle">
              {t("static.payment1")}
            </h2>
            {/* Paiment list */}
            <ul className="checkout__content-leftList">
              <li>
                {" "}
                <img src={CheckImage} alt="check" /> {t("static.payment2")}
              </li>
              <li>
                {" "}
                <img src={CheckImage} alt="check" /> {t("static.payment3")}
              </li>
              <li>
                {" "}
                <img src={CheckImage} alt="check" /> {t("static.payment4")}
              </li>
            </ul>
            {/* Questio */}
            <div className="checkout__content-leftQuestion">
              <h3>{t("static.payment5")}</h3>
              <p>{t("static.payment6")}</p>
            </div>
            {/* Questio */}
            <div className="checkout__content-leftQuestion">
              <h3>Payment Method</h3>
              <div className="methods">
                <img src={airtel} alt="card" />
                <img src={Tigopesa} alt="card" />
                <img src={Halopesa} alt="card" />
                {/* {/* <img src={JCB} alt="card" /> */}
                <img src={Mpesa} alt="card" /> 
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="checkout__content-right">
          <div className="checkout__content-rightWrapper">
            <div className="head">
              {/* Head */}
              <span>{t("static.payment8")}</span>
              <span>
                {" "}
                {this.props.currency}
                {this.props.selectedPlan == "monthly"
                  ? this.props.monthly
                  : this.props.selectedPlan == "halfYear"
                  ? this.props.quartarly
                  : this.props.yearly}{" "}
              </span>
            </div>
            {/* Postal code */}
            {this.state.step == 0 && (
              <div className="body">
                <p className="whereLocated">{t("static.payment9")}</p>
                <p className="description">{t("static.payment10")}</p>
                <div className="group-provider">
                  {" "}
                  <a
                    onClick={() => {
                      this.nextStep();
                      this.setState({ provider: "Tigo" });
                    }}
                  >
                    <img className="provider" src={Tigopesa} alt="Tigo pesa" />
                  </a>
                  <a
                    onClick={() => {
                      this.nextStep();
                      this.setState({ provider: "Halopesa" });
                    }}
                  >
                    <img className="provider" src={Halopesa} alt="halopesa" />
                  </a>
                  <a
                    onClick={() => {
                      this.nextStep();
                      this.setState({ provider: "Airtel" });
                    }}
                  >
                    <img className="provider" src={airtel} alt="airtel" />
                  </a>
                </div>
              
              </div>
            )}
            {this.state.step == 1 && (
              <div className="body">
                <p className="whereLocated">{t("static.payment9")}</p>
                <p className="description">{t("static.payment10")}</p>
                <h4>paying using {this.state.provider }</h4>
                <p className="description" >selectedPlan:  {this.props.selectedPlan}</p>
                {/* <DropdownInput
                  handleInputs={this.handleInput}
                  placeholder="Tanzania"
                  checkout={true}
                  title="Country"
                  options={this.countries}
                /> */}
                <input
                  className="input-pay"
                  style={{padding:`10px`, height:`30px`,backgroundColor:`ededed`}}
              type="text"
              placeholder="Phone Number"
              value={this.state.accountNumber}
              onChange={(event) => this.setState({ accountNumber: event.target.value })}
            />
                <div
                  onClick={() =>this.handleSubmit() }
                  className="checkout-continue-btn"
                >
                  Pay
                </div>
              </div>
            )}
            {/* Pick method  */}
            {/* {this.state.step == 2 && (
              <div className="body">
                {this.props.onlyPP == false ||
                this.props.onlyPP == undefined ? (
                  <div
                    onClick={() => this.nextStep()}
                    className="checkout-continue-btn"
                  >
                    {t("static.payment13")}
                  </div>
                ) : (
                  ""
                )}

                {/* <div className="checkout-continue-btn-light">
                                    <img src={Paypal} />
                                </div> 
                <PayPalButton
                  amount={
                    this.props.selectedPlan == "yearly"
                      ? this.props.yearly
                      : this.props.selectedPlan == "monthly"
                      ? this.props.monthly
                      : this.props.selectedPlan == "halfYear"
                      ? this.props.quartarly
                      : 0
                  }
                  // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                  options={{
                    clientId: conf.paypalClienID,
                    disableFunding: "card",
                  }}
                  onSuccess={async (details, data) => {
                    // we need to get the time from the server since it can be manipulated by the  client
                    const res = await axios.post(
                      conf.provider + "://" + conf.backendUrl + "/api/date"
                    );
                    const time = res.data["date"];
                    addSbs(
                      this.props.selectedPlan,
                      "Paypal",
                      new Date(time).toDateString(),
                      this.props.selectedPlan == "monthly"
                        ? this.props.monthly
                        : this.props.selectedPlan == "halfYear"
                        ? this.props.quartarly
                        : this.props.selectedPlan == "yearly"
                        ? this.props.yearly
                        : 0
                    );
                    this.setState({ step: 3 });
                    return true;
                  }}
                />
                <div
                  onClick={() => this.previousStep()}
                  className="checkout-continue-btnOutlined"
                >
                  {t("static.payment14")}
                </div>
              </div>
            )} */}
            {/* Checkout  */}
            {/* {this.state.step == 2 &&
                            // <div className="body">
                            //     <div className="card-details">
                            //         <input onChange={(event) => this.handleInput("CardHolder", event)} placeholder={t('static.payment15')} className="card-nameHolder" />
                            //         <input onChange={(event) => this.handleInput("Address", event)} placeholder={t('static.payment16')} className="card-nameHolder" />
                            //         <CardElement className="checkout-input" />
                            //         <div onClick={() => {
                            //             this.handleSubmit()
                            //         }} className="checkout-continue-btn">
                            //             Checkout
                            //           </div>
                            //         <div onClick={() => this.previousStep()} className="checkout-continue-btnOutlined" >{t('static.payment14')}</div>
                            //         {this.state.isLoading && <div>Processing Payment...</div>}
                            //         <div className="testWrapper">
                            //             <span className="testHeading">To test payments. use this testing card</span>
                            //             <span className="testData">Card Number : 4242 4242 4242 4242 Exp: 22/22</span>
                            //             <span className="testData">Full Name : Test Test</span>
                            //             <span className="testData">Address: Any address.</span>cd
                            //             <span className="testData">Address: Any address.</span> 

                            //         </div>
                            //     </div>
                            // </div>
                        }  */}
            {/*  Loding - > Success   */}
            {this.state.step == 2 && (
              <div className="body" style={{padding:`20px`}}>
                <div className="paimentConfirmation">
                  <h2 style={{color:`green`}}> PROCESSING PAYMENT</h2>
                  <h2>{this.state.info.message}</h2>
                  <p><span>transactionId: </span>{this.state.info.transactionId}</p>
                  <div
                    onClick={() => {
                      window.location.href = window.location.pathname + "/";
                    }}
                    className="checkout-continue-btn"
                  >
                    Close
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <Elements stripe={this.stripePromise}>
            <CardElement /> 
            </Elements> */}
      </div>
    );
  }
}
const MyComponent = withTranslation("common")(Checkout);
export default MyComponent;
