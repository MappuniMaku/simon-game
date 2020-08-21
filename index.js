Vue.config.devtools = true;

let vm = new Vue({
    el: '#simon-game',
    data: {
        round: 0,
        gameInProgress: false,
        difficultyLevel: 'easy',
        sequenceArray: [3, 2, 4, 1],
    },
    methods: {
        startGame: function () {
            this.gameInProgress = true;
            this.sequenceArray.push(this.getRandomInteger());
            this.showSequence();
        },
        clickHandler: function (e) {
            let buttonElement = e.target;
            if (!buttonElement.classList.contains('disabled')) {
                let buttonNumber = buttonElement.dataset.buttonNumber;
                this.playSound(buttonNumber);
            };
        },
        showSequence: function () {
            let i = 0;
            let delay = this.setDelay;

            setTimeout(function handleButton () {
                let currentButtonNumber = vm.sequenceArray[i];

                vm.highlightButton(currentButtonNumber);
                vm.playSound(currentButtonNumber.toString());

                if (i < vm.sequenceArray.length - 1) {
                    setTimeout(handleButton, delay)
                };

                i++;

            }, delay);
        },
        highlightButton: function (buttonNumber) {
            let buttonElement = document.querySelector(`.game__button[data-button-number="${buttonNumber}"]`);
            buttonElement.classList.add("game__button_highlighted");
            setTimeout(() => { buttonElement.classList.remove("game__button_highlighted") }, 300);
        },
        playSound: function (buttonNumber) {
            let audio1 = new Audio('sounds/1.mp3');
            let audio2 = new Audio('sounds/2.mp3');
            let audio3 = new Audio('sounds/3.mp3');
            let audio4 = new Audio('sounds/4.mp3');

            switch (buttonNumber) {
                case '1':
                    audio1.play();
                    break;
                case '2':
                    audio2.play();
                    break;
                case '3':
                    audio3.play();
                    break;
                case '4':
                    audio4.play();
                    break;
                default:
                    alert('Произошла ошибка!');
                    console.log('Произошла ошибка!');
            };
        },
        getRandomInteger: function () { // работает в диапазоне от 1 до 4 включительно
            let random = 1 + Math.random() * 4;
            return Math.floor(random);
        },
    },
    computed: {
        setDelay: function () {
            switch (this.difficultyLevel) {
                case 'easy':
                    return 1500;
                case 'medium':
                    return 1000;
                case 'hard':
                    return 400;
            };
        }
    }
});