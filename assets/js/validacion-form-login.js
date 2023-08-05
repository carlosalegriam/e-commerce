const inputs = document.querySelectorAll(".login__input");
const form = document.getElementById("form-login");
const button_send = document.getElementById('login__button');

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
       valida(input.target);
    });
});

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    
    if (form.checkValidity()) {
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        if( email !== 'user@usercorreo.com' || password !== '123456') {
            Swal.fire(
                'Error de Autentificación',
                'Credenciales incorrectas',
                'error'
            )
            return
        };
        
        window.location.href = '../screens/get-products.html';
        form.reset();
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
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
    },
}

