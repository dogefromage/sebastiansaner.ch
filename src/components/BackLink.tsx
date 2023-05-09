import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Icon = styled.i`
    font-family: monospace;
    font-size: 1.5rem;  
`;

interface Props {
    to: string;
}

const BackLink = ({ to }: Props) => {
    return (
        <Link to={to}>
            <Icon
                className="fa-solid fa-chevron-left"
            />
        </Link>
    );
}

export default BackLink;