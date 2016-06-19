var BackgroundLayer = cc.LayerColor.extend({
    ctor:function (backgroundTexture) {
        //////////////////////////////
        // 1. super init first
        this._super(new cc.Color(255, 255, 255));
        
        // ask the window size
        var size = cc.winSize;
        
        this.bg = new cc.Sprite(backgroundTexture);
        this.bg.attr({
            x: size.width / 2,
            y: size.height / 2
        })
        this.addChild(this.bg, 0);

        return true;
    }
});