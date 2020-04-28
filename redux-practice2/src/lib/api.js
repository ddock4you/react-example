import axios from "axios";

export const getPost = (id) => {
    axios.get(`http://jsonplaceholder.typicode.com/posts/${id}`);
    // const test = await axios.get(`http://jsonplaceholder.typicode.com/posts/1`);
    // console.log(test);
};

export const getUsers = () => {
    axios.get(`http://jsonplaceholder.typicode.com/users`);
};
