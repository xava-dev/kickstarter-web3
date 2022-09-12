import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import {Card, Grid, GridColumn, Button, GridRow} from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    };

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props

        const items = [
            {
                header: manager,
                meta: 'Address of manager',
                description: 'The manager created this campaign and can create request to withdraw money from the campaign.',
                style: { overflowWrap:  'break-word', color: "#05ce78", borderRadius: ".4rem", marginRight: "1rem", padding: "1rem" }
            },
            {
                header: minimumContribution,
                meta: 'Minimum contribution (wei)',
                description: 'You must contribute at least this much wei to become a contributor.',
                style: { overflowWrap:  'break-word', color: "#05ce78", borderRadius: ".4rem", padding: "1rem"}
            },
            {
                header: requestCount,
                meta: 'Requests',
                description: 'A request withdraws money from the contract. Requests must be approved by the majority of the contributors.',
                style: { overflowWrap:  'break-word', color: "#05ce78", borderRadius: ".4rem", marginRight: "1rem", padding: "1rem" }
            },
            {
                header: approversCount,
                meta: 'Contributors',
                description: 'The number of people who have already contributed to this campaign.',
                style: { overflowWrap:  'break-word', color: "#05ce78", borderRadius: ".4rem", padding: "1rem" }
            },
            {
                header: web3.utils.fromWei(balance,'ether'),
                meta: 'Balance (ether)',
                description: 'The balance is the amount of money this campaign has left to spend.',
                style: { overflowWrap:  'break-word', color: "#05ce78", borderRadius: ".4rem", padding: "1rem" }
            }

        ];

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h2 style={{backgroundColor: "#05ce78", color: "white", padding: "1rem 2rem", borderRadius: ".6rem", marginBottom: "2rem"}}>Details of Campaign {`ID: ${this.props.address}`}</h2>
                <Grid>
                    <GridRow>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </GridRow>

                    <GridRow>
                        <GridColumn>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button  primary style={{ padding: "1rem 2rem", borderRadius: ".4rem", marginRight: "0", backgroundColor: "#05ce78", color: "white", fontWeight: "bold" }}>View Requests</Button>
                                </a>
                            </Link>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;

