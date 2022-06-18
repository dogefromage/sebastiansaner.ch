import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { a, useTransition } from '@react-spring/web';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { useProject } from '../../../queries/useProject';
import NotFound from '../../NotFound/NotFound';
import styles from './Project.module.scss';

interface Props
{
    projectId: string;
}

const Project = ({ projectId }: Props) =>
{
    const { project, loading } = useProject(projectId);

    const json = project?.content?.json;

    const projectNode = useMemo(() => 
    {
        return { node: documentToReactComponents(json) };
    }, [ json ]);

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
            ]}/>
        }
        {
            transition((style, { node }) =>
                node &&
                <a.div
                    className={styles.card}
                    style={style}
                >
                    <Link 
                        className={styles.back}
                        to='projects'
                    >
                        {"<"}
                    </Link>
                    {
                        project?.mainImage &&
                        <div
                            className={styles.img_container}
                        >
                            <img 
                                src={project.mainImage.url!}
                            />
                        </div>
                    }
                    { node }
                </a.div>
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