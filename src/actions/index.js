export const setHand = hand => {
  //returns an action
  return {
    type: 'SET_HAND',
    payload: hand,
  };
};

export const resetHands = hand => {
  //returns an action
  return {
    type: 'RESET_HANDS',
    payload: hand,
  };
};
