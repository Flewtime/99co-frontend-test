import { useState } from "react";
import React from 'react';
import "./styles.css";

export default function ListingAd({ 
  pic, 
  title,
  address,
  description,
  project_type,
  year,
  ownership_type,
  psf_min,
  psf_max,
  subprice_label,
  availabilities_label,
}) {
  const [showDescription, setShowDescription] = useState(false);
  const [clickedNumber, setClickedNumber] = useState(null);
  const [descriptionButton] = useState('See description');

  const Clicked = () => {
    setShowDescription(!showDescription);
}

  function hideNumber(phoneNumber, notVisible) {
    if (notVisible) {
      const firstNumber = phoneNumber.slice(0, 4);
      const notVisibleNumber = phoneNumber.slice(4).replace(/\d/g, '*');
      return firstNumber + notVisibleNumber;
    } else {
      return phoneNumber;
    }
  }

  const formatDescription = (description) => {
    const phoneNumberRegex = /\d{8}|\d{4}\s\d{4}/g;
    let currentIndex = 0;
    const formattedDescription = [];
    let match;

    while ((match = phoneNumberRegex.exec(description)) !== null) {
      const phoneNumber = match[0];
      const unVisibleNumber = hideNumber(phoneNumber, phoneNumber !== clickedNumber);

      formattedDescription.push(description.slice(currentIndex, match.index));
      formattedDescription.push(
        <a
          key={match.index}
          className="phone-number-styling"
          onClick={() => setClickedNumber(phoneNumber)}>
          {unVisibleNumber}
        </a>
      );
      currentIndex = match.index + phoneNumber.length;
    }
    formattedDescription.push(description.slice(currentIndex));
    return formattedDescription;
  };

  return (
    <div className="App">
    <div className="ribbon">launching soon</div>
    <div className="image-container">
      <div className="image-foreground">
        <div className="image-arrows">
          <img className="left-arrow" src="/chevron-left.svg"></img>
          <img className="right-arrow" src="/chevron-right.svg"></img>
        </div>
      </div>
      <img className="mainContent-image" src={pic}></img>
    </div>
    <div className="mainContent">
      <div className="mainContent-header">
        <div className="mainContent-details">
          <div className="mainContent-title-container">
            <img src="/building-icon.svg" className="building-icon"></img>
            <div className="bodyContent">
              <p className="bodyContent-title">{title}</p>
              <p className="bodyContent-address">{address}</p>
            </div>
          </div>
          <div className="bodyContent-type-container">
              <p className="bodyContent-type">{project_type} · {year} · {ownership_type}</p>
              <p className="availabilities">{availabilities_label}</p>
            </div>
            </div>
          <div className="bodyContent-price">
              <p className="price-psf"> ${psf_min} - ${psf_max} psf</p>
              <p className="price-from">{subprice_label}</p>
          </div>
      </div>
      <div>
      <div className="button-container">
        <button className="button-desc" onClick={Clicked}>
          {descriptionButton}
        </button>
      </div>
      
      {showDescription && (
        <p>
          {formatDescription(description).map((part, index) => (
            <React.Fragment key={index}>
              {part}
            </React.Fragment>
          ))}
        </p>
      )}
    </div>
    </div>
    </div>
  );
}
