import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import From from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION( 
        $email: String!,
        $password: String!
    ) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;


class Signin extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    render() {
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                // To refresh account status
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(signup, {error, loading}) => {
                    return (
                        <From method="post" onSubmit={ async e => {
                            e.preventDefault();
                            await signup();
                            this.setState({ name: '', email: '', password: '' })
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign In</h2>
                                <Error error={error} />
                                <label htmlFor="email">
                                    Email
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="email"
                                        value={this.state.email}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <label htmlFor="password">
                                    Email
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={this.saveToState}
                                    />
                                </label>

                                <button type="submit">Sign In!</button>
                            </fieldset>
                        </From>)
                }}
            </Mutation>
        )
    }
}

export default Signin;
