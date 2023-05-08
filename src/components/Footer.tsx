import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    a, p {
        margin: 0;
        opacity: 0.6;
        font-size: 12px;
        font-weight: normal;
    }
`;

interface Props {

}

const Footer = ({}: Props) => {
    return (
        <FooterDiv>
            <p>&copy; Sebastian Saner {new Date().getFullYear()}</p>
            <Link to='imprint'>Imprint</Link>
        </FooterDiv>
    );
}

export default Footer;