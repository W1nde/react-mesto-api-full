import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const deleteBtnClass = `element__trash ${isOwn ? "" : "element__trash_hidden"}`;
  const isLiked = props.card.likes.some((id) => id === currentUser._id);
  const likeBtnClass = `element__like-button ${
    isLiked ? "element__like-button_active" : "element__like-button"
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardClick() {
    props.onConfirmCardDelete(props.card);
  }

  return (
    <article className="element">
      <img
        src={props.card.link}
        onClick={handleClick}
        className="element__image"
        alt={props.card.name}
      />
      <button type="button" className={deleteBtnClass} onClick={handleCardClick}></button>
      <div className="element__footer">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-block">
          <button type="button" className={likeBtnClass} onClick={handleLikeClick}></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
