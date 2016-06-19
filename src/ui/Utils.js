/*
    Creates buttons with textures, a position and a function callback
    for touch events.
    
    textures - a length 3 array [normal, selected, disabled]
    position - a cc.p object
    touch - an object with a callback and receiver properties 
*/
var makeButton = function (texture, position=cc.p(0,0), callback=null, receiver=null) {
    var button = new ccui.Button(texture);
    button.setPosition(position);
    button.addTouchEventListener(callback, receiver);
    
    return button;
}

var getFontName = function (resource) {
    if (cc.sys.isNative) {
        return resource.srcs[0];
    } else {
        return resource.name;
    }
}