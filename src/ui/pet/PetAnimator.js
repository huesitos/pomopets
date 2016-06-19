var petAnimator = (function () {
    return {
        animatePetStandBy: function (pet) {
            var standByFrames = [];
            
            for (var i = 1; i <= 3; i++) {
                var name = "pet-sprite" + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(name);

                standByFrames.push(frame);
            }
            
            // go back to the initial frame
            standByFrames.push(cc.spriteFrameCache.getSpriteFrame("pet-sprite1.png"))

            var standByAnimation = new cc.Animation(standByFrames, 0.2);
            var petStandByAnimation = new cc.Animate(standByAnimation);
            var delay = new cc.DelayTime(5);
            var sequence = new cc.Sequence(
                delay, 
                petStandByAnimation
            );
            cc.log(petStandByAnimation);
            
            pet.runAction(new cc.RepeatForever(sequence));
        }
    }
})();