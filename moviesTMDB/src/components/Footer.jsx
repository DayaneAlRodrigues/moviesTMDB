import styled from "styled-components";

const Footerc = styled.footer `
    display:flex;
    justify-content:center;
`;

const Footerp = styled.p `
    text-align:center;
    color:var(--primary-color);
`;

const Footer = () => {
    return (
        <Footerc>
            <Footerp>Desenvolvido por Dayane Rodrigues</Footerp>
        </Footerc>
    );
};

export default Footer;