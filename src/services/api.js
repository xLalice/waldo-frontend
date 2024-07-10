import axios from 'axios';

const BASE_URL = 'https://waldo-backend-cy2z.onrender.com/api';

const api = {
    getCharacters: async (image) => {
      return axios.get(`${BASE_URL}/characters/${image}`);
    },
  
    validateCharacter: async (data) => {
      return axios.post(`${BASE_URL}/characters/validate`, data);
    },
  
    submitScore: async (scoreData) => {
      return axios.post(`${BASE_URL}/scores`, scoreData);
    },
  
    getTopScores: async (image) => {
      return axios.get(`${BASE_URL}/scores/${image}`);
    }

    
  };
  
  export default api;