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
        this.more = makeButton(
            pomodoroLayerRes.plus, 
            cc.p(
                size.width - 939,
                size.height - 1670
            ), 
            this.moreTimeBtnTouch,
            this
        );
        this.addChild(this.more, 0);
        
        // less time button
        this.less = makeButton(
            pomodoroLayerRes.minus, 
            cc.p(
                size.width - 302,
                size.height - 1670
            ),
            this.lessTimeBtnTouch,
            this
        );
        this.addChild(this.less, 0);
        
        // start pomodoro button
        this.start = makeButton(
            pomodoroLayerRes.start, 
            cc.p(
                size.width - 621,
                size.height - 1900
            ),
            this.startBtnTouch,
            this
        );
        this.addChild(this.start, 0);
        
        // stop pomodoro button
        this.stop = makeButton(
            pomodoroLayerRes.stop, 
            cc.p(
                size.width - 621,
                size.height - 1900
            ),
            this.stopBtnTouch,
            this
        );
        this.stop.setVisible(false);
        this.addChild(this.stop, 0);
        
        // back button
        this.back = makeButton(
            pomodoroLayerRes.back, 
            cc.p(
                size.width - 621,
                size.height - 1670
            ),
            this.backBtnTouch,
            this
        );
        this.back.setVisible(false);
        this.addChild(this.back, 0);
        
        // categories change button
        this.categories = makeButton(
            pomodoroLayerRes.categories, 
            cc.p(
                350,
                size.height - 1900
            ),
            this.categoriesBtnTouch,
            this
        );
        this.addChild(this.categories, 0);
        
        /////////////////////////////
        // 3. time label
        
        this.timeLabel = new cc.LabelTTF(
            pomodoroManager.getPomodoroTimeString(),
            getFontName(fonts.mainTextFont),
            fontsSettings.timeLabelSize
        );
        this.timeLabel.attr({
            x: size.width - 621,
            y: size.height - 1670,
            color: fontsSettings.mainTextColor
        });
        this.addChild(this.timeLabel, 0);
        
        /////////////////////////////
        // 4. message label
        
        this.messageLabel = new cc.LabelTTF(
            "",
            getFontName(fonts.mainTextFont),
            fontsSettings.normalLabelSize
        );
        this.messageLabel.attr({
            x: size.width - 621,
            y: size.height - 450,
            color: fontsSettings.mainTextColor,
            visible: false
        });
        this.messageLabel.setDimensions(
            new cc.size(800, 200)
        );
        this.messageLabel.setHorizontalAlignment(
            cc.TEXT_ALIGNMENT_CENTER
        );
        this.addChild(this.messageLabel, 0);
        
        //////////////////////////////
        // 5. add pomodoro event listener
        
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
            
            this.schedule(this.runPomodoro, 1);
            this.messageLabel.setString(getRandomPomodoroMessage());
            this.messageLabel.setVisible(true);
            this.schedule(this.updateMessage, 30);
        }
    },
    stopBtnTouch: function (sender, type) {
        // start the next pomodoro
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.unschedule(this.runPomodoro);
            this.unschedule(this.updateMessage);
            this.messageLabel.setString(getRandomFailureMessage());
            pomodoroManager.stopPomodoro();
            
            this.timeLabel.setVisible(false);
            this.stop.setVisible(false);
            this.back.setVisible(true);
        }
    },
    backBtnTouch: function (sender, type) {
        // start the next pomodoro
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.messageLabel.setVisible(false);
            this.back.setVisible(false);
            this.timeLabel.setVisible(true);
            pomodoroManager.standByPomodoro();
            
            this.showButtons();
            
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
        this.timeLabel.setString(
            time
        );
    },
    hideButtons: function () {
        // make buttons disappear when a pomodoro starts
        this.more.setVisible(false);
        this.less.setVisible(false);
        this.start.setVisible(false);
        this.categories.setVisible(false);
        
        this.stop.setVisible(true);
    },
    showButtons: function () {
        // make buttons disappear when a pomodoro starts
        this.more.setVisible(true);
        this.less.setVisible(true);
        this.start.setVisible(true);
        this.categories.setVisible(true);
        
        this.stop.setVisible(false);
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
        this.messageLabel.setString(getRandomPomodoroMessage());
    },
    pomodoroFinished: function (event) {
        this.unschedule(this.runPomodoro);
        this.unschedule(this.updateMessage);
        
        this.messageLabel.setString(successMessage);
        pomodoroManager.stopPomodoro();

        this.timeLabel.setVisible(false);
        this.stop.setVisible(false);
        this.back.setVisible(true);
    }
});