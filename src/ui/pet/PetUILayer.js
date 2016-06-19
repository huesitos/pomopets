var PetUILayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        
        // ask the window size
        var size = cc.winSize;
        
        //////////////////////////////
        // 2. add pet
        
        this.petSprite = new cc.Sprite(petLayerRes.petSprite1);
        this.petSprite.attr({
            x: 621,
            y: 1120
        });
        this.addChild(this.petSprite);
        
        //////////////////////////////
        // 3. add pet heart
        
        this.petHeart = new cc.Sprite(petLayerRes.heart);
        this.petHeart.attr({
            x: 621,
            y: size.height - 150
        });
        this.addChild(this.petHeart);
        
        //////////////////////////////
        // 4. add pet buttons
        
        this.foodBtn = new ccui.Button(petLayerRes.food);
        this.foodBtn.attr({
            x: 533,
            y: size.height - 410,
            visible: false
        });
        this.addChild(this.foodBtn);
        
        this.outfitBtn = new ccui.Button(petLayerRes.outfit);
        this.outfitBtn.attr({
            x: 333,
            y: size.height - 460,
            visible: false
        });
        this.addChild(this.outfitBtn);
        
        this.petsBtn = new ccui.Button(petLayerRes.pets);
        this.petsBtn.attr({
            x: 733,
            y: size.height - 410,
            visible: false
        });
        this.addChild(this.petsBtn);
        
        this.sleepBtn = new ccui.Button(petLayerRes.sleep);
        this.sleepBtn.attr({
            x: 933,
            y: size.height - 460,
            visible: false
        });
        this.addChild(this.sleepBtn);
        
        return true;
    },
    showPetOptions: function (sender, type) {
        
    },
    hidePetOptions: function (sender, type) {
        cc.log("hide");
    }
});