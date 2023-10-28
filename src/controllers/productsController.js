import fs from 'fs';

// Leer productos desde el archivo products.json
export const getProducts = async () => {
  try {
    const data = fs.readFileSync('./src/data/products.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Obtener un producto por ID
export const getProductById = async (productId) => {
  const products = await getProducts();
  const product = products.find((product) => product.id === productId);
  return product;
}

// Agregar un nuevo producto
export const addProduct = async (newProduct) => {
  const products = await getProducts();
  newProduct.id = generateProductId(products);
  products.push(newProduct);
  saveProductsToFile(products);
  return newProduct;
}

// Actualizar un producto por ID
export const updateProduct = async (productId, updatedProductData) => {
  const products = await getProducts();
  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProductData };
    saveProductsToFile(products);
    return true;
  } else {
    return false;
  }
}

// Eliminar un producto por ID
export const deleteProduct = async (productId) => {
  const products = await getProducts();
  const updatedProducts = products.filter((product) => product.id !== productId);
  if (updatedProducts.length === products.length) {
    return false; // No se eliminó ningún producto
  }
  saveProductsToFile(updatedProducts);
  return true;
}

// Función para generar un nuevo ID autoincrementable
const generateProductId = (products) => {
  const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
  return maxId + 1;
}

// Función para guardar productos en el archivo
const saveProductsToFile = (products) => {
  const data = JSON.stringify(products, null, 2);
  fs.writeFileSync('./src/data/products.json', data);
}
