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
                <p>
                    Sebastian Saner<br />
                    Rebenweg 15<br />
                    4413 Büren CH
                </p>
            </CardDiv>
        </>
    );
}

export default Imprint;