import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';

const LayoutDiv = styled.div`
    padding: 1rem 0;
`;

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {

    return (
        <LayoutDiv>
            { children }
            <Footer />
        </LayoutDiv>
    );
}

export default Layout;