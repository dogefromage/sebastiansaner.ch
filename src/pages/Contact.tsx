import { styled } from 'styled-components';
import BreadCrumbs from '../components/BreadCrumbs';
import { useContactLinks } from '../queries/useContactLinks';
import CardDiv from '../styles/CardDiv';

interface Props {

}

const Contact = ({}: Props) => {

    const { contactLinks } = useContactLinks();

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
                <h2>Links</h2>
                <LinksGrid>
                    {
                        contactLinks?.map(link =>
                            <ContactAnchor href={link.link} target='_blank' key={link.title}>
                                <i className={link.icon} />
                                {link.title}
                            </ContactAnchor>
                        )
                    }
                </LinksGrid>
            </CardDiv>
        </>
    );
}

export default Contact;

const ContactAnchor = styled.a`

    display: flex;
    align-items: center;
    gap: 1rem;

    i { 
        font-size: 1.4rem; 
    }
`

const LinksGrid = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin: 1rem 0;
`