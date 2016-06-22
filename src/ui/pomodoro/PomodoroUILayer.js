var PomodoroUILayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        // ask the window size
        var size = cc.winSize;
        
        this.pomodoroManager = pomodoroManager;
        
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
        
        // start time button
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
        
        // start time button
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
        })
        this.addChild(this.timeLabel, 0);
        
        return true;
    },
    moreTimeBtnTouch: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            pomodoroManager.addPomodoroTime();
            this.resetPomodoroTimeLabel();
        }
    },
    lessTimeBtnTouch: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            pomodoroManager.subtractPomodoroTime();
            this.resetPomodoroTimeLabel();
        }
    },
    startBtnTouch: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            cc.log("start");
        }
    },
    categoriesBtnTouch: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            cc.log("categories");
        }
    },
    resetPomodoroTimeLabel: function() {
        this.timeLabel.setString(
            pomodoroManager.getPomodoroTimeString()
        );
    }
});