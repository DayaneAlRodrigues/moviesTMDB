import styled from "styled-components";
import { getFavorites, removeFavorite} from "../utils/localStorage";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";

const FavoritesContainer = styled.div `
`;
const FavoritesGrid = styled.div `
`;
const Message = styled.p `
`;

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(getFavorites());
    },[]);

    if(favorites.length === 0){
        return (
            <FavoritesContainer>
                <h1>Meus Filmes Favoritos</h1>
                <Message>Você ainda não adicionou nenhum filme aos favoritos.</Message>
            </FavoritesContainer>
        );
    }

    const handleRemoveFavorites = (movieId) => {
        removeFavorite(movieId);
    }
    return (
        <FavoritesContainer>
            <h1>Meus Filmes Favoritos</h1>
            <FavoritesGrid>
                {favorites.map((movie) => (
                    <div>
                        <MovieCard key={movie.id} movie={movie} />
                        <button onClick={() => handleRemoveFavorites(movie.id)}>Remover</button>
                    </div>
                    
                ))}
            </FavoritesGrid>
        </FavoritesContainer>
    );
};

export default Favorites;