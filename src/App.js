import React from 'react'
import {createBrowserHistory} from 'history';
import {Router, Switch, Route} from 'react-router-dom';

import UsersView from './views/UsersView'
import OrganizationsView from './views/OrganizationsView'
import DB from './lib/database'

const history = createBrowserHistory()

const App = () => {
    DB.init()

    return (
        <Router history={history}>
            <Switch>
                <Route path="/users">
                    <UsersView/>
                </Route>
                <Route path="/organizations">
                    <OrganizationsView/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App