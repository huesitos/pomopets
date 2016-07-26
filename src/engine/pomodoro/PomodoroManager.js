var PomodoroManagerSingleton = (function () {
    var instance;
    
    function PomodoroManager() {
        var MIN_POMODORO_TIME = 1;
        var MAX_POMODORO_TIME = 60;
        
        var pomodoroRunning = false;
        var pomodoroTime;
        
        var remainingMins = 0,
            remainingSecs = 0;
        
        var lastPomodoro = null;
        
        function loadPomodoroTime() {
            var time = cc.sys.localStorage.getItem(
                JSON.stringify("pomodoroTime")
            );
            
            if (time)
                pomodoroTime = JSON.parse(time);
            else
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
        
        function calculateLoyaltyModifier() {
            // how many minimum - max 0.12
            // how many quarters of the total time - max 0.04
            // if the time was also the max
            var amount_min = (pomodoroTime/MIN_POMODORO_TIME)/100;
            var amount_quarters = MAX_POMODORO_TIME/4 > 0 ? 
                (pomodoroTime/(Math.floor(MAX_POMODORO_TIME/4)))/100 + 1
                 : 1;
            var amount_max = pomodoroTime == MAX_POMODORO_TIME ? 1.10 : 1;
            
            return amount_min * amount_quarters * amount_max;
        }
        
        this.stopPomodoro = function () {
            // stop the pomodoro before it finishes
            pomodoroRunning = false;
            
            // TODO: Get real category
            // TODO: Save pomodoro
            var pomodoro = new Pomodoro(pomodoroTime, 0);
            lastPomodoro = pomodoro;
            
            // loyalty penalty
            petManager.applyLoyaltyPenalty(
                calculateLoyaltyModifier()
            );
            
            pomodoroEvents.dispatchPomodoroStopped();
        }
        
        this.standByPomodoro = function (pomodoroDescription = "") {
            lastPomodoro.setDescription(pomodoroDescription);
            
            // notify transition to pomodoro standby
            pomodoroEvents.dispatchPomodoroStandBy();
        }
        
        this.finishPomodoro = function () {
            pomodoroRunning = false;
            
            // calculates the reward and dispatches the event
            var reward = inventory.calculateReward(pomodoroTime);
            inventory.acceptReward(reward);
            
            // TODO: Get real category
            // TODO: Save pomodoro
            var pomodoro = new Pomodoro(pomodoroTime, 0);
            pomodoro.setReward(reward);
            pomodoro.setCompleted(true);
            lastPomodoro = pomodoro;
            
            // loyalty reward
            petManager.applyLoyaltyReward(
                calculateLoyaltyModifier()
            );
            
            pomodoroEvents.dispatchPomodoroFinished(reward);
        }
        
        this.pomodoroTick = function () {
            // if a minute is over, then start counting again from 59
            // if it isn't, then subtract one second
            if(remainingMins === 0 && remainingSecs === 0) {
                // finish the pomodoro
                this.finishPomodoro();
            }
            
            if (remainingSecs === 0) {
                remainingMins -= 1;
                remainingSecs = 59;
            } else {
                remainingSecs -= 1;
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