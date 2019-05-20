import './Card.scss';
import React, { Component } from 'react';

export default class Card extends Component {
  generateClasses = () => {
    let classArray = ['card'];
    if (this.props.selected) classArray.push('card--selected');
    return classArray.join(' ');
  };

  getImageSource = () => {
    let face =
      process.env.PUBLIC_URL + '/images/' + this.props.cardInfos.imagePath;
    let back = process.env.PUBLIC_URL + '/images/cards/back.svg';
    return this.props.turned ? back : face;
  };

  render() {
    const { cardInfos } = this.props;
    return (
      <div
        className={this.generateClasses()}
        onClick={() => {
          this.props.clickHandler(cardInfos);
        }}
      >
        <img src={this.getImageSource()} alt={cardInfos.name} />
      </div>
    );
  }
}
