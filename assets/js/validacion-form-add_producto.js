const inputs = document.querySelectorAll(".add-product__input");
const form = document.getElementById("form-add_product");
const button_send = document.getElementById('add-product__button');

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
       valida(input.target);
    });
});

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    
    if (form.checkValidity()) {
        
        Swal.fire({
            title: 'Guardado',
            text: 'Producto Listo',
            icon: 'success',
            showConfirmButton: false, 
            timer: 2000 
          });
    }
    
});

function valida(input)  {
    const tipoDeInput = input.dataset.tipo;

    if (input.validity.valid) {
        
        input.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML =
          mostrarMensajeDeError(tipoDeInput, input);
    }
}
  
function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
      if (input.validity[error]) {
        mensaje = mensajesDeError[tipoDeInput][error];
      }
    });
    return mensaje;
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    imageProduct: {
        valueMissing: "El campo imagen no puede estar vacío",
    },
    categoryProduct: {
        valueMissing: "El campo categoría no puede estar vacío",
    },
    nameProduct: {
        valueMissing: "El campo nombre no puede estar vacío",
        patternMismatch: "El nombre debe contener maximo 20 caracteres.",
    },
    priceProduct: {
        valueMissing: "El campo precio no puede estar vacío",
        typeMismatch: "El campo precio solo admite números",
    },
    descriptionPrduct: {
        valueMissing: "El campo descripción no puede estar vacío",
        patternMismatch: "El nombre debe contener maximo 150 caracteres.",
    },
}

