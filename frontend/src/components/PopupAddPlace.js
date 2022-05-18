import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddPlace(props) {
const [name, setName] = useState('');
const [link, setLink] = useState('');

function handlePlaceChange(evt) {
  setName(evt.target.value);
}

function handleImageChange(evt) {
  setLink(evt.target.value);
}

function handleAddPlaceSubmit(evt) {
  evt.preventDefault();

  props.onCreateCard({
    name,
    link
  });
  setName('');
  setLink('');
  props.onClose();
}

  return (
    <PopupWithForm
        title="Новое место"
        name="add"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleAddPlaceSubmit}
    >

        <input
        id="card-name"
        type="text"
        name="name"
        placeholder="Название"
        size="40"
        className="popup__input popup__input_type_add"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handlePlaceChange}
        required
        />
    
        <span id="card-name-error" className="popup__span error"></span>

        <input
        id="url"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        size="40"
        className="popup__input popup__input_type_url"
        value={link}
        onChange={handleImageChange}
        required
        />

        <span id="url-error" className="popup__span error"></span>

    </PopupWithForm>
  )
}

export default PopupAddPlace;