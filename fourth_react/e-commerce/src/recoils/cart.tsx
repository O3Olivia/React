import { atom, selectorFamily } from "recoil";

const cartState = atom<Map<string, number>>({
    key: 'cartState',
    default: new Map()
})

export const cartItemSelector = selectorFamily<number | undefined, string>({
    key: 'cartItem',
    get: (id: string) => ({ get }) => { 
        const carts = get(cartState)
        return carts.get(id)
    },
    set:
        (id: string) =>
        ({ get, set }, newValue) =>{ 
        if (typeof newValue === 'number') {
            const newCart = new Map([...get(cartState)])
            newCart.set(id, newValue)
            set(cartState, newCart)
        }
    },
})
// components - product - item에서 사용
// get은 id를 가져와 몇개가 있는지 수량 체크 
// set은 담기 누를때마다 수량 변화해줌 