import React, { Component } from 'react';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import { setHand } from '../../actions';
import './Hand.scss';

class Hand extends Component {
  constructor() {
    super();

    this.state = {
      selectedCards: [],
    };
  }

  componentDidMount = () => {
    this.resetHands();
  };

  componentDidUpdate = () => {
    //if hands are empty regenerate them
    if (this.props.hands[0].length <= 0 && this.props.hands[1].length <= 0) {
      this.resetHands();
    }
  };

  resetHands = () => {
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
    const { hands, playerId, setHand } = this.props;
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
    let oldHand = [...hands[playerId]];
    //remove selected cards
    oldHand = oldHand.filter(value => {
      return !this.state.selectedCards.includes(value);
    });

    //recompose the new hand
    let newHand = [...oldHand, ...newCards];
    this.setState({ selectedCards: [] });

    setHand({ playerId: playerId, hand: newHand });
  };

  //Get cards you can still draw
  getRemainingCard = () => {
    const { hands, playerId, deck } = this.props;
    return deck.filter(e => {
      let inHand = false;
      for (const card of hands[playerId]) {
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
      this.setState({
        selectedCards: [...this.state.selectedCards, card],
      });
    } else {
      this.setState({
        selectedCards: this.state.selectedCards.filter(
          cardId => cardId !== card,
        ),
      });
    }
  };

  cardList = () => {
    const { hands, playerId, turned } = this.props;
    return hands[playerId].map((item, key) => {
      return (
        <Card
          cardInfos={item}
          key={key}
          turned={turned}
          clickHandler={this.toggleSelect}
          selected={this.state.selectedCards.includes(item) === true}
        />
      );
    });
  };

  render() {
    const { oponent } = this.props;
    return (
      <div className={oponent ? 'hand oponent' : 'hand'}>
        {!oponent && (
          <button className="hand__button" onClick={this.updateHand}>
            change cards
          </button>
        )}
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
  { setHand },
)(Hand);
