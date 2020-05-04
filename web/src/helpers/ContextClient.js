import React, { Component, createContext } from "react";
import Auth from '../services/Authorization';

const ContextClient = createContext({
    authenticated: false,
    user: null
});

const { Provider, Consumer } = ContextClient;

class ContextClientProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            user: null,
            logIn: this.logIn.bind(this)
        }
    }

    componentDidMount() {
        Auth.verifySession()
        .then(response => {
            this.setState(response)
        })
    }
    
    logIn(email, password) {
        return new Promise((resolve, reject) => {
            Auth.logIn(email, password).then(response => {
                this.setState(response);
                return resolve(response);
            }).catch(error => {
                return reject(error);
            })
        })
    }

    
    render() {
        console.log('Context', this.state)
        const { children } = this.props;
        return <Provider value={this.state}>{children}</Provider>;
    }
}

export default ContextClient;
export { ContextClientProvider, Consumer as ContextClientConsumer };
