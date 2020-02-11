import './camera';

const setZ = (selector, z) => {
	const el = document.querySelector(selector);
	el.style.webkitTransform = `translateZ(${z}px)`;
};

setZ('.box-plane.upper', 30);
setZ('.box-plane.lower', -30);

const windowOpenSfx = new Audio('assets/window-open.wav');
windowOpenSfx.addEventListener('canplaythrough', (e) => {
	// windowOpenSfx.play();
});

const animate = (selector, whenStart, removeClass, addClass) => {
	const el = document.querySelector(selector);
	setTimeout(() => {
		el.classList.remove(removeClass);
		el.classList.add(addClass);
	}, whenStart * 1000);
};
animate('.upper .btn-outer', 0.6, 'initial', 'normal');
animate('.upper .btn-inner', 0.7, 'initial', 'normal');

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
};

[enterBtnOuter, enterBtnInner].forEach((el) => {
	el.mouseIsOver = false;

	el.addEventListener('mouseover', (e) => {
		el.mouseIsOver = true;
		updateBtnClass();
	});
	el.addEventListener('mouseleave', (e) => {
		el.mouseIsOver = false;
		updateBtnClass();
	});
});
