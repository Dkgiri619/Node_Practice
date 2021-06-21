let ticketFilterEvent = document.querySelectorAll(".filter");
let ticketContainerDiv = document.querySelector(".ticket-container");
let openModalFlag = false;
for(let i=0;i<ticketFilterEvent.length;i++){
    ticketFilterEvent[i].addEventListener("click", function(e){filterEvent(e);})
}
function filterEvent(e){
    console.log(e.target.classList[1]);
}

let openModal = document.querySelector(".openmodal");
openModal.addEventListener("click", function(e){
    openModalFunction(e);
});

let closeModal = document.querySelector(".close-modal");
closeModal.addEventListener("click", function(e){closeModalFunction(e);});

function openModalFunction(e){
    if(!openModalFlag){
        let modalTicketDiv = document.createElement("div");
    modalTicketDiv.classList.add("ticket-modal");
    modalTicketDiv.innerHTML = `<div class="ticket-text" contentEditable=true>Enter Your Text!
</div>
<div class="modal-filter">
    <div class="m-filter red"></div>
    <div class="m-filter blue"></div>
    <div class="m-filter yellow"></div>
    <div class="m-filter black"></div>
</div>`;
    document.querySelector("body").append(modalTicketDiv);
    openModalFlag = true;
    let editText = document.querySelector(".ticket-text");
    let selectedText = false;
    editText.addEventListener("click", function(e){
        if(!selectedText){
            e.target.innerText = "";
            selectedText = true;
        }
    })
    }
}

function closeModalFunction(e){
    if(openModalFlag){
        document.querySelector(".ticket-modal").remove();
        openModalFlag = false;
    }
}