const baseUrl = "http://localhost:3000/rolex";

async function getAllRolex() {
  const response = await fetch(`${baseUrl}/all-rolex`);

  const allrolex = await response.json();
  allrolex.forEach((rlx) => {
    document.getElementById("allrlx").insertAdjacentHTML(
      "beforeend",
      `
      <section class="cards" id="cards_${rlx.id}">

        <div class="card">
              <img src=${rlx.img} alt="">
              <div class="textimg">
                <p class="descricao">${rlx.name}</p>
                <p class="descricao">${rlx.description}</p>      
              </div>
              <section class="btn-container"> 
                    <button class="btn-edit" onclick="abrirModal(${rlx.id})">
                      Editar
                     </button>
                    <button class="btn-delete" onclick="abrirModalDelete(${rlx.id})">
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

  const id = document.getElementById("idRlx").value;

  const response = await fetch(`${baseUrl}/rlx/${id}`);
  const rolexId = await response.json();


  const chosenWatch = document.getElementById("allrlx");

  chosenWatch.innerHTML = `<section class="cards" id="cards_${rolexId.id}>

  <div class="card">
              <img src=${rolexId.img} alt="">
              <div class="textimg">
                <p class="descricao">${rolexId.name}</p>
                <p class="descricao">${rolexId.description}</p>      
              </div>        

</section>`;

};

async function abrirModal(id = null) {

  if(id != null) {
    document.querySelector("#mudar-header").innerText = "Editar Relógio";
    document.querySelector("#btn-modal").innerText = "Editar";

    const response = await fetch(`${baseUrl}/rlx/${id}`);
    const rlx = await response.json();

    document.querySelector("#name").value = rlx.name;
    document.querySelector("#description").value = rlx.description;
    document.querySelector("#img").value = rlx.img;
    document.querySelector("#id").value = rlx.id;
  } else {
    document.querySelector("#mudar-header").innerText = "Cadastrar Relógio";
    document.querySelector("#btn-modal").innerText = "Cadastrar";
  }

document.querySelector(".modal-overlay").style.display = "flex";

}

function fecharModalCadastro() {
  document.querySelector(".modal-overlay").style.display = "none";
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = 0;
  document.querySelector("#description").value = "";
  document.querySelector("#specifications").value = "";
  document.querySelector("#img").value = "";
}

async function createRolex() {
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

  const editAtivado = id > 0;

  const endpoint = baseUrl + (editAtivado ? `/update/${id}` : '/create');

  const response = await fetch(endpoint, {
    method: editAtivado ? "put" : "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(rolexValues),
  });

  const newRolex = await response.json();


  const html =  
  `
  <section class="cards" id="cards_${newRolex.id}">

    <div class="card">
          <img src=${newRolex.img} alt="">
          <div class="textimg">
            <p class="descricao">${newRolex.name}</p>
            <p class="descricao">${newRolex.description}</p>      
          </div>
          <section class="btn-container"> 
                <button class="btn-edit" onclick="abrirModal(${newRolex.id})">
                  Editar
                 </button>
                 <button class="btn-delete" onclick="abrirModalDelete(${newRolex.id})">
                  Deletar
                </button>
            </section>        
    </div>        
  
  </section>`;


if (editAtivado) {
  document.getElementById(`cards_${id}`).outerHTML = html;
} else {
  document.getElementById("allrlx").insertAdjacentHTML("beforeend", html);
}

fecharModalCadastro();


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
  const response = await fetch(`${baseUrl}/delete/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });


const result = await response.json();
  alert(result.message)
  fecharModalDelete();
  
  document.getElementById("allrlx").innerHTML = "";

  getAllRolex();
 
  
};


