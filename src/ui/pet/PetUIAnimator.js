var PetUIAnimatorSingleton =  (function () {
    var instance;
    
    function PetUIAnimator() {
        this.animateHeartBeat = function (heart) {
            // heart beat animation
            var previousScale = heart.getScale();
            
            var expandHeart = new cc.ScaleTo(0.1, previousScale + 0.10);
            var contractHeart = new cc.ScaleTo(0.1, previousScale);
            var beatDelay = new cc.DelayTime(1);
            var beat = new cc.Sequence(beatDelay, expandHeart, contractHeart);
            beat.setTag(0);

            heart.runAction(new cc.RepeatForever(beat));
        }
        
        this.animateBtnsAppear = MenuAnimations.animateBtnsAppear;
        
        this.animateBtnsDisappear = MenuAnimations.animateBtnsDisappear;
    }
    
    function createInstance() {
        return new PetUIAnimator();
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

var petUIAnimator = PetUIAnimatorSingleton.getInstance();