import axios from "axios";
import type { DiaryEntry } from "../types";

const baseUrl = '/api/diaries';

const getAll = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data)
}

export default { getAll }