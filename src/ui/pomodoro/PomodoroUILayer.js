var PomodoroUILayer = cc.Layer.extend({
    sprite:null,
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
            {
                callback: this.moreTimeBtnTouch,
                receiver: this
            }
        );
        this.addChild(this.more, 0);
        
        // less time button
        this.less = makeButton(
            pomodoroLayerRes.minus, 
            cc.p(
                size.width - 302,
                size.height - 1670
            ), 
            {
                callback: this.lessTimeBtnTouch,
                receiver: this
            }
        );
        this.addChild(this.less, 0);
        
        // start time button
        this.start = makeButton(
            pomodoroLayerRes.start, 
            cc.p(
                size.width - 621,
                size.height - 1900
            ), 
            {
                callback: this.startBtnTouch,
                receiver: this
            }
        );
        this.addChild(this.start, 0);
        
        /////////////////////////////
        // 3. time label
        
        this.timeLabel = new cc.LabelTTF(
            "25:00",
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
        cc.log("more");
    },
    lessTimeBtnTouch: function (sender, type) {
        cc.log("less");
    },
    startBtnTouch: function (sender, type) {
        cc.log("start");
    }
});