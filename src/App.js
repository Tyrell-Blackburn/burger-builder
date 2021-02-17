import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Burgerbuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Burgerbuilder/>
        </Layout>
      </div> 
    );
  }
}

export default App;
