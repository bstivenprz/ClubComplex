import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ContextClientConsumer } from '../helpers/ContextClient';

export default function ({ component: Component, ...rest }) {
    return (
        <ContextClientConsumer>
            {({ authenticated }) => {
                console.log(authenticated)
                return (
                    <Route { ...rest }
                        render={(props) => {
                                return authenticated
                                ? (<Component { ...rest } />)
                                : (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
                            }
                        }
                    />
                );
            }}
        </ContextClientConsumer>
    );
}