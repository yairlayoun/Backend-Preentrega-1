class CartManager {
    constructor() {
      this.carts = [];
    }
  
    createCart() {
      const newCart = {
        id: this.generateCartId(),
        products: []
      };
      this.carts.push(newCart);
      return newCart;
    }
  
    getCartById(cartId) {
      return this.carts.find((cart) => cart.id === cartId);
    }
  
    addProductToCart(cartId, productId, quantity) {
      const cart = this.getCartById(cartId);
      if (!cart) {
        return false;
      }
  
      const existingProduct = cart.products.find((item) => item.productId === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
  
      return true;
    }
  
    generateCartId() {
      const maxId = this.carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
      return maxId + 1;
    }
  }
  
  const cartManager = new CartManager();
  
  export default cartManager;
  