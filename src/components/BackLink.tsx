import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BackLinkDiv = styled.div`
    font-size: 1.2rem;

    display: flex;
    align-items: center;
    gap: 1ch;
`

interface Props {
    to: string;
}

const BackLink = ({ to }: Props) => {
    return (
        <Link to={to}>
            <BackLinkDiv>
                <i
                    className="fa-solid fa-arrow-left"
                />
                Back
            </BackLinkDiv>
        </Link>
    );
}

export default BackLink;