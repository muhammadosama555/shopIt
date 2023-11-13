let API_BASE_URL;

if (process.env.NODE_ENV === 'development') {
    API_BASE_URL = 'http://localhost:4500/api'; 
} else if (process.env.NODE_ENV === 'production') {
    API_BASE_URL = 'http://142.93.244.189/api'; 
}

export { API_BASE_URL };
