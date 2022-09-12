import React from "react";
import {Button, Menu} from 'semantic-ui-react';
import { Link } from '../routes';
import Image from "next/image";

const Header = () => {
        return (
            <Menu style={{ margin: '30px 0', border: "none", boxShadow: "none" }}>
                <Link route="/">
                    <a><Image src="/kickstarter.png" width={300} height={40} /></a>
                </Link>

                <Menu.Menu position='right'>
                    <Link route="/">
                        <a className="item" style={{ color: "#05ce78", border: "1px solid #05ce78", padding: "0 2rem", borderRadius: ".4rem", marginRight: "1rem" }}>
                        All campaigns
                        </a>
                    </Link>
                    <Link route="/campaigns/new">
                        <a className="item" style={{ padding: "0 1.5rem", borderRadius: ".4rem", marginRight: "0", backgroundColor: "#05ce78", color: "white", fontWeight: "bold", fontSize: "2rem" }}>
                            +
                        </a>
                    </Link>
                </Menu.Menu>
            </Menu>
        )
    }

export default Header;