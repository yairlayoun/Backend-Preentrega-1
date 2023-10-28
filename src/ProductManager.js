import fs from 'fs';

export default class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  // Agregar un producto
  async addProduct(product) {
    // 1. Obtener los productos existentes desde el archivo de forma asincrónica.
    const products = await this.getProductsFromFile();

    // 2. Generar un ID para el nuevo producto y asignarlo.
    product.id = this.generateId(products);

    // 3. Agregar el nuevo producto al arreglo.
    products.push(product);

    // 4. Guardar la lista actualizada de productos en el archivo de forma asincrónica.
    await this.saveProductsToFile(products);
  }

  // Obtener todos los productos
  async getProducts() {
    // 1. Obtener la lista de productos desde el archivo de forma asincrónica.
    return await this.getProductsFromFile();
  }

  // Obtener un producto por ID
  async getProductById(id) {
    // 1. Obtener la lista de productos desde el archivo de forma asincrónica.
    const products = await this.getProductsFromFile();

    // 2. Buscar el producto por su ID.
    const product = products.find((product) => product.id === id);

    // 3. Si el producto no se encuentra, lanzar una excepción.
    if (!product) {
      throw new Error('Producto no encontrado.');
    }

    return product;
  }

  // Actualizar un producto por ID
  async updateProduct(id, updatedProduct) {
    // 1. Obtener la lista de productos desde el archivo de forma asincrónica.
    const products = await this.getProductsFromFile();

    // 2. Buscar el índice del producto a actualizar por su ID.
    const index = products.findIndex((product) => product.id === id);

    // 3. Si se encuentra el producto, actualizar sus propiedades.
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };

      // 4. Guardar la lista actualizada de productos en el archivo de forma asincrónica.
      await this.saveProductsToFile(products);
    } else {
      // 5. Si el producto no se encuentra, lanzar una excepción.
      throw new Error('Producto no encontrado. No se puede actualizar.');
    }
  }

  // Eliminar un producto por ID
  async deleteProduct(id) {
    // 1. Obtener la lista de productos desde el archivo de forma asincrónica.
    const products = await this.getProductsFromFile();

    // 2. Filtrar los productos para excluir el producto a eliminar.
    const updatedProducts = products.filter((product) => product.id !== id);

    // 3. Si el número de productos no cambia, no se eliminó ningún producto, por lo que no lanzamos una excepción.
    if (updatedProducts.length === products.length) {
      return;
    }

    // 4. Guardar la lista actualizada de productos en el archivo de forma asincrónica.
    await this.saveProductsToFile(updatedProducts);
  }

  // Generar un nuevo ID autoincrementable
  generateId(products) {
    // 1. Determinar el ID máximo existente en la lista de productos.
    const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);

    // 2. Generar un nuevo ID incrementando el máximo en 1.
    return maxId + 1;
  }

  // Leer productos desde el archivo de forma asincrónica
  async getProductsFromFile() {
    try {
      // 1. Leer los datos del archivo de forma asincrónica.
      const data = await fs.promises.readFile(this.path, 'utf-8');

      // 2. Analizar los datos JSON y devolver la lista de productos.
      return JSON.parse(data);
    } catch (error) {
      // 3. En caso de error al leer el archivo, devolver una lista vacía.
      return [];
    }
  }

  // Guardar productos en el archivo de forma asincrónica
  async saveProductsToFile(products) {
    // 1. Convertir la lista de productos a formato JSON.
    const data = JSON.stringify(products, null, 2);

    // 2. Escribir los datos en el archivo de forma asincrónica.
    await fs.promises.writeFile(this.path, data);
  }
}
