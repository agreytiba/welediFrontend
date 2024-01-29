import React, { Component } from 'react';
import SimpleInput from '../../Form/simple-input/SimpleInput';
import LanguagePicker from '../../Form/language-picker/LanguagePicker';
import SimpleTextarea from '../../Form/simple-textarea/SimpleTextarea';
import PlusIcon from '../../../assets/plus.png';

import { ReactComponent as ParagraphImage } from '../../../assets/paragraph.svg';
import { ReactComponent as ListImage } from '../../../assets/list.svg';
import { ReactComponent as ComponentImage } from '../../../assets/component.svg';

import './ActionCoverFilling.scss';
import { AnimatePresence, motion } from 'framer-motion';
import {BiPlus} from 'react-icons/bi'
import ReusableButton from '../../Form/reusablButton/ReusableButton';
class ActionCoverFilling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFieldsShowed: false,
            showForm: 'personal'
        };
        this.state = {
            showForm: 'personal'
        };
        this.handleAddFieldsClick = this.handleAddFieldsClick.bind(this);
        this.adjustTextarea = this.adjustTextarea.bind(this);
        this.addItemToList = this.addItemToList.bind(this);
        this.handleListItemChange = this.handleListItemChange.bind(this);
        this.handleListNameChange = this.handleListNameChange.bind(this);
    }

    handleAddFieldsClick = (event) => {
        event.preventDefault();
        this.setState({
            addFieldsShowed: !this.state.addFieldsShowed,
        });
    };
    // diplay forms
    handleEmployerDetails = (event,data) => {
        event.preventDefault();
        switch (data) {
            case 1:
                 this.setState({
            showForm:"personal" ,
        });
                break;
            case 2:
                 this.setState({
            showForm:"employer" ,
        });
                break;
        
            case 3:
                 this.setState({
            showForm:"other" ,
        });
                break;
        
            default:
                break;
        }
        
    };

    adjustTextarea(event) {
        var windowHeight = window.innerHeight;
        var elementHeight = event.target.getBoundingClientRect().top;
        console.log(windowHeight);
        console.log(elementHeight + 100);
    }

    addItemToList = (value, listName) => {
        this.props.handleListAddItem(value, listName);
    };

    handleListItemChange(listName, componentIndex, componentValue) {
        this.props.handleListItemChange(listName, componentIndex, componentValue);
    }
    handleListNameChange(ListName, value) {
        this.props.handleListNameChange(ListName, value);
    }

    render() {
        return (
            <div id="introd" className="action-introWrapper filling">
                {/* Head  */}
                {/* {JSON.stringify(this.props.values.components)} */}
                <div className="formHead">
                    <div className="cvTitle">
                        <span spellCheck="false" onBlur={this.handleTitleChange} suppressContentEditableWarning={true} contentEditable={true}>
                            {' '}
                            {this.props.values.title}
                        </span>
                    </div>
                    {/* {t("form.untitled")} */}
                    <div className="actionFilling__headAction">
                        {/* <LanguagePicker values={this.props.values} handleLanguageClick={this.props.handleLanguageClick} /> */}
                        <a onClick={() => this.props.resetNavigation()} className="authenticationButton">
                            Home
                        </a>
                    </div>
                </div>
                <hr/>
                {/* Head ends */}

                {/* Form */}
                {this.state.showForm == "personal" &&
                    <div className='personal'>
                    <form>
                        <div className="sectionHeading">
                            <h3 className="sectionTitle" >Personal Details</h3>
                        </div>
                    </form>
                    <div className="grid-2-col card" >
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.firstname} title={'First Name'} name="First Name" />
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.lastname} title={'Last Name'} name="Last Name" />
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.email} title={'Email'} name="Email" />
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.phone} title={'Phone'} name="Phone" />
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.address} title={'Address'} name="Address" />
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.city} title={'City'} name="City" />
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.postalcode} title={'Postal Code'} name="Postal Code" />
                        <div className='btn-container'>
                            {/* <button className="custom-btn" onClick={(event) => this.handleEmployerDetails(event,2)}  > NEXT</button>
                       */}
                                             <ReusableButton
                    onClick={(e) => this.handleEmployerDetails(e, 2)}
                    label="NEXT"
                  />
                            </div>
                    </div>
                </div>}
                {/* Employer details */}
                {this.state.showForm == "employer"  && <div className='employer'>
    
                    <div className="sectionHeading">
                        <h3 className="sectionTitle" >Employer Details</h3>
                    </div>

                    <div className="grid-2-col card">
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.employerFullName} title={'Employer Full Name'} name="Employer Full Name" />
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.companyName} title={'Company Name'} name="Company Name" />
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.companyAddress} title={'Company Address'} name="Company Address" />
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.companyCity} title={'Company City'} name="Company City" />
                        <SimpleInput handleInputs={this.props.handleInputs} value={this.props.values.companyCity} title={'Company Postal Code'} name="Company Postal Code" />
               
                        <div className='btn-container'>
                            {/* <button
                                onClick={(event) => this.handleEmployerDetails(event,3)}
                            > NEXT</button> */}
                               <ReusableButton
                    onClick={(e) => this.handleEmployerDetails(e, 3)}
                    label="NEXT"
                  />
                        </div>
                    </div>
                    {/* Custom Fields going to be here */}
                </div>}
                {/* Components prompt image and text */}
                {this.state.showForm == "other" &&<div className='other'>
                    {this.props.values.components.length === 0 && (
                        <div className="cover-components">
                            <h4>Select a component</h4>
                            <p>To fill your cover letter you need to select a component.</p>
                        </div>
                    )}

                    {/* <SimpleTextarea name="Paragraph" value={this.props.values.summary} handleInputs={this.props.handleInputs} title={'Paragraph'} /> */}

                    {this.props.values.components.map((component, index) => {
                        if (component.type === 'Paragraph') {
                            return (
                                <div className="simpleTextArea">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span className="inputTitle">{component.name}</span>
                                        <span
                                            onClick={() => {
                                                this.props.handleComponentDelete(component.name);
                                            }}
                                            style={{ cursor: 'pointer', color: '#e74c3c' }}
                                            className="inputTitle">
                                            Remove
                                        </span>
                                    </div>
                                    <textarea
                                        onClick={(event) => {
                                            this.adjustTextarea(event);
                                        }}
                                        style={{ overflow: 'auto' }}
                                        value={component.content}
                                        onChange={(event) => {
                                            this.props.handleCoverParagraphChange(component.name, event.target.value);
                                        }}
                                    />
                                    <span className="border"></span>
                                </div>
                            );
                        } else if (component.type === 'List') {
                            return (
                                <div id="add-List" className="simpleTextArea">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span className="inputTitle">{component.name}</span>
                                        <span
                                            onClick={() => {
                                                this.props.handleComponentDelete(component.name);
                                            }}
                                            style={{ cursor: 'pointer', color: '#e74c3c' }}
                                            className="inputTitle">
                                            Remove
                                        </span>
                                    </div>

                                    <div className="custom-list-item">
                                        <div className="custom-list-item-number">List Name</div>

                                        <div className="custom-list-item-input">
                                            <input
                                                type="text"
                                                value={component.name}
                                                onChange={(event) => {
                                                    this.handleListNameChange(component.name, event.target.value);
                                                }}
                                            />
                                            <div className="border-list"></div>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    {component.content.map((item, index) => (
                                        <div className="custom-list-item">
                                            {/* <div className="custom-list-item-number">{index + 1}</div> */}

                                            <div className="custom-list-item-input">
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(event) => {
                                                        this.handleListItemChange(component.name, index, event.target.value);
                                                    }}
                                                />
                                                <div className="border-list"></div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="add-item">
                                        <BiPlus className="toggle-icon" />
                                        <span onClick={() => this.addItemToList('Name', component.name)}> Add item </span>
                                    </div>
                                </div>
                            );
                        }
                    })}

                    {/* Add field separator */}


                    <div className="addFields">
                        <div className="addFields-wrapper">
                            <a onClick={(event) => this.handleAddFieldsClick(event)} className="outline-primary">
                                add field
                            </a>

                            <AnimatePresence>
                                {this.state.addFieldsShowed && (
                                    <motion.div initial={{ opacity: 1, scale: 0.65 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1 }} className="addFieldsDrop">
                                        <div className="addFieldsDrop-head">Components</div>

                                        <div className="addFieldsDrop-items">
                                            <ul>
                                                <li
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        this.props.handleParagraphAdd();
                                                        this.setState({ addFieldsShowed: false });
                                                    }}>
                                                    <ParagraphImage className="addFieldsDrop-icon" />
                                                    <a href="">Paragraph</a>
                                                </li>

                                                <li
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        this.props.handleListAdd();
                                                        this.setState({ addFieldsShowed: false });
                                                    }}>
                                                    <ListImage className="addFieldsDrop-icon" />
                                                    <a href="">List</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default ActionCoverFilling;
