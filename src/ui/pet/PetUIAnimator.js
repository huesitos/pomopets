var petUIAnimator = (function () {
    var self = this;
    var size = cc.winSize;
    
    // heart beat animation
    var expandHeart = new cc.ScaleTo(0.1, 1.1, 1.1);
    var contractHeart = new cc.ScaleTo(0.1, 1, 1);
    var beatDelay = new cc.DelayTime(1);
    self.beat = new cc.Sequence(beatDelay, expandHeart, contractHeart);
    self.beat.setTag(0);
    
    return {
        animateHeartBeat: function (heart) {
            heart.runAction(new cc.RepeatForever(self.beat));
        },
        animateOptionsAppear: function (btns) {
            for (var i = 0; i < btns.length; i++) {
                var btnFinalPos = btns[i].getUserData().finalPos;
                
                var move = new cc.MoveTo(0.2, btnFinalPos);
                
                btns[i].runAction(new cc.EaseBackOut(move));
            }
        },
        animateOptionsDisappear: function (btns) {
            for (var i = 0; i < btns.length; i++) {
                var btnInitPos = btns[i].getUserData().initialPos;
                
                var move = new cc.MoveTo(0.2, btnInitPos);
                
                btns[i].runAction(new cc.EaseBackInOut(move));
            }
        }
    }
})();