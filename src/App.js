import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Burgerbuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {

  // state = {
  //   show: true
  // }

  // componentDidMount () {
  //   setTimeout(() => {
  //     this.setState({show: false})
  //   }, 5000);
  // }

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
