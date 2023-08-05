import { productServices } from "../services/product-service.js";

const title = document.querySelector('#title');
const price = document.querySelector('#price');
const description = document.querySelector('#description');
const image = document.querySelector('#image');

const getProduct = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
  
    if (id === null) {
      window.location.href = "../screens/products.html";
    }
    
    try {
      const product = await productServices.detailProduct(id);
      
      if (product.nombre && product.imagen) {
          image.src = product.imagen;
          title.textContent = product.nombre;
          price.textContent = `$ ${product.precio}`;
          description.textContent = product.descripcion;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
};
getProduct();
