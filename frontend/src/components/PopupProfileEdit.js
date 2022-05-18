import React, {useState, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupProfileEdit(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name ?? '');
  const [about, setAbout] = useState(currentUser?.about);
  
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }
  
  const handleAboutChange = (evt) => {
    setAbout(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    props.onUpdateUser({
      name: name,
      about: about
    });
    props.onClose();
  }

  useEffect(() => {
    if (currentUser) {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      >

      <input
        className="popup__input popup__input_type_name"
        id="user-name"
        type="text"
        name="name"
        value={name || ''}
        placeholder="Имя"
        size="40"
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        required
      />

      <span id="name-input-error" className="popup__span error"></span>

      <input
        className="popup__input popup__input_type_job"
        id="job-input"
        type="text"
        name="job"
        value={about|| ''}
        placeholder="О себе"
        size="40"
        minLength="2"
        maxLength="200"
        onChange={handleAboutChange}
        required
      />
        
      <span id="job-input-error" className="popup__span error"></span>
    </PopupWithForm>
  )
}
export default PopupProfileEdit;