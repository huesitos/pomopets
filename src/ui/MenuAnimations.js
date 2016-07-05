var changeVisibilityCallFunc = function (visibility) {
    return new cc.CallFunc( btn => {
        btn.setVisible(visibility);
    });
}

var changeEnableCallFunc = function (enabled) {
    return new cc.CallFunc( btn => {
        btn.getUserData().clickable = enabled;
    });
}

var MenuAnimations = {
    animateBtnsAppear: function (btns) {
        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];            
            var btnFinalPos = btn.getUserData().finalPos;

            var move = new cc.MoveTo(0.2, btnFinalPos);
            var easedMove = new cc.EaseBackOut(move);

            var makeVisible = changeVisibilityCallFunc(true);

            var enable = changeEnableCallFunc(true);

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

            var makeInvisible = changeVisibilityCallFunc(false);

            var disable = changeEnableCallFunc(false);

            var sequence = new cc.Sequence(
                disable, 
                easedMove, 
                makeInvisible
            );

            btns[i].runAction(sequence);
        }
    }
}