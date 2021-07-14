// ------------------------------------------------------ variables
var generatePopupBtn = document.querySelector('.generate-popup-btn'),
    popupContainer = document.querySelector('.popup-container'),
    sportPopupContainer = document.querySelector('.sport-popup-container');
var xhr, thisJSON, currentUrl;
var sports = [
    { name: 'get soccer games', id: 'soccer' },
    { name: 'get basket games', id: 'basket' },
    { name: 'get horses games', id: 'horses' },
    { name: 'get badminton games', id: 'badminton' }
]

// ------------------------------------------------------ functions
function reset(div) {
    div.innerHTML = '';
}

function successCallBack(data, sportID) {
    var content = 'next matches:';
    sportPopupContainer.appendChild(buildPopup(sportID, content, data));
}

function doAjaxRequest(url, successCallBack, sportID) {
    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
        if (this.status == 200 && this.readyState == 4) {
            if (successCallBack) {
                successCallBack(JSON.parse(this.responseText), sportID);
            }
        }
    });
    xhr.open('GET', url, true);
    xhr.send();
}

function generateSportPopup(id) {
    reset(sportPopupContainer);
    doAjaxRequest(`./${id.toUpperCase()}_UOF_1.json`, successCallBack, id);
}

function buildPopupButton(btnNamesArr) {
    var btnContainer = document.createElement('div');
    btnContainer.className = 'popup-btn-container';
    //? if called from console with required args
    if (btnNamesArr.length > 0) {
        btnNames.forEach((btn) => {
            var newBtn = document.createElement('button');
            newBtn.className = 'popup-btn';
            newBtn.textContent = btn;
            btnContainer.appendChild(newBtn);
        });
    }
    //? if called from button with args from local obj array
    else {
        sports.forEach((sport) => {
            var newBtn = document.createElement('button');
            newBtn.className = 'popup-btn';
            newBtn.textContent = sport.name;
            newBtn.addEventListener('click', function() {
                generateSportPopup(sport.id);
            });
            btnContainer.appendChild(newBtn);
        });
    }
    return btnContainer;
}

function buildSportButton(arr) {
    var btnContainer = document.createElement('div');
    btnContainer.className = 'popup-btn-container';
    arr.matches.forEach((match) => {
        var newBtn = document.createElement('button');
        newBtn.className = 'popup-btn';
        newBtn.textContent = match.fullTitle;
        btnContainer.appendChild(newBtn);
    });
    return btnContainer;
}

function buildPopup(title, content, arr) {
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
    if (arr) {
        if (arr.matches) {
            btnContainer = buildSportButton(arr);
            //? set closing
            popupCross.addEventListener('click', () => {
                reset(sportPopupContainer);
            });
        } else {
            btnContainer = buildPopupButton(arr);
            //? set closing
            popupCross.addEventListener('click', () => {
                reset(popupContainer);
            });
        }
    }
    //? nesting
    topDiv.appendChild(popupTitle);
    topDiv.appendChild(popupCross);
    botDiv.appendChild(popupContent);
    botDiv.appendChild(btnContainer);
    div.appendChild(topDiv);
    div.appendChild(botDiv);

    return div;
}

function generatePopup(title = "my default title", content = 'my default content', ...btnNames) {
    reset(popupContainer);
    popupContainer.appendChild(buildPopup(title, content, btnNames));
}

// ------------------------------------------------------ applications
generatePopupBtn.addEventListener('click', () => {
    generatePopup();
});