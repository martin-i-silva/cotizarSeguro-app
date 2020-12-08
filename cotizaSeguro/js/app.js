// Constructor para seguro

function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function (){
    // 1 = americano 1.15
    // 2 = asiatico 1.05
    // 3 = europeo 1.35
    let cantidad;
    const base = 2000;
    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        }
    
    // leer el año
    const diferencia = new Date().getFullYear() - this.anio;
    // Cada año de diferencia hay que reducir el 3% el valor del seguro
        cantidad -= ((diferencia*3)*cantidad/100)

    // basico ==> 30% mas
    // completo ==> 50% mas
    if(this.tipo === 'basico'){
        cantidad *= 1.30 
    } else {
        cantidad*= 1.50
    }

    
    return cantidad
}


// --------------------------------------------------------------------------

// Todo lo que se muestra
function Interfaz(){
    

}
// Mensaje de error
    Interfaz.prototype.mostrarMensaje = function(mensaje, tipo){
        const div = document.createElement('div');
        if(tipo === 'error'){
            div.classList.add('mensaje', 'error');
        }else {
            div.classList.add('mensaje', 'correcto');
        }

        div.innerHTML = `${mensaje}`
        formulario.insertBefore(div, document.querySelector('.form-group'));
        setTimeout(function(){
            document.querySelector('.mensaje').remove() 
        }, 2000)
    }
    
// Mostrar resultado
    Interfaz.prototype.mostrarResultado = function(seguro, total){
        const resultado = document.getElementById('resultado');
        let marca;
        switch(seguro.marca){
            case '1': marca = 'Americano'; break;
            case '2': marca = 'Asiatico'; break;
            case '3': marca = 'Europeo'; break;
        }
        // Crear un div
        const div = document.createElement('div')
        div.innerHTML= `
        <p class="header">Resultado:</p>
        <p>Marca ${marca}</p>
        <p>Año ${seguro.anio}</p>
        <p>Tipo ${seguro.tipo}</p>
        <p class="header">Total $${Math.round(total)}</p>
        `;
        const spinner = document.querySelector('#cargando img')
        spinner.style.display = 'block';
        setTimeout(function(){
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 2500)
        
        
    }

// Eventlisteners
const formulario = document.getElementById('cotizar-seguro')
formulario.addEventListener('submit', function(e){
    e.preventDefault()

    // Leer la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value

    // Leer la marca seleccionada del select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value

    // Leer la categoria seleccionada del radio buton
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    // Crear Instancia de interfaz
    const interfaz = new Interfaz();

    // Revisamos los campos
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
        // Si hay error
        interfaz.mostrarMensaje('Faltan datos, revisa el formulario y prueba de nuevo', 'error')
        //Si esta todo ok instanciar seguro y mostrar interfaz
    } else {

        // limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div')
        if(resultados != null){
            resultados.remove();
        }

        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo)
       // cotizar el seguro
       const cantidad = seguro.cotizarSeguro()
       // mostrar resultado
       interfaz.mostrarResultado(seguro, cantidad);
       interfaz.mostrarMensaje('Cargando...', 'correcto')
    }
    
})

const max = new Date().getFullYear(),
    min = max - 20;

    console.log(max)
    console.log(min)

    const selectAnio = document.getElementById('anio');


    for (let i = max; i > min; i--){
        let option = document.createElement('option')
        option.value = i 
        option.innerHTML = i
        selectAnio.appendChild(option)
    }