import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Switch } from 'react-router-dom';
import history from './history';
import Add from './pages/Add';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Error from './pages/Error';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signin from './pages/Signin';

function App() {
  return (
<ErrorBoundary FallbackComponent={Error}>
  <ConnectedRouter history={history}>
      <Switch>
        <Route  path="/edit/:id" component={Edit} />
        <Route  path="/book/:id" component={Detail} />
        <Route  path="/add"  component={Add}/>
        <Route  path="/signin"  component={Signin}/>
        <Route  path="/" component={Home}/>
        <Route  path ="*"  component={NotFound}/>
      </Switch>
  </ConnectedRouter>
</ErrorBoundary>
  )
}

export default App;
