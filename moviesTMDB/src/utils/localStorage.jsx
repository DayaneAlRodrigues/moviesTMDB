const FAVORITES_KEY = "tmdb_favorites";

export const getFavorites = () => {
    try {
        const favorites = localStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    }catch (error){
        console.error("Erro ao carregar favoritos do localStorage", error);
        return [];
    }
};

export const saveFavorites = (favorites) => {
    try{
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }catch (error) {
        console.error("Erro ao salvar favoritos no LocalStorage", erro);
    }
};

export const addFavorite = (movie) => {
    const favorites = getFavorites();
    if(!favorites.some(fav => fav.id === movie.id)){
        const newFavorites = [...favorites, movie];
        saveFavorites(newFavorites);
        return newFavorites;
    }
    return favorites;
};

export const removeFavorite = (movieId) => {
    const favorites = getFavorites();
    const newFavorites = favorites.filter(fav => fav.id !== movieId);
    saveFavorites(newFavorites);
    return newFavorites;
};

export const isFavorite = (movieId) => {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === movieId);
};

