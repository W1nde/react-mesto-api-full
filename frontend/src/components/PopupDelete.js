import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDelete(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onClose();
    props.onCardDelete();    
  }

  return(
    <PopupWithForm 
      title="Вы уверены?" 
      name="pic-delete"
      isOpen={props.isOpen}
      onClose={props.onClose} 
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default PopupDelete;