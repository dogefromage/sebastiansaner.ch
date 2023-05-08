import { isMobile } from 'react-device-detect';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import GameCanvas from '../GameCanvas';
import Routing from '../Routing';
import styles from './MainPage.module.scss';

const DesktopPage = () =>
{
    return (
        <ReflexContainer
            orientation='vertical'
            className={styles.desktop_page}
        >
            <ReflexElement
                className={styles.game}
                minSize={350}
                flex={0.6}
            >
                <GameCanvas />
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement
                className={styles.content}
                minSize={550}
                flex={0.4}
            >
                <Routing />
            </ReflexElement>
        </ReflexContainer>
    );
}

const MobilePage = () =>
{
    return (
        <div
            className={styles.mobile_page}
        >
            <div className={styles.game}>
                <GameCanvas />
            </div>
            <div className={styles.main}>
                <div className={styles.click_through} />
                <div className={styles.content}>
                    <Routing />
                </div>
            </div>
        </div>
    );
}

const MainPage = () =>
{
    return isMobile ? <MobilePage /> : <DesktopPage />
}

export default MainPage;