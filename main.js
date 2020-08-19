	
const catalog = document.querySelector('#catalog');
const basket = document.querySelector('#basket');
const basketList = document.querySelector('.basket-list');
const minPrice = document.querySelector('.min-price');
const countPrice = document.querySelector('.count-price');
const turn = document.querySelector('#turn');
const list = document.querySelector('#list');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#close');
const preview = document.querySelector('#preview');

var img = 0;
//Товары
const product = [
	{
		img:"1.jpg",
		name:"Товар 1",
		description:"Хороший товар",
		price:1000
	},
	{
		img:"1.jpg",
		name:"Товар 2",
		description:"Хороший товар",
		price:10
	},
	{
		img:"1.jpg",
		name:"Товар 3",
		description:"Хороший товар",
		price:50
	},
	{
		img:"1.jpg",
		name:"Товар 4",
		description:"Хороший товар",
		price:1212
	},
	{
		img:"1.jpg",
		name:"Товар 5",
		description:"Хороший товар",
		price:55
	}
];

//Массив корзины
let basketArr = [];
const defaultTextBasket = 'Корзина пуста'

//Свернуть корзину
basket.addEventListener('click',function(){
	basketList.classList.remove('hide');
});
//Развернуть корзину
turn.addEventListener('click',function(){
	basketList.classList.add('hide');
});

//+ 
next.addEventListener('click',function(){
	img = img >= (product.length - 1) ? 0 : img + 1;
	preview.src = product[img].img;
	console.log(img)
});
//-
prev.addEventListener('click',function(){
	img = img <= 0 ? (product.length - 1) : img - 1;
	preview.src = product[img].img;
	console.log(img)
});
//Закрыть модальное окно
closeModal.addEventListener('click',function(){
	modal.classList.remove('show');
});

countPrice.innerText = defaultTextBasket;
minPrice.innerText = defaultTextBasket;

//Добавить товар в корзину
function add(i){
	basketArr.push(product[i]);
	countPrice.innerText = countBasketPrice();
	getList();
}
//Удалить товар из корзины
function remove(i){
	basketArr.splice(i,1);
	countPrice.innerText = countBasketPrice();
	getList();
}

//Подсчёт товара в корзине
function countBasketPrice() {
	let price = 0;
	let item = 0;
    while (item < basketArr.length) {
        if (basketArr[item].price) {
            price = price + (basketArr[item].price * 1);
        }
        item++;
	}
	minPrice.innerHTML = price > 0 ? price + " &#8381;" : defaultTextBasket;
    return price > 0 ? 'В корзине: ' + basketArr.length + ' товаров на сумму ' + price + ' рублей' : defaultTextBasket;
}

//Список товаров в корзине
function getList(){
	list.innerHTML = '';
	let i = 0;
	while(i < basketArr.length){
		list.insertAdjacentHTML('beforeEnd',
		`<div>
		
			<span>Имя товара: ${basketArr[i].name} </span>
			<span>Цена: ${basketArr[i].price}  &#8381;</span>
			<button onclick="remove(${i})">Удалить</button>
		</div>`);
		i++;
	}
}
//Большая фотка
function zoom(i){
	img = i;
	preview.src = product[img].img;
	modal.classList.add('show');
}

let i = 0;
while(i < product.length){
	catalog.insertAdjacentHTML('beforeEnd', 
						`<div class="product">
							<img src="${product[i].img}" alt="" onclick="zoom(${i})"/>
							<div class="name-product">
								<h4>Имя товара:</h4> 
								<span>${product[i].name}</span>
							</div>
							
							<div class="description">
								<h4>Описание товара: </h4>
								<span>${product[i].description}</span>
							</div>
							<div class="price">
								<h4>Цена:</h4>
								<span>${product[i].price}</span>
								<span> &#8381;</span>
							</div>
							<button class="add" onclick="add(${i})">Купить</button>
							
						</div>`
	);
	i++;
}

