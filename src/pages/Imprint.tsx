import BreadCrumbs from '../components/BreadCrumbs';
import CardDiv from '../styles/CardDiv';

interface Props {

}

const Imprint = ({}: Props) => {
    return (
        <>
            <BreadCrumbs
                crumbs={[
                    {
                        name: 'Imprint',
                    }
                ]}
            />
            <CardDiv>
            </CardDiv>
        </>
    );
}

export default Imprint;