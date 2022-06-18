import React from 'react';
import { useNavigate } from 'react-router-dom';
import { a, config, useTransition } from '@react-spring/web';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { useProjectList } from '../../queries/useProjectList';

import styles from './Projects.module.scss';
import Project from './[id]/Project';

interface Props
{
    slugs: string[];
}

const Projects = ({ slugs }: Props) =>
{
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

    if (projectId && projectId.length)
    {
        return <Project projectId={projectId} />
    }

    return (<>
        <BreadCrumbs 
            crumbs={[ { name: "Projects" } ]}
        />
        <div
            className={styles.project_grid}
        >
        {
            projectTransitions((style, projectIndex) =>
            {
                const project = projectList[parseInt(projectIndex)]

                if (!project) return;

                return project && (

                    <a.div
                        className={styles.project}
                        key={project.sys.id}
                        onClick={() =>
                        {
                            navigate(`projects/${project.sys.id}`)
                        }}
                        style={style}
                    >
                        <div
                            className={styles.text}
                        >
                            <h2>{ project.title }</h2>
                            <p>{ project.description }</p>
                        </div>
                        {
                            project.thumbnail &&
                            <div
                                className={styles.thumb}
                            >
                                <img 
                                    src={project.thumbnail.url!}
                                />
                            </div>
                        }
                    </a.div>
                )
            })
        }
        </div>
    </>)
}

export default Projects;