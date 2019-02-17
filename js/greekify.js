const ENGALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const GKALPHABET = "ΑΒΞΔΕΦΓΗΙΣΚΛΜΝΟΠΘΡΣΤΥϜΩΧΨΖαβξδεφγηιςκλμνοπθρστυϝωχψζ";
const NOACCENTS = "bgdzqklmncpstfxy";
const ACCENTED = "aehioruw";
const MODIFIERS = "()\\/=|+ ";
const ENGPUNCTUATION = ":?";
const GKPUNCTUATION = "·;";

// All vowel combinations. Where a particular accent combination is not valid 
// on a certain vowel, the entry at that index is a space.
const ALL_VOWELS = ["αἀἁ άἄἅ ὰἂἃ ᾶἆἇ ᾳᾀᾁ ᾴᾄᾅ ᾲᾂᾃ ᾷᾆᾇ ",
                    "ΑἈἉ ΆἌἍ ᾺἊἋ  ἎἏ ᾼᾈᾉ  ᾌᾍ  ᾊᾋ  ᾎᾏ ",
                    "εἐἑ έἔἕ ὲἒἓ                     ",
                    "ΕἘἙ ΈἜἝ ῈἚἛ                     ",
                    "ηἠἡ ήἤἥ ὴἢἣ ῆἦἧ ῃᾐᾑ ῄᾔᾕ ῂᾒᾓ ῇᾖᾗ ",
                    "ΗἨἩ ΉἬἭ ῊἪἫ  ἮἯ ῌᾘᾙ  ᾜᾝ  ᾚᾛ  ᾞᾟ ",
                    "ιἰἱ ίἴἵΐὶἲἳῒῖἶἷῗ                ",
                    "ΙἸἹ ΊἼἽ ῚἺἻ  ἾἿ                 ",
                    ""];

const textarea = document.getElementById('greekTextArea');

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function setFocus() {
    textarea.focus();
}

function clearTextArea() {
    textarea.value = "";
}

function getPreviousCharacter(cursorLocation) {
    if (cursorLocation > 0) {
        return textarea.value.substring(cursorLocation-1, cursorLocation);
    } else {
        return "";
    }
}

function updateText(newCharacter, cursorLocation) {
    textarea.value = textarea.value.replaceAt(cursorLocation-1, newCharacter);
    textarea.selectionStart = cursorLocation;
    textarea.selectionEnd = cursorLocation;
}

function swapCharacter(previousCharacter, keyPressed) {
    let index = ENGALPHABET.indexOf(keyPressed);
    if (index !== -1) {
        return GKALPHABET.substr(index,1);
    }
    return keyPressed;
}

function convertToBase4String(base10int) {
    let digits = [];
    for (i = 2; i >= 0; i--) {
        let factor = Math.pow(4, i);
        digits.push(Math.floor(base10int / factor));
        base10int = base10int % factor;
    }
    let base4string = digits.join("");
    return base4string;
}

function convertToBase10Int(base4string) {
    let base10int = 0;
    let base4numbers = base4string.split("");
    if (base4numbers.length === 3) {
        for (i = 0; i <= 2; i++) {
            base10int += base4numbers.pop() * Math.pow(4, i);
        }
    }
    return base10int;
}

function findCharInVowelList(character) {
    for (var i = 0; i < ALL_VOWELS.length; i++) {
        var index = ALL_VOWELS[i].indexOf(character);
        if (index > -1) {
            return [i, convertToBase4String(index)];
        }
    }
    return null;
}

function swapVowel(previousCharacter, keyPressed) {
    // accentTracker is a base-4 variable that tracks which accent a character has.
    // leftmost digit tracks iota subscript: 0 = none, 1 = iota subscript.
    // middle digit tracks accent: 0 = none, 1 = acute, 2 = grave, 3 = circumflex
    // rightmost digit tracks breathing/dieresis: 0 = none, 1 = smooth, 2 = rough, 3 = dieresis
    let accentTracker = "000";

}

textarea.addEventListener('input', (e) => {
    // console.log(e);
    // console.log(`input event. you have just inputed "${e.data}"`);
    //backspace & delete are both = null
    //moving cursor doesn't trigger input event
    const keyPressed = e.data; // The letter typed
    if (keyPressed === null) {
        return;
    }

    const cursorLocation = textarea.selectionStart;
    let newCharacter = "";
    let previousCharacter = getPreviousCharacter(cursorLocation);

    // if keyPressed is among the NOACCENTS or ACCENTED strings, simple swap to Greek.
    // if it's among the ACCENTS string, need complex swap.
    newCharacter = swapCharacter(previousCharacter, keyPressed);
    updateText(newCharacter, cursorLocation);
});

clearTextArea();
//setFocus();
