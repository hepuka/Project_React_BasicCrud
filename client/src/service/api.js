import axios from "axios";

const URL = "http://localhost:8000";

export const addUser = async (data) => {
  try {
    return await axios.post(`${URL}/add`, data);
  } catch (error) {
    console.error("Error while calling add User API", error);
  }
};

export const getUsers = async () => {
  try {
    return await axios.get(`${URL}/all`);
  } catch (error) {
    console.error("Error while calling getUsers API", error);
    return null;
  }
};

export const getUser = async (id) => {
  try {
    return await axios.get(`${URL}/${id}`);
  } catch (error) {
    console.error("Error while calling getUser API", error);
  }
};

export const editUser = async (user, id) => {
  try {
    return await axios.put(`${URL}/${id}`, user);
  } catch (error) {
    console.error("Error while calling editUser API", error);
  }
};

export const deleteUser = async (id) => {
  try {
    return await axios.delete(`${URL}/${id}`);
  } catch (error) {
    console.error("Error while calling delete API", error);
  }
};

export const addBook = async (data) => {
  try {
    return await axios.post(`${URL}/addBook`, data);
  } catch (error) {
    console.error("Error while calling add Book API", error);
  }
};

export const addLanguage = async (data) => {
  try {
    return await axios.post(`${URL}/addLanguage`, data);
  } catch (error) {
    console.error("Error while calling add Language API", error);
  }
};

export const addCategory = async (data) => {
  try {
    return await axios.post(`${URL}/addCategory`, data);
  } catch (error) {
    console.error("Error while calling add Category API", error);
  }
};

export const getCategories = async () => {
  try {
    return await axios.get(`${URL}/categories`);
  } catch (error) {
    console.error("Error while calling getCategories API", error);
    return null;
  }
};

export const getLanguages = async () => {
  try {
    return await axios.get(`${URL}/languages`);
  } catch (error) {
    console.error("Error while calling getLanguages API", error);
    return null;
  }
};

export const searchBooks = async (filters) => {
  try {
    return await axios.post(`${URL}/books/search`, filters);
  } catch (error) {
    console.error("Error while calling searchBooks API", error);
  }
};

export const getBooks = async () => {
  try {
    return await axios.get(`${URL}/books`);
  } catch (error) {
    console.error("Error while calling getBooks API", error);
    return null;
  }
};

export const getBook = async (id) => {
  try {
    return await axios.get(`${URL}/book/${id}`);
  } catch (error) {
    console.error("Error while calling getBook API", error);
  }
};

export const editBook = async (book, id) => {
  try {
    return await axios.put(`${URL}/book/edit/${id}`, book);
  } catch (error) {
    console.error("Error while calling editBook API", error);
  }
};

export const deleteBook = async (id) => {
  try {
    return await axios.delete(`${URL}/book/${id}`);
  } catch (error) {
    console.error("Error while calling deleteBook API", error);
  }
};

export const addRent = async (data) => {
  try {
    return await axios.post(`${URL}/rent`, data);
  } catch (error) {
    console.error("Error while calling add Rent API", error);
  }
};

export const getRents = async () => {
  try {
    return await axios.get(`${URL}/rents`);
  } catch (error) {
    console.error("Error while calling getRents API", error);
    return null;
  }
};

export const getRent = async (id) => {
  try {
    return await axios.get(`${URL}/rent/${id}`);
  } catch (error) {
    console.error("Error while calling getRent API", error);
  }
};

export const getRentByUser = async (userid) => {
  try {
    return await axios.get(`${URL}/rent/user/${userid}`);
  } catch (error) {
    console.error("Error while calling getRentByUser API", error);
  }
};
