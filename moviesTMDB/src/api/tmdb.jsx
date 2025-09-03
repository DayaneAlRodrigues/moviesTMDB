import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: "pt-BR",
    },
});

export const searchMovies = async (query, page = 1) => {
    try{
        const response = await tmdb.get("/search/movie", {
            params:{
                query: query,
                page: page
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        throw error;
    }
};

export const getMovieDetails = async (movieId) => {
    try{
        const response = await tmdb.get(`/movie/${movieId}`, {
            params: {
                apprend_to_response: "credits",
            },
        });
        return response.data;
    }catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        throw error;
    }
};