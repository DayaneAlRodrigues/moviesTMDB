import styled from "styled-components";
import {Link} from "react-router-dom";
const Header = styled.header `
`;

const Nav = styled.nav `
`;

const Logo = styled.h1 `
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