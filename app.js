addEventListener("DOMContentLoaded", startApp());

// Funcion que llama funciones cuando el documento esta cargado
function startApp(){
  // Aqui vamos a poner las funciones que se cargarán automaticamente el documento cargue 
    validarFormularios();
}

// Funcion para validacion de formularios
function validarFormularios() {
  // Declaracion de constantes con los elementos a validar
  // Cada querySelector hacer referencia a un elemento previamente declarado en el DOM (Puede ser en el HTML)
  // Los querySelectorAll devuelven Arrays con los elementos ya comentados
    const form = document.querySelector("#formulario");
    const validacionCaracteres = document.querySelectorAll(".validacion-c");
    const validacionEmails = document.querySelectorAll(".validation-email");
    const validacionNumeros = document.querySelectorAll(".validacion-number");
  
    // Hacer un bucle que recorra el array de los elementos provenientes de la clase "validacion-number",
    // fijamos el primer parametro como elemento al cual nos vamos a referir
    validacionNumeros.forEach((elemento) => {
        // Teniendo en cuenta que cada elemento hace referencia a un elemento de tipo input entonces asociamos un Listener del evento "input"
        // Este evento es llamado cuando se inserta un caracter o se ejecuta un cambio en el input (campo de un formulario)
        elemento.addEventListener("input", (event) => {
            // Este pedazo lo que hace es convertir el valor dentro del input a un patrón numerico, eliminando asi cualquier tipo de caracter invalido;
            // Dando así la sensacion que no se permiten las letras
            let value = event.target.value.replace(/[^0-9]/g, "");
            // Este fija el valor formateado a numeros y lo Setea en el elemento proveniente del evento que se ejecutó
            event.target.value = value;
        });
    })
    
    // Fijamos un listener al evento submit (El evento submit lo que hace es que cuando le damos al boton de enviar en un formulario
    // este empaqueta la información y la envia mediante una consulta HTTP, en la mayoria de los casos se usan los metodos POST y PUT)
    // esta definimos una funcion que se va a ejecutar cuando se ejecute el evento, de esta manera insertando la logica necesaria para cumplir 
    // con lo que se necesita.
    form.addEventListener("submit", (evento) => {
        // Este metodo del objeto "evento" cancelará la accion por defecto para asi crear la nuestra
        evento.preventDefault();
        // El arreglo de errores va a guardar todos los errores encontrados y se los mostrará al usuario
        let errores = [];

        //Tenieniendo en cuenta que validacionCaracteres es un arreglo de elementos que contengan esta clase vamos a crear
        // Un bucle que va a recorrer cada elemento validando y creando un mensaje de error
        validacionCaracteres.forEach((elemento) => {
            // La constante value hace referencia al texto dentro de un elemento en la mayoria de los casos
            const value = elemento.value;
            if (value.length < 2 || value.length > 20) {
                // Usando el objeto classList del elemento podemos gestionar las clases que posea, en este caso agregamos la clase
                //  "input-error" la cual contiene el estilo necesario que deseamos mostrar al usuario
                elemento.classList.add("input-error");
                // Aqui estamos usando el metodo push para agregar un elemento al arreglo de errores, insertamos el mensaje que queremos que
                // El usuario vea
                errores.push(`El campo ${elemento.id} no es correcto`);
            }
        })

        //Tenieniendo en cuenta que validacionEmails es un arreglo de elementos que contengan esta clase vamos a crear
        // Un bucle que va a recorrer cada elemento validando y creando un mensaje de error
        validacionEmails.forEach((elemento) => {
            const isEmailCorrecto = validateEmail(elemento.value);
            if (!isEmailCorrecto) {
                elemento.classList.add("input-error");
                errores.push(`El campo ${elemento.id} no es correcto`);
            }
        });


        // Hacemos una validacion que si existen errores dentro del arreglo vamos a ejecutar la logica necesaria
        if (errores.length > 0){
          // Creamos un string vacio el cual le vamos a insertar texto correspondiente a los errores
            let mensaje = "";
            errores.forEach((error) => {
                // Insertamos/Concatenamos el mensaje de error y un salto de linea
                mensaje += error+"\n";
            });
            //Le mostramos el mensaje al usuario
            alert(mensaje);
        }
    });
}

// Creamos una funcion que valide un texto mediante un patron de caracteres
function validateEmail(value) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   
        if (emailPattern.test(value)) {
            return true
        }
    return false;
}
