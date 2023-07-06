'use strict';

const SERVER_URL = 'http://localhost:3001';

// Handle Log in and Log out
const logIn = async (credentials) => {
    const response = await fetch(SERVER_URL + '/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    if(response.ok) {
      const user = await response.json();
      return user;
    }
    else {
      const errDetails = await response.text();
      throw errDetails;
    }
};

const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
};

// Get User info
const getUserInfo = async () => {
    const response = await fetch(SERVER_URL + '/api/sessions/current', {
      credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    } else {
      throw user;  // an object with the error coming from the server
    }
};

// Get all users
const getUsers = async () => {
  const response = await fetch(SERVER_URL + '/api/users', {
    method: 'GET',
    credentials: 'include',
  });
  const users = await response.json();
  if (response.ok) {
    return users;
  } else {
    throw users;
  }
};

// Ctrete a new page
const createpage = async (page) => {
  const response = await fetch(SERVER_URL + '/api/newpage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(page),
  });
  if(response.ok) {
    const page = await response.json();
    return page;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

// Delete a page
const delpage = async (id) => {
  const response = await fetch(SERVER_URL + '/api/deletepage', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(id)
  });
  if(response.ok) {
    const page = await response.json();
    return page;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

// Update a page
const uppage = async (page) => {
  const response = await fetch(SERVER_URL + '/api/updatepage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(page)
  });
  if(response.ok) {
    const page = await response.json();
    return page;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

// Get pictures
const getpictures = async () => {
  const response = await fetch(SERVER_URL + '/api/pictures', {
    method: 'GET',
    credentials: 'include',
  });
  const pictures = await response.json();
  if (response.ok) {
    return pictures;
  } else {
    throw pictures;
  }
};

// Get all pages
const getallpages = async () => {
  const response = await fetch(SERVER_URL + '/api/pages', {
    method: 'GET',
    credentials: 'include',
  });
  const pages = await response.json();
  if (response.ok) {
    return pages;
  } else {
    throw pages;
  }
};

// Get pages by username
const getpagesbyusername = async (username) => {
  const response = await fetch(SERVER_URL + '/api/pages/' + username, {
    method: 'GET',
    credentials: 'include',
  });
  const pages = await response.json();
  if (response.ok) {
    return pages;
  } else {
    throw pages;
  }
};

// Get the published pages
const getpublishedpages = async () => {
  const response = await fetch(SERVER_URL + '/api/pages/published', {
    method: 'GET',
    credentials: 'include',
  });
  const pages = await response.json();
  if (response.ok) {
    return pages;
  } else {
    throw pages;
  }
};

// Get the name of website
const getwebsitename = async () => {
  const response = await fetch(SERVER_URL + '/api/webname', {
    method: 'GET',
    credentials: 'include',
  });
  const name = await response.json();
  if (response.ok) {
    return name;
  } else {
    throw name;
  }
};

// Update the name of website
const updatewebsitename = async (name) => {
  const response = await fetch(SERVER_URL + '/api/upwebname', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(name)
  });
  if(response.ok) {
    const name = await response.json();
    return name;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const API = {logIn, logOut, getUserInfo, createpage, getpictures, getallpages, delpage, uppage, getUsers, getpagesbyusername, getpublishedpages, getwebsitename, updatewebsitename};
export default API;