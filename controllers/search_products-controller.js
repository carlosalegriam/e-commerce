import { productServices } from "../services/product-service.js";

const inputSearch = document.querySelector("#search");
const titleSearch = document.querySelector("#search-title");
const btnSearchmobil = document.querySelector(".search--movil");
titleSearch.style.display = "none";

let onViewSearch = false;

btnSearchmobil.addEventListener("click", (event)=> {
    const componentSearch = document.querySelector(".search");
    const componentLogo = document.querySelector(".logo");
    const componentLogin = document.querySelector(".nav__login");


    if(onViewSearch){
        componentLogo.style.display = 'block';
        componentLogin.style.display = 'block';
        componentSearch.style.display = 'none';
    } else {
        componentSearch.style.display = 'flex';
        inputSearch.style.width = '100%';
        componentLogo.style.display = 'none';
        componentLogin.style.display = 'none';
    }
    onViewSearch = !onViewSearch;
})

inputSearch.addEventListener("keyup", (event) => {
  clearTable();
  
  const valueSearch = event.target.value.trim();

  const searchIcon = document.querySelector('.search__icon');
  searchIcon.style.display = valueSearch ? 'none' : 'block';

  if (valueSearch.length > 0) {
    titleSearch.style.display = "";
    getSearchProducts();
  } else {
    titleSearch.style.display = "none";
  }
});

const CreateItemTable = (imagen, nombre, precio, id) => {
  const linea = document.createElement("div");
  linea.className = "products__item";
  const contenido = `
    
        <img class="item__img" src="${imagen}" alt="">
        <h3 class="item__title">${nombre}</h3>
        <p class="item__price">$ ${precio}</p>
        <a class="item__link" href="../screens/product.html?id=${id}">Ver Producto</a>
    `;
  linea.innerHTML = contenido;
  return linea;
};

const table = document.querySelector("#products");

const getSearchProducts = async () => {
  try {
    const valueSearch = inputSearch.value.trim().toLocaleLowerCase();
    const listProducts = await productServices.toListProducts();

    clearTable();

    listProducts
      .filter((producto) =>
        producto.nombre.toLocaleLowerCase().includes(valueSearch) ||
        producto.categoria.toLocaleLowerCase().includes(valueSearch)
      )
      .forEach(({ imagen, nombre, precio, id }) => {
        const newLine = CreateItemTable(imagen, nombre, precio, id);
        table.appendChild(newLine);
      });
  } catch (error) {
    console.log(error);
  }
};

const clearTable = () => {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
};
