import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useMemo } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Title from '../components/Title';
import { useSettings } from '../queries/useSettings';
import CardDiv from '../styles/CardDiv';

interface Props {

}

const Home = ({}: Props) => {
    const { settings } = useSettings();

    const json = settings?.home?.json;
    const homeNode = useMemo(() => {
        return documentToReactComponents(json);
    }, [json]);

    return (
        <>
            <BreadCrumbs
                crumbs={[
                    {
                        name: 'Home'
                    }
                ]}
            />
            <CardDiv>
                <Title />
                { homeNode }
            </CardDiv>
        </>
    )
}

export default Home;