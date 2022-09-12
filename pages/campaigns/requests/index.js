import React,{ Component } from "react";
import Layout from "../../../components/Layout";
import {Button, Table, TableCell, TableHeader, TableRow} from "semantic-ui-react";
import { Link } from '../../../routes';
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/requestRow";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        )

        return { address, requests, requestCount, approversCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body }  = Table;

        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <Button floated="right" content="Add request" icon="add" primary style={{backgroundColor: "white", color: "#05ce78", margin: "0.7rem 2rem 0 0", fontWeight: "bold", padding: ".9rem 2rem"}}/>

                </Link>
                <h2 style={{backgroundColor: "#05ce78", color: "white", padding: "1rem 2rem", borderRadius: ".6rem", marginBottom: "2rem"}}>Requests of Campaign {`ID: ${this.props.address}`}</h2>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>

                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>
                    {this.props.requestCount} {this.props.requestCount > 1 ? "requests" : "request"}
                    </div>
            </Layout>
        )
    }
}

export default RequestIndex;