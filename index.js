Vue.config.devtools = true;

let vm = new Vue({
    el: '#simon-game',
    data: {

    },
    methods: {
        playSound: function (e) {
            let button = e.target;
            if (!button.classList.contains("disabled")) {
                let audio1 = new Audio('sounds/1.mp3');
                let audio2 = new Audio('sounds/2.mp3');
                let audio3 = new Audio('sounds/3.mp3');
                let audio4 = new Audio('sounds/4.mp3');

                let buttonNumber = button.dataset.buttonNumber;
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
                        alert("Произошла ошибка!");
                        console.log("Произошла ошибка! Клик зарегистрирован на:");
                        console.log(e.target);
                };
                    
            }
        }
    },
    computed: {
        
    }
});