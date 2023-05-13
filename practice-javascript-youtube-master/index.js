let fruits = [
  {
    id: 1,
    title: "Orange",
    price: 20,
    img: "https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    title: "Lime",
    price: 30,
    img: "https://images.pexels.com/photos/2363347/pexels-photo-2363347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    title: "Blueberry",
    price: 40,
    img: "https://images.pexels.com/photos/1395958/pexels-photo-1395958.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const toHTML = (fruit) => `
          <div class="col">
              <div class="card">
                <img
                  src="${fruit.img}"
                  class="card-img-top"
                  alt="${fruit.title}"
                />
                <div class="card-body">
                  <h5 class="card-title">${fruit.title}</h5>
                  <a href="#" class="btn btn-primary" data-btn='price' data-id ='${fruit.id}'>Give a price</a>
                  <a href="#" class="btn btn-danger" data-btn= 'remove' data-id ='${fruit.id}'>Delete</a>
                </div>
              </div>
            </div>
          </div>
`;
/*
 * 1. Динамически на основе массива вывести список карточек +
 * 2. Показать цену в модалке (и это должна быть 1 модалка) +
 * 3. Модалка для удаления с 2мя кнопками +
 * ---------
 * 4. На основе $.modal нужно сделать другой плагин $.confirm (Promise) +
 * */

function render() {
  const html = fruits.map((fruit) => toHTML(fruit)).join("");
  document.querySelector("#fruits").innerHTML = html;
}
render();

const priceModal = $.modal({
  title: "Product price",
  closable: true,
  width: "400px",
  footerButtons: [
    {
      text: "Close",
      type: "primary",
      handler() {
        priceModal.close();
      },
    },
  ],
});

document.addEventListener("click", (event) => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const fruit = fruits.find((f) => f.id === id);

  if (btnType === "price") {
    priceModal.setContent(`
    <p>The price of ${fruit.title} is: <strong>${fruit.price} $</strong></p>
    `);
    priceModal.open();
  } else if (btnType === "remove") {
    $.confirm({
      title: "Are you sure?",
      content: `<p>You are deleting: <strong>${fruit.title} </strong></p>`,
    })
      .then(() => {
        fruits = fruits.filter((f) => f.id !== id);
        render();
      })
      .catch(() => {
        console.log("Cansel");
      });
  }
});
