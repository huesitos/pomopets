var UIAnimatorSingleton = (function (){
    var instance;
    
    function UIAnimator() {
        this.animateBtnsAppear = function(btns) {
            for (var i = 0; i < btns.length; i++) {
                var btn = btns[i];            
                var btnFinalPos = btn.getUserData().finalPos;

                var move = new cc.MoveTo(0.2, btnFinalPos);
                var easedMove = new cc.EaseBackOut(move);

                var makeVisible = new cc.CallFunc( btn => {
                    btn.setVisible(true);
                });

                var enable = new cc.CallFunc( btn => {
                    btn.getUserData().clickable = true;
                });

                var sequence = new cc.Sequence(
                    makeVisible, 
                    easedMove, 
                    enable
                );

                btns[i].runAction(sequence);
            }
        }
        
        this.animateBtnsDisappear = function(btns) {
            for (var i = 0; i < btns.length; i++) {
                var btn = btns[i];
                var btnInitPos = btn.getUserData().initialPos;

                var move = new cc.MoveTo(0.2, btnInitPos);
                var easedMove = new cc.EaseBackInOut(move);

                var makeInvisible = new cc.CallFunc( btn => {
                    btn.setVisible(false);
                });

                var disable = new cc.CallFunc( btn => {
                    btn.getUserData().clickable = false;
                });

                var sequence = new cc.Sequence(
                    disable, 
                    easedMove, 
                    makeInvisible
                );

                btns[i].runAction(sequence);
            }
        }
    }
    
    
    function createInstance() {
        return new UIAnimator();
    }

    return {
        getInstance: function () {
            if(!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
})();

var uiAnimator = UIAnimatorSingleton.getInstance();