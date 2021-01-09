import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Card from './Card';
import Layout from './Layout';
import TextWithBtn from './TextWithBtn';

const App: React.FC = () => {
  // Create the count state.
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login?id=netflix">Netflix</Link>
          </li>
          <li>
            <Link to="/login?id=zillow-group">Zillow Group</Link>
          </li>
        </ul>
      </nav>
      <Layout>
        <Card>
          <Switch>
            <Route path="/login/:id" children={<TextWithBtn />} />
            <Route path="/" children={<TextWithBtn />} />
          </Switch>
        </Card>
      </Layout>
    </Router>
  );
};

export default App;
