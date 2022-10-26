import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx; // 객체 destructuring => 각각 값(value)이나 프로퍼티(property) 를 분해하여 손쉽게 별도의 변수에 담을 수 있도록함. cartCtx로 설정하면, cartCtx가 바뀔 때마다 항상 다시 실행되기 때문,so items를 cart에서 꺼낼 수 있도록 함.

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300); // 애니메이션 할당 시간이 300로 해놨기 때문에 이 시간이 끝나면 btnIsHighlighted를 false로 바꾸도록 함

    return () => {
      clearTimeout(timer);
      // cleanup Fn. [버튼은 항상 있어야하지만, 타이머만 지우기 위함] : 해당 Effect가 다시 실행될 때 timer를 지우도록 함. -> 여러 항목을 빠르게 추가하면, 이전 timer는 지우고 새 timer를 설정하고 이전 timer를 삭제하도록 해야함.
      // *useEffect에서 함수를 return하면 리액트에 의해 cleanup fn로 자동 호출됨. *
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
