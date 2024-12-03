import React from 'react';
import serendpt from '../assets/SerenDPTLOGO Red.png'
import './Header.css'
import vpclogo from '../assets/VPCsquare.png'

function Header() {
    return (
        <header>
            <a href={"https://serendpt.net"}><img src={serendpt} alt={"SerenDPT"}/></a>
            <a href={"https://veniceprojectcenter.org"}> <img src={vpclogo} alt={"Venice Project Center"}/></a>
            <p>Venice Project Center together with SerenDPT are devoted to assist the HUBitat Network in developing the foundational information on individual members to understand the nuanced strengths, challenges, and areas for receiving and providing support to members in future collaborative developments.</p>
        </header>
    );
}

export default Header;
