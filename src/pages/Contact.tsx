import BreadCrumbs from '../components/BreadCrumbs';
import CardDiv from '../styles/CardDiv';

interface Props {

}

const Contact = ({}: Props) => {
    return (
        <>
            <BreadCrumbs
                crumbs={[
                    {
                        name: 'Contact',
                    }
                ]}
            />
            <CardDiv>
                <div>
                    <h2>Links</h2>
                    <a
                        href={'mailto:' + 'seb.sa' + '@' + 'eblcom.ch'}
                    >
                        {'seb.sa' + '@' + 'eblcom.ch'}
                    </a>
                    <a
                        href='https://github.com/dogefromage'
                        target='_blank'
                    >
                        dogefromage
                    </a>
                    <a
                        href='https://www.instagram.com/sebmakescomputerystuff/'
                        target='_blank'
                    >
                        sebmakescomputerystuff
                    </a>
                </div>
                <div>
                    <h2>Impressum</h2>
                    <p>
                        Sebastian Saner<br />
                        Rebenweg 15<br />
                        4413 Büren CH
                    </p>
                </div>
            </CardDiv>
        </>
    );
}

export default Contact;