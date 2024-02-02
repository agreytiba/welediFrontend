import React, { Component } from 'react';
import Checkimage from '../../../assets/check.png';
import { withTranslation } from 'react-i18next';
// import Spinner from '../../Pay/loader';
import axios from 'axios';
import { BASE_URL } from '../../../conf/baseUrl';
import config from '../../../conf/configuration' 
import Spinner from '../../../components/Spinner/Spinner' 
class PlansTable extends Component {
    constructor(props) {
        super(props);
    }

  state = {
        isLoading: false,
        showForm: false,
    };

    handleGetToken = async (Data) => {
        try {
            this.setState({ isLoading: true });
             const result = await axios.get(config.provider+"://" + config.backendUrl + "/api/checkout" );
        
//             const result = await axios.get("http://localhost:8080/api/checkout");
// console.log(result);
            if (result.data.success && result.data.message === 'Token generated successfully') {
                this.setState({ isLoading: false });
                this.props.nextStep(Data)
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    render() {
        const { t } = this.props;

        return (
          <>
            {this.state.isLoading ? <Spinner /> :
            <div>
                <div className="custom-page__Plans-heading">
                    <h1>{t('static.plansHeader')}</h1>
                    <p>{t('static.plansDesc')}</p>
                </div>
                <div className="custom-page__Plans-body">
                    {/* Card */}
                    <div className="custom-page__Plans-card">
                        <div className="custom-page__Plans-cardHead">
                            {/* Card Head */}
                            <div className="price">
                                <span className="currency">{this.props.currency}</span>
                                <span className="custom-page__Plans-price">
                                    {this.props.monthly !== null &&
                                        this.props.monthly.toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    /<span className="monthLabel">{t('static.month')}</span>
                                </span>
                            </div>
                            {/* Name */}
                            <div className="planName">
                                <span>{t('static.premiumMonth')}</span>
                                <span>
                                    Pay {this.props.currency}
                                    {this.props.monthly} for 1 month
                                </span>
                            </div>
                        </div>
                        {/* Card Body  */}
                        <div className="planCard__body">
                            <ul>
                                {/* feature item */}
                                <li className="planCard__featureItem">
                                    <div className="leftside">
                                        <img src={Checkimage} alt="check" />
                                    </div>
                                    <div className="rightside">
                                        <div>{t('static.unlimitedPDF')}</div>
                                    </div>
                                </li>
                                {/* feature item */}
                                <li className="planCard__featureItem">
                                    <div className="leftside">
                                        <img src={Checkimage} alt="check" />
                                    </div>
                                    <div className="rightside">
                                        <div>{t('static.unlimitedResumes')}</div>
                                    </div>
                                </li>
                                {/* feature item */}
                                <li className="planCard__featureItem">
                                    <div className="leftside">
                                        <img src={Checkimage} alt="check" />
                                    </div>
                                    <div className="rightside">
                                        <div>{t('static.nonRecuring')}</div>
                                    </div>
                                </li>
                            </ul>
                          
                          <div onClick={() => { this.handleGetToken('monthly'); }} className="planCard-paymentBtnBasic">
    {t('static.upgradeAndDownload')}
</div>

                        </div>
                    </div>
                    {/* Card */}
                    <div className="custom-page__Plans-card custom-page__Plans-card-active  ">
                        <div className="custom-page__Plans-cardHead">
                            {/* Card Head */}
                            <div className="price">
                                <span className="currency">{this.props.currency}</span>
                                <span className="custom-page__Plans-price">
                                    {(this.props.quartarly / 6).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                    /<span className="monthLabel">{t('static.month')}</span>
                                </span>
                            </div>
                            {/* Name */}
                            <div className="planName">
                                <span>{t('static.premiumHalfYear')}</span>
                                <span>
                                    Pay {this.props.currency}
                                    {this.props.quartarly} for 6 months
                                </span>
                            </div>
                        </div>
                        {/* Card Body  */}
                        <div className="planCard__body">
                            <ul>
                                {/* feature item */}
                                <li className="planCard__featureItem">
                                    <div className="leftside">
                                        <img src={Checkimage} alt="check" />
                                    </div>
                                    <div className="rightside">
                                        <div>{t('static.unlimitedPDF')}</div>
                                    </div>
                                </li>
                                {/* feature item */}
                                <li className="planCard__featureItem">
                                    <div className="leftside">
                                        <img src={Checkimage} alt="check" />
                                    </div>
                                    <div className="rightside">
                                        <div>{t('static.unlimitedResumes')}</div>
                                    </div>
                                </li>
                                {/* feature item */}
                                <li className="planCard__featureItem">
                                    <div className="leftside">
                                        <img src={Checkimage} alt="check" />
                                    </div>
                                    <div className="rightside">
                                        <div>{t('static.nonRecuring')}</div>
                                    </div>
                                </li>
                            </ul>
                        
                            <div onClick={() => { this.handleGetToken('halfYear'); }} className="planCard-paymentBtnBasic planCard-paymentBtnBasic-active">
                                {t('static.upgradeAndDownload')}
                            </div>
                        </div>
                    </div>
                    {/* Card */}
                    <div className="custom-page__Plans-card">
                        <div className="custom-page__Plans-cardHead">
                            {/* Card Head */}
                            <div className="price">
                                <span className="currency">{this.props.currency}</span>
                                <span className="custom-page__Plans-price">
                                    {(this.props.yearly / 12).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                    /<span className="monthLabel">{t('static.month')}</span>
                                </span>
                            </div>
                            {/* Name */}
                            <div className="planName">
                                <span>Premium Yearly</span>
                                <span>
                                    {' '}
                                    {this.props.currency}
                                    {this.props.yearly} for 1 Year
                                </span>
                            </div>
                        </div>
                        {/* Card Body  */}
                        <div className="planCard__body">
                            <ul>
                                {/* feature item */}
                                <li className="planCard__featureItem">
                                    <div className="leftside">
                                        <img src={Checkimage} alt="check" />
                                    </div>
                                    <div className="rightside">
                                        <div>{t('static.unlimitedPDF')}</div>
                                    </div>
                                </li>
                                {/* feature item */}
                                <li className="planCard__featureItem">
                                    <div className="leftside">
                                        <img src={Checkimage} alt="check" />
                                    </div>
                                    <div className="rightside">
                                        <div>{t('static.unlimitedResumes')}</div>
                                    </div>
                                </li>
                                {/* feature item */}
                                <li className="planCard__featureItem">
                                    <div className="leftside">
                                        <img src={Checkimage} alt="check" />
                                    </div>
                                    <div className="rightside">
                                        <div>{t('static.nonRecuring')}</div>
                                    </div>
                                </li>
                            </ul>
                        
                            <div  onClick={() => { this.handleGetToken('yearly'); }}  className="planCard-paymentBtnBasic">
                                {t('static.upgradeAndDownload')}
                            </div>
                        </div>
                    </div>
                </div></div>}
            </>
        );
    }
}
const MyComponent = withTranslation('common')(PlansTable);
export default MyComponent;
