export const initialState  = { 
    basket: [] ,
    user: null ,
    shippingData: {},
    paymentMessage: '', 
}

export const actionTypes = { 
    ADD_TO_BASKET: 'ADD_TO_BASKET',
    REMOVE_ITEM: 'REMOVE_ITEM', 
    SET_USER: 'SET_USER',
    EMPTY_BASKET: 'EMPTY_BASKET',
    SET_SHIPPING_DATA: 'SET_SHIPPING_DATA',
    SET_PAYMENT_MESSAGE: 'SET_PAYMENT_MESSAGE'
}

 export const getBasketTotal = (basket) => (
        basket?.reduce((amount, item) => Number(item.price)+Number(amount), 0) // la fn reduce REDUCE todos los elementos de un array a un unico valor, recibe como primer parametro un acumulador, segundo cada item de un array y el 0 es en que posicion de dicho array arranca
)

const reducer = (state, action) => {
    console.log(action) ; 
    switch(action.type){

    case 'ADD_TO_BASKET': 

    return { 
        ...state, 
        basket: [...state.basket, action.item]
    };

    case 'REMOVE_ITEM': 
    const index = state.basket.findIndex((basketItem => basketItem.id === action.id))
    let newBasket = [...state.basket]
    if(index >= 0) {
        newBasket.splice(index,1)
    }
    return {    
        ...state, 
        basket: newBasket, 
    } ;

    case 'SET_USER': 
    return { 
        ...state, 
        user: action.user
    }

    case 'EMPTY_BASKET':
        return { 
            ...state,
            basket: action.Basket
        };
    
    case 'SET_SHIPPING_DATA': 
    return { 
        ...state, 
        shippingData: action.shippingData,
    }; 

    case 'SET_PAYMENT_MESSAGE': 
    return { 
        ...state, 
        paymentMessage: action.paymentMessage
    }
    

    default: return state  ;
}}

export default reducer 