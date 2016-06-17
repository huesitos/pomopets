var PomodoroScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new BackgroundLayer());
        
        this.addChild(new PomodoroUILayer());
        
        this.addChild(new UILayer());
    }
});

