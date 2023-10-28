import fs from 'fs';

// Leer carritos desde el archivo carts.json
export const getCarts = async () => {
  try {
    const data = fs.readFileSync('./src/data/carts.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Obtener un carrito por ID
export const getCartById = async (cartId) => {
  const carts = await getCarts();
  const cart = carts.find((cart) => cart.id === cartId);
  return cart;
}

// Crear un nuevo carrito
export const createCart = async () => {
  const carts = await getCarts();
  const newCart = {
    id: generateCartId(carts),
    products: []
  };
  carts.push(newCart);
  saveCartsToFile(carts);
  return newCart;
}

// Agregar un producto a un carrito
export const addProductToCart = async (cartId, productId, quantity) => {
  const carts = await getCarts();
  const cart = carts.find((cart) => cart.id === cartId);
  if (!cart) {
    return false;
  }

  const existingProduct = cart.products.find((item) => item.productId === productId);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ productId, quantity });
  }

  saveCartsToFile(carts);
  return true;
}

// Función para generar un nuevo ID autoincrementable
const generateCartId = (carts) => {
  const maxId = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
  return maxId + 1;
}

// Función para guardar carritos en el archivo
const saveCartsToFile = (carts) => {
  const data = JSON.stringify(carts, null, 2);
  fs.writeFileSync('./src/data/carts.json', data);
}
