var PomodoroManagerSingleton = (function () {
    var instance;
    
    function PomodoroManager() {
        var MIN_POMODORO_TIME = 5;
        var MAX_POMODORO_TIME = 60;
        var pomodoroTime;
        
        function loadPomodoroTime() {
            var time = cc.sys.localStorage.getItem(
                JSON.stringify("pomodoroTime")
            );
            pomodoroTime = JSON.parse(time);
            
            if (!pomodoroTime)
                pomodoroTime = 25;
        }
        
        loadPomodoroTime();
        
        function savePomodoroTime() {
            cc.sys.localStorage.setItem(
                JSON.stringify("pomodoroTime"),
                JSON.stringify(pomodoroTime)
            );
        }
        
        this.getPomodoroTimeString = function () {
            return pomodoroTime.toString() + ":00";
        }
        
        this.getPomodoroTime = function () {
            return pomodoroTime;
        }
        
        this.addPomodoroTime = function () {
            if (pomodoroTime !== MAX_POMODORO_TIME) {
                pomodoroTime += MIN_POMODORO_TIME;
                
                savePomodoroTime();
            }
        }
        
        this.subtractPomodoroTime = function () {
            if (pomodoroTime !== MIN_POMODORO_TIME) {
                pomodoroTime -= MIN_POMODORO_TIME;
                
                savePomodoroTime();
            }
        }
    }
    
    function createInstance() {
        return new PomodoroManager();
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

var pomodoroManager = PomodoroManagerSingleton.getInstance();