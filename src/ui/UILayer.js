var UILayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        
        // ask the window size
        var size = cc.winSize;
        
        //////////////////////////////
        // 2. add menu
        
        // create menu items
        var toggleMenuItem = new cc.MenuItemImage(
            uiLayerRes.menu,
            uiLayerRes.menu,
            this.toggleMenuBtnTouch
        );
        
        var userItem = new cc.MenuItemImage(
            uiLayerRes.user,
            uiLayerRes.user,
            this.userBtnTouch
        );
        
        var categoriesItem = new cc.MenuItemImage(
            uiLayerRes.categories,
            uiLayerRes.categories,
            this.categoriesBtnTouch
        );
        
        var helpItem = new cc.MenuItemImage(
            uiLayerRes.help,
            uiLayerRes.help,
            this.helpBtnTouch
        );
        
        var settingsItem = new cc.MenuItemImage(
            uiLayerRes.settings,
            uiLayerRes.settings,
            this.settingsBtnTouch
        );
        
        // create menu
        
        // gap between menuItems
        var hGap = 50;
        
        // total height of the menu
        var height = hGap * 7 + toggleMenuItem.height / 2;
        
        var menu = new cc.Menu(
            toggleMenuItem, 
            userItem, 
            categoriesItem, 
            helpItem, 
            settingsItem
        );
        menu.attr({
            x: 118,
            y: size.height - height,
            anchorX: 0,
            anchorY: 1
        });
        menu.alignItemsVerticallyWithPadding(hGap);
        this.addChild(menu, 0);
        
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
        cc.log("menu");
    },
    userBtnTouch: function (sender, type) {
        cc.log("user");
    },
    categoriesBtnTouch: function (sender, type) {
        cc.log("categories");
    },
    helpBtnTouch: function (sender, type) {
        cc.log("help");
    },
    settingsBtnTouch: function (sender, type) {
        cc.log("settings");
    }
});