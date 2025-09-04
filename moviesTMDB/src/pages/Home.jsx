import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { searchMovies} from "../api/tmdb";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useState , useCallback, useEffect} from "react";
import Pagination from "../components/Pagination";



const SearchContainer = styled.div `
    padding: 20px;
    color : var(--primary-color);
    text-align: center;
    background-color: var(--bg-color);fetchMovies
`;

const SearchInput = styled.input `
    width: 80%;
    max-width: 500px;
    padding: 12px 20px;
    font-size: 1.1em;
    border-radius: 25px;
    border: 1px solid var(--border-color);
    background-color: var(--bg-input);
    color: var(--primary-color);
    margin-bottom: 30px;
    margin-top:30px;

    &:focus {
        outline: none;
        border-color: var(--color-hover);
    }
`;

const ResultsGrid = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
`;

const Message = styled.p `
    font-size: 1.2em;
    color: var(--primary-color);
`;

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] =  useState(parseInt(searchParams.get('page')) || 1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = useCallback(async (searchQuery, pageNum) => {
        if (!searchQuery){
            setMovies([]);
            setTotalPages(1);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await searchMovies(searchQuery, pageNum);
            setMovies(data.results);
            setTotalPages(data.total_pages);
          } catch (err) {
            setError('Ocorreu um erro ao buscar filmes. Por favor, tente novamente.');
            console.error(err);
          } finally {
            setLoading(false);
          }
    }, []);

    useEffect(() => {
        const params = {};
        if(query) params.query = query;
        if (currentPage > 1) params.page = currentPage;
        setSearchParams(params);

        fetchMovies(query, currentPage);
    }, [query, currentPage, fetchMovies, setSearchParams]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <SearchContainer>
            <h1>Busque aqui: filmes ou séries</h1>
            <form onSubmit={handleSearchSubmit} >
                <SearchInput
                    type="text"
                    placeholder="Digite o nome do seu filme ou série"
                    value={query}
                    onChange= {(e) => setQuery(e.target.value)}
                    />
                
            </form>
            {loading && <LoadingSpinner/>}
            {error && <Message style={{color: "red"}}>{error}</Message>}
            {query && !loading && movies.length === 0 && !error && (
                <Message>Nada foi encontrado para {query}</Message>
            )}

            <ResultsGrid>
                {!loading && movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </ResultsGrid>

            {totalPages > 1 && !loading && !error && (
                <Pagination
                    currentPage = {currentPage}
                    totalPages = {totalPages}
                    onPageChange = {handlePageChange}
                    />
            )}
        </SearchContainer>
    );   
};

export default Home;