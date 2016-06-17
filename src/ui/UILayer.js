var UILayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        
        // ask the window size
        var size = cc.winSize;

        return true;
    }
});