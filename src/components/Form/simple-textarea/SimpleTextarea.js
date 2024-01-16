import React, { Component } from 'react';
import './SimpleTextarea.scss';
import { FiSearch } from 'react-icons/fi';
import { GrFormClose } from 'react-icons/gr';
import { FiArrowLeft } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
class SimpleTextarea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestionShowed: false,
            categories: this.props.categories,
            phrases: [],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.adjustTextarea = this.adjustTextarea.bind(this);
        this.returnItems = this.returnItems.bind(this);
        this.addParagraph = this.addParagraph.bind(this);
    }
    handleInputChange(e) {
        this.props.handleInputs(this.props.name, e.target.value);
    }
    adjustTextarea(event) {
        var windowHeight = window.innerHeight;
        var elementHeight = event.target.getBoundingClientRect().top;
        console.log(windowHeight);
        console.log(elementHeight + 100);
        if (elementHeight + 100 > windowHeight) {
            document.getElementById('introd').scrollBy(0, 150);
        }
    }

    componentDidMount() {
        // if we hover over a span that has a class of suggestionParagraph
        // we will add a class of suggestionParagraphHover to it

        document.addEventListener('mouseover', (event) => {
            // we remove the class of active from all the suggestionParagraph
            // so that we can add it to the hovered one
            document.querySelectorAll('.suggestionParagraph').forEach((element) => {
                element.classList.remove('active');
            });

            if (event.target.classList.contains('suggestionParagraph')) {
                event.target.classList.add('active');
            }
        });
        // set phrrases with the first category

        // i want to fill phrases with the first element in this.props.categories[0].phrases
        // but i can't do it because i don't know how to access the first element in this.props.categories
        // i tried this.props.categories[0].phrases but it didn't work

        setTimeout(() => {
            this.props.categories !== undefined && this.props.categories.length > 0 && this.setState({ phrases: this.props.categories[0].phrases });
        }, 2000);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseover', (event) => {});
    }

    //  convert a text paragraph array of phrases
    // each phrase needs to be in a span tag
    // example :
    // inpuT, Hello My name is mehdi, Howe are you doing
    // output : [<span>Hello My name is mehdi</span>, <span>Howe are you doing</span>]

    convertParagraphToPhrases(paragraph) {
        let phrases = [];
        let phrase = '';
        for (let i = 0; i < paragraph.length; i++) {
            if (paragraph[i] === '.' || paragraph[i] === '!' || paragraph[i] === '?') {
                phrases.push(
                    <span onClick={(event) => this.clickedOnSuggestionParagraph(event)} className="suggestionParagraph">
                        {phrase + paragraph[i]}
                    </span>
                );
                phrase = '';
            } else {
                phrase += paragraph[i];
            }
        }
        return phrases;
    }

    clickedOnSuggestionParagraph(event) {
        this.props.addSummary(event.target.textContent);
    }
    addParagraph(paragraph) {
        this.props.addSummary(paragraph);
    }

    handleToggle() {
        this.setState({ suggestionShowed: !this.state.suggestionShowed });
    }

    returnItems() {
        let items = this.state.phrases;
        let itemsToReturn = [];

        for (let i = 0; i < items.length; i++) {
            itemsToReturn.push(
                <div className="simpleTextArea-suggestion-body-items-item">
                    {/* Left */}
                    <div onClick={() => this.addParagraph(items[i])} className="simpleTextArea-suggestion-body-items-item-left">
                        <FiArrowLeft className="icon" />
                    </div>
                    {/* Right */}
                    <div className="simpleTextArea-suggestion-body-items-item-right">
                        <p className="suggestionParagraph">{this.convertParagraphToPhrases(items[i])}</p>
                    </div>
                </div>
            );
        }
        return itemsToReturn;
    }

    // handle category click and set the phrases
    handleCategoryClick(category) {
        this.setState({ phrases: category.phrases });
    }

    render() {
        return (
            <div className="simpleTextArea-wrapper">
                <div className="simpleTextArea">
                    <div className="simpleTextArea-head">
                        <span className="inputTitle">{this.props.title}</span>
                        <div className="toggle">
                            {this.props.suggestions === true ? (
                                <span onClick={() => this.handleToggle()} className="toggle-text">
                                    Suggestion
                                </span>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <textarea onClick={(event) => this.adjustTextarea(event)} style={{ overflow: 'auto' }} value={this.props.value} onChange={(event) => this.handleInputChange(event)} />
                    <span className="border"></span>
                </div>
                <AnimatePresence>
                    {this.state.suggestionShowed ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="simpleTextArea-suggestion">
                            {/* Head */}
                            <div className="simpleTextArea-suggestion-head">
                                <FiSearch className="simpleTextArea-suggestion-head-search-icon" />
                                <div className="simpleTextArea-categories">
                                    {this.props.categories.map((category, index) => {
                                        return (
                                            <a onClick={() => this.handleCategoryClick(category)} key={index} className="simpleTextArea-categories-item">
                                                {category.name}
                                            </a>
                                        );
                                    })}
                                </div>
                                <GrFormClose onClick={() => this.handleToggle()} className="simpleTextArea-suggestion-head-icon" />
                            </div>
                            {/* Body */}
                            <div className="simpleTextArea-suggestion-body">
                                {/* Body head */}
                                <div className="simpleTextArea-suggestion-body-head">
                                    {/* Most Populare */}

                                    <div className="simpleTextArea-suggestion-body-head-most-popular">
                                        <FaCrown className="simpleTextArea-suggestion-body-head-most-popular-icon" />
                                        <span>Most Popular</span>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="simpleTextArea-suggestion-body-items">{this.returnItems()}</div>
                            </div>
                            {/* Footer */}
                            <div className="simpleTextArea-suggestion-footer"></div>
                        </motion.div>
                    ) : (
                        ''
                    )}
                </AnimatePresence>
            </div>
        );
    }
}
export default SimpleTextarea;
