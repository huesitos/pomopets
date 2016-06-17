/*
    Creates buttons with textures, a position and a function callback
    for touch events.
    
    textures - a length 3 array [normal, selected, disabled]
    position - a cc.p object
    touch - an object with a callback and receiver properties 
*/
var makeButton = function (texture, position=cc.p(0,0), touch=null) {
    var button = new ccui.Button(texture);
    button.attr({
        x: position.x,
        y: position.y
    });
    button.addTouchEventListener(touch.callback, touch.receiver);
    
    return button;
}

var getFontName = function (resource) {
    if (cc.sys.isNative) {
        return resource.srcs[0];
    } else {
        return resource.name;
    }
}