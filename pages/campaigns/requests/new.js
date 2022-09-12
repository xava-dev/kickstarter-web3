import React, { Component } from "react";
import Layout from "../../../components/Layout";
import {Form, Button, Message, Input} from "semantic-ui-react";
import {Link, Router} from '../../../routes';
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import factory from "../../../ethereum/factory";

class RequestNew extends Component {
    static async getInitialProps(props) {
        const {address} = props.query;

        return {address};
    }

    state = {
        value: '',
        description:'',
        recipient: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const {description, value, recipient } = this.state;

        this.setState({ loading: true, errorMessage: '' })

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({
                    from: accounts[0]
                });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        };

        this.setState({ loading: false })
    };

    render() {
        return (
            <Layout>
                <h2 style={{backgroundColor: "#05ce78", color: "white", padding: "1rem 2rem", borderRadius: ".6rem", marginBottom: "2rem"}}>Create request for Campaign {`ID: ${this.props.address}`}</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event =>
                                this.setState({description: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value</label>
                        <Input
                            label="ether"
                            labelPosition="right"
                            value={this.state.value}
                            onChange={event =>
                                this.setState({value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient's address</label>
                        <Input
                            value={this.state.recipient}
                            onChange={event =>
                                this.setState({recipient: event.target.value })}
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary style={{ padding: "1rem 2rem", borderRadius: ".4rem", marginRight: "0", backgroundColor: "#05ce78", color: "white", fontWeight: "bold" }}>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;