import React from 'react';
import './App.scss';
import Hand from './components/Hand/Hand';
import { connect } from 'react-redux';
import { Component } from 'react';
// import { Hand as poskerSolver } from 'pokersolver';

class App extends Component {
  compareHands = () => {
    //IN PROGRESS
    // let hand1 = poskerSolver.solve(
    //   this.props.hands[0].map(value => {
    //     return value.code;
    //   }),
    // );
    // let hand2 = poskerSolver.solve(
    //   this.props.hands[1].map(value => {
    //     return value.code;
    //   }),
    // );
    // let winner = poskerSolver.winners(hand1, hand2);
  };

  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            this.compareHands();
          }}
        >
          compare
        </button>
        <Hand playerId={0} />
        <Hand playerId={1} oponent />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deck: state.deck,
    hands: state.hands,
  };
};

export default connect(
  mapStateToProps,
  {},
)(App);
