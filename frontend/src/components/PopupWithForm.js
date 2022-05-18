import React from 'react';

function PopupWithForm(props) {

  return (
    <div className={props.isOpen 
      ? `popup popup_type_${props.name} popup_opened` 
      : `popup popup_type_${props.name}`}>
    <div className="popup__overlay"></div>
    <div className="popup__content">
      <button type="button" onClick={props.onClose} className="popup__close"></button>
      <h2 className="popup__title">{props.title}</h2>
      <form name={`${props.name}-form`} className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit} >
        {props.children}
        <button type="submit" className="popup__save">Сохранить</button>
      </form>
    </div>
  </div>
  )
}

export default PopupWithForm;