import {cargarDatosProduct, modal} from "./script.js";

//const cardContainer = document.querySelector("article");

// paginacion
let pagina = 1;
const contador = document.querySelector("#paginacion h2");
const form = document.querySelector("form");


window.editarProducto = function (idPro) {
    fetch("http://localhost:3000/producto/" + idPro)
      .then((response) => response.json())
      .then((data) => {
        const { editar, idPro, nombre, categoria, precio, pathImg } =
          form.elements;
  
        // asignar los valores a los campos del formulario
        editar.value = data.idRef;
        idPro.value = data.CodigoRef;
        nombre.value = data.NombreRef;
        categoria.value = data.CategoriaRef;
        precio.value = data.PrecioRef;
        pathImg.value = data.PathImgRef;
        
        modal.show()
      });
  };


  window.eliminarProducto = function (idRef) {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
      cancelButtonText: "Cancelar"
    }).then(function (result) {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/producto/${idRef}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire("Eliminado!", data.message, "success");
            cargarDatosProduct();
          });
      }
    });
  };
  

  window.limpiarFormulario = function () {
    form.reset();
  };
  
