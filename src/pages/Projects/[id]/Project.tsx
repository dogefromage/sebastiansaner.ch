import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useDebugValue, useMemo } from 'react';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { useProject } from '../../../queries/useProject';
import styles from './Project.module.scss';

interface Props
{
    projectId: string;
}

const Project = ({ projectId }: Props) =>
{
    const project = useProject(projectId);

    const json = project?.content?.json;

    const projectNode = useMemo(() => 
    {
        return documentToReactComponents(json);

    }, [ json ]);

    return (<>
        <BreadCrumbs crumbs={[
            {
                name: 'Projects',
                href: '/projects',
            },
            {
                name: project?.title || projectId
            }
        ]}/>
        <div
            className={styles.card}
        >
        {
            projectNode
        }
        </div>
    </>);
}

export default Project;