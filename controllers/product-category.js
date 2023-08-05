import { productServices } from "../services/product-service.js";

const showProductsByCategory = async (category, containerId) => {
    const productsContainer = document.getElementById(containerId);

    try {
        const products = await productServices.getProductsByCategory(category);

        productsContainer.innerHTML = "";

        products.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.className = 'products__item';
            productItem.innerHTML = `
                <img class="item__img" src="${product.imagen}" alt="${product.nombre}">
                <h3 class="item__title">${product.nombre}</h3>
                <p class="item__price">$ ${product.precio}</p>
                <a class="item__link" href="screens/product.html?id=${product.id}">Ver Producto</a>
            `;
            productsContainer.appendChild(productItem);
        });
    } catch (error) {
        console.log(error);
    }
};

showProductsByCategory("Star wars", "starWarsProducts");
showProductsByCategory("Consolas", "consolasProducts");
showProductsByCategory("Diversos", "diversosProducts");