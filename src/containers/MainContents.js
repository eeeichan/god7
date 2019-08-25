import React from 'react';
import '../App.css';
import CardList from '../components/CardList';


class MainContents extends React.Component {
  constructor(props){
    super(props);
    let uid = "";

    this.state = {
      uid : uid
    }
  }

  render(){
    return(
      <div className="App-contents">
        <p>オープン7とは...<br />
        めくったカードの数字が次にめくれるカードの場所となる！<br />
        最後までめくれたら勝利！！さあ、挑戦してみよう！</p>
        <CardList />
      </div>
    );
  }
}


export default MainContents;