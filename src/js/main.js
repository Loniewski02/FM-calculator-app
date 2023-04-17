const sendBtn = document.querySelector('.app__dice');
const sendBtnImg = document.querySelector('.app__dice img');
const adviceNumber = document.querySelector('.app__title-number');
const adviceText = document.querySelector('.app__text-advice');

let time = 1000;

const getAdvice = () => {
	fetch(`https://api.adviceslip.com/advice`)
		.then(res => res.json())
		.then(data => {
			let adviceData = data.slip;
			adviceNumber.textContent = adviceData.id;
			adviceText.textContent = `${adviceData.advice}`;
		});
};

const handleAnimation = () => {
	sendBtn.classList.add('shake');
	sendBtnImg.classList.add('rotate');
	setTimeout(() => {
		sendBtn.classList.remove('shake');
		sendBtnImg.classList.remove('rotate');
	}, time);
};

sendBtn.addEventListener('click', () => {
	handleAnimation();
	setTimeout(() => {
		getAdvice();
	}, time);
});
