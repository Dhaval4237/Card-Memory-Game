let score = 0;
let values = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let cardValues = {};
let matched = [];
let selected = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function assignValues() {
    shuffleArray(values);
    let num = 0;
    for (let i = 1; i <= 12; i++) {
        cardValues["card" + i] = values[num]
        num++;
    }
}

function gameSetup() {
    assignValues()

    for (let i = 1; i <= 12; i++) {
        var card_id = "card" + i;
        var header = document.createElement("H3");
        var h = document.createTextNode(cardValues[card_id]);
        header.appendChild(h);
        document.getElementById(card_id).children[1].appendChild(header);
    }
}


function newGame() {
    matched = [];
    selected = [];
    score = 0;

    // Clear matched,flipped css class from cards.
    var elems = document.querySelectorAll(".card.matched");
    for (var i = 0; i < elems.length; i++) {
        elems[i].classList.remove('matched');
    }
    var elems = document.querySelectorAll(".card.flipped");
    for (var i = 0; i < elems.length; i++) {
        elems[i].classList.remove('flipped');
    }

    assignValues();

    // Assign New values to cards h3 tag.
    for (let i = 1; i <= 12; i++) {
        var card_id = "card" + i;
        var card = document.getElementById(card_id);
        card.children[1].firstChild.textContent = cardValues[card_id];
    }

}

function flip(card) {
    if (matched.includes(card.id) || selected.includes(card.id) || selected.length >= 2) {
        // alert("Already Matched");
    }
    else {
        card.classList.add('flipped');
        // console.log(card.id);
        if (selected.length == 1) {
            selected.push(card.id);
            setTimeout(matchCards, 2000);
        }
        else {
            selected.push(card.id);
        }
    }
}

function matchCards() {
    if (cardValues[selected[0]] == cardValues[selected[1]]) {
        document.getElementById(selected[0]).classList.add('matched');
        document.getElementById(selected[1]).classList.add('matched');
        matched.push(selected[0]);
        matched.push(selected[1]);
        score++;
    }

    // Flip Cards if they dont match.
    var elems = document.querySelectorAll(".card.flipped");
    for (var i = 0; i < elems.length; i++) {
        elems[i].classList.remove('flipped');
    }

    selected.pop();
    selected.pop();

    if (score == 6) {
        var elem = document.querySelector('.modal');
        var instance = M.Modal.init(elem, { 'dismissible': false, 'onCloseStart': newGame() });
        instance.open();
    }
}

gameSetup();
