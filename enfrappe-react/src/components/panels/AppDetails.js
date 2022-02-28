import { Image } from 'semantic-ui-react';

import './AppDetails.css';

import logo from '../../assets/logo.svg';

const AppDetails = () => (
    <div>
        <Image src={logo} id='logo' centered />
    </div>
);

export default AppDetails;