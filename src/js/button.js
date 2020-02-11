const enterBtnOuter = document.querySelector('.enter-btn.btn-outer');
const enterBtnInner = document.querySelector('.enter-btn.btn-inner');

const updateBtnClass = () => {
	if (enterBtnOuter.mouseIsOver || enterBtnInner.mouseIsOver) {
		enterBtnOuter.classList.add('hover');
		enterBtnInner.classList.add('hover');
	} else {
		enterBtnOuter.classList.remove('hover');
		enterBtnInner.classList.remove('hover');
	}
	if (enterBtnOuter.mousedown || enterBtnInner.mousedown) {
		enterBtnOuter.classList.add('press');
		enterBtnInner.classList.add('press');
	} else {
		enterBtnOuter.classList.remove('press');
		enterBtnInner.classList.remove('press');
	}
	if (enterBtnOuter.clicked || enterBtnInner.clicked) {
		enterBtnOuter.classList.add('clicked');
		enterBtnInner.classList.add('clicked');
	} else {
		enterBtnOuter.classList.remove('clicked');
		enterBtnInner.classList.remove('clicked');
	}
};

[enterBtnOuter, enterBtnInner].forEach((el) => {
	el.mouseIsOver = false;
	el.clicked = false;
	el.mousedown = false;

	el.addEventListener('mouseover', (e) => {
		el.mouseIsOver = true;
		updateBtnClass();
	});
	el.addEventListener('mouseleave', (e) => {
		el.mouseIsOver = false;
		updateBtnClass();
	});
	el.addEventListener('mousedown', (e) => {
		el.mousedown = true;
		updateBtnClass();
	});
	el.addEventListener('mouseup', (e) => {
		el.mousedown = false;
		updateBtnClass();
	});
	el.addEventListener('click', (e) => {
		el.clicked = true;
		updateBtnClass();
		setTimeout(() => {
			el.clicked = false;
			updateBtnClass();
		}, 1000 * 1);
	});
});
