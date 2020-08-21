Vue.config.devtools = true;

let vm = new Vue({
    el: '#simon-game',
    data: {
        round: 0,
        gameInProgress: false,
        difficultyLevel: 'easy',
        sequenceArray: [],
        clicksNumber: 0,
        defeatRound: 0
    },
    methods: {
        startGame: function () {
            this.round++;
            this.gameInProgress = true;
            this.sequenceArray.push(this.getRandomInteger());
            this.showSequence();
        },
        clickHandler: function (e) {
            let buttonElement = e.target;

            if (!buttonElement.classList.contains('disabled')) {
                let buttonNumber = buttonElement.dataset.buttonNumber;

                this.highlightButton(buttonNumber);
                this.playSound(buttonNumber);

                if (this.gameInProgress) {
                    if ( buttonNumber === this.sequenceArray[this.clicksNumber].toString() ) {
                        this.clicksNumber++;

                        if (this.clicksNumber === this.sequenceArray.length) {
                            this.nextRound();
                        };
                    } else {
                        this.declareDefeat();
                    };
                };
            };
        },
        showSequence: function () {
            let i = 0;
            let delay = this.setDelay;
            let buttonElementsArray = document.querySelectorAll(".game__button");

            buttonElementsArray.forEach(elem => {
                elem.classList.add("disabled");
            });

            setTimeout(function handleButton () {
                let currentButtonNumber = vm.sequenceArray[i];

                vm.highlightButton(currentButtonNumber);
                vm.playSound(currentButtonNumber.toString());

                if (i < vm.sequenceArray.length - 1) {
                    setTimeout(handleButton, delay)
                };

                i++;

            }, delay);
            
            setTimeout(function () {
                buttonElementsArray.forEach(elem => {
                    elem.classList.remove("disabled");
                });
            }, delay * vm.sequenceArray.length);
        },
        nextRound: function () {
            this.round++;
            this.clicksNumber = 0;
            this.sequenceArray.push(this.getRandomInteger());
            this.showSequence();
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
        declareDefeat: function () {
            this.defeatRound = this.round;
            this.round = 0;
            this.gameInProgress = false;
            this.sequenceArray = [];
            this.clicksNumber = 0;
        }
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