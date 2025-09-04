import styled from "styled-components";
import {Link} from "react-router-dom";
const Header = styled.header `
    color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    margin: 1em;
    padding: 1em;
`;

const Nav = styled.nav `
    a {
        text-decoration:none;
        color: var(--primary-color);
        padding: 10px;
    }

    &:hover a {
        color: var(--color-hover);
    }
`;

const Logo = styled.h1 `
    font-size: 1.3em;
    border: 1px solid var(--color-hover);
    border-radius: 10px;
    padding:0.5em;

    &:hover {
        background-color: var(--color-hover);
    }
`;


const NavBar = () => {
    return (
        <Header>
            <Logo>TMDB App</Logo>
            <Nav>
                <Link to="/">Buscar Filmes</Link>
                <Link to="/favorites">Favoritos</Link>
            </Nav>
        </Header>

    );

};

export default NavBar;