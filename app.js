addEventListener("DOMContentLoaded", startApp());

// Funcion que llama funciones cuando el documento esta cargado
function startApp(){
    validarFormularios();
}

function validarFormularios() {
    const form = document.querySelector("#formulario");
    const validacionCaracteres = document.querySelectorAll(".validacion-c");
    const validacionEmails = document.querySelectorAll(".validation-email");
    const validacionNumeros = document.querySelectorAll(".validacion-number");

    validacionNumeros.forEach((elemento) => {
        elemento.addEventListener("input", (event) => {
            let value = event.target.value.replace(/[^0-9]/g, "");
            event.target.value = value;
        });
    })
    
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let errores = [];
        validacionCaracteres.forEach((elemento) => {
            const value = elemento.value;
            if (value.length < 2 || value.length > 20) {
                elemento.classList.add("input-error");
                errores.push(`El campo ${elemento.id} no es correcto`);
            }
        })

        validacionEmails.forEach((elemento) => {
            const isEmailCorrecto = validateEmail(elemento.value);
            if (!isEmailCorrecto) {
                elemento.classList.add("input-error");
                errores.push(`El campo ${elemento.id} no es correcto`);
            }
        });


        if (errores.length > 0){
            let mensaje = "";
            errores.forEach((error) => {
                mensaje += error+"\n";
            });
            alert(mensaje);
        }
    });
}

function validateEmail(value) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   
        if (emailPattern.test(value)) {
            return true
        }
    return false;
}