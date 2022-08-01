"use strict"

logo = '&#129430;'
let getP = ''
let buttonsHeaderCreator = ['Art','Cat','Img','Art+','Cat+','&#128262;']
let inputCatalog = [
	{ dbn: 'headerc', lebel: 'header-cat:', class: 'input-headerc', },
	{ dbn: 'coverc', lebel: 'cover-cat:', class: 'input-coverc', },
	{ dbn: 'datec', lebel: 'date-cat:', class: 'input-datec', },
	{ dbn: 'counterc', lebel: 'count-cat:', class: 'input-counterc', },
	{ dbn: 'openc', lebel: 'open-cat:', class: 'input-openc', },
	{ dbn: 'headera', lebel: 'header-art:', class: 'input-headera', },
	{ dbn: 'datea', lebel: 'date-art:', class: 'input-datea', },
]
let inputArticle = [
	{ dbn: 'headera', lebel: 'header-art:', class: 'input-headera', },
	{ dbn: 'covera', lebel: 'cover-art:', class: 'input-covera', },
	{ dbn: 'datea', lebel: 'date-art:', class: 'input-datea', },
	{ dbn: 'opena', lebel: 'open-art:', class: 'input-opena', },
	{ dbn: 'pretexta', lebel: 'pret-art:', class: 'input-pret', },
	{ dbn: 'idc', lebel: 'idc-art:', class: 'input-idc', },
]


function clickHeaderButtonActionCreator(data) { //Запускает анимацию нажатия, затем добавляет класс "Актив" по индексу и выполняет рендер
	clickButtonAnimate(data)
	let headerButtons = document.querySelectorAll('header > .block-buttons > .button')
	headerButtons.forEach(function(value, index) {
		if (data == headerButtons[0] || data == headerButtons[1] || data == headerButtons[2]) {
			value.classList.remove('active')
		}
	})
	headerButtons.forEach(function(value, index) {
		if (value == data) {
			switch (index) {
			case 0:
			cleanContent()
			setTimeout( () => data.classList.add('active'), 300 )
			loadCArticleS()
			break
			case 1:
			cleanContent()
			setTimeout( () => data.classList.add('active'), 300 )
			loadCCatalogS()
			break
			case 2:
			cleanContent()
			setTimeout( () => data.classList.add('active'), 300 )
			setTimeout( () => newImgs(), 300 )
			break
			case 3:
			newArticle()
			break
			case 4:
			newCatalog()
			break
			case 5:
			toggleTheme(data)
			break
			default:
			break
			}
		}
	})
}
function newCatalog() {
	$.ajax({
		type: 'POST',
		data: { p: getP },
		url: 'php/creatornewcatalog.php',
		success: function(data) {
			alert(data)
			loadCCatalogS()
		}
	})
}
function loadCCatalogS() { //Загружает все каталоги
	cleanContent()
	$.ajax({
		type: 'POST',
		data: { p: getP },
		url: 'php/creatorloadcatalogs.php',
		success: function(data) {
			setTimeout( () => renderContentBlock(data, 'cat', 'C'), 300 )
		}
	})
}
function loadCCatalog(idCatalog) {
	cleanContent()
	$.ajax({
		type: 'POST',
		data: { idcat: idCatalog, p: getP },
		url: 'php/creatorloadcatalog.php',
		success: function(data) {
			setTimeout( () => renderHeaderArticleS(data, 'C'), 300 )
			setTimeout( () => renderRedactCatalog(data[0], inputCatalog), 300 )
			setTimeout( () => loadImgS(), 300 )
		}
	})
}
function renderRedactCatalog(data) {
	let blockContent = document.querySelector('content')

	let redactBlock = document.createElement('div')
	redactBlock.className = 'redact-block'
	blockContent.append(redactBlock)

	let cardBlock = document.createElement('div')
	cardBlock.className = 'card-block'
	redactBlock.append(cardBlock)
	let cardCatalog = renderCardCatalog(data, 'C')
	cardBlock.append(cardCatalog)

	let inputBlock = renderInput(data, inputCatalog)
	redactBlock.append(inputBlock)
}
function sendCatalog(idCatalog) {
	let headerc = document.querySelector('.input-headerc').value
	let coverc = document.querySelector('.input-coverc').value
	let datec = document.querySelector('.input-datec').value
	let counterc = document.querySelector('.input-counterc').value
	let openc = document.querySelector('.input-openc').value
	let headera = document.querySelector('.input-headera').value
	let datea = document.querySelector('.input-datea').value
	$.ajax({
		type: 'POST',
		url: 'php/creatorsendcatalog.php',
		data: { p: getP, idcatalog: idCatalog, headerc: headerc, coverc: coverc, datec: datec, counterc: counterc, openc: openc, headera: headera, datea: datea },
		success: function(data) {
			loadCCatalogS()
		}
	})
}
function newArticle() {
	$.ajax({
		type: 'POST',
		data: { p: getP },
		url: 'php/creatornewarticle.php',
		success: function(data) {
			alert(data)
			loadCArticleS()
		}
	})
}
function loadCArticleS() {
	cleanContent()
	$.ajax({
		type: 'POST',
		data: { p: getP },
		url: 'php/creatorloadarticles.php',
		success: function(data) {
			setTimeout( () => renderContentBlock(data, 'art', 'C', 0), 300 )
		}
	})
}
function loadCArticle(idArticle) {
	cleanContent()
	$.ajax({
		type: 'POST',
		url: 'php/creatorloadarticle.php',
		data: { p: getP, idart: idArticle },
		success: function(data) {
			setTimeout( () => renderHeaderArticle(data, 0, 'C'), 300 )
			setTimeout( () => renderRedactArticle(data, inputArticle), 300 )
			setTimeout( () => loadImgS(), 300 )
		}
	})
}
function renderRedactArticle(data) {
	let blockContent = document.querySelector('content')

	let redactBlock = document.createElement('div')
	redactBlock.className = 'redact-block'
	blockContent.append(redactBlock)

	let cardBlock = document.createElement('div')
	cardBlock.className = 'card-block'
	redactBlock.append(cardBlock)
	let cardArticle = renderCardArticle(data, 0, 'R')
	cardBlock.append(cardArticle)

	let inputBlock = renderInput(data, inputArticle)
	redactBlock.append(inputBlock)
}
function sendArticle(idArticle) {
	let headera = document.querySelector('.input-headera').value
	let covera = document.querySelector('.input-covera').value
	let datea = document.querySelector('.input-datea').value
	let opena = document.querySelector('.input-opena').value
	let pretext = document.querySelector('.input-pret').value
	let idc = document.querySelector('.input-idc').value
	$.ajax({
		type: 'POST',
		url: 'php/creatorsendarticle.php',
		data: { p: getP, idarticle: idArticle, headera: headera, covera: covera, datea: datea, opena: opena, pretexta: pretext, idc: idc },
		success: function(data) {
			loadCArticle()
		}
	})
}
function renderInput(data, inputType) { 
	let inputBlock = document.createElement('div')
	inputBlock.className = 'input-block'

	inputType.forEach(function(value, index) {
		let inputString = document.createElement('div')
		inputString.className = 'input-string'
		inputBlock.append(inputString)

		let inputLebel = document.createElement('div')
		inputLebel.className = 'input-lebel'
		inputLebel.innerHTML = value.lebel
		inputString.append(inputLebel)

		let inputPole
		if (value.dbn == 'idc') {
			inputPole = document.createElement('select')
			$.ajax({
				type: 'POST',
				data: { p: getP },
				url: 'php/creatorloadcatalogs.php',
				success: function(data) {
					data.forEach(function(val) {
						let option = document.createElement('option')
						option.innerHTML = val.headerc
						option.value = val.id
						let dbname = value.dbn
						let dcn = inputType[0]
						if (val.id == dcn[dbname]) option.selected = true
						inputPole.append(option)
					})
				}
			})
		}else{
			inputPole = document.createElement('input')
			let dbname = value.dbn
			inputPole.value = data[dbname]
		}
		inputPole.className = value.class
		if (inputType == inputArticle){
			inputPole.setAttribute('oninput', 'keyupArticle()')
		} else if (inputType == inputCatalog) {	
			inputPole.setAttribute('oninput', 'keyupCatalog()')
		}
		inputString.append(inputPole)
	})

	let inputSend = document.createElement('div')
	inputSend.className = 'button'
	inputSend.innerHTML = 'Сохранить'
	if (inputType == inputArticle){
		inputSend.setAttribute('onclick','sendArticle('+data.id+')')
	} else if (inputType == inputCatalog) {	
		inputSend.setAttribute('onclick','sendCatalog('+data.id+')')
	}
	inputBlock.append(inputSend)
	return inputBlock
}
function newImgs() {
	let blockContent = document.querySelector('content')
	let inputFile = document.createElement('input')
	inputFile.className = 'input-img'
	inputFile.id = 'inptimg'
	inputFile.setAttribute('type', 'file')
	inputFile.setAttribute('multiple', true)
	blockContent.append(inputFile)
	let btnImg = document.createElement('div')
	btnImg.className = 'button'
	btnImg.innerHTML = 'Загрузить'
	btnImg.setAttribute('onclick', 'sendImg()')
	blockContent.append(btnImg)
	loadImgS()
}
function loadImgS() {
	let creatorCatalog = document.querySelector('content')
	let imgCatalog = document.createElement('div')
	imgCatalog.className = 'imgs-catalog'
	creatorCatalog.append(imgCatalog)
	$.ajax({
		type: 'POST',
		url: 'php/creatorloadimgs.php',
		success: function(data) {
			renderImgCatalog(data)
		}
	})
}
function renderImgCatalog(dataImg) {
	let imgCatalog = document.querySelector('.imgs-catalog')
	dataImg.forEach(function(value) {
		let imgBox = document.createElement('div')
		imgBox.className = 'img-box'
		imgCatalog.append(imgBox)
		let img = document.createElement('img')
		img.src = value.img
		imgBox.append(img)
		let srcImg = document.createElement('div')
		srcImg.innerHTML = value.img
		imgBox.append(srcImg)
	})
}
function sendImg() {
	let formData = new FormData();
	$.each($("#inptimg")[0].files,function(key, input){
		formData.append('file[]', input);
	})
	$.ajax({
		type: "POST",
		url: 'php/creatorsendimg.php',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		dataType: 'json',
		success: function(data) {
			alert(data)
			newImgs()
		}
	})
}
function loadRArticle(idArticle) {
	cleanContent()
	$.ajax({
		type: 'POST',
		url: 'php/creatorloadarticle.php',
		data: { p: getP, idart: idArticle },
		success: function(data) {
			setTimeout( () => renderHeaderArticle(data, 0, 'C'), 300 )
			setTimeout( () => renderContentArticle(data), 300 )
			setTimeout( () => loadImgS(), 300 )
			setTimeout( () => renderAuthor(data), 300 )
		}
	})
}
function renderAuthor(dataArticle) {
	let textArticle = document.querySelector('main-article')
	let blockContent = document.querySelector('content')
	let spacer = document.createElement('div')
	spacer.className = 'spacer'
	blockContent.append(spacer)
	let redactor = document.createElement('div')
	redactor.className = 'redactor-article'
	blockContent.append(redactor)
	let textArea = document.createElement('textarea')
	textArea.setAttribute('oninput', 'keyupAuthor()')
	textArea.className = 'input-text'
	textArea.value = dataArticle.texta
	redactor.append(textArea)
	let btnRedactor = document.createElement('div')
	btnRedactor.className = 'btn-redactor'
	redactor.append(btnRedactor)

	let addImg = document.createElement('div')
	addImg.className = 'button'
	addImg.innerHTML = '+W'
	addImg.setAttribute('onclick','addAuthor(this)')
	btnRedactor.append(addImg)

	let addQuote = document.createElement('div')
	addQuote.className = 'button'
	addQuote.innerHTML = '+Q'
	addQuote.setAttribute('onclick','addAuthor(this)')
	btnRedactor.append(addQuote)

	let addBlock = document.createElement('div')
	addBlock.className = 'button'
	addBlock.innerHTML = '+P'
	addBlock.setAttribute('onclick','addAuthor(this)')
	btnRedactor.append(addBlock)

	let inputArticleSend = document.createElement('div')
	inputArticleSend.className = 'button'
	inputArticleSend.innerHTML = 'Save'
	inputArticleSend.setAttribute('onclick','sendAuthor('+dataArticle.id+')')
	btnRedactor.append(inputArticleSend)
}
function keyupAuthor() {
	let text = document.querySelector('.input-text').value
	let mainArticle = document.querySelector('.main-article')
	mainArticle.innerHTML = text
}
function addAuthor(input) {
	let btns = document.querySelectorAll('.btn-redactor > .button')
	let textArea = document.querySelector('.input-text')
	btns.forEach(function(value, index) {
		if(value == input){
			switch (index) {
				case 0:
				clickButtonAnimate(input)
				textArea.value = textArea.value + '<div><img src="img/codeseela.webp"></div>'
				break
				case 1:
				clickButtonAnimate(input)
				textArea.value = textArea.value + '<div class="quote"> <div class="quote-author">Имя автора</div>Текст цитаты</div>'
				break
				case 2:
				clickButtonAnimate(input)
				textArea.value = textArea.value + '<div class="text">Новый текстовый блок.</div>'
				break
				default:
				break
			}
		}
	})
}
function sendAuthor(idArticle) {
	let text = document.querySelector('.input-text').value
	$.ajax({
		type: 'POST',
		url: 'php/creatorsendarticle.php',
		data: { p: getP, idarticle: idArticle, texta: texta },
		success: function(data) {
			loadAuthor(idArticle)
		}
	})
}
function keyupCatalog() {
	let headerc = document.querySelector('.input-headerc').value
	let coverc = document.querySelector('.input-coverc').value
	let datec = document.querySelector('.input-datec').value
	let counterc = document.querySelector('.input-counterc').value
	let openc = document.querySelector('.input-openc').value
	let headera = document.querySelector('.input-headera').value
	let datea = document.querySelector('.input-datea').value

	let headerHeaderC = document.querySelector('.header-name')
	headerHeaderC.innerHTML = 'Каталог: ' + headerc
	let cardHeaderC = document.querySelector('.header-catalog')
	cardHeaderC.innerHTML = headerc

	let headerCoverC = document.querySelector('.header-cover')
	headerCoverC.style.backgroundImage = 'url('+ coverc +')'
	let cardCoverC = document.querySelector('.cover-catalog')
	cardCoverC.style.backgroundImage = 'url('+ coverc +')'

	//let cardDateC = document.querySelector('')
	//cardDateC.innerHTML = 

	let cardCounterC = document.querySelector('.counter-catalog > span')
	cardCounterC.innerHTML = 'Внутри: '+counterc

	let cardOpenC = document.querySelector('.open-indicator')
	if (openc == 1) {
		cardOpenC.innerHTML = 'Открытый'
		cardOpenC.classList.add('green-indicator')
	}else{
		cardOpenC.innerHTML = 'Закрытый'
		cardOpenC.classList.add('red-indicator')
	}

	let cardHeaderA = document.querySelector('.article-catalog > span')
	cardHeaderA.innerHTML = 'Последняя статья: ' + headera

	let cardDateA = document.querySelector('.update-catalog > span')
	let date = new Date( Date.parse(datea) )
		let dateDay = date.getDate()
		let dateMonth = date.getMonth()
		let dateYear = date.getFullYear()
		cardDateA.innerHTML = 'Обновлен: ' + dateDay + ' ' + monthS[dateMonth] + ' ' + dateYear
}
function keyupArticle() {
	let headera = document.querySelector('.input-headera').value
	let covera = document.querySelector('.input-covera').value
	let datea = document.querySelector('.input-datea').value
	let opena = document.querySelector('.input-opena').value
	let pretext = document.querySelector('.input-pret').value
	let idc = document.querySelector('.input-idc').value

	let headerHeaderA = document.querySelector('.header-name')
	headerHeaderA.innerHTML = headera
	let cardHeaderA = document.querySelector('.header-article')
	cardHeaderA.innerHTML = headera

	let headerCoverA = document.querySelector('.header-cover')
	headerCoverA.style.backgroundImage = 'url('+ covera +')'
	let cardCoverA = document.querySelector('.cover-article')
	cardCoverA.style.backgroundImage = 'url('+ covera +')'

	let headerDateA = document.querySelector('.header-cover > .date-article > span')
	let cardDateA = document.querySelector('.cover-article > .date-article > span')
	let date = new Date( Date.parse(datea) )
	let dateDay = date.getDate()
	let dateMonth = date.getMonth()
	let dateYear = date.getFullYear()
	headerDateA.innerHTML = dateDay + ' ' + monthS[dateMonth] + ' ' + dateYear
	cardDateA.innerHTML = dateDay + ' ' + monthS[dateMonth] + ' ' + dateYear

	let cardOpenA = document.querySelector('.open-indicator')
	if (opena == 1) {
		cardOpenA.innerHTML = 'Открытый'
		cardOpenA.classList.add('green-indicator')
		cardOpenA.classList.remove('red-indicator')
	}else{
		cardOpenA.innerHTML = 'Закрытый'
		cardOpenA.classList.add('red-indicator')
		cardOpenA.classList.remove('green-indicator')
	}

	let preText = document.querySelector('.text-article')
	preText.innerHTML = pretext
}
function getParampamp() {
	getP = $(document).getUrlParam("p");
}