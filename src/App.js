import React from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#App')


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>オープン７</h1>
        <p>オープン7とは...<br />
        めくったカードの数字が次にめくれるカードの場所となる！<br />
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
      result: '',
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    window.addEventListener("orientationchange", function() {
        let orientation = window.orientation;
    
        if (orientation === 0) {
            /*  縦画面時の処理  */
           var popup = document.getElementById('js-popup');
           if(!popup) return;
           popup.classList.add('is-show');
        } else {
            let popup = document.getElementById('js-popup');
            popup.classList.remove('is-show');
        }
    });
  }
    openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  // start setting...
  componentWillMount(){
    this.pageCheck();
    this.shuffleCards();
  }
  
  // Vertical or Side
  pageCheck = () => {
    //画面の向きを 0,90,180,-90 のいずれかで取得
    let orientation = window.orientation;

    window.onload = function(){
      if (orientation === 0) {
          /*  縦画面時の処理  */
          const  popup = document.getElementById('js-popup');
          if(!popup) return;
          popup.classList.add('is-show');
      } else {
          /*  横画面時の処理  */
      }
    }
  }

  //state reset...
  stateReset = () => {
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
    selectItem[index].src = "/images/ace0" + card + ".gif";
  }

  render() {
    return (
      <div class="CardBox">
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
        </Modal>
        <div class="popup" id="js-popup">
          <div class="popup-inner">
            <a href="#"><img src={process.env.PUBLIC_URL +"/images/phone.png"} alt="ポップアップ画像" /></a>
          </div>
          <div class="black-background" id="js-black-bg"></div>
        </div>

        <div id="CardList" class="card_list">
          <ul>
            <CardSet cardClick={this.handleFunction} cardList={this.state.check_cards} />
          </ul>
        </div>
        <h2>{this.state.result}</h2>
        {this.state.result != '' ? <Reset stateReset={this.stateReset} /> : ''}
      </div>
    );
  }
}

const CardSet = (props) => {
  
  const card_li = props.cardList;
  const rows = card_li.map((card,index) =>
      <li class={'card' + (card)} key={card}>
         <input type="image" src={process.env.PUBLIC_URL +'/images/tramp_back.png'} onClick={() => props.cardClick(card, index)} value={card} width="70" height="100" />
      </li>
  );
  return (
    rows
  )
}


const Reset = (props) => {
  pageScroll();
  return(
    <div class="reset-button-div">
      <button onClick={props.stateReset} class="reset-button">
        もう一度遊ぶ
      </button>
    <div id="header-line"></div>
    </div>
  );
}

const pageScroll = () => {
  let a = document.documentElement;
  var y = a.scrollHeight - a.clientHeight;
  setTimeout(function() { window.scrollBy(0, y + 300); }, 1);
}


export default App;
