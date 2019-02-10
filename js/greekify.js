const ENGALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const GKALPHABET = "ΑΒΞΔΕΦΓΗΙΣΚΛΜΝΟΠΘΡΣΤΥϜΩΧΨΖαβξδεφγηιςκλμνοπθρστυϝωχψζ"
const NOACCENTS = "bgdzqklmncpstfxy";
const ACCENTED = "aehioruw";
const MODIFIERS = "()\\/=|+ ";

const textarea = document.getElementById('greekTextArea');

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function setFocus() {
    textarea.focus();
}

function clearTextArea() {
    textarea.value = "";
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

    // if keyPressed is among the NOACCENTS or ACCENTED strings, simple swap to Greek.
    // if it's among the ACCENTS string, need complex swap.
    newCharacter = swapCharacter("", keyPressed);
    updateText(newCharacter, cursorLocation);
});

clearTextArea();
//setFocus();
