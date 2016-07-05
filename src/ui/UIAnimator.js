var UIAnimatorSingleton = (function (){
    var instance;
    
    function UIAnimator() {
        this.animateBtnsAppear = MenuAnimations.animateBtnsAppear;
        
        this.animateBtnsDisappear = MenuAnimations.animateBtnsDisappear;
    }
    
    
    function createInstance() {
        return new UIAnimator();
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

var uiAnimator = UIAnimatorSingleton.getInstance();