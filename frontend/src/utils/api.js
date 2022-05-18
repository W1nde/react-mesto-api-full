class Api {

  constructor( {adress, token} ) {
    this._adress = adress;
    this._token = token;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: this._token
      }
    }).then(this._getResponse)
  }

  addCard({name, link}) {
    return fetch(`${this._adress}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._getResponse)
  }

  getUserInfo() {
    return fetch(`${this._adress}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(this._getResponse)
  }

  updateUserInfo = ({name, about}) => {
    return fetch(`${this._adress}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._getResponse)
  }

  updateAvatarInfo(avatar) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(avatar)
    }).then(this._getResponse)
  }
  
  deleteCard(_id) {
    return fetch(`${this._adress}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(this._getResponse)
  }

  like(id, isLiked) {
    return fetch(`${this._adress}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(this._getResponse)
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }
}

const api = new Api ({
  adress: 'https://mesto.nomoreparties.co/v1/cohort-35/',
  token: '3fdbcb9c-8f37-4908-83ea-7fa8f283a235'
})

export default api;