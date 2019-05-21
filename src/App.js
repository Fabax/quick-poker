import React from 'react';
import './App.scss';
import Hand from './components/Hand/Hand';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Hand as poskerSolver } from 'pokersolver';

class App extends Component {
  compareHands = () => {
    //prepare data for the pokersolver library
    let hand1 = this.props.hands[0].map(value => {
      return value.code;
    });
    let handSolver1 = poskerSolver.solve(hand1);

    let hand2 = this.props.hands[1].map(value => {
      return value.code;
    });
    let handSolver2 = poskerSolver.solve(hand2);

    //Find out which hand wins
    let winner = poskerSolver.winners([handSolver1, handSolver2]);
    //Extracting the cards of the winning hand
    let winningHand = winner[0].cardPool.map(card => {
      return card.value + card.suit;
    });

    let result = winningHand.every(e => hand1.includes(e))
      ? 'You win'
      : 'You Loose';
    alert(result);
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
