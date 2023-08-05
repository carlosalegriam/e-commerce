const toListProducts = () => {
  return fetch("http://localhost:3000/productos")
  .then((respuesta) => respuesta.json())
  .catch((error) => console.log(error));
};

const createProduct = (imagen, nombre, categoria, precio, descripcion) => {
  return fetch(`http://localhost:3000/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ imagen, nombre, categoria, precio, descripcion, id}),
  }).then((respuesta) => {
    if (respuesta.ok) {
      return respuesta.body;
    }
    throw new Error("No fué posible crear un producto");
  });
};

const deleteProduct = (id) => {
  return fetch(`http://localhost:3000/productos/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const detailProduct = (id) => {
  return fetch(`http://localhost:3000/productos/${id}`)
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
};

const updateProduct = (imagen, nombre, categoria, precio, descripcion, id) => {
  return fetch(`http://localhost:3000/productos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ imagen, nombre, categoria, precio, descripcion, id })
  })
  .then((respuesta) => {
    return respuesta.json();
  })
  .catch((error) => console.log(error));
};

const getProductsByCategory = (category) => {
  return fetch(`http://localhost:3000/productos?categoria=${encodeURIComponent(category)}`)
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
};

const getSimilarProducts = async (productId, category) => {
  try {
    const product = await detailProduct(productId);

    const similarProducts = await getProductsByCategory(product.categoria);

    const filteredSimilarProducts = similarProducts.filter(p => p.id !== productId);

    return filteredSimilarProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const productServices = {
  toListProducts,
  createProduct,
  deleteProduct,
  detailProduct,
  updateProduct,
  getProductsByCategory,
  getSimilarProducts,
};
