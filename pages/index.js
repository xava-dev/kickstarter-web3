import React, {Component} from "react";
import { Card, Button } from 'semantic-ui-react';
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from '../routes';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call()

        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: (
                    <Link route={`/campaigns/${address}`}>
                    <h3 style={{float: "left", margin: "0.4rem 1rem", cursor: "pointer"}}>
                        ID: {address}
                    </h3>
                    </Link>
                ),
                description: (
                    <Link route={`/campaigns/${address}`}>
                    <a style={{ color: "#05ce78", border: "1px solid #05ce78", padding: ".5rem 2rem", borderRadius: ".4rem", marginRight: "1rem", float: "right" }}>View</a>
                    </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items}/>

    }

    render() {
        return (
        <Layout>
            <div>
                <Link route="/campaigns/new">
                    <a>
                        <Button floated="right" content="Create Campaign" icon="add" primary style={{backgroundColor: "white", color: "#05ce78", margin: "0.7rem 2rem 0 0", fontWeight: "bold", padding: ".9rem 2rem"}}/>
                    </a>
                </Link>

                <h2 style={{backgroundColor: "#05ce78", color: "white", padding: "1rem 2rem", borderRadius: ".6rem", marginBottom: "2rem"}}>Open Campaigns</h2>

                {this.renderCampaigns()}
            </div>
        </Layout>
        )
    }
}

export default CampaignIndex;