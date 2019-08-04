import React from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>オープン７</h1>
        <p>オープン7とは...<br />
        めくったカードの数字位置を左右から選択してめくっていくゲームだよ！<br />
        最後までめくれたら勝利！！さあ、挑戦してみよう！</p>
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
      check_cards: ['1','2','3','4','5','6','7'],
      result: ''
    }
  }

  // start setting...
  componentWillMount(){
    this.shuffleCards();
  }

  //state reset...
  stateReset = () => {
    console.log("state reset handle now...");
    this.setState({select_card: []});
    this.setState({check_cards: []});
    this.setState({result: ''});
    this.shuffleCards();
    this.cardsReset();
  }

  cardsReset = () => {
    let cards = document.getElementById("CardList").getElementsByTagName("input");
    for(let i = 0; i < cards.length; i++){
      cards[i].disabled = false;
      cards[i].className = "cards";
      cards[i].src = "/images/tramp_back.png";
    }
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

  handleFunction = (card, index) => {
    this.changeImage(card, index);
    this.handleOnClick(card, index);
  }

  handleOnClick = (e, index) => {
    //this.changeImage(e, index);

    this.setState({card_value: e});
    const card = Object.assign([], this.state.select_card);
    card.push(e);
    this.setState({ select_card: card });

    this.openCheck(e, index);
  }

  openCheck = (card, index) => {
    let openedCard = this.state.select_card
    if(openedCard.length == 6 && openedCard.indexOf(card) == '-1') {
      this.setState({result: '正解です！'});
    }else if(openedCard.indexOf(card) != '-1') {
      this.setState({result: '不正解です！'})
      //window.location.reload();
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

    if(card == 4) {
      selectItem[3].disabled = false;
      selectItem[3].className = "selectCard";
    } else {
      //left select
      selectItem[card - 1].disabled = false;
      selectItem[card - 1].className = "selectCard";

      //right select
      selectItem[7 - card].disabled = false;
      selectItem[7 - card].className = "selectCard";
    }


    let target = selectItem[card - 1].value;
    let an_target = selectItem[(7 - card)].value;
    if(select_cards.indexOf(target) != '-1' && select_cards.indexOf(an_target) != '-1'){
      this.setState({result: '不正解です！'});
    //  window.location.reload();
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
          <CardSet cardClick={this.handleFunction} cardList={this.state.check_cards} />
        </div>
        <h2>{this.state.result}</h2>
        {this.state.result != '' ? <Reset stateReset={this.stateReset} /> : ''}
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

const Reset = (props) => {
  console.log(props);
  return(
    <div class="reset-button-div">
      <button onClick={props.stateReset} class="reset-button">
        もう一度遊ぶ
      </button>
    </div>
  );
}


export default App;
