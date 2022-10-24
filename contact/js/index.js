
/**
 * 
 * @param {HTMLFormElement} form 
 */
function cleanErrors(form) {
    const all = form.querySelectorAll(".error");
    all.forEach(field => {
        field.remove();
    });
}

/**
 * 
 * @param {HTMLFormElement} form 
 */

function sendMessageSuccess(form) {
    const parent = form?.parentElement;

    if(!parent) return ;

    const container = document.createElement("div");
    container.classList.add("error-success");

    container.innerHTML = `
        <p>Se ha inviado el mensaje de manera correcta.</p>
    `;

    parent.prepend(container);
}

/**
 * 
 * @param {Array<{ controller: HTMLInputElement, validation: string }>} fields 
 */

function clearFields(fields) {
    fields.forEach(field => {
        field.controller.value = "";
    });
}

function clearMessageSuccess() {
    const message = document.querySelectorAll(".error-success");
    message.forEach(element => element.remove());
}

/**
 * 
 * @param {HTMLInputElement} input 
 * @param {string} message
 */

function sendErrorField(input, message) {
    const parent = input.parentElement;
    const container = document.createElement("div");

    container.classList.add("error");
    container.innerHTML = `
        <div class="error--image"></div>
        <div class="error--tooltip">
            <p>${message}</p>
        </div>
    `;
    
    parent.append(container);
}

/**
 * 
 * @param {{ controller: HTMLInputElement, validation: string }} field
 */

function validateField(field) {
    const validations = field.validation.split("-");
    const value = field.controller.value;
    let validationSuccess = 0;

    for(const validation of validations) {
        if(
            validation === "required" &&
            value.length === 0
        ) {
            sendErrorField(field.controller, "Este campo es obligatorio.");
            break;
        }

        if(
            validation === "phone" &&
            value.search(/09[0-9]{8}/g) === -1
        ) {
            sendErrorField(field.controller, "No cumple un formato válido de número telefónico. Formato correcto: 09xxxxxxxx.");
            break;
        }

        validationSuccess ++;
    }

    return validationSuccess === validations.length;
}

/**
 * 
 * @param {MouseEvent} event 
 * @returns 
 */
function onSubmit(event) {
    const form = document.forms["contact"];

    if(!form) return ;

    event.preventDefault();

    const {
        fname: firstName,
        lname: lastName,
        phone, subject,
        message
    } = form;

    const fields = [
        { controller: firstName, validation: "required" },
        { controller: lastName, validation: "required" },
        { controller: phone, validation: "required-phone" },
        { controller: subject, validation: "required" },
        { controller: message, validation: "required" }
    ];

    // Limpiar los errores anteriores si existen.
    cleanErrors(form);
    clearMessageSuccess();

    // Empezar validación
    let fieldWithError = 0;

    fields.forEach((field) => {
        if(!validateField(field)) {
            fieldWithError ++;
        }
    });

    if(fieldWithError === 0) {
        sendMessageSuccess(form);
        clearFields(fields);
    }
}

document.getElementById("contact-send").addEventListener("click", onSubmit);