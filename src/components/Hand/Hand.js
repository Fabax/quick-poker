import React, { Component } from 'react';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import { setHand, updateHand } from '../../actions';
import './Hand.scss';

class Hand extends Component {
  constructor() {
    super();

    this.state = {
      selectedCards: [],
    };
  }

  componentDidMount = () => {
    let newHand = this.generateHand();
    this.props.setHand({ playerId: this.props.playerId, hand: newHand });
  };

  generateHand = () => {
    let deck = this.props.deck;
    let newHand = [];

    for (let i = 0; i < 5; i++) {
      let r = Math.floor(Math.random() * deck.length);
      newHand.push(deck[r]);
      deck = deck.filter((value, index) => {
        return index !== r;
      });
    }

    return newHand;
  };

  updateHand = () => {
    let remainingCards = this.getRemainingCard();
    let newCards = [];
    //draw new cards
    for (let i = 0; i < this.state.selectedCards.length; i++) {
      let r = Math.floor(Math.random() * remainingCards.length);
      newCards.push(remainingCards[r]);
      remainingCards = remainingCards.filter((value, index) => {
        return index !== r;
      });
    }

    //get old hand
    let oldHand = [...this.props.hands[this.props.playerId]];
    //remove selected cards
    oldHand = oldHand.filter((value, index) => {
      return !this.state.selectedCards.includes(value);
    });

    //recompose the new hand
    let newHand = [...oldHand, ...newCards];
    this.setState({ selectedCards: [] });

    this.props.setHand({ playerId: this.props.playerId, hand: newHand });
  };

  getRemainingCard = () => {
    return this.props.deck.filter(e => {
      let inHand = false;
      for (const card of this.props.hands[this.props.playerId]) {
        if (card.id === e.id) inHand = true;
      }
      if (!inHand) {
        return e;
      }
    });
  };

  toggleSelect = card => {
    if (
      !this.state.selectedCards.includes(card) ||
      this.state.selectedCards === []
    ) {
      this.setState((prevState = []) => ({
        selectedCards: [...prevState.selectedCards, card],
      }));
    } else {
      this.setState(prevState => ({
        selectedCards: prevState.selectedCards.filter(
          cardId => cardId !== card,
        ),
      }));
    }
  };

  cardList = () => {
    return this.props.hands[this.props.playerId].map((item, key) => {
      return (
        <Card
          cardInfos={item}
          key={key}
          // turned={this.props.oponent}
          clickHandler={this.toggleSelect}
          selected={this.state.selectedCards.includes(item) === true}
        />
      );
    });
  };

  render() {
    return (
      <div className={this.props.oponent ? 'hand oponent' : 'hand'}>
        <button
          className="hand__button"
          onClick={() => {
            this.updateHand();
          }}
        >
          change cards
        </button>
        {this.cardList()}
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
  { setHand, updateHand },
)(Hand);
