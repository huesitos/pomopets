var petUIAnimator = {
    animateHeartBeat: function (heart) {
        // heart beat animation
        var expandHeart = new cc.ScaleTo(0.1, 1.1, 1.1);
        var contractHeart = new cc.ScaleTo(0.1, 1, 1);
        var beatDelay = new cc.DelayTime(1);
        var beat = new cc.Sequence(beatDelay, expandHeart, contractHeart);
        beat.setTag(0);

        heart.runAction(new cc.RepeatForever(beat));
    },
    animateOptionsAppear: function (btns) {
        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            var btnFinalPos = btn.getUserData().finalPos;

            var move = new cc.MoveTo(0.2, btnFinalPos);
            var eased_move = new cc.EaseBackOut(move);

            var enable = new cc.CallFunc( btn => {
                btn.getUserData().clickable = true;
            });

            var sequence = new cc.Sequence(eased_move, enable);

            btns[i].runAction(sequence);
        }
    },
    animateOptionsDisappear: function (btns) {
        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            var btnInitPos = btn.getUserData().initialPos;

            var move = new cc.MoveTo(0.2, btnInitPos);
            var eased_move = new cc.EaseBackInOut(move);
            
            var disable = new cc.CallFunc( btn => {
                btn.getUserData().clickable = false;
            });
            
            var sequence = new cc.Sequence(disable, eased_move);

            btns[i].runAction(sequence);
        }
    }
};