import axios from "axios";

export const getPost = (id) => {
    return axios.get(`http://jsonplaceholder.typicode.com/posts/${id}`);
};

export const getUsers = () => {
    return axios.get(`http://jsonplaceholder.typicode.com/users`);
};
