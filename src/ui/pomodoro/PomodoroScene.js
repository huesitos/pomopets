var PomodoroScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new BackgroundLayer(), -1);
        
        this.addChild(new PomodoroUILayer(), 0);
        
        this.addChild(new PetUILayer(), 1);
        
        this.addChild(new UILayer(), 2);
    }
});

