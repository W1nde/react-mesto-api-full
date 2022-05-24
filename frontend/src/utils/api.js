class Api {

  constructor( {address, token} ) {
    this._address = address;
    this._token = token;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards(token) {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(this._getResponse)
  }

  addCard({name, link, token}) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._getResponse)
  }

  getUserInfo(token) {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(this._getResponse)
  }

  updateUserInfo = ({name, about, token}) => {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._getResponse)
  }

  updateAvatarInfo(avatar, token) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(avatar)
    }).then(this._getResponse)
  }

  deleteCard(_id, token) {
    return fetch(`${this._address}/cards/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(this._getResponse)
  }

  like(id, isLiked, token) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(this._getResponse)
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }
}

const api = new Api ({
  address: 'http://api.mshadpalov.students.nomoredomains.xyz',
})

export default api;