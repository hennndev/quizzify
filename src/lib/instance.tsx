import axios from "axios"

export const instance = axios.create({
    baseURL: 'https://opentdb.com/api.php?',
})