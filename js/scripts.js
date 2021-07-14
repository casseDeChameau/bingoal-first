// * ------------------------------------------------------ variables
var generatePopupBtn = document.querySelector('.generate-popup-btn'),
    popupContainer = document.querySelector('.popup-container'),
    sportPopupContainer = document.querySelector('.sport-popup-container');
var xhr, thisJSON, currentUrl;
var sports = [
    { fullTitle: 'get soccer games', id: 'soccer' },
    { fullTitle: 'get basket games', id: 'basket' },
    { fullTitle: 'get horses games', id: 'horses' },
    { fullTitle: 'get badminton games', id: 'badminton' }
];

// * ------------------------------------------------------ functions
// Reset
function reset(div) {
    div.innerHTML = '';
}

// Builder
function buildPopupButton(btnArr) {
    var thisBtnArr,
        btnContainer = document.createElement('div');
    btnContainer.className = 'popup-btn-container';

    // check wich popup to generate
    if (btnArr.matches) {
        thisBtnArr = btnArr.matches
    } else if (btnArr.length > 0) {
        thisBtnArr = btnArr;
    } else thisBtnArr = sports;

    thisBtnArr.forEach((btn) => {
        var newBtn = document.createElement('button');
        newBtn.className = 'popup-btn';
        newBtn.textContent = btn.fullTitle;
        // if matches
        if (btn.id) {
            newBtn.addEventListener('click', function() {
                generateSportPopup(btn.id);
            });
        }
        btnContainer.appendChild(newBtn);
    });

    return btnContainer;
}

function buildPopup(title, content, arr) {
    reset(popupContainer);
    var div = document.createElement('div'),
        topDiv = document.createElement('div'),
        popupTitle = document.createElement('h2'),
        popupCross = document.createElement('p'),
        botDiv = document.createElement('div'),
        popupContent = document.createElement('p'),
        btnContainer;
    // ? css class names
    div.className = 'popup';
    topDiv.className = 'popup-top';
    popupTitle.className = 'popup-title';
    popupCross.className = 'cross';
    botDiv.className = 'popup-bot';
    popupContent.className = 'popup-content';
    //? passing values
    popupTitle.textContent = title;
    popupCross.textContent = 'X';
    popupContent.textContent = content;
    //? create appropriate buttons
    btnContainer = buildPopupButton(arr);
    //? set closing
    popupCross.addEventListener('click', () => {
        if (content == 'next matches:') {
            // if on matches popup, re-generate sport popup at closing
            generatePopup();
            // if on sport popup, cross just close it 
        } else reset(popupContainer);
    });
    //? nesting
    topDiv.appendChild(popupTitle);
    topDiv.appendChild(popupCross);
    botDiv.appendChild(popupContent);
    botDiv.appendChild(btnContainer);
    div.appendChild(topDiv);
    div.appendChild(botDiv);
    return div;
}

// xhr 
function doAjaxRequest(url, sportID) {
    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
        if (this.status == 200 && this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            console.log(json);
            popupContainer.appendChild(buildPopup(sportID, 'next matches:', json));
        }
    });
    xhr.open('GET', url, true);
    xhr.send();
}

// Called on click, builder trigger
//? click on sport btn
function generateSportPopup(id) {
    reset(popupContainer);
    doAjaxRequest(`./${id.toUpperCase()}_UOF_1.json`, id);
}

//? click on show popup
function generatePopup(title = "my default title", content = 'my default content', btnArr = []) {
    reset(popupContainer);
    popupContainer.appendChild(buildPopup(title, content, btnArr));
}

// * ------------------------------------------------------ applications
generatePopupBtn.addEventListener('click', () => {
    generatePopup();
});