let addImage = document.getElementById("addImage");
let addSku = document.getElementById("addSku");
let addBrand = document.getElementById("addBrand");
let addName = document.getElementById("addName");
let addPrice = document.getElementById("addPrice");
let addDescription = document.getElementById("addDescription");
let addFileInput = document.getElementById("add-file-input");
let editImage = document.getElementById("editImage");
let editSku = document.getElementById("editSku");
let editBrand = document.getElementById("editBrand");
let editName = document.getElementById("editName");
let editPrice = document.getElementById("editPrice");
let editDescription = document.getElementById("editDescription");
let editFileInput = document.getElementById("edit-file-input");
let idToEdit = document.getElementById("idToEdit");
let deleteImage = document.getElementById("deleteImage");
let deleteSku = document.getElementById("deleteSku");
let deleteBrand = document.getElementById("deleteBrand");
let deleteName = document.getElementById("deleteName");
let deletePrice = document.getElementById("deletePrice");
let deleteDescription = document.getElementById("deleteDescription");
let idToRemove = document.getElementById("idToRemove");
const modal = document.querySelector("#modal");
const openAddModal = document.querySelector("#open-btn");
const closeModals = document.querySelectorAll(".cancel");
const editModal = document.querySelector("#editModal");
const openEditModal = document.querySelectorAll(".openEditBtn");
const deleteModal = document.querySelector("#deleteModal");
const openDeleteModal = document.querySelectorAll(".openDeleteBtn");

openAddModal.addEventListener("click", () => {
  modal.showModal();
});

openEditModal.forEach((btns) => {
  btns.addEventListener("click", () => {
    editModal.showModal();
  });
});

openDeleteModal.forEach((btns) => {
  btns.addEventListener("click", () => {
    deleteModal.showModal();
  });
});

// Close any type of modal
function closeAnyModals(event) {
  console.log(
    event.target.parentElement.parentElement.parentElement.parentElement
      .parentElement
  );
  event.target.parentElement.parentElement.parentElement.parentElement.parentElement.close();
}

closeModals.forEach((closeBtns) => {
  closeBtns.addEventListener("click", closeAnyModals);
});

// Form-validation-error-message
const errorMessage = document.querySelector(".errorMessage");
const modalForm = document.getElementById("modalForm");

modalForm.addEventListener("submit", (e) => {
  try {
    if (
      addImage.src === "" ||
      addImage.src == null ||
      addSku.value === "" ||
      addSku.value == null ||
      addPrice.value === "" ||
      addPrice.value == null ||
      addBrand.value === "" ||
      addBrand.value == null ||
      addName.value === "" ||
      addName.value == null ||
      addDescription.value === "" ||
      addDescription.value == null
    ) {
      e.preventDefault();
      errorMessage.innerText = "Please fill out all required fields.";
    }
  } catch (error) {
    res.render("items.pug", { error: error.message });
  }
});

addFileInput.addEventListener("change", updateAddImage);
editFileInput.addEventListener("change", updateEditImage);

function updateAddImage(event) {
  addImage.src = URL.createObjectURL(event.target.files[0]);
}

function updateEditImage(event) {
  editImage.src = URL.createObjectURL(event.target.files[0]);
}

function editItem(item) {
  editImage.src = item.image_url;
  editSku.value = item.sku;
  editBrand.value = item.brand;
  editName.value = item.name;
  editPrice.value = item.sale_price;
  editDescription.value = item.description;
  idToEdit.value = item._id;
}

function deleteItem(item) {
  deleteImage.src = item.image_url;
  deleteBrand.value = item.brand;
  deleteName.value = item.name;
  idToRemove.value = item._id;
}
