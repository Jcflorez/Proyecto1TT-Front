import { api } from './utils.js'

import './funcionesProduct.js'

// abrir el modal
export const modal = new bootstrap.Modal("#newProduct", {
  keyboard: false,
});


document.addEventListener("DOMContentLoaded", function () {
  cargarDatosProduct(); // llamado a la funcion cargarDatosCliente

  const form = document.querySelector("form");

  const { idPro, nombre, categoria, precio, pathImg, editar } = form.elements; // Destructuring: recupera los elementos del formulario

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const data = {
      CodigoRef: idPro.value,
      NombreRef: nombre.value,
      CategoriaRef: categoria.value,
      PrecioRef: precio.value,
      PathImgRef: pathImg.value,
    };

    // enviar los datos
    api({
      method: editar.value ? "PUT" : "POST",
      url: editar.value ? `/producto/${editar.value}` : "/producto",
      data,
    })
      .then(({ data }) => {
        Swal.fire("Exito!", data.message, "success")
        cargarDatosProduct()
        form.reset()
        modal.hide()
      })
      .catch((err) =>
        Swal.fire("!ERROR!: ", err?.response?.data?.message, "error"));
  });
});


export function cargarDatosProduct(pagina = 1) {
  // Traemos el Id del Index
  const card = document.querySelector("article");
  card.innerHTML = "";
  // peticion a localhost:3000/productos del server de node
  api.get(`/productos?page=${pagina}&perPage=9`).then(({ data }) => {

    for (const productos of data) {

      card.innerHTML += `
                <div class="card">
                    <img src="${productos.PathImgRef}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${productos.CategoriaRef}</h5>
                        <p class="card-text">${productos.NombreRef}
                        </p>
                        <p class="card-text">${productos.PrecioRef}
                        </p>

                        <div class="d-grid gap-2 d-md-block">
                            <button class="btn btn-primary" onclick="editarProducto(${productos.idRef})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger" onclick="eliminarProducto(${productos.idRef})">
                              <i class="fas fa-trash"></i>
                            </button>
                        </div>                        
                      </div>
                  </div>`;
    }
  });
}