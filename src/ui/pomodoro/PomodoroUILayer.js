var PomodoroUILayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        // ask the window size
        var size = cc.winSize;
        
        /////////////////////////////
        // 2. add buttons
        
        // more time button
        var more = makeButton(
            pomodoroLayerRes.plus, 
            cc.p(
                size.width - 939,
                size.height - 1670
            ), 
            this.moreTimeBtnTouch,
            this
        );
        more.setName("more");
        this.addChild(more, 0);
        
        // less time button
        var less = makeButton(
            pomodoroLayerRes.minus, 
            cc.p(
                size.width - 302,
                size.height - 1670
            ),
            this.lessTimeBtnTouch,
            this
        );
        less.setName("less");
        this.addChild(less, 0);
        
        // start pomodoro button
        var start = makeButton(
            pomodoroLayerRes.start, 
            cc.p(
                size.width - 621,
                size.height - 1900
            ),
            this.startBtnTouch,
            this
        );
        start.setName("start");
        this.addChild(start, 0);
        
        // stop pomodoro button
        var stop = makeButton(
            pomodoroLayerRes.stop, 
            cc.p(
                size.width - 621,
                size.height - 1900
            ),
            this.stopBtnTouch,
            this
        );
        stop.setName("stop");
        stop.setVisible(false);
        this.addChild(stop, 0);
        
        // back button
        var back = makeButton(
            pomodoroLayerRes.back, 
            cc.p(
                size.width - 621,
                size.height - 1900
            ),
            this.backBtnTouch,
            this
        );
        back.setName("back");
        back.setVisible(false);
        this.addChild(back, 0);
        
        // categories change button
        var categories = makeButton(
            pomodoroLayerRes.categories, 
            cc.p(
                350,
                size.height - 1900
            ),
            this.categoriesBtnTouch,
            this
        );
        categories.setName("categories");
        this.addChild(categories, 0);
        
        /////////////////////////////
        // 3. time label
        
        var timeLabel = new cc.LabelTTF(
            pomodoroManager.getPomodoroTimeString(),
            getFontName(fonts.mainTextFont),
            fontsSettings.timeLabelSize
        );
        timeLabel.attr({
            x: size.width - 621,
            y: size.height - 1670,
            color: fontsSettings.mainTextColor
        });
        timeLabel.setName("timeLabel");
        this.addChild(timeLabel, 0);
        
        /////////////////////////////
        // 4. message labels
        
        var messageLabel = new cc.LabelTTF(
            "",
            getFontName(fonts.mainTextFont),
            fontsSettings.normalLabelSize
        );
        messageLabel.attr({
            x: size.width - 621,
            y: size.height - 450,
            color: fontsSettings.mainTextColor,
            visible: false
        });
        messageLabel.setDimensions(
            new cc.size(800, 200)
        );
        messageLabel.setHorizontalAlignment(
            cc.TEXT_ALIGNMENT_CENTER
        );
        messageLabel.setName("messageLabel");
        this.addChild(messageLabel, 0);
        
        /////////////////////////////
        // 5. reward labels and icons
        
        var rewardLabel = new cc.LabelTTF(
            "Reward",
            getFontName(fonts.mainTextFont),
            fontsSettings.normalLabelSize
        );
        rewardLabel.attr({
            x: size.width - 621,
            y: size.height - 1590,
            color: fontsSettings.mainTextColor,
            visible: false
        });
        rewardLabel.setName("rewardLabel");
        this.addChild(rewardLabel);
        
        var labelGap = 20;
        
        // money reward label and icon
        var moneyRewardIcon = new cc.Sprite(uiLayerRes.money);
        moneyRewardIcon.attr({
            x: size.width - 771,
            y: size.height - 1700,
            visible: false
        });
        moneyRewardIcon.setName("moneyRewardIcon");
        this.addChild(moneyRewardIcon);
        
        var moneyLabelX = moneyRewardIcon.getPosition().x +
            moneyRewardIcon.getContentSize().width + 
            labelGap;
        var moneyRewardLabel = new cc.LabelTTF(
            "",
            getFontName(fonts.mainTextFont),
            fontsSettings.currencyLabelSize
        );
        moneyRewardLabel.attr({
            x: moneyLabelX,
            y: size.height - 1700,
            color: fontsSettings.mainTextColor,
            visible: false
        });
        moneyRewardLabel.setName("moneyRewardLabel");
        this.addChild(moneyRewardLabel);
        
        // diamond reward label and icon
        var diamondRewardIcon = new cc.Sprite(uiLayerRes.diamond);
        diamondRewardIcon.attr({
            x: size.width - 571,
            y: size.height - 1700,
            visible: false
        });
        diamondRewardIcon.setName("diamondRewardIcon");
        this.addChild(diamondRewardIcon);
        
        var diamondLabelX = diamondRewardIcon.getPosition().x +
            diamondRewardIcon.getContentSize().width + 
            labelGap;
        var diamondRewardLabel = new cc.LabelTTF(
            "",
            getFontName(fonts.mainTextFont),
            fontsSettings.currencyLabelSize
        );
        diamondRewardLabel.attr({
            x: diamondLabelX,
            y: size.height - 1700,
            color: fontsSettings.mainTextColor,
            visible: false
        });
        diamondRewardLabel.setName("diamondRewardLabel");
        this.addChild(diamondRewardLabel);
        
        this.rewardNodes = [
            rewardLabel,
            moneyRewardLabel,
            diamondRewardLabel,
            moneyRewardIcon,
            diamondRewardIcon
        ];
        
        //////////////////////////////
        // 6. add pomodoro event listener
        
        var lPomodoroFinished = pomodoroEvents.listenerToPomodoroFinished(
            this.pomodoroFinished.bind(this)
        );
        
        cc.eventManager.addListener(lPomodoroFinished, 1);
        
        return true;
    },
    moreTimeBtnTouch: function (sender, type) {
        // add time to the pomodoro time
        if (type == ccui.Widget.TOUCH_ENDED) {
            pomodoroManager.addPomodoroTime();
            this.updatePomodoroTimeLabel(
                pomodoroManager.getPomodoroTimeString()
            );
        }
    },
    lessTimeBtnTouch: function (sender, type) {
        // subtract time to the pomodoro time
        if (type == ccui.Widget.TOUCH_ENDED) {
            pomodoroManager.subtractPomodoroTime();
            this.updatePomodoroTimeLabel(
                pomodoroManager.getPomodoroTimeString()
            );
        }
    },
    startBtnTouch: function (sender, type) {
        // start the next pomodoro
        if (type == ccui.Widget.TOUCH_ENDED) {
            pomodoroManager.startPomodoro();
            this.hideButtons();
            
            var messageLabel = this.getChildByName("messageLabel");
            messageLabel.setString(getRandomPomodoroMessage());
            messageLabel.setVisible(true);
            
            this.schedule(this.runPomodoro, 1);
            this.schedule(this.updateMessage, 30);
        }
    },
    stopBtnTouch: function (sender, type) {
        // start the next pomodoro
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.unschedule(this.runPomodoro);
            this.unschedule(this.updateMessage);
            this.getChildByName("messageLabel").setString(
                getRandomFailureMessage()
            );
            pomodoroManager.stopPomodoro();
            
            this.getChildByName("timeLabel").setVisible(false);
            this.getChildByName("stop").setVisible(false);
            this.getChildByName("back").setVisible(true);
        }
    },
    backBtnTouch: function (sender, type) {
        // start the next pomodoro
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.getChildByName("messageLabel").setVisible(false);
            this.getChildByName("back").setVisible(false);
            this.getChildByName("timeLabel").setVisible(true);
            pomodoroManager.standByPomodoro();
            
            this.showButtons();
            this.hideRewardInformation();
            
            this.updatePomodoroTimeLabel(
                pomodoroManager.getPomodoroTimeString()
            );
        }
    },
    categoriesBtnTouch: function (sender, type) {
        // go to the categories screen
        if (type == ccui.Widget.TOUCH_ENDED) {
            cc.log("categories");
        }
    },
    updatePomodoroTimeLabel: function (time) {
        // update the label to show the remaining time
        // or the selected pomodoro time
        this.getChildByName("timeLabel").setString(
            time
        );
    },
    hideButtons: function () {
        // make buttons disappear when a pomodoro starts
        this.getChildByName("more").setVisible(false);
        this.getChildByName("less").setVisible(false);
        this.getChildByName("start").setVisible(false);
        this.getChildByName("categories").setVisible(false);
        
        this.getChildByName("stop").setVisible(true);
    },
    showButtons: function () {
        // make buttons appear when in standby
        this.getChildByName("more").setVisible(true);
        this.getChildByName("less").setVisible(true);
        this.getChildByName("start").setVisible(true);
        this.getChildByName("categories").setVisible(true);
        
        this.getChildByName("stop").setVisible(false);
    },
    runPomodoro: function (dt) {
        // do this with events??
        pomodoroManager.pomodoroTick();
        
        this.updatePomodoroTimeLabel(
            pomodoroManager.getPomodoroRemainingTime()
        );
    },
    updateMessage: function (dt) {
        // pick another random message
        this.getChildByName("messageLabel").setString(
            getRandomPomodoroMessage()
        );
    },
    showRewardInformation: function () {
        for (var n in this.rewardNodes) {
            this.rewardNodes[n].setVisible(true);
        }
    },
    hideRewardInformation: function () {
        for (var n in this.rewardNodes) {
            this.rewardNodes[n].setVisible(false);
        }
    },
    updateRewardLabels: function (reward) {
        this.getChildByName("moneyRewardLabel").setString(reward.money);
        this.getChildByName("diamondRewardLabel").setString(reward.diamonds);
    },
    pomodoroFinished: function (event) {
        this.unschedule(this.runPomodoro);
        this.unschedule(this.updateMessage);
        
        this.getChildByName("messageLabel").setString(successMessage);
        this.updateRewardLabels(event.getUserData())
        this.showRewardInformation();

        this.getChildByName("timeLabel").setVisible(false);
        this.getChildByName("stop").setVisible(false);
        this.getChildByName("back").setVisible(true);
    }
});