"use strict"
let wideScreen
let logo = 'BLOG&#129430;'
let buttonsHeaderUser = ['&#9889;Новое','&#128218;Каталоги','&#128125;О себе','&#128262;']
let textAbout = `<p>Привет!</p>`
let monthS = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря']

function renderHeaderPage(buttonsHeader, binH) { // Чистит и рендерит хедер.
	let blockHeader = document.querySelector('header')
	blockHeader.innerHTML = ''
	let logoHeader = document.createElement('div')
	logoHeader.className = 'logo'
	logoHeader.innerHTML = logo
	blockHeader.append(logoHeader)
	let burger = document.createElement('div')
	burger.className = 'burger'
	burger.classList.add('button')
	burger.innerHTML = '🍔Меню'
	burger.setAttribute('onclick','clickBurgerAction(this)')
	blockHeader.append(burger)
	let blockButtons = document.createElement('div')
	blockButtons.className = 'block-buttons'
	blockHeader.append(blockButtons)
	buttonsHeader.forEach((item, index) => {
		let button = document.createElement('div')
		button.className = 'button'
		button.setAttribute('onclick','clickHeaderButtonAction'+binH+'(this)')
		button.innerHTML = item
		if (index == 0) button.classList.add('active')
		blockButtons.append(button)
	})
}
function clickHeaderButtonActionUser(data) { //Запускает функцию анимации нажатия, затем добавляет класс "Актив" по индексу и выполняет рендер
	clickButtonAnimate(data)
	let headerButtons = document.querySelectorAll('header > .block-buttons > .button')
	headerButtons.forEach(value => {
		if (data == headerButtons[0] || data == headerButtons[1] || data == headerButtons[2]) {
			value.classList.remove('active')
		}
	})
	headerButtons.forEach((value, index) => {
		if (value == data) {
			switch (index) {
				case 0:
					setTimeout( () => data.classList.add('active'), 300 )
					loadUserArticleS(0)
					break
				case 1:
					setTimeout( () => data.classList.add('active'), 300 )
					loadUserCatalogS()
					break
				case 2:
					cleanContent()
					setTimeout( () => data.classList.add('active'), 300 )
					renderContentAbout(textAbout)
					break
				case 3:
					toggleTheme(data)
					break
				default:
					setTimeout( () => headerButtons[1].classList.add('active'), 300 )
					loadUserCatalogS()
					break
			}
		}
	})
}
function clickBurgerAction(data) {
	let blockButtons = document.querySelector('.block-buttons')
	blockButtons.classList.toggle('burger-open')
	data.classList.toggle('press')
}
function clickButtonAnimate(data) { // Добавляет класс анимации нажатия на кнопку.
	data.classList.add('press')
	setTimeout( () => data.classList.remove('press'), 300 )
}
function loadUserCatalogS() { //Загружает все открытые каталоги и запускает рендер контента каталогов
	cleanContent()
	$.ajax({
		type: 'POST',
		url: 'php/loadcatalogs.php',
		success: data => setTimeout( () => renderContentBlock(data, 'cat', 'User'), 300 ) 
	})
}
function loadUserArticleS(idCatalog) { //Загружает статьи выбранного каталога, если ид=0 то все статьи.
	cleanContent()
	$.ajax({
		type: 'POST',
		url: 'php/loadarticles.php',
		data: { idcat: idCatalog },
		success: data => {
			if (idCatalog == 0){
				setTimeout( () => renderContentBlock(data, 'art', 'User', idCatalog), 300 )
			}else{
				setTimeout( () => {
					renderHeaderArticleS(data, 'User')
					renderContentBlock(data, 'art', 'User', idCatalog)
					renderHeaderArticleS(data, 'User')
				}, 300 )		
			}
			let state = { 'art': 0, 'cat': idCatalog }
			let title = ''
			let url = '?cat=' + idCatalog + '&art=' + 0
			history.pushState(state,title,url)
		}
	})
}
function loadUserArticle(idArticle, idCatalog) { //Загружает одну статью, ид каталога необходим для того что бы определять куда осуществляется выход.
	cleanContent()
	$.ajax({
		type: 'POST',
		url: 'php/loadarticle.php',
		data: { idart: idArticle },
		success: function(data) {
			setTimeout( () => {
				renderHeaderArticle(data, idCatalog, 'User')
				renderContentArticle(data)
				renderHeaderArticle(data, idCatalog, 'User')
			}, 300 )
			let state = { 'art': idArticle, 'cat': idCatalog }
			let title = ''
			let url = '?cat=' + idCatalog + '&art=' + idArticle
			history.pushState(state,title,url)
		}
	})
}
function renderContentBlock(data, type, bin, idCatalog) { // Рендерит карточки с статьями открытого каталога.
	let blockContent = document.querySelector('content')
	let gridContent = document.createElement('div')
	gridContent.className = 'grid-content'
	blockContent.append(gridContent)
	data.forEach(function(value, index, array) {
		let card = (type == 'art') ? renderCardArticle(value, idCatalog, bin) : renderCardCatalog(value, bin)
		gridContent.append(card)
	})
}
function renderHeaderArticleS(dataHeader, bin) { // Рендерит хедер открытого католога.
	let blockContent = document.querySelector('content')
	let coverCatalog = document.createElement('div')
	coverCatalog.className = 'header-cover'
	coverCatalog.style.backgroundImage = 'url('+ dataHeader[0].coverc +')'
	coverCatalog.style.backgroundSize = 'cover'
	blockContent.append(coverCatalog)
	let navigationCatalog = document.createElement('div')
	navigationCatalog.className = 'navigation-catalog'
	coverCatalog.append(navigationCatalog)
	let exitBtn = document.createElement('div')
	exitBtn.className = 'exit-header'
	exitBtn.setAttribute('onclick','load'+bin+'CatalogS()')
	exitBtn.innerHTML = 'Выйти из каталога'
	navigationCatalog.append(exitBtn)
	let headerCatalog = document.createElement('div')
	headerCatalog.className = 'header-name'
	headerCatalog.innerHTML = 'Каталог: ' + dataHeader[0].headerc
	coverCatalog.append(headerCatalog)
}
function renderHeaderArticle(dataHeader, idCatalog, bin) { // Рендерит хедер открытой статьи.
	let blockContent = document.querySelector('content')

	let coverArticle = document.createElement('div')
	coverArticle.className = 'header-cover'
	coverArticle.style.backgroundImage = 'url('+ dataHeader.covera +')'
	coverArticle.style.backgroundSize = 'cover'
	blockContent.append(coverArticle)

	let navigationArticle = document.createElement('div')
	navigationArticle.className = 'navigation-article'
	coverArticle.append(navigationArticle)

	let exitBtn = document.createElement('div')
	exitBtn.className = 'exit-header'
	if (idCatalog == 0) {
		exitBtn.setAttribute('onclick','load'+bin+'ArticleS(0)')
	}else{
		exitBtn.setAttribute('onclick','load'+bin+'ArticleS('+idCatalog+')')
	}
	exitBtn.innerHTML = 'Закрыть статью'
	navigationArticle.append(exitBtn)

	let dateArticle = document.createElement('div')
	dateArticle.className = 'date-article'
	coverArticle.append(dateArticle)

	let dateSpan = document.createElement('span')
	let date = new Date( Date.parse(dataHeader.datea) )
	let dateDay = date.getDate()
	let dateMonth = date.getMonth()
	let dateYear = date.getFullYear()
	dateSpan.innerHTML = dateDay + ' ' + monthS[dateMonth] + ' ' + dateYear
	dateArticle.append(dateSpan)
	let catalogArticle = document.createElement('div')
	catalogArticle.className = 'catalog-article'
	coverArticle.append(catalogArticle)

	let catalogSpan = document.createElement('span')
	catalogSpan.innerHTML = 'Каталог: ' + dataHeader.headerc
	catalogSpan.setAttribute('onclick','loadArticleS('+dataHeader.idc+')')
	catalogArticle.append(catalogSpan)

	let headerArticle = document.createElement('div')
	headerArticle.className = 'header-name'
	headerArticle.innerHTML = dataHeader.headera
	coverArticle.append(headerArticle)
}
function renderCardCatalog(value, bin) { // Рендерит одну карточку каталога
	let cardCatalog = document.createElement('div')
	cardCatalog.className = 'card-catalog'
	let clickAction = (bin == 'User') ? 'loadUserArticleS('+value.id+')' : 'load'+bin+'Catalog('+value.id+')'
	cardCatalog.setAttribute('onclick', clickAction)
	let coverCatalog = document.createElement('div')
	coverCatalog.className = 'cover-catalog'
	coverCatalog.style.backgroundImage = 'url('+ value.coverc +')'
	coverCatalog.style.backgroundSize = 'cover'
	cardCatalog.append(coverCatalog)
	if (bin != 'User') {
		let openIndicator = document.createElement('div')
		openIndicator.innerHTML = (value.openc == 1) ? 'Открытый' : 'Закрытый'
		openIndicator.className = 'open-indicator'
		let openIndicatorClass = (value.openc == 1) ? 'green-indicator' : 'red-indicator'
		openIndicator.classList.add(openIndicatorClass)
		coverCatalog.append(openIndicator)
	}
	let counterCatalog = document.createElement('div')
	counterCatalog.className = 'counter-catalog'
	coverCatalog.append(counterCatalog)
	let counterSpan = document.createElement('span')
	counterSpan.innerHTML = 'Внутри: ' + value.counterc
	counterCatalog.append(counterSpan)
	let updateCatalog = document.createElement('div')
	updateCatalog.className = 'update-catalog'
	coverCatalog.append(updateCatalog)
	let updateSpan = document.createElement('span')
	let date = new Date( Date.parse(value.datea) )
	updateSpan.innerHTML = 'Обновлен: ' + date.getDate() + ' ' + monthS[date.getMonth()] + ' ' + date.getFullYear()
	updateCatalog.append(updateSpan)
	let articleCatalog = document.createElement('div')
	articleCatalog.className = 'article-catalog'
	coverCatalog.append(articleCatalog)
	let articleSpan = document.createElement('span')
	articleSpan.innerHTML = 'Последняя статья: ' + value.headera
	articleCatalog.append(articleSpan)
	let headerCatalog = document.createElement('div')
	headerCatalog.className = 'header-catalog'
	headerCatalog.innerHTML = value.headerc
	coverCatalog.append(headerCatalog)
	return cardCatalog
}
function renderCardArticle(value, idCatalog, bin) {
	let cardArticle = document.createElement('div')
	cardArticle.className = 'card-article'
	let clickAction = (bin == 'User') ? 'loadUserArticle('+value.id+', '+idCatalog+')' : 'load'+bin+'Article('+value.id+')'
	cardArticle.setAttribute('onclick', clickAction)
	let coverArticle = document.createElement('div')
	coverArticle.className = 'cover-article'
	coverArticle.style.backgroundImage = 'url('+ value.covera +')'
	coverArticle.style.backgroundSize = 'cover'
	if (bin != 'User') {	
		let openIndicator = document.createElement('div')
		openIndicator.innerHTML = (value.opena == 1) ? 'Открытый' : 'Закрытый'
		openIndicator.className = 'open-indicator'
		let openIndicatorClass = (value.opena == 1) ? 'green-indicator' : 'red-indicator'
		openIndicator.classList.add(openIndicatorClass)
		coverArticle.append(openIndicator)
	}
	cardArticle.append(coverArticle)
	let dateArticle = document.createElement('div')
	dateArticle.className = 'date-article'
	coverArticle.append(dateArticle)
	let dateSpan = document.createElement('span')
	let date = new Date( Date.parse(value.datea) )
	dateSpan.innerHTML = date.getDate() + ' ' + monthS[date.getMonth()] + ' ' + date.getFullYear()
	dateArticle.append(dateSpan)
	let catalogArticle = document.createElement('div')
	catalogArticle.className = 'catalog-article'
	coverArticle.append(catalogArticle)
	let catalogSpan = document.createElement('span')
	catalogSpan.innerHTML = 'Каталог: ' + value.headerc
	catalogSpan.setAttribute('onclick','loadArticleS('+value.idc+')')
	catalogArticle.append(catalogSpan)
	let headerArticle = document.createElement('div')
	headerArticle.className = 'header-article'
	headerArticle.innerHTML = value.headera
	coverArticle.append(headerArticle)
	let textArticle = document.createElement('div')
	textArticle.className = 'text-article'
	textArticle.innerHTML = value.pretexta
	cardArticle.append(textArticle)
	return cardArticle
}
function renderContentArticle(dataArticle) { // Рендерит текст статьи.
	let blockContent = document.querySelector('content')
	let preArticle = document.createElement('div')
	preArticle.className = 'pre-article'
	preArticle.innerHTML = dataArticle.pretexta
	blockContent.append(preArticle)
	let textArticle = document.createElement('div')
	textArticle.className = 'main-article'
	textArticle.innerHTML = dataArticle.texta
	blockContent.append(textArticle)
}
function renderContentAbout(dataAbout) { // Рендерит раздел О себе.
	cleanContent()
	let blockContent = document.querySelector('content')
	setTimeout( () => blockContent.innerHTML = dataAbout, 300 )
}
function toggleTheme(data) {
	let theme = document.querySelector('#themes')
	let white = 'css/whitetheme.css'
	let black = 'css/blacktheme.css' 
	let nowtheme = theme.getAttribute('href')
	if (nowtheme == white) {
		theme.setAttribute('href', black)
		data.innerHTML = '&#127769;'
	}else if (nowtheme == black) {
		theme.setAttribute('href', white)
		data.innerHTML = '&#128262;'	
	}//Переключает тему.
}
function getParampampam() {
	let getCat = $(document).getUrlParam("cat")
	let getArt = $(document).getUrlParam("art")
	if (getArt != 0 && getArt != null) loadUserArticle(getArt, getCat)
	else if (getCat != 0 && getCat != null) loadUserArticleS(getCat)
	else loadUserArticleS(0)
}
function cleanContent() { // Чистит блок контент.
	let blockContent = document.querySelector('content')
	blockContent.classList.add('clean')
	setTimeout( () => blockContent.classList.remove('clean'), 300 )
	setTimeout( () => blockContent.classList.add('render'), 300 )
	setTimeout( () => blockContent.classList.remove('render'), 600 )
	setTimeout( () => blockContent.innerHTML = '', 300 )
}
function checkSize() {
	let device = document.querySelector('#device')
	let desktop = 'css/style.css'
	let mobile = 'css/mobile.css'
	wideScreen = window.screen.width
	if (wideScreen <= 665) device.setAttribute('href', mobile)
	else device.setAttribute('href', desktop)
}
