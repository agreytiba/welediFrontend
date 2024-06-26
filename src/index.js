import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.scss';

import * as serviceWorker from './serviceWorker';
import { Helmet } from 'react-helmet';
import Spinner from './components/Spinner/Spinner';
import PublicResume from './components/PublicResume/PublicResume';
import Cover3 from './cv-templates/cover3/Cover3';
import Cover4 from './cv-templates/cover4/Cover4';

const Welcome = lazy(() => import('./components/welcome/Welcome'));
const Dashboard = lazy(() => import('./components/Dashboard/DashboardMain/DashboardMain'));
const Admin = lazy(() => import('./components/admin/Admin'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Front = lazy(() => import('./components/Front/Front'));
const Exporter = lazy(() => import('./components/Exporter/Exporter'));
const Billing = lazy(() => import('./components/Billing/Plans/Plans'));
const CustomePage = lazy(() => import('./components/CustomPage/CustomePage'));
const Checkout = lazy(() => import('./components/Pay/Checkout'));

const CoverLetter = lazy(() => import('./components/CoverLetter/CoverLetter'));

ReactDOM.render(
    <React.StrictMode>
        <Helmet>
            // right to left text
            
            <meta charSet="utf-8" />
            <title>Weledi Africa</title>
            <link rel="canonical" href={window.location.href} />
            <meta name="description" content="Weledi is a platform designed to assist Africans in preparing for the job market. The platform focuses on various aspects of career readiness, offering tools and resources to help individuals build their CVs (resumes), craft effective cover letters, and create digital profiles that enhance their professional presence." />
            <meta name="keywords" content="" />
        </Helmet>
        <BrowserRouter>
            <Suspense fallback={<Spinner />}>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/coverletter" component={CoverLetter} />

                <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/resume/:step" component={Welcome} />
                <Route exact path="/billing/plans" render={(props) => <Billing {...props} />} />
                <Route exact path="/p/:custompage" render={(props) => <CustomePage {...props} />} />
                <Route exact path="/shared/:resumeId" render={(props) => <PublicResume {...props} />} />
                 <Route exact path="/checkout" component={Checkout} />
                <Route path="/adm" render={(props) => <Admin {...props} />} />
                <Route exact path="/front" render={(props) => <Front {...props} />} />

                {/* Export routes*/}
                
                <Route exact path="/export/Cv1/:resumeId" render={(props) => <Exporter resumeName="Cv1" export={true} {...props} />} />
                <Route exact path="/export/Cv2/:resumeId" render={(props) => <Exporter resumeName="Cv2" export={true} {...props} />} />
                <Route exact path="/export/Cv3/:resumeId" render={(props) => <Exporter resumeName="Cv3" export={true} {...props} />} />
                <Route exact path="/export/Cv4/:resumeId" render={(props) => <Exporter resumeName="Cv4" export={true} {...props} />} />
                <Route exact path="/export/Cv5/:resumeId" render={(props) => <Exporter resumeName="Cv5" export={true} {...props} />} />
                <Route exact path="/export/Cv6/:resumeId" render={(props) => <Exporter resumeName="Cv6" export={true} {...props} />} />
                <Route exact path="/export/Cv7/:resumeId" render={(props) => <Exporter resumeName="Cv7" export={true} {...props} />} />
                <Route exact path="/export/Cv8/:resumeId" render={(props) => <Exporter resumeName="Cv8" export={true} {...props} />} />
                <Route exact path="/export/Cv9/:resumeId" render={(props) => <Exporter resumeName="Cv9" export={true} {...props} />} />
                <Route exact path="/export/Cv10/:resumeId" render={(props) => <Exporter resumeName="Cv10" export={true} {...props} />} />
                <Route exact path="/export/Cv11/:resumeId" render={(props) => <Exporter resumeName="Cv11" export={true} {...props} />} />
                <Route exact path="/export/Cv12/:resumeId" render={(props) => <Exporter resumeName="Cv12" export={true} {...props} />} />
                <Route exact path="/export/Cv13/:resumeId" render={(props) => <Exporter resumeName="Cv13" export={true} {...props} />} />
                <Route exact path="/export/Cv14/:resumeId" render={(props) => <Exporter resumeName="Cv14" export={true} {...props} />} />
                <Route exact path="/export/Cv15/:resumeId" render={(props) => <Exporter resumeName="Cv15" export={true} {...props} />} />

                {/* Covers export routes */}

                <Route exact path="/export/Cover1/:resumeId" render={(props) => <Exporter resumeName="Cover1" export={true} {...props} />} />
                <Route exact path="/export/Cover2/:resumeId" render={(props) => <Exporter resumeName="Cover2" export={true} {...props} />} />
                <Route exact path="/export/Cover3/:resumeId" render={(props) => <Exporter resumeName="Cover3" export={true} {...props} />} />
                <Route exact path="/export/Cover4/:resumeId" render={(props) => <Exporter resumeName="Cover4" export={true} {...props} />} />
                <Route exact path="/cvtest" render={(props) => <Cover4 {...props} />} />


            </Suspense>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
