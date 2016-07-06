var PomodoroManagerSingleton = (function () {
    var instance;
    
    function PomodoroManager() {
        var MIN_POMODORO_TIME = 5;
        var MAX_POMODORO_TIME = 60;
        
        var pomodoroRunning = false;
        var pomodoroTime;
        
        var remainingMins,
            remainingSecs;
        
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
            var time = pomodoroTime.toString() + ":00";
            
            if (pomodoroTime < 10)
                time = "0" + time;
            
            return time;
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
        
        this.startPomodoro = function () {
            // transform the time so seconds are counted
            remainingMins = pomodoroTime;
            remainingSecs = 0;
            pomodoroRunning = true;
            
            pomodoroEvents.dispatchPomodoroStarted();
        }
        
        this.stopPomodoro = function () {
            // stop the pomodoro before it finishes
            pomodoroRunning = false;
            
            pomodoroEvents.dispatchPomodoroStopped();
        }
        
        this.standByPomodoro = function () {
            pomodoroEvents.dispatchPomodoroStandBy();
        }
        
        this.finishPomodoro = function () {
            // stop the pomodoro when time reaches 0
        }
        
        this.pomodoroTick = function () {
            // if a minute is over, then start counting again from 59
            // if it isn't, then subtract one second
            if (remainingSecs === 0) {
                remainingMins -= 1;
                remainingSecs = 59;
            } else {
                remainingSecs -= 1;
            }
            
            if(remainingMins === 0) {
                // launch event pomodoro ended
                pomodoroRunning = false;
            }
        }
        
        this.getPomodoroRemainingTime = function () {
            var mins = remainingMins.toString();
            var secs = remainingSecs.toString();
            
            if (mins < 10)
                mins = "0" + mins;
            
            if (secs < 10)
                secs = "0" + secs;
            
            return mins + ":" + secs;
        }
        
        this.isPomodoroRunning = function () {
            return pomodoroRunning;
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