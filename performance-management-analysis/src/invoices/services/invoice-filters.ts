const isToday = (inputDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const inputDateCopy = new Date(inputDate); 
    inputDateCopy.setHours(0, 0, 0, 0);
    
    return inputDateCopy.getTime() === today.getTime();
};

const enoughStock = (product: any, quantity: Number) => {
    return product.Existencia != null && product.Existencia >= quantity;
};

const isCartEmpty = (cart: any) => {
    return !Array.isArray(cart) || cart.length === 0 || cart.every(item => item === null || item === undefined);
};

export { isToday, enoughStock, isCartEmpty };