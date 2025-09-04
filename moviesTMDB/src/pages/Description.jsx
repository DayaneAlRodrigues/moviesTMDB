import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetails } from "../api/tmdb";
import LoadingSpinner from "../components/LoadingSpinner";
import {isFavorite} from "../utils/localStorage";
const DetailContainer = styled.div `
`;

const Poster = styled.img `
`;
const InfoSection = styled.div `
`;
const Title = styled.h1 `
`;
const Tagline = styled.h2 `
`;
const Overview = styled.p `
`;
const DetailItem = styled.p `
`;
const CastList = styled.ul `
`;
const CastItem = styled.li `
`;


const Description = () => {
    const { id} = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMovieFavorite, setIsMovieFavorite] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
                setIsMovieFavorite(isFavorite(data.id));
            }catch(error) {
                setError("Não foi possível carregar os detalhes do filme");
                console.error(error);
            }finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    

    if (loading) return <LoadingSpinner/>;
    if(error) return <p style={{color:"red", textAlign:"center"}}>{error}</p>
    if (!movie) return <p style={{color:"white", textAlign:"center"}}>Filme não encontrado</p>

    const posterUrl = movie.poster_path ?
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Poster';
    
    const director = movie.credits?.crew.find((member) => member.job === "Director")?.name || "N/A";

    const cast = movie.credits?.cast.slice(0,5).map((actor) => actor.name) || [];
    return (
        <DetailContainer>
            <Poster src={posterUrl} alt={movie.title}/>
            <InfoSection>
                <Title>{movie.title} ({movie.release_date ? movie.release_date.substring(0,4) : "N/A"})</Title>
                {movie.tagline && <Tagline>"{movie.tagline}"</Tagline>}
                <Overview>{movie.overview ||"Sinopse não disponível"}</Overview>
                <DetailItem><strong>Diretor:</strong> {director}</DetailItem>
                <DetailItem><strong>Avaliação (TMDB):</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</DetailItem>
                <DetailItem>
                    <strong>Gêneros:</strong>{' '}
                        {movie.genres && movie.genres.length > 0
                        ? movie.genres.map((g) => g.name).join(', ')
                        : 'N/A'}
                </DetailItem>
                <DetailItem>
                    <strong>Elenco Principal:</strong>
                        {cast.length > 0 ? (
                    <CastList>
                        {cast.map((actor, index) => (
                        <CastItem key={index}>{actor}</CastItem>
                        ))}
                    </CastList>
                    ) : (
                    ' N/A'
                    )}
                </DetailItem>
            </InfoSection>
        </DetailContainer>
    )
}

export default Description;