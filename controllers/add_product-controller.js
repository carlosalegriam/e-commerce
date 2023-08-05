import { productServices } from "../services/product-service.js"


const formulario = document.querySelector("[data-form]")
const inputImagen = document.querySelector("[data-imagen]")
const inputNombre = document.querySelector("[data-nombre]")
const inputCategoria = document.querySelector("[data-categoria]")
const inputPrecio = document.querySelector("[data-precio]")
const inputDescripcion = document.querySelector("[data-descripcion]")

formulario.addEventListener('submit', (evento)=> {
    evento.preventDefault();
    const imagen = inputImagen.value;
    const nombre = inputNombre.value;
    const categoria = inputCategoria.value;
    const precio = inputPrecio.value;
    const descripcion = inputDescripcion.value;

    productServices.createProduct(imagen,nombre,categoria,precio,descripcion).then( (res) => {
        window.location.href = '../screens/get-products.html';
    }).catch((error) => console.log(error))
});
