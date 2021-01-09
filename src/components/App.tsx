import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { PrivateRoute, ProvideAuth } from '../hooks/useAuth';
import Card from './Card';
import Layout from './Layout';
import LoginPage from './LoginPage';
import TextWithBtn from './TextWithBtn';

const App: React.FC = () => {
  // Create the count state.
  return (
    <ProvideAuth>
      <Router>
        <nav className="p-12">
          <ul className="flex justify-around align-middle">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/private">Private Area</Link>
            </li>
          </ul>
        </nav>
        <Layout>
          <Card>
            <Switch>
              <Route path="/auth" children={<TextWithBtn />} />
              <Route path="/login" children={<LoginPage />} />
              <PrivateRoute path="/private" children={<TextWithBtn />} />
              <Route path="/" children={<TextWithBtn />} />
            </Switch>
          </Card>
        </Layout>
      </Router>
    </ProvideAuth>
  );
};

export default App;
