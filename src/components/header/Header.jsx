import {AppBar, Container} from '@mui/material';
import useWindowSize from '../hooks/useWindowSize';
import NormalHeader from './MediumHeader'
import SmallHeader from './SmallHeader';


/**
 * This is the header component to show the navigation options for all the app
 * @returns {JSX.Element} Rendered Header component.
 */
const Header = () => {
    const { width } = useWindowSize();
    const limit = 960;

    return (
        <AppBar color=''>
            <Container style={{ paddingTop: 0, paddingBottom: 0 }}>
                {
                    width > limit
                    ? <NormalHeader/>
                    : <SmallHeader/>
                }
            </Container>
        </AppBar>
    )
}

export default Header