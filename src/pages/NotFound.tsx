import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { capitalize } from '../utils/capitalize';
import styled from 'styled-components';
import CardDiv from '../styles/CardDiv';

const NotFoundCard = styled(CardDiv)`
    .back {
        font-family: monospace;
        font-size: 1.5rem;
        cursor: pointer;
    }

    margin: 2rem 0;
    padding: 0.5rem 1rem;

    p>a {
        font-weight: bold
    }
`;

interface Props {
    lastUrl: string;
    lastTitle: string;
}

const synonyms = [
    'yikes', 'geez', 'blimey', 'goodness', 'gosh', 'gracious', 'heavens', 'jeepers',
];

const NotFound = ({ lastTitle, lastUrl }: Props) => {
    const navigate = useNavigate();

    const indexRef = useRef(
        Math.floor(Math.random() * synonyms.length)
    );

    const word = synonyms[indexRef.current];
    const title = capitalize(word) + "!";

    return (
        <NotFoundCard>
            <Link className='back' to={lastUrl}>
                {"<"}
            </Link>
            <h1>{title}</h1>
            <p>
                This planet was not found.
                <Link to={lastUrl}>
                    &nbsp;
                    {`Back to ${lastTitle}...`}
                </Link>
            </p>
        </NotFoundCard>
    )
}

export default NotFound;