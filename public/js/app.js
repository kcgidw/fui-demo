const canv = document.getElementById('gradient-bg');
const cam = document.getElementById('camera');

const calcHorRotate = (mouseHor) => {
	const maxAngle = 2;
	const containerLeft = canv.getBoundingClientRect().left;
	const containerCenter = containerLeft + canv.clientWidth / 2;
	const mouseDistToCenter = containerCenter - mouseHor;
	const maxDistToCenter = containerCenter;
	const ratio = mouseDistToCenter / maxDistToCenter;
	const angle = ratio * maxAngle;
	return angle;
};

const calcVerRotate = (mouseVer) => {
	const maxAngle = 2;
	const containerTop = canv.getBoundingClientRect().top;
	const containerCenter = containerTop + canv.clientHeight / 2;
	const mouseDistToCenter = containerCenter - mouseVer;
	const maxDistToCenter = containerCenter;
	const ratio = mouseDistToCenter / maxDistToCenter;
	const angle = ratio * maxAngle;
	return angle;
};

const moveCamera = (e) => {
	const horDeg = e ? calcHorRotate(e.clientX) : 0;
	const verDeg = e ? calcVerRotate(e.clientY) : 0;
	const horBaseAngle = 25;
	const verBaseAngle = 18;
	const zBaseAngle = -4;
	cam.style.webkitTransform = `
    rotateX(${verBaseAngle - verDeg}deg)
    rotateY(${horBaseAngle + horDeg}deg)
    rotateZ(${zBaseAngle}deg)`;
};

canv.addEventListener('mousemove', moveCamera);
moveCamera();

const setZ = (selector, z) => {
	document.querySelector(selector).style.webkitTransform = `translateZ(${z}px)`;
};

setTimeout(() => {
	setZ('#stack1 .box.upper', 30);
	setZ('#stack1 .box.lower', -30);
}, 0);
