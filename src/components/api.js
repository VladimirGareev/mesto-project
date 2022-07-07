const config = {
  url: "https://mesto.nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: 'f2618b0f-750a-406d-b0d6-73ba336df905',
    "Content-type": "application/json"
  }
}

export const checkResponse = (res) => {
  return res.ok? res.json() : Promise.reject(res)
}

export function getAllCards() {
  return fetch(`${config.url}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
}

export function addCard(cardName, cardLink) {
  return fetch(`${config.url}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name:`${cardName}`,
      link: `${cardLink}`
    })
  })
  .then(checkResponse)
}

export function removeCard(dataId) {
  return fetch(`${config.url}/cards/${dataId}`, {
    method: 'DELETE',
    headers: config.headers,
    })
    .then(checkResponse)
}

export function editProfile(profileName, profileAbout) {
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${profileName}`,
      about: `${profileAbout}`
    })
  })
  .then(checkResponse)
}

export function getProfile() {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers,
    })
    .then(checkResponse)
}

export function addLike(dataId) {
  return fetch(`${config.url}/cards/likes/${dataId}`, {
    method: 'PUT',
    headers: config.headers,
    })
    .then(checkResponse)
}

export function removeLike(dataId) {
  return fetch(`${config.url}/cards/likes/${dataId}`, {
    method: 'DELETE',
    headers: config.headers,
    })
    .then(checkResponse)
}

export function editAvatar(profileAvatar) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${profileAvatar}`
    })
  })
  .then(checkResponse)
}
