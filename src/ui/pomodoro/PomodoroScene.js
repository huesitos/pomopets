var PomodoroScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var bgLayer = new BackgroundLayer();
        this.addChild(bgLayer);
        
        var layer = new PomodoroUILayer();
        this.addChild(layer);
    }
});

