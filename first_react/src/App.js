/*eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() { // 얘도 컴포넌트

  let blogName= 'Happy Oli Day';
  let [title, changeCon] = useState(['여자 코트 추천', '강남 우동 맛집 추천', '리액트 React독학']);
  let [likesQty, qtyNum] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{color:'pink', fontSize :'18px'}}>Blog</h4>
      </div>

      <button onClick={() => {
        let copy = [...title];
        console.log(copy[2]);
        copy[2] = '타입스크립트독학';
        changeCon(copy); // changeCon에 array 전체가 들어가게해서 전체가 바뀌는 것. 다만, 2번만 바꿔줬으니까 이것만 바뀐 것처럼 보임 
        console.log(copy[1]); // '강남 우동 맛집 추천'
        }}> title 수정 </button>

        <button onClick={() => {
          let copy1 = [...title];
          copy1.sort(); // 가나다 순으로 정렬
          console.log(copy1);
          changeCon(copy1);
        }}>가나다순정렬</button>


      <div className="list">
        <h4>{ title[0] } <span onClick={() => {qtyNum(likesQty + 1)}}> 👍</span> {likesQty} </h4>
        <p>8월 22일 발행</p>
      </div> 
      <div className="list">
        <h4>{ title[1] }</h4>
        <p>8월 22일 발행</p>
      </div> 
      <div className="list">
        <h4>{ title[2] } </h4>
        <p>8월 22일 발행</p>
      </div> 
      
      <Modal />
      <Modal></Modal>
     
      
    </div>
  );
}
const Modal1 =() => {
  return (
    <div>
      <h3>title</h3>
      <p>date</p>
      <p>contents</p>
    </div>
  )
} // 컴포넌트 만든는 2번째 방법

function Modal(){ // 컴포넌트 => 1. 반복적인 html을 축약할때 2. 큰페이지이들 3. 자주 변경되는 것들 [문제점] state를 가져와 쓸 수 없음. A에 있던 변수들 title을 여기 가져다 쓸 수 없다
  return(
    <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
  )
}

export default App;
