
import React from 'react';
import './reusablButton.css'
const ReusableButton = ({ onClick, label, className }) => {
  const buttonClassName = className || 'custom-button';

  return (
    <button className={buttonClassName} onClick={onClick}>
      {label}
    </button>
  );
};

export default ReusableButton;

