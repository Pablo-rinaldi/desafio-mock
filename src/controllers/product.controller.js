const ProductRepository = require("../repositories/product.repository.js");
const productRepository = new ProductRepository();

class ProductController {
  async addProduct(req, res) {
    const newProduct = req.body;
    try {
      await productRepository.addProduct(newProduct);
      res.redirect("/manageProducts");
    } catch (error) {
      res.status(500).send("Error, no se pudo agregar el producto");
    }
  }

  async getProducts(req, res) {
    try {
      let { limit = 10, page = 1, sort, query } = req.query;

      const products = await productRepository.getProducts(
        limit,
        page,
        sort,
        query
      );

      res.json(products);
    } catch (error) {
      res.status(500).send("Error, no se pudieron obtener los productos");
    }
  }

  async getProductById(req, res) {
    const id = req.params.pid;
    try {
      const searched = await productRepository.getProductById(id);
      if (!searched) {
        return res.json({
          error: "Producto no encontrado",
        });
      }
      res.json(searched);
    } catch (error) {
      res.status(500).send("Error al buscar el Producto");
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.pid;
      const updatedProduct = req.body;

      await productRepository.updateProduct(id, updatedProduct);
      //res.json("Producto actualizado correctamente");
      res.redirect("/manageProducts");
    } catch (error) {
      res.status(500).send("Error al actualizar el producto");
    }
  }

  async deleteProduct(req, res) {
    const id = req.params.pid;
    try {
      await productRepository.deleteProduct(id);

      // res.json("Producto eliminado correctamente");
      res.redirect("/manageProducts");
    } catch (error) {
      res.status(500).send("Error al eliminar el producto");
    }
  }

  async getMockProducts(req, res) {
    try {
      const createProducts = await productRepository.getProductsMockProducts();
      res.send(createProducts);
    } catch (error) {
      res.status(500).send("Error al mostrar los productos del mock");
    }
  }

  async addMockProduct(req, res) {
    try {
      const newMockProduct = await productRepository.addMockProduct();

      res.send(newMockProduct);
    } catch (error) {
      res.status(500).send("Error al agregar el productos del mock");
    }
  }
}

module.exports = ProductController;
