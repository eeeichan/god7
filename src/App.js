import React from 'react';
import logo from './logo.svg';
import './App.css';
//import ace01 from './images/ace01.gif';
//import ace02 from './images/ace02.gif';
//import ace03 from './images/ace03.gif';
//import ace04 from './images/ace04.gif';
//import ace05 from'./images/ace05.gif';
//import ace06 from './images/ace06.gif';
//import ace07 from './images/ace07.gif';
//import TrampBack from'./images/tramp_back.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Card</h1>
        <CardList />
      </header>
    </div>
  );
}


class CardList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      card_check: '0',
      card_value: '',
      select_card: [],
      check_cards: ['1','2','3','4','5','6','7']
    }
  }

  // shuffle numbering...
  componentWillMount(){
    this.shuffleCards();
  }

  shuffleCards = () => {
    const array = Object.assign([], this.state.check_cards);
    for(var i = array.length - 1; i > 0; i--){
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    this.setState({ check_cards: array});
  }

  handleOnClick = (e, index) => {

    this.setState({card_value: e});
    const card = Object.assign([], this.state.select_card);
    card.push(e);
    this.setState({ select_card: card });
    this.openCheck(e, index);

    this.changeImage(e, index);
  }

  openCheck = (card, index) => {
    let openedCard = this.state.select_card
    if(openedCard.length == 6) {
      alert("正解！");
      window.location.reload();
    }else if(openedCard.indexOf(card) != '-1') {
      alert("不正解！");
      window.location.reload();
      //this.setState({ card_value: '0' });
      //this.setState({ select_card: [] });
      //this.setState({ check_cards:  ['1','2','3','4','5','6','7'] });
    }else{
      this.cardBlock(openedCard, card, index);
    }
  }

  cardBlock = (openedCard, card, index) => {
    let selectItem = document.getElementById("CardList").getElementsByTagName("input");
    for(let i = 0; i < selectItem.length; i++){
      selectItem[i].disabled = true;
      selectItem[i].className = "cards";
    }
    let select_cards = openedCard;
    select_cards.push(card);
    selectItem[card - 1].disabled = false;
    selectItem[card - 1].className = "selectCard";

    let target = selectItem[card - 1].value;
    if(select_cards.indexOf(target) != '-1'){
      alert("不正解！！");
      window.location.reload();
    }  
  }

  changeImage = (card, index) => {
    let selectItem = document.getElementById("CardList").getElementsByTagName("input");
    console.log(selectItem[index].src);
    selectItem[index].src = "/images/ace0" + card + ".gif";
  }

  render() {
    return (
      <div class="">
        <div id="CardList" class="card_list">
          <CardSet cardClick={this.handleOnClick} cardList={this.state.check_cards} />
        </div>
      </div>
    );
  }
}

const CardSet = (props) => {
  
  const card_li = props.cardList;
  console.log(card_li);
  //const card_li = ['1','2','3','4','5','6','7']
  const rows = card_li.map((card,index) =>
    <ul id="CardList" key={card}>
      <li class={'isshow' + (card)}>
         <input type="image" src={process.env.PUBLIC_URL +'/images/tramp_back.png'} onClick={() => props.cardClick(card, index)} value={card} width="70" height="100" />
      </li>
    </ul>
  );
  return (
    rows
  )
}


export default App;
