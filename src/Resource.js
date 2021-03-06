var g_resources = [];
var pomodoroLayerRes; //list of layer resources
var petLayerRes; //list of layer resources
var fonts; //list of fonts

var fonts = {
    mainTextFont : {
        type: "font", 
        name: "hellogoodbye", 
        srcs: ["res/fonts/hellogoodbye.ttf"]
    },
};
var fontsSettings = {
    mainTextColor : new cc.Color(0, 0, 0),
    timeLabelSize : 240,
    normalLabelSize : 100,
    currencyLabelSize : 75
};
for (var i in fonts) {
    g_resources.push(fonts[i]);
}

// Path to pet-layer sprites
var folder = "res/sprites/pomodoro-scene/pet-layer/";
var petLayerRes = {
    food : folder + "food.png",
    heart : folder + "heart.png",
    outfit : folder + "outfit.png",
    pets : folder + "pets.png",
    sleep : folder + "sleep.png"
};
for (var i in petLayerRes) {
    g_resources.push(petLayerRes[i]);
}

// List of all the possible choices for animations for each
// animation type by pet
petsResFolder = "res/sprites/pets/";
var petsRes = {
    cat: {
        standby: ["cat-standby1"],
        pomodoro: ["cat-pomodoro1"],
        stopped: ["cat-stopped1"],
        finished: ["cat-finished1"],
        sleep: ["cat-sleep1"]
    }
}
for (var pet in petsRes) {
    for (var type in petsRes[pet]) {
        for (var i = 0; i < petsRes[pet][type].length; i++) {
            var path = petsResFolder + pet + "/";
            var file = petsRes[pet][type][i] + ".plist";
            g_resources.push(path + file);
        }
    }
}

// Path to pomodoro-layer sprites
folder = "res/sprites/pomodoro-scene/pomodoro-layer/";
var pomodoroLayerRes = {
    categories : folder + "categories.png",
    minus : folder + "minus.png",
    plus : folder + "plus.png",
    start : folder + "start.png",
    stop : folder + "start.png",
    back : folder + "start.png",
    blackBar : folder + "black-bar.png"
};
for (var i in pomodoroLayerRes) {
    g_resources.push(pomodoroLayerRes[i]);
}

// Path to pomodoro-layer sprites
folder = "res/sprites/ui-layer/";
var uiLayerRes = {
    petbook : folder + "main-menu/petbook.png",
    help : folder + "main-menu/help.png",
    menu : folder + "main-menu/menu.png",
    settings : folder + "main-menu/settings.png",
    user : folder + "main-menu/user.png",
    diamond : folder + "diamonds.png",
    money : folder + "money.png"
};
for (var i in uiLayerRes) {
    g_resources.push(uiLayerRes[i]);
}

// Motivational phrases
var pomodoroMessages = [
    "Keep going",
    "You can do it!",
    "Don't stop now!",
    "Don't look at me!",
    "If you feel like stopping, continue.",
    "If it's not now, when?",
    "Getting there!"
];

var getRandomPomodoroMessage = function () {
    var random = Math.floor(Math.random() * pomodoroMessages.length);
    
    return pomodoroMessages[random];
}

var failureMessages = [
    "Too bad!",
    "Better luck next time!"
];

var getRandomFailureMessage = function () {
    var random = Math.floor(Math.random() * failureMessages.length);
    
    return failureMessages[random];
}

var successMessage = "Congratulations my friend!";