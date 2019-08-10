import React from 'react';
import '../App.css';

const Reset = (props) => {
  pageScroll();
  return(
    <div className="reset-button-div">
      <button onClick={props.stateReset} className="reset-button" >
        もう一度遊ぶ
      </button>
    <div id="header-line"></div>
    </div>
  );
}

const pageScroll = () => {
  let a = document.documentElement;
  const y = a.scrollHeight - a.clientHeight;
  setTimeout(function() { window.scrollBy(0, y + 300); }, 1);
}

export default Reset;
