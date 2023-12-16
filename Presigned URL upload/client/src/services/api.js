import axios from 'axios';
const GET_SIGNEDURL_API_PATH = 'http://localhost:8000'

const headers = {
    "Content-type": "multipart/form-data"
};


export const getSignedUrl = async () => {
    try {
        const response = await axios.get(`${GET_SIGNEDURL_API_PATH}/image-url`);
        return response.data;
    } catch (error) {
        console.log("Error while calling the api", error.message);
        return error.response.data;
    }
}

export const uploadFile = async (url, file) => {
    try {
        const response = await axios.put(url, file, { headers: headers })
        return response.data;
    } catch (error) {
        console.log("Error while calling uploadFile function", error);
        return error.response.data;
    }
}
