import { productServices } from "../services/product-service.js";

const similarProductsContainer = document.querySelector('.category__products');

const getSimilarProducts = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    try {
        const similarProducts = await productServices.getSimilarProducts(id);

        similarProductsContainer.innerHTML = "";

        similarProducts.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.className = 'products__item';
            productItem.innerHTML = `
                <img class="item__img" src="${product.imagen}" alt="${product.nombre}">
                <h3 class="item__title">${product.nombre}</h3>
                <p class="item__price">$ ${product.precio}</p>
                <a class="item__link" href="../screens/product.html?id=${product.id}">Ver Producto</a>
            `;
            similarProductsContainer.appendChild(productItem);
        });
    } catch (error) {
        console.log(error);
    }
};
getSimilarProducts();