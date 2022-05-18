import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAvatarEdit (props) {
  const avatarInputRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    
    props.onUpdateAvatar({
      avatar: avatarInputRef.current.value
    })

    props.onClose();
  }

  React.useEffect(() => {
    avatarInputRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
        title="Обновить аватар"
        name="avatar-update"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
    >

    <input
      id="url-avatar"
      type="url"
      name="avatar"
      placeholder="Ссылка на изображение"
      size="40"
      className="popup__input popup__input_type_avatar-url"
      ref={avatarInputRef}
      required
    />

    <span id="avatar-input-error" className="popup__span error"></span>

  </PopupWithForm>
  )
}
export default PopupAvatarEdit;