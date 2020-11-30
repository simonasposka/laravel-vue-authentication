import axios from "axios";

let instance = axios.create({
    withCredentials: true,
});

instance.interceptors.request.use(request => {
    request.headers.common['Accept']       = 'application/json';
    request.headers.common['Content-Type'] = 'application/json';
    return request;
});

instance.interceptors.response.use(
response => { return response; },
error => {
        if (error.response.status === 401) {
            sessionStorage.removeItem('user');
            window.location.reload();
        }

        return Promise.reject(error);
    }
);


export default instance;
