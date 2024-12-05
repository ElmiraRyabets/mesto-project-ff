const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
  headers: {
    authorization: "218cd896-e761-498d-89f7-9c5fe951097b",
    "Content-Type": "application/json",
  },
};

function checkResponse (res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export function getUser() {
  return fetch(`${config.baseUrl}/users/me `, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
}

export function updateUser(userName, userAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function postCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  }).then((res) => {
    return checkResponse(res);
  });
}

export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "PUT",
  }).then((res) => {
    return checkResponse(res);
  });
}

export function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  }).then((res) => {
    return checkResponse(res);
  });
}

export function updateUserAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: url,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}
