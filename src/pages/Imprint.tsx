import { useMemo } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import { useSettings } from '../queries/useSettings';
import CardDiv from '../styles/CardDiv';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface Props {

}

const Imprint = ({}: Props) => {
    const { settings } = useSettings();

    const json = settings?.imprint?.json;
    const imprintNode = useMemo(() => {
        return documentToReactComponents(json);
    }, [json]);

    return (
        <>
            <BreadCrumbs
                crumbs={[
                    {
                        name: 'Imprint'
                    }
                ]}
            />
            <CardDiv>
                { imprintNode }
            </CardDiv>
        </>
    )
}

export default Imprint;