import React from 'react';
import logo from './logo.svg';
import './App.css';


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
  }

  openCheck = (card, index) => {
    let openedCard = this.state.select_card
    if(openedCard.length == 6) {
      alert("正解！");
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
    let selectItem = document.getElementById("CardList").getElementsByTagName("button");
    for(let i = 0; i < selectItem.length; i++){
      selectItem[i].disabled = true;
    }
    let select_cards = openedCard;
    select_cards.push(card);
    console.log(select_cards);
    selectItem[card - 1].disabled = false;
    let target = selectItem[card - 1].innerHTML;
    console.log(target)
    if(select_cards.indexOf(target) != '-1'){
      alert("不正解！！");
      window.location.reload();
    }
    
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
  //const card_li = ['1','2','3','4','5','6','7']
  const rows = card_li.map((card,index) =>
    <ul id="CardList" key={card}>
      <li>
      <button  onClick={() => props.cardClick(card, index)}>
          {card}
      </button>
      </li>
    </ul>
  );
  return (
    rows
  )
}


export default App;
