// export const API_URL = "https://api.jsonbin.io/v3/b/67752f9bad19ca34f8e40d4a"
// // export const API_URL = "https://steep-adorable-sled.glitch.me/"

// src/utils/constants.js
export const url = 'https://ec-site-ee9d3-default-rtdb.asia-southeast1.firebasedatabase.app/';
export const API_URL = (name, id = '') => `${url}${name}/${id}.json`;
