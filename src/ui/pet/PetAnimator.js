var PetAnimatorSingleton = (function() {
    var instance;
    
    function PetAnimator() {
        function loadFrames(type) {
            // load the frames
            var frames = [];
            
            var species = petManager.getPetSpecies();
            var selectedAnim = petManager.getAnimation(type);
            var path = petsResFolder + species + "/";
            var file = selectedAnim + ".plist";
            
            cc.spriteFrameCache.addSpriteFrames(
                path + file,
                path + selectedAnim + ".png"
            );

            for (var i = 1; i <= 3; i++) {
                var name = selectedAnim + i + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(name);

                frames.push(frame);
            }
            
            // reset animation going back to the first frame
            frames.push(cc.spriteFrameCache.getSpriteFrame(
                selectedAnim + "1.png"
            ));
            
            return frames;
        }
        
        function animatePet(animType, pet) {
            // animate a pet with the selected animation
            pet.stopAllActions();
            
            var frames = loadFrames(animType);
            
            var animation = new cc.Animation(
                frames, 
                0.2
            );
            var petAnimation = new cc.Animate(animation);
            var delay = new cc.DelayTime(5);
            var sequence = new cc.Sequence(
                petAnimation,
                delay
            );

            pet.runAction(new cc.RepeatForever(sequence));
        }
        
        this.animatePetStandBy = function (pet) {
            animatePet("standby", pet);
        }
        
        this.animatePetPomodoro = function (pet) {
            animatePet("pomodoro", pet);
        }
        
        this.animatePetStopped = function (pet) {
            animatePet("stopped", pet);
        }
        
        this.animatePetFinished = function (pet) {
            animatePet("finshed", pet);
        }
        
        this.animatePetFinished = function (pet) {
            animatePet("sleep", pet);
        }
    }
    
    function createInstance() {
        return new PetAnimator();
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

var petAnimator = PetAnimatorSingleton.getInstance();