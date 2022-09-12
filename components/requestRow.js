import React, { Component } from "react";
import {Button, Table} from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestRow extends Component {
    onApprove = async () => {
        const campaign = Campaign(this.props.address)

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
    };

    onFinalize = async () => {
        const campaign = Campaign(this.props.address)

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
    };

    render() {
        const { Row, Cell }  = Table;
        const { id, request, approversCount } = this.props
        const readyToFinalize = request.approvalCount > approversCount / 2;

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount} / {approversCount}</Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button color="green" basic onClick={this.onApprove} style={{ color: "#05ce78", border: "1px solid #05ce78", padding: "1 2rem", borderRadius: ".4rem" }}>
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button primary onClick={this.onFinalize} style={{ padding: "1 2rem", border: "1px solid #05ce78", borderRadius: ".4rem", marginRight: "0", backgroundColor: "#05ce78", color: "white", fontWeight: "bold" }}>
                            Finalize
                        </Button>
                    )}
                </Cell>
            </Row>
        )
    };
};

export default RequestRow;