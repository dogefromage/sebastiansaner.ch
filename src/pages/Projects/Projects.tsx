import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    const projectList = useProjectList();
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
            projectList.projects &&
            projectList.projects.map(project =>
                project &&
                <div
                    className={styles.project}
                    key={project.sys.id}
                    onClick={() =>
                    {
                        navigate(`projects/${project.sys.id}`)
                    }}
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
                </div>
            )
        }
        </div>
    </>)
}

export default Projects;