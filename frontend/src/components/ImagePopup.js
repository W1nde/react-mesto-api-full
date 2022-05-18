import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_pic ${props.card && 'popup_opened'}`}>
    <div className="popup__overlay"></div>
    <div className="popup__pic-container">
      <img src={props.card?.link} alt={`Изображение ${props.card?.name}`} className="popup__pic" />
      <h2 className="popup__pic-title">{props.card?.name}</h2>
      <button type="button" onClick={props.onClose} className="popup__close"></button>
    </div>
  </div>
  )
}

export default ImagePopup;