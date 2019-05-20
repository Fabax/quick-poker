import './Card.scss';
import React, { Component } from 'react';

export default class Card extends Component {
  getImageSource = () => {
    let face =
      process.env.PUBLIC_URL + '/images/' + this.props.cardInfos.imagePath;
    let back = process.env.PUBLIC_URL + '/images/cards/back.svg';
    return this.props.turned ? back : face;
  };

  render() {
    const { cardInfos, selected } = this.props;
    return (
      <div
        className={selected ? 'card card--selected' : 'card '}
        onClick={() => {
          this.props.clickHandler(cardInfos);
        }}
      >
        <img src={this.getImageSource()} alt={cardInfos.name} />
      </div>
    );
  }
}
