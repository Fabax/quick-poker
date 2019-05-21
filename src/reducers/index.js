import { combineReducers } from 'redux';
import deckData from '../assets/deck';

const deckReducer = () => {
  return deckData;
};

const handReducer = (hands = [[], []], action) => {
  if (action.type === 'SET_HAND') {
    if (action.payload.playerId === 0) {
      return [action.payload.hand, hands[1]];
    } else if (action.payload.playerId === 1) {
      return [hands[0], action.payload.hand];
    } else {
      return hands;
    }
  } else if (action.type === 'RESET_HANDS') {
    return [[], []];
  } else {
    return hands;
  }
};

export default combineReducers({
  deck: deckReducer,
  hands: handReducer,
});
