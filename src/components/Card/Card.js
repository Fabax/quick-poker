import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

export default class Card extends Component {
  static propTypes = {
    cardInfos: PropTypes.shape({
      id: PropTypes.number.isRequired,
      imagePath: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }),
    turned: PropTypes.bool,
    selected: PropTypes.bool,
  };

  getImageSource = () => {
    let face =
      process.env.PUBLIC_URL + '/images/' + this.props.cardInfos.imagePath;
    let back = process.env.PUBLIC_URL + '/images/cards/back.svg';
    return this.props.turned ? back : face;
  };

  classNames = () => {
    const { turned, selected } = this.props;
    let classNames = ['card'];
    if (turned) classNames.push('card--turned');
    if (selected) classNames.push('card--selected');
    return classNames.join(' ');
  };

  render() {
    const { cardInfos } = this.props;
    return (
      <div
        className={this.classNames()}
        onClick={() => {
          this.props.clickHandler(cardInfos);
        }}
      >
        <img src={this.getImageSource()} alt={cardInfos.code} />
      </div>
    );
  }
}
