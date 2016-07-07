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
        
        this.moneySprite = new cc.Sprite(uiLayerRes.money);
        this.moneySprite.attr({
            x: 988,
            y: size.height - 75
        });
        this.addChild(this.moneySprite);
        
        this.moneyLabel = new cc.LabelTTF(
            inventory.getMoney().toString(),
            getFontName(fonts.mainTextFont),
            fontsSettings.currencyLabelSize
        );
        this.moneyLabel.attr({
            x: 1050,
            y: size.height - 75,
            color: fontsSettings.mainTextColor,
            anchorX: 0,
            anchorY: 0.5
        });
        this.addChild(this.moneyLabel);
        
        this.diamondsSprite = new cc.Sprite(uiLayerRes.diamond);
        this.diamondsSprite.attr({
            x: 988,
            y: size.height - 175
        });
        this.addChild(this.diamondsSprite);
        
        this.diamondsLabel = new cc.LabelTTF(
            inventory.getDiamonds().toString(),
            getFontName(fonts.mainTextFont),
            fontsSettings.currencyLabelSize
        );
        this.diamondsLabel.attr({
            x: 1050,
            y: size.height - 175,
            color: fontsSettings.mainTextColor,
            anchorX: 0,
            anchorY: 0.5
        });
        this.addChild(this.diamondsLabel);
        
        //////////////////////////////
        // 6. add pomodoro event listener
        
        var lPomodoroStarted = pomodoroEvents.listenerToPomodoroStarted(
            this.pomodoroStarted.bind(this)
        );
        var lPomodoroStopped = pomodoroEvents.listenerToPomodoroStopped(
            this.pomodoroStopped.bind(this)
        );
        var lPomodoroFinished = pomodoroEvents.listenerToPomodoroFinished(
            this.pomodoroFinished.bind(this)
        );
        var lPomodoroStandBy = pomodoroEvents.listenerToPomodoroStandBy(
            this.pomodoroStandBy.bind(this)
        );
        
        cc.eventManager.addListener(lPomodoroStarted, 1);
        cc.eventManager.addListener(lPomodoroStopped, 1);
        cc.eventManager.addListener(lPomodoroFinished, 1);
        cc.eventManager.addListener(lPomodoroStandBy, 1);
        
        return true;
    },
    toggleMenuBtnTouch: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.toggleBtns();
        }
    },
    toggleBtns: function () {
        if(this.menuVisible) {
          this.menuVisible = false;
          uiAnimator.animateBtnsDisappear(this.menuOptions);
        } else {
          this.menuVisible = true;
          uiAnimator.animateBtnsAppear(this.menuOptions);
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
    },
    showCurrency: function () {
        this.moneyLabel.setVisible(true);
        this.moneySprite.setVisible(true);
        this.diamondsLabel.setVisible(true);
        this.diamondsSprite.setVisible(true);
    },
    hideCurrency: function () {
        this.moneyLabel.setVisible(false);
        this.moneySprite.setVisible(false);
        this.diamondsLabel.setVisible(false);
        this.diamondsSprite.setVisible(false);
    },
    updateMoneyLabel: function (money) {
        this.moneyLabel.setString(
            inventory.getMoney().toString()
        );
    },
    updateDiamondsLabel: function (diamonds) {
        this.diamondsLabel.setString(
            inventory.getDiamonds().toString()
        );
    },
    pomodoroStarted: function (event) {
        this.menuBtn.setVisible(false);
        this.menuOptions.map(btn => btn.setVisible(false));
        
        this.hideCurrency();
        
        // hide menu if it is visible
        if(this.menuVisible) {
            this.menuVisible = false;
            uiAnimator.animateBtnsDisappear(this.menuOptions);
        }
    },
    pomodoroStopped: function (event) {
        this.showCurrency();
    },
    pomodoroFinished: function (event) {
        // update the currency and money labels
        var reward = event.getUserData();
        
        this.showCurrency();
        
        this.updateMoneyLabel();
        this.updateDiamondsLabel();
    },
    pomodoroStandBy: function (event) {
        this.menuBtn.setVisible(true);
    }
});