import React from 'react';
import '../App.css';

const CardSet = (props) => {
  const card_li = props.cardList;
  const rows = card_li.map((card, index) =>
    <li key={card}>
      <input type="image" src={process.env.PUBLIC_URL + '/images/tramp_back.png'} onClick={() => props.cardClick(card, index)} width="70" height="100" class="cardslist" />
      <div class="div-block"><input type="hidden" value={card} class="value" /></div>
    </li>
  );
  return rows
}

export default CardSet;
