import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BreadCrumbsDiv = styled.div`
    display: flex;

    margin-top: 2rem;
    font-size: 1.1rem;

    font-family: monospace;
    user-select: none;

    .slug {
        margin: 0;
        padding: 0;
        white-space: nowrap;
        cursor: pointer;
    }
`

interface Props {
    crumbs: {
        name: string;
        href?: string;
    }[]
}

const BreadCrumbs = ({ crumbs }: Props) => {
    if (isMobile) return null;
    return (
        <BreadCrumbsDiv>
            {
                crumbs.map(slug =>
                    <Link
                        className={'slug'}
                        to={slug.href || location.pathname}
                        key={`${slug.href}:${slug.name}`}
                    >
                        {`> ${slug.name}`}
                        &nbsp;
                    </Link>
                )
            }
        </BreadCrumbsDiv>
    );
}

export default BreadCrumbs;