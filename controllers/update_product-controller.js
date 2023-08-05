import { productServices } from "../services/product-service.js";

const getProduct = async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  if (id === null) {
    window.location.href = "../screens/products.html";
  }

  const inputImagen = document.querySelector("[data-imagen]");
  const inputNombre = document.querySelector("[data-nombre]");
  const inputCategoria = document.querySelector("[data-categoria]");
  const inputPrecio = document.querySelector("[data-precio]");
  const inputDescripcion = document.querySelector("[data-descripcion]");

  try {
    const product = await productServices.detailProduct(id);
    console.log(product);
    if (product.titulo && product.imagen) {
        inputImagen.value = product.imagen;
        inputNombre.value = product.nombre;
        inputCategoria.value = product.categoria;
        inputPrecio.value = product.precio;
        inputDescripcion.value = product.descripcion;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    
  }
};

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const url = new URL(window.location);
  const id = url.searchParams.get("id");
  const inputImagen = document.querySelector("[data-imagen]").value;
  const inputNombre = document.querySelector("[data-nombre]").value;
  const inputCategoria = document.querySelector("[data-categoria]").value;
  const inputPrecio = document.querySelector("[data-precio]").value;
  const inputDescripcion = document.querySelector("[data-descripcion]").value;

  productServices.updateProduct(inputImagen, inputNombre, inputCategoria, inputPrecio, inputDescripcion, id).then(() => {
    window.location.href = "../screens/get-products.html";
  });
});

getProduct();
