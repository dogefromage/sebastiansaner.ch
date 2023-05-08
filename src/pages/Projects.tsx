import React from 'react';
import { useNavigate } from 'react-router-dom';
import { a, config, useTransition } from '@react-spring/web';
import BreadCrumbs from '../components/BreadCrumbs';
import { useProjectList } from '../queries/useProjectList';
import Project from './ProjectById';
import { styled } from 'styled-components';
import CardDiv from '../styles/CardDiv';

const ProjectGridDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    gap: 2rem;
`;

const CARD_HEIGHT = 200;

const ProjectCardDiv = styled(CardDiv)`
    width: 100%;
    height: ${CARD_HEIGHT}px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;

    transition: transform 0.1s;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }

    .text {
        width: 100%;
        height: ${CARD_HEIGHT}px;
        padding: 1rem;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .thumb {
        width: 100%;
        height: 67%;
        
        img {
            width: 100%;
            height: $card-height;
            object-fit: cover;
        }
    }
`;

const AnimatedProjectCardDiv = a(ProjectCardDiv);

interface Props {
    slugs: string[];
}

const Projects = ({ slugs }: Props) => {
    const projectList = useProjectList().projects || [];

    const projectTransitions = useTransition(Object.keys(projectList),
        {
            from: { opacity: 0 },
            enter: { opacity: 1 },
            leave: { opacity: 0 },
            delay: (index: string) => parseInt(index) * 100,
        })

    const navigate = useNavigate();
    const projectId = slugs[0];

    if (projectId && projectId.length) {
        return <Project projectId={projectId} />
    }

    return (<>
        <BreadCrumbs
            crumbs={[{ name: "Projects" }]}
        />
        <ProjectGridDiv>
            {
                projectTransitions((style, projectIndex) => {
                    const project = projectList[parseInt(projectIndex)]

                    if (!project) return;

                    return project && (

                        <AnimatedProjectCardDiv
                            key={project.sys.id}
                            onClick={() => {
                                navigate(`projects/${project.sys.id}`)
                            }}
                            style={style}
                        >
                            <div
                                className={'text'}
                            >
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                            </div>
                            {
                                project.thumbnail &&
                                <div
                                    className={'thumb'}
                                >
                                    <img
                                        src={project.thumbnail.url!}
                                    />
                                </div>
                            }
                        </AnimatedProjectCardDiv>
                    )
                })
            }
        </ProjectGridDiv>
    </>)
}

export default Projects;