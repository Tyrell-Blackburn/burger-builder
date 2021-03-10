import axios from 'axios';

// creating an axios instance
const instance = axios.create({
    baseURL: 'https://react-my-builder-b9aae-default-rtdb.firebaseio.com/'
});

export default instance;