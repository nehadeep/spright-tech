import axios from 'axios';

const  instance = axios.create({
    baseURL: 'https://react-burger-35f1f.firebaseio.com/'

});

export default instance;