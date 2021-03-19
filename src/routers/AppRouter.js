import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import Create from '../components/Create';
import Edit from '../components/Edit';
import Help from '../components/Help';
import NotFound from '../components/NotFound';
import PrivateRoute from './PrivateRoute';

export const history = createBrowserHistory();

export const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={Dashboard}/>
                <PrivateRoute path="/create" component={Create} />
                <PrivateRoute path="/edit/:id" component={Edit} />
                <Route path="/help" component={Help} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;