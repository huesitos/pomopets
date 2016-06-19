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
    currencyLabelSize : 75
};
for (var i in fonts) {
    g_resources.push(fonts[i]);
}

// Path to pet-layer sprites
let folder = "res/sprites/pomodoro-scene/pet-layer/";
var petLayerRes = {
    food : folder + "food.png",
    heart : folder + "heart.png",
    outfit : folder + "outfit.png",
    pets : folder + "pets.png",
    sleep : folder + "sleep.png",
    petSprite1 : folder + "pet-sprite1.png",
    petSprite2 : folder + "pet-sprite2.png",
    petSprite3 : folder + "pet-sprite3.png"
};
for (var i in petLayerRes) {
    g_resources.push(petLayerRes[i]);
}

// Path to pomodoro-layer sprites
folder = "res/sprites/pomodoro-scene/pomodoro-layer/";
var pomodoroLayerRes = {
    categories : folder + "categories.png",
    minus : folder + "minus.png",
    plus : folder + "plus.png",
    start : folder + "start.png",
    blackBar : folder + "black-bar.png"
};
for (var i in pomodoroLayerRes) {
    g_resources.push(pomodoroLayerRes[i]);
}

// Path to pomodoro-layer sprites
folder = "res/sprites/ui-layer/";
var uiLayerRes = {
    categories : folder + "main-menu/categories.png",
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

