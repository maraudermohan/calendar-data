import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <main>
        <Header />
        {this.props.children}
      </main>
    );
  }
}

export default App;
