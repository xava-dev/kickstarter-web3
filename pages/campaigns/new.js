import React, { Component } from "react";
import Layout from "../../components/Layout";
import {Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution:'',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' })

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });

            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message });
        };

        this.setState({ loading: false })
    };

    render() {
        return (
            <Layout>
                <h2 style={{backgroundColor: "#05ce78", color: "white", padding: "1rem 2rem", borderRadius: ".6rem", marginBottom: "2rem"}}>New campaign</h2>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event =>
                                this.setState({minimumContribution: event.target.value })}
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary style={{ padding: "1rem 2rem", borderRadius: ".4rem", marginRight: "0", backgroundColor: "#05ce78", color: "white", fontWeight: "bold" }}>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew;