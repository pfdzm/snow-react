import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Layout from './components/Layout';
import Button from './components/Button';

interface AppProps {}

function App({}: AppProps) {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <Layout>
      <Card>
        <Button>I'm a button!</Button>
        <span className="pt-2 text-center text-gray-600 display">I'm some normal text</span>
      </Card>
    </Layout>
  );
}

export default App;
