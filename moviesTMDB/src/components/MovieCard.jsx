import styled from "styled-components";
import { Link } from "react-router-dom";
const Card = styled.div `
    background-color: var(--bg-color);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin:15px;
    width: 200px;
`;

const Poster = styled.img `
    width: 100%;
    heigth: 300px;
    object-fit:cover;
    border: 1px solid var(--border-color);
`;

const MovieInfo = styled.div `
    padding: 15px;
    flex-grow: 1;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.h3 `
    margin: 0 0 10px 0;
    font-size: 1.1em;
    color: var(--primary-color);
`;

const ReleaseYear = styled.p `
    font-size: 0.9em;
    color: var(--secundary-color);
    margin-bottom : 10px
`;

const DetailsButton = styled(Link) `
    display: block;
    background-color: var(--color-hover);
    color: var(--bg-color);
    text-align: center;
    padding: 8px 15px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: var(--secundary-color);
    }

`;


const MovieCard = ({movie}) => {
    const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=Sem+Poster';

    const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';

    return (
        <Card>
            <Poster src={posterUrl} alt={movie.title} />
            <MovieInfo>
                <Title>{movie.title}</Title>
                <ReleaseYear>Ano: {releaseYear}</ReleaseYear>
                <DetailsButton to={`/movie/${movie.id}`}>Ver Detalhes</DetailsButton>
            </MovieInfo>
        </Card>

    )

};

export default MovieCard;