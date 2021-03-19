import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import Create from '../components/Create';
import Edit from '../components/Edit';
import NotFound from '../components/NotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

export const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={Dashboard}/>
                <PrivateRoute path="/create" component={Create} />
                <PrivateRoute path="/edit/:id" component={Edit} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;