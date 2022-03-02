import { FunctionComponent } from "react";

import { Navbar } from 'react-bootstrap';

const Header: FunctionComponent = () => {
    return (
        <Navbar bg="light" className="p-0">
            <div className="container-fluid custom-header" />
        </Navbar>
    )
}

export default Header