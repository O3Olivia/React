import { SyntheticEvent } from "react";
import { Query, useMutation } from "react-query";
import { CartType, UPDATE_CART } from "../../graphql/cart";
import { getClient, graphqlFetcher, QueryKeys } from "../../queryClient";

const CartItem = ({
    id,
    imageUrl,
    price,
    title,
    amount
}: CartType) => { 
    const queryClient = getClient();
    const { mutate: updateCart } = useMutation(({ id, amount }: { id: string, amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: newValue => {
        const prevCart = queryClient.getQueryData<{[key: string]:CartType}>(QueryKeys.CART);
        const newCart = {
           ...(prevCart || {}),
           ...newValue,
        }
        queryClient.setQueryData(QueryKeys.CART, newCart)
            },
        },
        )
    
    
    const handleUpdateAmount = (e: SyntheticEvent) => {
        const amount = Number((e.target as HTMLInputElement).value);
        updateCart({ id, amount })
    };
     
    return (
    <li className="cart-item">
        <img src={imageUrl} />
        <p className="cart-item__title">{title}</p>
        <p className="cart-item__price">{price}</p>
            <input type="number" className="cart-item__amount" value={amount}
                onChange={handleUpdateAmount } />
    </li>
    );
}

export default CartItem;
