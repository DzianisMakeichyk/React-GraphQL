import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import From from './styles/Form';
import Error from './ErrorMessage';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
    mutation RESET_MUTATION( 
        $password: String!,
        $resetToken: String!,
        $confirmPassword: String!,
    ) {
        resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
            id
            email
            name
        }
    }
`;


class Reset extends Component {
    static PropTypes = {
      resetToken: PropTypes.string.isRequired,
    };
    state = {
        password: '',
        confirmPassword: '',
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    render() {
        return (
            <Mutation
                mutation={RESET_MUTATION}
                variables={{
                    resetToken: this.props.resetToken,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword,
                }}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(reset, {error, loading, called}) => {
                    return (
                        <From method="post" onSubmit={ async e => {
                            e.preventDefault();
                            await reset();
                            this.setState({ password: '', confirmPassword: '' })
                        }}>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Reset your password</h2>
                                <Error error={error} />
                                {!error && !loading && called && <p>Success! Check your email for reset link!</p>}
                                <label htmlFor="password">
                                    Password
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <label htmlFor="confirmPassword">
                                    Confirm your Password
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <button type="submit">Reset your password!</button>
                            </fieldset>
                        </From>)
                }}
            </Mutation>
        )
    }
}

export default Reset;
