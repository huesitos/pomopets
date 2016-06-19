var PetUILayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        
        // ask the window size
        var size = cc.winSize;
        
        //////////////////////////////
        // 2. add pet
        
        var pet = cc.spriteFrameCache.getSpriteFrame("pet-sprite1.png");
        this.petSprite = new cc.Sprite(pet);
        this.petSprite.attr({
            x: 621,
            y: 1120
        });
        this.addChild(this.petSprite, 1);
        
        petAnimator.animatePetStandBy(this.petSprite);
        
        //////////////////////////////
        // 3. add pet heart
        
        this.petHeart = new cc.Sprite(petLayerRes.heart);
        this.petHeart.attr({
            x: 621,
            y: size.height - 150
        });
        this.addChild(this.petHeart);
        
        petUIAnimator.animateHeartBeat(this.petHeart);
        
        //////////////////////////////
        // 4. add pet buttons
        
        // all buttons start behind the pet and in the center
        var initialX = this.petSprite.getPositionX();
        var initialY = size.height / 2;
        var initialPos = cc.p(initialX, initialY);
        
        // food
        var foodBtn = makeButton(
            petLayerRes.food,
            initialPos,
            this.foodBtnTouch,
            this
        );
        
        var foodBtnAnimInfo = {
            initialPos: initialPos,
            finalPos: cc.p(533, size.height - 410),
            clickable: false
        }
        foodBtn.setUserData(foodBtnAnimInfo);
        foodBtn.isVisible(false);
        this.addChild(foodBtn, 0);
        
        // outfit
        var outfitBtn = makeButton(
            petLayerRes.outfit,
            initialPos,
            this.outfitBtnTouch,
            this
        );
        
        var outfitBtnAnimInfo = {
            initialPos: initialPos,
            finalPos: cc.p(333, size.height - 460),
            clickable: false
        }
        outfitBtn.setUserData(outfitBtnAnimInfo);
        outfitBtn.isVisible(false);
        this.addChild(outfitBtn, 0);
        
        // pets
        var petsBtn = makeButton(
            petLayerRes.pets,
            initialPos,
            this.petsBtnTouch,
            this
        );
        
        var petsBtnAnimInfo = {
            initialPos: initialPos,
            finalPos: cc.p(733, size.height - 410),
            clickable: false
        }
        petsBtn.setUserData(petsBtnAnimInfo);
        petsBtn.isVisible(false);
        this.addChild(petsBtn, 0);
        
        // sleep
        var sleepBtn = makeButton(
            petLayerRes.sleep,
            initialPos,
            this.sleepBtnTouch,
            this
        );
        
        var sleepBtnAnimInfo = {
            initialPos: initialPos,
            finalPos: cc.p(933, size.height - 460),
            clickable: false
        }
        sleepBtn.setUserData(sleepBtnAnimInfo);
        sleepBtn.isVisible(false);
        this.addChild(sleepBtn, 0);
        
        var petOptionsBtns = [
            outfitBtn, 
            foodBtn, 
            petsBtn, 
            sleepBtn
        ];
        this.petOptionsBtns = petOptionsBtns;
        this.petMenuShowing = false;
        
        //////////////////////////////
        // 5. add touch event listener
        
        if (cc.sys.capabilities.hasOwnProperty("touches")) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                
                onTouchBegan: (touch, event) => {
                    return true;
                },
                
                // show pet menu if the user clicks pet
                // hide pet menu if the user clicks anywhere else
                onTouchEnded: (touch, event) => {
                    var petRect = this.petSprite.getBoundingBox();
                    var point = touch.getLocation();
                    
                    if (cc.rectContainsPoint(petRect, point)) {
                        if (this.petMenuShowing) {
                            this.hidePetOptions();
                        } else {
                            this.showPetOptions();
                        }
                    }
                }
            }, this);
        }
        
        if (cc.sys.capabilities.hasOwnProperty("mouse")) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                
                // show pet menu if the user clicks pet
                // hide pet menu if the user clicks anywhere else
                onMouseDown: (touch, event) => {
                    var petRect = this.petSprite.getBoundingBox();
                    var point = touch.getLocation();
                    
                    if (cc.rectContainsPoint(petRect, point)) {
                        if (this.petMenuShowing) {
                            this.hidePetOptions();
                        } else {
                            this.showPetOptions();
                        }
                    }
                    
                    return true;
                }
            }, this);
        }
        
        return true;
    },
    showPetOptions: function () {
        petUIAnimator.animateBtnsAppear(this.petOptionsBtns);
        this.petMenuShowing = true;
    },
    hidePetOptions: function () {
        petUIAnimator.animateBtnsDisappear(this.petOptionsBtns);
        this.petMenuShowing = false;
    },
    foodBtnTouch: function (sender, type) {
        var clickable = sender.getUserData().clickable;
        if (type == ccui.Widget.TOUCH_ENDED && clickable) {
            cc.log("give me food!");
        }
    },
    outfitBtnTouch: function (sender, type) {
        var clickable = sender.getUserData().clickable;
        if (type == ccui.Widget.TOUCH_ENDED && clickable) {
            cc.log("such fashion!");
        }
    },
    petsBtnTouch: function (sender, type) {
        var clickable = sender.getUserData().clickable;
        if (type == ccui.Widget.TOUCH_ENDED && clickable) {
            cc.log("here are my friends!");
        }
    },
    sleepBtnTouch: function (sender, type) {
        var clickable = sender.getUserData().clickable;
        if (type == ccui.Widget.TOUCH_ENDED && clickable) {
            cc.log("let me sleep!");
        }
    }
});