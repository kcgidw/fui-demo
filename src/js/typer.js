const speed = 1000 * 0.05;
const typer = (el, text) => {
	const doType = (i) => {
		setTimeout(() => {
			el.innerHTML = text.substring(0, i);
			if (i !== text.length) {
				doType(i + 1);
			}
		}, speed);
	};
	doType(1);
};
export default typer;
