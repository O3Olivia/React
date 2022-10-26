import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      // 기존의 항목을 복사하여 변경 불가능하게 업데이트 함 -> 같은 항목 이름 추가 되지 않도록 하기 위함. => 기존의 객체를 복사하여 새 배열 만듦
      updatedItems[existingCartItemIndex] = updatedItem;
      // existingCartItemIndex를 updatedItems에 덮어써서 CartItems 배열에서 오래된 항목을 선택하여 updatedItem으로 덮어씜.
      // [  CartItems에 item에 들어있는 경우. ]
    } else {
      // [처음으로 CartItems에 추가되는 경우]
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id); // item.id가 action.id와 같지 않는 item들을 filter해서 그걸 그대로 남겨둠. -> true를 반환하면 항목이 유지되기때문에 삭제될 필요없다는 의미.
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }; // 만약 1개보다 더 많을 경우에는 수량만 업데이트 하기 위해서 existingItem을 복사, 개수량을 -1개 씩 줄이도록 -1 함
      updatedItems = [...state.items]; //state.items의 복사본 => 이전 항목이 들어있는 새 배열을 만듦
      updatedItems[existingCartItemIndex] = updatedItem; // existingCartItemIndex로 얻은 항목으로 updatedItems을 덮여쓰고 이것을 업데이트 수량이 있는 updatedItem으로 덮어씌움
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
