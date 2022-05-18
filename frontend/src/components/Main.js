import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main ({
  cards,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  onConfirmCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          onClick={onEditAvatar}
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser?.avatar})` }}
        ></div>

        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              onClick={onEditProfile}
              className="profile__edit-button"
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>

        <button
          type="button"
          onClick={onAddPlace}
          className="profile__add-button"
        ></button>
      </section>

      <section className="elements">
        {cards.map((cardData) => (
          <Card
            card={cardData}
            key={cardData._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onConfirmCardDelete={onConfirmCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
