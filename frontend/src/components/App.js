import React, { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import Register from './Register'
import Login from './Login'

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupAddPlace from './PopupAddPlace';
import PopupDelete from './PopupDelete';
import PopupProfileEdit from './PopupProfileEdit';
import PopupAvatarEdit from './PopupAvatarEdit';

import InfoTooltip from './InfoTooltip'

import api from '../utils/api';
import auth from '../utils/auth.js';

import authSuccess from '../images/authSuccess.svg'
import authFailure from '../images/authFailure.svg'

function App() {
  const [cards, setCards] = useState([]);
  const [isPopupProfileOpen, setIsPopupProfileOpen] = useState(false);
  const [isPopupAddOpen, setIsPopupPlaceOpen] = useState(false);
  const [isPopupAvatarOpen, setIsPopupAvatarOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [messageTooltip, setMessageTooltip] = React.useState({})
  
  const history = useHistory()

  const token = localStorage.getItem('jwt')

  function handlePopupProfileClick() {
    setIsPopupProfileOpen(true);
  }

  function handlePopupPlaceClick() {
    setIsPopupPlaceOpen(true);
  }

  function handlePopupAvatarClick() {
    setIsPopupAvatarOpen(true);
  }

  function handlePopupDeleteClick(cardData) {
    setIsPopupDeleteOpen(true);
    setCardToDelete(cardData);
  }

  function closePopups() {
    setIsPopupProfileOpen(false);
    setIsPopupPlaceOpen(false);
    setIsPopupAvatarOpen(false);
    setIsPopupDeleteOpen(false);
    setIsTooltipPopupOpen(false);

    setSelectedCard(null);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleUpdateUser(currentUser) {
    api
      .updateUserInfo({ name: currentUser.name, about: currentUser.about }, token)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(
        (err) => `Не удалось обновить данные пользователя, ошибка: ${err}`
      );
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatarInfo({avatar}, token)
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch(err => `Не удалось обновить аватар, ошибка: ${err}`)
  }

  function handleLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .like(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => `Не удалось обновить лайк, ошибка: ${err}`);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, token)
      .then(() => {
        setCards((state) =>
          state.filter((c) => {
            return c._id !== card._id;
          })
        );
      })
      .catch((err) => `Не удалось удалить карточку, ошибка: ${err}`);
  }

  function handleCardCreate({ name, link }) {
    api
      .addCard({ name, link }, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => `Не удалось создать карточку, ошибка: ${err}`);
  }

  function handleSubmitRegistration(data) {
    auth.registration(data)
      .then((res) => {
        if(res) {
          history.push('/sign-in')
          setIsTooltipPopupOpen(true)
          setMessageTooltip({ message: "Вы успешно зарегистрировались!", img: authSuccess})
        }        
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true)
        setMessageTooltip({ message: "Что-то пошло не так! Попробуйте еще раз.", img: authFailure })

      })
  }

  function handleSubmitAuthorization(data) {
    auth.authorization(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setEmail(data.email);
        history.push('/')
      })
      .catch((err) => {
        console.log(err);
        setIsTooltipPopupOpen(true)
        setMessageTooltip({ message: "Что-то пошло не так! Попробуйте еще раз.", img: authFailure })
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialData()
        .then(([userData, cardsList]) => {
          setCurrentUser(userData);
          setCards(cardsList);
       })
      .catch(err => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.getUser(jwt)
        .then((res) => {
          if(res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push('/');
          } else {
            localStorage.removeItem(jwt);
          }
        })
        .catch(err => console.log(err))
    }
  }, [history])

  function checkTocken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getUser(jwt)
        .then(([{ email }] ) => {
          setCurrentUser({ ...currentUser, email })
          setLoggedIn(true)
        })
        .catch((err) => console.log(err))
    }
  }

  React.useEffect(() => {
    checkTocken();
    if (loggedIn)
      Promise.all([api.getCards(token), api.getUserInfo(token)])
        .then(([cards, userInfo]) => {
          setCurrentUser({ ...currentUser, ...userInfo });
          setCards(cards)
        })
        .catch(err => `Данные пользователя не получены : ${err}`)
  }, [loggedIn]);
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          <Header
            onLogout={handleLogout}
            email={email}
          />

          <Switch>

            <ProtectedRoute
              exact path='/'
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handlePopupProfileClick}
              onEditAvatar={handlePopupAvatarClick}
              onAddPlace={handlePopupPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleLike}
              onСardDelete={handleCardDelete}
              onConfirmCardDelete={handlePopupDeleteClick}
              cards={cards}
            />

            <Route>
              {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
            </Route>

            <Route path='/sign-up'>
              <Register onSubmit={handleSubmitRegistration}/>
            </Route>

            <Route path='/sign-in'>
              <Login onSubmit={handleSubmitAuthorization}/>
            </Route>

          </Switch>

          <Footer />
          
        </div>

        <PopupAddPlace
          isOpen={isPopupAddOpen}
          onClose={closePopups}
          onCreateCard={handleCardCreate}
        />

        <PopupProfileEdit
          isOpen={isPopupProfileOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupAvatarEdit
          isOpen={isPopupAvatarOpen}
          onClose={closePopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupDelete
          isOpen={isPopupDeleteOpen}
          onClose={closePopups}
          onCardDelete={() => handleCardDelete(cardToDelete)}
        />

        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closePopups}
          messageTooltip={messageTooltip}
        />

        <ImagePopup card={selectedCard} onClose={closePopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
