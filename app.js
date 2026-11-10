// Lee la URL de la API desde las variables de entorno de Vite
const API_URL = import.meta.env.VITE_API_URL;

// Función para obtener y mostrar los productos (Lectura - GET)
window.obtenerProductos = async function() {
    try {
        const respuesta = await fetch(`${API_URL}/api/productos`);
        const datos = await respuesta.json();
        
        const lista = document.getElementById('listaProductos');
        lista.innerHTML = ''; // Limpiamos la lista anterior

        datos.forEach(prod => {
            const li = document.createElement('li');
            li.textContent = `${prod.nombre} - Precio: $${prod.precio} - Stock: ${prod.stock}`;
            lista.appendChild(li);
        });
    } catch (error) {
        console.error("Error en la conexión con la API:", error);
        alert("No se pudo conectar con el servidor backend.");
    }
}

// Función para registrar un producto nuevo (Escritura - POST)
const formulario = document.getElementById('productForm');
if (formulario) {
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const stock = parseInt(document.getElementById('stock').value);

        try {
            const respuesta = await fetch(`${API_URL}/api/productos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, precio, stock })
            });

            const resultado = await respuesta.json();

            if (respuesta.status === 201) {
                alert("¡Producto agregado correctamente!");
                formulario.reset();
                obtenerProductos(); // Recarga la lista
            } else {
                alert("Error: " + (resultado.mensaje || "No se pudo registrar"));
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error de red o conexión no disponible con el backend.");
        }
    });
}

// Cargar la lista automáticamente al abrir la página
obtenerProductos();