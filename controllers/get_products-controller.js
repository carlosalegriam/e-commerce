import { productServices } from "../services/product-service.js";

const CreateItemTable = (imagen, nombre, precio, id) => {
    const linea = document.createElement("div");
    linea.className = 'products__item';
    const contenido = `
    
        <img class="item__img" src="${imagen}" alt="">
        <h3 class="item__title">${nombre}</h3>
        <p class="item__price">$ ${precio}</p>
        <a class="item__link" href="../screens/product.html?id=${id}">Ver Producto</a>
        <a class="btn-edit" href="../screens/update-product.html?id=${id}">Editar</a>
        <button class="btn-delete" type="button" id=${id}>Eliminar</button>
    `;
    linea.innerHTML = contenido;
    const btn = linea.querySelector("button");
    btn.addEventListener("click", () => {
      Swal.fire({
        title: '¡Atención!',
        text: "¿Estás seguro de que deseas eliminar este producto?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
        
      }).then((result) => {
        if (result.isConfirmed) {
          const id = btn.id;
          productServices.deleteProduct(id).then(() => {
            window.location.href = "../screens/get-products.html";
          });;
          Swal.fire({
            title: 'Eliminado',
            text: 'El producto fue eliminado',
            icon: 'success',
            showConfirmButton: false, 
            timer: 2000 
          })
        }
      })
      
    });
    return linea;
  };
  
  const table = document.querySelector("#products");



const getProducts = async () => {
    try {
      const listProducts = await productServices.toListProducts();
  
      listProducts.forEach(({ imagen, nombre, precio, id }) => {
        const newLine = CreateItemTable(imagen, nombre, precio, id);
        table.appendChild(newLine);
      });
      
    } catch (error) {
      console.log(error);
      
    }
  };
  
getProducts();