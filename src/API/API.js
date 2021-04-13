import download from 'downloadjs';

const axios = require('axios');

export const API_URL = 'http://localhost:5000';


export const getFiles = async (fkValue, fk, table) => {
  try {
    return await axios
      .get(API_URL + `/files`)
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.error(error);
  }
};
export const deleteFile = async (id, table) => {
  try {
    return await axios.delete(API_URL + `/file/${id}/${table}`).then((res) => {
      return res;
    });
  } catch (error) {
    console.error(error);
  }
};
export const uploadFile = async (file) => {
  try {
    const url = API_URL + `/uploadFile`;
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return await axios.post(url, formData, config).then((res) => {
      return res;
    });
  } catch (error) {}
};

export const downloadFile = async (file_name) => {
  try {
    const result = await axios.get(`${API_URL}/download/${file_name}`, {
      responseType: 'blob',
    });
    // return result
    return download(result.data, file_name, result.headers["content-type"]);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // todo
    }
  }
};