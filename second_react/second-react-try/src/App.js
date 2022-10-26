import { useState } from "react";
import styles from "./Button.module.css";
import style from "./App.module.css";

function App() {
   const [toDo, setToDo] = useState("");
   const [toDos, setToDos] = useState([]);
   // 1. 어플리케이션이 시작될땐 비어있는 [] 배열로 시작
   // todo를 추가할때마다 여기 array에서 가져와서 넣는거임 => 여러개의 toDo를 받을 수 있는 배열
   const onChange = (e) => setToDo(e.target.value);
   const onSubmit = (e) => {
      e.preventDefault(); // form은 submit의 이벤트를 가지고 있어서 우선 기본동작을 막아준다.
      if (toDo === "") {
         return;// 함수가 작동되지 않도록 함 
      }
      setToDos((currentArray) =>[toDo, ...currentArray]); // currentArray에다가 toDo를 받아오는 function. 그리고 새로운 array를 return받아옴  => state은 직접 수정할 수 없어서 함수를 가져와서 수정해야하기 때문. 
      // 2. 처음 입력하고 submit하면 입력한 value값, [] 비어있는 array
      // 3. 그 다음 값 입력하고 submit하면, 다음값, [처음 입력한 값]
      setToDo(""); // 그리고 toDo Value를 비워줌 
   };
   
   const deleteBtn = (e) => {
      const targetOne = e.target.id;
      setToDos((currentArray) => currentArray.filter((item) => {
         return item !== targetOne; // targetOne과 일치하지 않은 것들만 모아서 ToDos 만듦 
      })
      );
   };
   const todayIs = new Date();
   let year = todayIs.getFullYear();
   let month = ('0' + (todayIs.getMonth() + 1)).slice(-2);
   let day = ('0' + todayIs.getDate()).slice(-2);
   const week = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];
   let dayOfWeek = week[todayIs.getDate()];
   let toDayModi = year + '.' + month + '.' + day;
   console.log(toDayModi);
   console.log(dayOfWeek);


   return <div className={style.App}>
      <h3 className={ style.date}>{ toDayModi}</h3>
      <h1>🌷 Happy {dayOfWeek}day 🌷</h1>
      <h5>Total To Do list for today is <span className={ style.listQty}>{toDos.length }</span></h5>
      <form onSubmit={onSubmit}> 
         <input
            onChange={onChange}
            value={toDo}
            className={ style.inputForm}
            type="text"
            placeholder="add your To Do list" />
      </form>
      <ul className={ style.ul}>
         {toDos.map((item, index) => (
            <li key={index}>{item}<button id={item} className={styles.btn } onClick={ deleteBtn}> X </button></li>
         ))}
      </ul>
   </div>;
}

export default App;
