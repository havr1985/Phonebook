import axios from "axios";

const contactsInstance = axios.create({
    baseURL: 'https://phonebook-backend-33je.onrender.com/api',
});

export const setToken = token => {
  contactsInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestContacts = async () => {
  const { data } = await contactsInstance.get('/contacts');
    return data.result;
};

export const requestAddContacts = async (newContact) => {
    const { data } = await contactsInstance.post('/contacts', newContact);
    return data;
};

export const requestDeleteContacts = async (contactId) => {
  const { data } = await contactsInstance.delete(`/contacts/${contactId}`);
  return data;
};

export const requestUpdateFavorite = async (contactId, formData) => {
  const { data } = await contactsInstance.patch(`/contacts/${contactId}/favorite`, formData);
  return data;
};

export const requestFavoriteContacts = async () => {
  const { data } = await contactsInstance.get('/contacts?favorite=true');
  return data.result;
};

export const requestRegister = async formData => {
    const { data } = await contactsInstance.post('/auth/register', formData);
    return data;
};

export const requestLogin = async formData => {
  const { data } = await contactsInstance.post('/auth/login', formData);
  setToken(data.token);
  return data;
};

export const requestRefreshUser = async () => {
  const { data } = await contactsInstance.get('/auth/current');
  return data;
};

export const requestLogout = async () => {
  const { data } = await contactsInstance.post('/auth/logout');
  return data;
};

export const requestAvatar = async formData => {
  const { data } = await contactsInstance.patch('/auth/users/avatars', formData, {
    headers: {
      'Content-Type': 'multipart/from-data',
    },
  });
  return data;
}