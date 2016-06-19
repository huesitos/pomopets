var UILayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        
        // ask the window size
        var size = cc.winSize;
        
        //////////////////////////////
        // 2. add menu
        
        // create menu items
        var toggleBtn = makeButton(
            uiLayerRes.menu,
            cc.p(118, size.height - 90),
            this.toggleMenuBtnTouch,
            this
        );
        this.addChild(toggleBtn, 1);
        
        // user
        var userBtn = makeButton(
            uiLayerRes.user,
            cc.p(118, size.height - 90),
            this.userBtnTouch,
            this
        );
        userBtn.setVisible(false);
        
        var userBtnInfo = {
            initialPos: cc.p(118, size.height - 90),
            finalPos: cc.p(118, size.height - 220),
            clickable: false
        }
        userBtn.setUserData(userBtnInfo);
        this.addChild(userBtn, 0);
        
        // petbook
        var petBookBtn = makeButton(
            uiLayerRes.petbook,
            cc.p(118, size.height - 90),
            this.petbookBtnTouch,
            this
        );
        petBookBtn.setVisible(false);
        
        var petBookBtnInfo = {
            initialPos: cc.p(118, size.height - 90),
            finalPos: cc.p(118, size.height - 350),
            clickable: false
        }
        petBookBtn.setUserData(petBookBtnInfo);
        this.addChild(petBookBtn, 0);
        
        // help
        var helpBtn = makeButton(
            uiLayerRes.help,
            cc.p(118, size.height - 90),
            this.helpBtnTouch,
            this
        );
        helpBtn.setVisible(false);
        
        var helpBtnInfo = {
            initialPos: cc.p(118, size.height - 90),
            finalPos: cc.p(118, size.height - 480),
            clickable: false
        }
        helpBtn.setUserData(helpBtnInfo);
        this.addChild(helpBtn, 0);
        
        // settings
        var settingsBtn = makeButton(
            uiLayerRes.settings,
            cc.p(118, size.height - 90),
            this.settingsBtnTouch,
            this
        );
        settingsBtn.setVisible(false);
        
        var settingsBtnInfo = {
            initialPos: cc.p(118, size.height - 90),
            finalPos: cc.p(118, size.height - 610),
            clickable: false
        }
        settingsBtn.setUserData(settingsBtnInfo);
        this.addChild(settingsBtn, 0);
        
        // save btns
        
        this.menuBtn = toggleBtn;
        this.menuOptions = [
            userBtn,
            petBookBtn,
            helpBtn,
            settingsBtn
        ];
        this.menuVisible = false;
        
        //////////////////////////////
        // 3. add money and diamonds labels
        
        var moneySprite = new cc.Sprite(uiLayerRes.money);
        moneySprite.attr({
            x: 988,
            y: size.height - 75
        });
        this.addChild(moneySprite);
        
        var moneyLabel = new cc.LabelTTF(
            "0000",
            getFontName(fonts.mainTextFont),
            fontsSettings.currencyLabelSize
        );
        moneyLabel.attr({
            x: 1050,
            y: size.height - 75,
            color: fontsSettings.mainTextColor,
            anchorX: 0,
            anchorY: 0.5
        });
        this.addChild(moneyLabel);
        
        var diamondsSprite = new cc.Sprite(uiLayerRes.diamond);
        diamondsSprite.attr({
            x: 988,
            y: size.height - 175
        });
        this.addChild(diamondsSprite);
        
        var diamondsLabel = new cc.LabelTTF(
            "0000",
            getFontName(fonts.mainTextFont),
            fontsSettings.currencyLabelSize
        );
        diamondsLabel.attr({
            x: 1050,
            y: size.height - 175,
            color: fontsSettings.mainTextColor,
            anchorX: 0,
            anchorY: 0.5
        });
        this.addChild(diamondsLabel);
        
        return true;
    },
    toggleMenuBtnTouch: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this.menuVisible) {
                uiAnimator.animateBtnsDisappear(this.menuOptions);
                this.menuVisible = false;
            } else {
                uiAnimator.animateBtnsAppear(this.menuOptions);
                this.menuVisible = true;
            }
        }
    },
    userBtnTouch: function (sender, type) {
        var clickable = sender.getUserData().clickable;
        if (type == ccui.Widget.TOUCH_ENDED && clickable) {
            cc.log("user");
        }
    },
    petbookBtnTouch: function (sender, type) {
        var clickable = sender.getUserData().clickable;
        if (type == ccui.Widget.TOUCH_ENDED && clickable) {
            cc.log("petbook");
        }
    },
    helpBtnTouch: function (sender, type) {
        var clickable = sender.getUserData().clickable;
        if (type == ccui.Widget.TOUCH_ENDED && clickable) {
            cc.log("help");
        }
    },
    settingsBtnTouch: function (sender, type) {
        var clickable = sender.getUserData().clickable;
        if (type == ccui.Widget.TOUCH_ENDED && clickable) {
            cc.log("settings");
        }
    }
});