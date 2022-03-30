//ejecucion del boton para la barra de navegacion

const btnNav = document.querySelector(".fa-bars")
btnNav.addEventListener("click", ()=> {
    const navItems = document.querySelector(".container_items")
    navItems.classList.toggle("show") 
}) 

//evento para el nav-scroll

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 100){
        let nav = document.querySelector(".container_items")
        nav.classList.add("show_nav_desktop")
    }else if(window.scrollY == 0) {
        let nav = document.querySelector(".container_items")
        nav.classList.remove("show_nav_desktop")
    }
})

//evento para mostrar los productos

const cards = document.querySelectorAll(".container_card")
window.addEventListener("scroll", ()=> {
    if (window.scrollY > 350) {
        cards.forEach(card => {
            card.style.transform = "translateX(0)"
        })
    }
})

//evento para el banner slider

const banner = document.querySelector(".banner_img")
const btnBanner = document.getElementsByName("slider_btn")
btnBanner.forEach((btn, i) => {
    btn.addEventListener("click", ()=>{
       if(i == 0) {
        banner.setAttribute('style', 'transform: translateX(0%);');
       }else if (i == 1) {
        banner.setAttribute('style', 'transform: translateX(-25%);');
       }else if (i == 2 ) {
        banner.setAttribute('style', 'transform: translateX(-50%);');
       }else if (i == 3) {
        banner.setAttribute('style', 'transform: translateX(-75%);');
       }
       
    })
})

//evento para mover el banner






//evento para boton comprar y vaciar carrito

const btnComprar = document.getElementById("comprar")
const carrito = document.querySelector(".carrito_container")
btnComprar.addEventListener("click", ()=> {
    const div = document.createElement("div")
    div.classList.add("show_carrito")
    div.innerHTML = `
    <h4>GRACIAS POR SU COMPRA<i class="fa-solid fa-cart-circle-check"></i></h4>
    `
    const section = document.querySelector(".section_carrito")
    section.appendChild(div)
    setTimeout(noShow, 2000)
    carrito.innerHTML = ""
    let totalCarrito = document.querySelector(".total")
    totalCarrito.innerHTML = `Total: $0`
})

//evento para agregar al carrito

const btnCards = document.querySelectorAll(".btn_card")
btnCards.forEach(btnCard => {
    btnCard.addEventListener("click", e => {
        const cardText = e.target.parentElement.previousElementSibling
        const precio = cardText.firstElementChild.nextElementSibling.textContent 
        const img = cardText.parentElement.parentElement.firstElementChild.src
        agregarCarrito(precio,img)
        showCarrito()
        
    })
})

function showCarrito() {
    const div = document.createElement("div")
    div.classList.add("show_carrito")
    div.innerHTML = `
    <h4>Se agrego al carrito<i class="fa-solid fa-circle-check"></i></h4>
    `
    const section = document.querySelector(".section_carrito")
    section.appendChild(div)
    setTimeout(noShow, 2000)
}   

function noShow() {
    let div = document.querySelector(".show_carrito")
    div.remove()  
}





function agregarCarrito(precio,img) {
    const row = document.querySelectorAll(".row")
    
    for (let i = 0; i < row.length; i++) {
        if(row[i].firstElementChild.src === img) {
            let rowCantidad = row[i].querySelector(".cantidad")
            rowCantidad.value++
            actualizarTotal()
            return
        }
    }
    const div = document.createElement("div")
    const carrito = document.querySelector(".carrito_container")
    div.classList.add("row")
    div.innerHTML = `
    <img src=${img} alt="">
    <div class="row_content">
        <h4 class="precio">${precio}</h4>
        <div class="cantidad_delete">
            <input class="cantidad" type="number" value="1">
            <button class="btn_eliminar">X</button>
        </div>
    </div>
    `
   
    carrito.appendChild(div)
    const btns = div.querySelector(".btn_eliminar")
    btns.addEventListener("click", removerProducto)

    const cantidades = document.querySelectorAll(".cantidad")
    cantidades.forEach(unidad => {
        unidad.addEventListener("change", ()=> {
            if(unidad.value < 0) {
                unidad.value = 0
            }actualizarTotal()
        })
    })
    actualizarTotal()
}


function actualizarTotal() {
  let total = 0
  let totalCarrito = document.querySelector(".total")
  const row = document.querySelectorAll(".row")
  row.forEach(card => {
      const precio = Number(card.querySelector(".precio").textContent.slice(1)) 
      const cantidad = Number(card.querySelector(".cantidad").value)
      total = total + precio * cantidad
      totalCarrito.innerHTML = `Total: $${total}`
  })
}

function removerProducto(e) {
    e.target.closest(".row").remove()
    actualizarTotal()    
    const div = document.createElement("div")
    div.classList.add("show_carrito")
    div.innerHTML = `
    <h4>Se elimino del carrito<i class="fa-solid fa-circle-minus"  style="color: #E40011;"></i></h4>
    `
    const section = document.querySelector(".section_carrito")
    section.appendChild(div)
    setTimeout(noShow, 2000)
    newTotal()
}

function newTotal() {
    const carrito = document.querySelector(".carrito_container")
    if(!carrito.firstElementChild) {
        let totalCarrito = document.querySelector(".total")
        totalCarrito.innerHTML = `Total: $0`
    }
}


