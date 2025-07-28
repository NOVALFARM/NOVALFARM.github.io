const form = document.getElementById("asistenciaForm");
const mensaje = document.getElementById("mensaje");
const distribuidorSelect = document.getElementById("distribuidor");

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz2rNB7ydP9yiHqtXZ9Vf1hqDWuqnATiL9zfrjEn7_8DRFYHKl3kzers83y6siZLtbENA/exec';

async function cargarProveedores() {
    try {
        const response = await fetch(SCRIPT_URL + '?action=obtenerProveedores');
        const data = await response.json();

        if (data.success) {
            distribuidorSelect.innerHTML = '';
            data.proveedoresDisponibles.forEach(prov => {
                const option = document.createElement("option");
                option.value = prov;
                option.textContent = prov;
                distribuidorSelect.appendChild(option);
            });
        } else {
            distribuidorSelect.innerHTML = '<option disabled>No hay cupos disponibles</option>';
        }
    } catch (error) {
        mensaje.textContent = "Error al cargar distribuidores.";
    }
}

cargarProveedores();

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    formData.append("action", "registrarAsistencia");

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();

        if (result.success) {
            mensaje.textContent = "¡Registro exitoso! Cupo confirmado.";
            form.reset();
            await cargarProveedores();
        } else {
            mensaje.textContent = result.mensaje;
        }
    } catch (err) {
        mensaje.textContent = "Error al enviar el formulario.";
    }
});