class Api {

  constructor( {address, token} ) {
    this._address = address;
    this._token = token;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token
      }
    }).then(this._getResponse)
  }

  addCard({name, link}) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      credentials: 'include',
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
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(this._getResponse)
  }

  updateUserInfo = ({name, about}) => {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
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
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(avatar)
    }).then(this._getResponse)
  }

  deleteCard(_id) {
    return fetch(`${this._address}/cards/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: this._token
      }
    }).then(this._getResponse)
  }

  like(id, isLiked) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
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
  address: 'https://api.mshadpalov.students.nomoredomains.xyz',
})

export default api;