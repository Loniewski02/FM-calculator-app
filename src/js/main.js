const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const screenOut = document.querySelector('.app__screen-text');
const themeInp = document.querySelector('#theme');
const body = document.querySelector('body');

const themes = ['dark-theme', 'light-theme', 'magenta-theme'];

const checkPreferredColorScheme = () => {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		body.classList.add('dark-theme');
	} else {
		body.classList.add('light-theme');
	}
};

checkPreferredColorScheme();

const changeTheme = e => {
	const target = e.target.value;
	body.classList.remove(...themes);
	body.classList.add(themes[target - 1]);
};

themeInp.addEventListener('input', changeTheme);
