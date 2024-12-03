import React from 'react';
import serendpt from '../assets/SerenDPTLOGO Red.png'
import './Header.css'
import vpclogo from '../assets/VPCsquare.png'

function Header() {
    return (
        <header>
            <a href={"https://serendpt.net"}><img src={serendpt} alt={"SerenDPT"}/></a>
            <a href={"https://veniceprojectcenter.org"}> <img src={vpclogo} alt={"Venice Project Center"}/></a>
            <p>This is some description for the project! Venice Project Center together with SerenDPT are devoted to the preservation and restoration of Venice, Italy.
            Please help us preserve this inestimable collection by using our Apps to collect up-to-date information about the artifacts.</p>
        </header>
    );
}

export default Header;
