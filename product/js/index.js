const information = [
  {
    name: "Bebidas gaseosas",
    banner: {
      title: [
        { type: "h1", content: "Bebidas gaseosas" },
        { type: "h2", content: "Para refrescar tus momentos más felices," },
        { type: "h3", content: "muchas opciones para diferentes gustos" }
      ],
      color: "white",
      image: "/product/images/sbanner1.jpg"
    },
    products: [
      { image: "/product/images/p1.png", name: "Coca-Cola Original" },
      { image: "/product/images/p2.png", name: "Coca-Cola Sin Azúcar" },
      { image: "/product/images/p3.png", name: "Coca-Cola con Café" },
      { image: "/product/images/p4.png", name: "Fanta" },
      { image: "/product/images/p5.png", name: "Sprite" }
    ]
  },
  {
    name: "Bebidas de agua",
    banner: {
      title: [
        { type: "h1", content: "Bebidas de agua" },
        { type: "h3", content: "Hidrátate saludable, dos opciones perfectas para ti" }
      ],
      color: "black",
      image: "/product/images/sbanner2.png"
    },
    products: [
      { image: "/product/images/p6.png", name: "Dasani" }
    ]
  },
  {
    name: "Bebidas de jugo",
    banner: {
      title: [
        { type: "h1", content: "Bebidas de jugo" },
        { type: "h3", content: "Lo mejor de la fruta, directo a tu mesa" }
      ],
      color: "black",
      image: "/product/images/sbanner3.png"
    },
    products: [
      { image: "/product/images/p7.png", name: "Del Valle" }
    ]
  },
  {
    name: "Bebidas deportivas",
    banner: {
      title: [
        { type: "h1", content: "Bebidas deportivas" },
        { type: "h2", content: "Para refrescar tus momentos más felices," },
        { type: "h3", content: "muchas opciones para diferentes gustos" }
      ],
      color: "white",
      image: "/product/images/sbanner4.jpg"
    },
    products: [
      { image: "/product/images/p8.png", name: "Powerade" }
    ]
  },
  {
    name: "Té",
    banner: {
      title: [
        { type: "h1", content: "Té" },
        { type: "h3", content: "Con gran sabor a frutas y la frescura de las hierbas" }
      ],
      color: "white",
      image: "/product/images/sbanner5.jpg"
    },
    products: [
      { image: "/product/images/p9.png", name: "Fuze Tea" }
    ]
  }
];

const SUBCONTAINER_ID = "list-root-container";
const CONTAINER_ID = "list-root";
const ATTR_IDENTIFIER = "data-selection";
const MAX_PRODUCTOS_SHOW_INITIAL = 4;

/** @type {HTMLElement | null} */
let selection = null;

const getNumber = (data) => {
  const pre = parseInt(data);
  return isNaN(pre) ? null : pre;
}

/**
 * 
 * @param {{ title: Array<{ type: string, content: string }>, color: string, image: string }} banner 
 * @returns {string}
 */

const createSubbanner = (banner) => `
  <div class="subbanner--product" style="background-image: url(${banner.image});">
    <div style="color: ${banner.color}">
      ${banner.title.map(title => `<${title.type}>${title.content}</${title.type}>`).join("\n\t\t")}
    </div>
  </div>
`;

/**
 * 
 * @param {Array<{ image: string, name: string }>} products
 * @returns {string}
 */

const createListProducts = (products) => `
  <div class="list--product">
    ${products.map(product => `
      <div class="item--list-product">
        <img src="${product.image}" />
        <span>${product.name}</span>
      </div>
    `).join("\n")}
  </div>
`;

/**
 * 
 * @param {boolean} state 
 * @returns {string}
 */

const createMoreContent = (state) => (
  `<span>${state ? "Mostrar menos" : "Mostrar más"}</span> <i></i>`
)

/**
 * 
 * @param {Array<{ image: string, name: string }>} products 
 * @returns {HTMLElement}
 */

const createListContainerProducts = (products) => {
  const container = document.createElement("div");
  const limitedProducts = products.slice(0, MAX_PRODUCTOS_SHOW_INITIAL);
  container.classList.add("list-container--product");
  container.innerHTML = createListProducts(limitedProducts);

  if(products.length > MAX_PRODUCTOS_SHOW_INITIAL) {
    const more = document.createElement("a");
    more.setAttribute("href", "#");
    more.innerHTML = createMoreContent(false);
    more.addEventListener("click", (e) => {
      e.preventDefault();
      const state = more.classList.contains("less"); // true = expandido, flase = contraido
      state ? more.classList.remove("less") : more.classList.add("less");
      state ? (
        container.innerHTML = createListProducts(limitedProducts)
      ) : (
        container.innerHTML = createListProducts(products)
      );
      more.innerHTML = createMoreContent(!state);
      container.appendChild(more);
    });

    container.appendChild(more);
  }

  return container;
}

function changeSelection() {
  const index = getNumber(this.getAttribute(ATTR_IDENTIFIER));
  const container = document.querySelector(`#${SUBCONTAINER_ID}`);

  if(
    !container ||
    index === null || index < 0 || index >= information.length ||
    selection === this
  ) {
    return ;
  }

  selection?.classList.remove("active");
  this.classList.add("active");
  const self = information[index];

  container.innerHTML = createSubbanner(self.banner);
  container.appendChild(createListContainerProducts(self.products));

  selection = this;
}

function createMenu() {
  const list = document.createElement("ul");
  list.classList.add("separator");
  
  information.forEach((item, index) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = item.name;

    li.setAttribute(ATTR_IDENTIFIER, index.toString());
    li.addEventListener("click", changeSelection);

    li.appendChild(p);
    list.appendChild(li);
  });

  return list;
}

function createSubcontainer() {
  const container = document.createElement("div");
  container.id = SUBCONTAINER_ID;
  return container;
}

function createProducts() {
  const container = document.querySelector(`#${CONTAINER_ID}`);

  if(!container) return ;

  const menu = createMenu();
  const subcontainer = createSubcontainer();

  container.append(menu, subcontainer);

  // Inicializar

  document.querySelector(`li[${ATTR_IDENTIFIER}="0"]`)?.click();
}

document.addEventListener("DOMContentLoaded", createProducts);