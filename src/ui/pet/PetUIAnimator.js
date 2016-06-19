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
    animateBtnsAppear: function (btns) {
        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            var btnFinalPos = btn.getUserData().finalPos;

            var move = new cc.MoveTo(0.2, btnFinalPos);
            var easedMove = new cc.EaseBackOut(move);

            var enable = new cc.CallFunc( btn => {
                btn.getUserData().clickable = true;
            });
            
            var makeVisible = new cc.callFunc( btn => {
                btn.setVisible(true);
            });

            var sequence = new cc.Sequence(
                makeVisible,
                easedMove, 
                enable
            );

            btns[i].runAction(sequence);
        }
    },
    animateBtnsDisappear: function (btns) {
        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            var btnInitPos = btn.getUserData().initialPos;

            var move = new cc.MoveTo(0.2, btnInitPos);
            var easedMove = new cc.EaseBackInOut(move);
            
            var disable = new cc.CallFunc( btn => {
                btn.getUserData().clickable = false;
            });
            
            var makeInvisible = new cc.callFunc( btn => {
                btn.setVisible(false);
            });
            
            var sequence = new cc.Sequence(
                disable,
                easedMove,
                makeInvisible
            );

            btns[i].runAction(sequence);
        }
    }
};