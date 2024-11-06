const searchInput = document.querySelector('.md-search__input');
const originalPlaceholderText = searchInput.getAttribute('placeholder');
let placeholderText = originalPlaceholderText;
let placeholderIndex = 0;
let backspace = false;
let cursorVisible = true;

function updateCursor() {
    if (cursorVisible)
        searchInput.setAttribute('placeholder', placeholderText + '|');
    else
        searchInput.setAttribute('placeholder', placeholderText);
    cursorVisible = !cursorVisible;
}

function animatePlaceholder() {
    if (backspace) {
        if (placeholderIndex > 0) {
            placeholderIndex--;
            placeholderText = originalPlaceholderText.slice(0, placeholderIndex);
            updateCursor();
        } else {
            backspace = false;
            setTimeout(animatePlaceholder, 250);
            return;
        }
    } else {
        if (placeholderIndex < originalPlaceholderText.length) {
            placeholderIndex++;
            placeholderText = originalPlaceholderText.slice(0, placeholderIndex);
            updateCursor();
        } else {
            if (!cursorVisible)
                updateCursor();
            backspace = true;
            setTimeout(animatePlaceholder, 2000);
            return;
        }
    }
    setTimeout(animatePlaceholder, backspace ? 80 : 100);
}

setInterval(updateCursor, 500);
animatePlaceholder();
