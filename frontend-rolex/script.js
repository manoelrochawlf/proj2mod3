const baseUrl = "http://localhost:3000/rolex";
const msgAlert = document.querySelector(".msg-alert");

async function getAllRolex() {
  const response = await fetch(`${baseUrl}/all-rolex`);

  const allrolex = await response.json();
  allrolex.forEach((rlx) => {
    document.getElementById("allrlx").insertAdjacentHTML(
      "beforeend",
      `
      <section class="cards" id="cards_'${rlx._id}'">

        <div class="card">
              <img src=${rlx.img} alt="">
              <div class="textimg">
                <p class="descricao">${rlx.name}</p>
                <p class="descricao">${rlx.description}</p>      
              </div>
              <section class="btn-container"> 
                    <button class="btn-edit" onclick="abrirModal('${rlx._id}')">
                      Editar
                     </button>
                    <button class="btn-delete" onclick="abrirModalDelete('${rlx._id}')">
                      Deletar
                    </button>
                </section>        
        </div>        
      
      </section>`
    );
  });
};

getAllRolex();

const getRlxId = async () => {

  const id = document.querySelector("#idRlx").value;
  console.log(id);

  if (id == "") {

    localStorage.setItem("message", "Digite um ID para pesquisar!");
    localStorage.setItem("type", "danger");
  
    showMessageAlert();
  
    return;
  }

  const response = await fetch(`${baseUrl}/one-rolex/${id}`);
  const rolexId = await response.json();
 
  if (rolexId.message != undefined) {
    localStorage.setItem("message", rolexId.message);
    localStorage.setItem("type", "danger");
    showMessageAlert();
    return;
  }


 
  const chosenWatch = document.getElementById("allrlx");

  chosenWatch.innerHTML = `<section class="cards" id="cards_'${rolexId._id}'>

  <div class="card">
              <img src=${rolexId.img} alt="">
              <div class="textimg">
                <p class="descricao">${rolexId.name}</p>
                <p class="descricao">${rolexId.description}</p>      
              </div>        

</section>`;

};

async function abrirModal(id = "") {

  if(id != "") {
    document.querySelector("#mudar-header").innerText = "Editar Relógio";
    document.querySelector("#btn-modal").innerText = "Editar";

    const response = await fetch(`${baseUrl}/one-rolex/${id}`);
    const rlx = await response.json();

    document.querySelector("#name").value = rlx.name;
    document.querySelector("#description").value = rlx.description;
    document.querySelector("#img").value = rlx.img;
    document.querySelector("#id").value = rlx._id;
  } else {
    document.querySelector("#mudar-header").innerText = "Cadastrar Relógio";
    document.querySelector("#btn-modal").innerText = "Cadastrar";
  }

document.querySelector(".modal-overlay").style.display = "flex";

}

function fecharModal() {
  document.querySelector(".modal-overlay").style.display = "none";
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = 0;
  document.querySelector("#description").value = "";
  document.querySelector("#specifications").value = "";
  document.querySelector("#img").value = "";
}

async function submitRolex() {

  const id = document.querySelector("#id").value;
  const name = document.querySelector("#name").value;
  const description = document.querySelector("#description").value;
  const img = document.querySelector("#img").value;

  const rolexValues = {
    id,
    name,
    description,
    img,
  };

  const editAtivado = id != "";

  const endpoint = baseUrl + (editAtivado ? `/update-rolex/${id}` : '/create-rolex');

  const response = await fetch(endpoint, {
    method: editAtivado ? "put" : "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(rolexValues),
  });

  const newRolex = await response.json();
  
  if (newRolex.message != undefined) {
    localStorage.setItem("message", newRolex.message);
    localStorage.setItem("type", "danger");
    showMessageAlert();
    return;
  }

  if (editAtivado) {
    localStorage.setItem("message", "Relógio atualizado com sucesso");
    localStorage.setItem("type", "success");
  } else {
    localStorage.setItem("message", "Relógio criado com sucesso");
    localStorage.setItem("type", "success");
  }

  document.location.reload(true);

fecharModal();

};

function abrirModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "flex";

  const btnSim = document.querySelector(".btn_delete_yes")

  btnSim.addEventListener("click", function() {
    deleteRolex(id);
  })
}

async function fecharModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "none";
}

const deleteRolex = async (id) => {
  const response = await fetch(`${baseUrl}/delete-rolex/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });


const result = await response.json();

localStorage.setItem("message", result.message);
localStorage.setItem("type", "success");

document.location.reload(true);

  fecharModalDelete();
};

function closeMessageAlert() {
  setTimeout(function () {
    msgAlert.innerText = "";
    msgAlert.classList.remove(localStorage.getItem("type"));
    localStorage.clear();
  }, 3000);
}

function showMessageAlert() {
  msgAlert.innerText = localStorage.getItem("message");
  msgAlert.classList.add(localStorage.getItem("type"));
  closeMessageAlert();
}

showMessageAlert();


