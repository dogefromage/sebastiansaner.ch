import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { a, useTransition } from '@react-spring/web';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../components/BreadCrumbs';
import { useProject } from '../queries/useProject';
import NotFound from './NotFound';
import { styled } from 'styled-components';
import CardDiv from '../styles/CardDiv';
import BackLink from '../components/BackLink';

const ProjectCardDiv = styled(CardDiv)`
    overflow: hidden;

    .img_container {
        margin-top: 1rem;
        width: 100%;
        display: flex;
        justify-content: center;
        
        img {
            width: 100%;
            max-width: 900px;
        }
    }
`;

const AnimatedProjectCardDiv = a(ProjectCardDiv);

interface Props {
    projectId: string;
}

const Project = ({ projectId }: Props) => {
    const { project, loading } = useProject(projectId);

    const json = project?.content?.json;

    const projectNode = useMemo(() => {
        return { node: documentToReactComponents(json) };
    }, [json]);

    const transition = useTransition(projectNode, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
    });

    return (<>
        {
            <BreadCrumbs crumbs={[
                {
                    name: 'Projects',
                    href: '/projects',
                },
                {
                    name: project?.title || projectId
                }
            ]} />
        }
        {
            transition((style, { node }) =>
                node &&
                <AnimatedProjectCardDiv
                    style={style}
                >
                    <BackLink to='projects' />
                    {
                        project?.mainImage &&
                        <div
                            className={'img_container'}
                        >
                            <img
                                src={project.mainImage.url!}
                            />
                        </div>
                    }
                    {node}
                </AnimatedProjectCardDiv>
            )
        }
        {
            !projectNode.node && !loading &&
            <NotFound
                lastTitle='Projects'
                lastUrl='/projects'
            />
        }
    </>);
}

export default Project;