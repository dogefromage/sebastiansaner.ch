import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

const TitleHeader = styled.h1<{ 
    $isMobile: boolean 
}>`
    margin: 1.5rem 0;
    // margin-top: 25vh;
    // margin-bottom: 5rem;
    // margin: 25vh 0 10vh;

    font-family: 'Roboto Mono', monospace;
    // font-size: 1.6rem;

    user-select: none;
    @include unselectable;

    &::before {
        content: "$ ";
        opacity: 0.3;
    }

    &::after {
        content: ".ch";
        opacity: 0.3;
    }

    ${({ $isMobile }) => $isMobile && `font-size: 1.5rem;`}
`;

const Title = () => {
    return (
        <TitleHeader $isMobile={isMobile}>
            { 'sebastiansaner' } 
        </TitleHeader>
    );
}

export default Title;