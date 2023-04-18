const numberBtns = document.querySelectorAll('[data-number]');
const resetBtn = document.querySelector('.app__main-btn--reset');
const delBtn = document.querySelector('.app__main-btn--del');
const equalsBtn = document.querySelector('.app__main-btn--equals');
const operatorBtns = document.querySelectorAll('[data-operator]');
const currentNumber = document.querySelector('.app__screen-currentNumber');
const prevNumber = document.querySelector('.app__screen-previousNumber');
const themeInp = document.querySelector('#theme');
const body = document.querySelector('body');

const themes = ['dark-theme', 'light-theme', 'magenta-theme'];
let result = 0;
let mathSign;

const checkPreferredColorScheme = () => {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		body.classList.add('dark-theme');
		themeInp.value = 1;
	} else {
		body.classList.add('light-theme');
		themeInp.value = 2;
	}
};

checkPreferredColorScheme();

const changeTheme = e => {
	const target = e.target.value;
	body.classList.remove(...themes);
	body.classList.add(themes[target - 1]);
};

const handleNumbers = e => {
	let number = e.target.textContent;
	if (number === '.' && currentNumber.textContent.includes('.')) return;

	if (number === '0' && currentNumber.textContent === '') return (currentNumber.textContent = '.0');

	currentNumber.textContent += number;
};

const operate = e => {
	let operator = e.target.textContent;
	mathSign = operator;

	if (currentNumber.textContent === '' && operator === '-') {
		currentNumber.textContent = '-';
		return;
	} else if (currentNumber.textContent === '') {
		return;
	}

	if (currentNumber.textContent !== '' && !currentNumber.textContent.includes(operator)) {
		prevNumber.textContent = currentNumber.textContent + ' ' + operator;
		currentNumber.textContent = '';
	}
};

const calculate = () => {
	if (prevNumber.textContent === '' || currentNumber.textContent === '') return;

	let a = Number(currentNumber.textContent);
	let b = Number(prevNumber.textContent.slice(0, -1));

	switch (mathSign) {
		case '+':
			result = a + b;
			break;
		case '-':
			result = b - a;
			break;
		case '/':
			result = b / a;
			break;
		case 'x':
			result = a * b;
			break;
	}

	currentNumber.textContent = result;
	prevNumber.textContent = '';
};

const resetApp = () => {
	prevNumber.textContent = '';
	currentNumber.textContent = '';
	mathSign = '';
};

const deleteLast = () => {
	currentNumber.textContent = currentNumber.textContent.slice(0, -1);
};

operatorBtns.forEach(btn => btn.addEventListener('click', operate));
numberBtns.forEach(btn => btn.addEventListener('click', handleNumbers));
equalsBtn.addEventListener('click', calculate);
resetBtn.addEventListener('click', resetApp);
delBtn.addEventListener('click', deleteLast);
themeInp.addEventListener('input', changeTheme);
