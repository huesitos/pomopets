var PomodoroEvents = function () {
    var pomodoroStarted = "pomodoro_started";
    var pomodoroStopped = "pomodoro_stopped";
    var pomodoroFinished = "pomodoro_finished";
    var pomodoroStandBy = "pomodoro_standby";
    
    function listenerToPomodoroEvent(eventName, callback) {
        var listener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: eventName,
            callback: callback
        });
        
        return listener;
    }
    
    this.listenerToPomodoroStarted = function (callback) {
        return listenerToPomodoroEvent(pomodoroStarted, callback);
    }
    
    this.listenerToPomodoroStopped = function (callback) {
        return listenerToPomodoroEvent(pomodoroStopped, callback);
    }
    
    this.listenerToPomodoroFinished = function (callback) {
        return listenerToPomodoroEvent(pomodoroFinished, callback);
    }
    
    this.listenerToPomodoroStandBy = function (callback) {
        return listenerToPomodoroEvent(pomodoroStandBy, callback);
    }
    
    var dispatchPomodoroEvent = function (eventName, userData) {
        var event = new cc.EventCustom(eventName);
        event.setUserData(userData);
        cc.eventManager.dispatchEvent(event);
    }
    
    this.dispatchPomodoroStarted = function (userData = null) {
        dispatchPomodoroEvent(pomodoroStarted, userData);
    }
    
    this.dispatchPomodoroStopped = function (userData = null) {
        dispatchPomodoroEvent(pomodoroStopped, userData);
    }
    
    this.dispatchPomodoroFinished = function (userData = null) {
        dispatchPomodoroEvent(pomodoroFinished, userData);
    }
    
    this.dispatchPomodoroStandBy = function (userData = null) {
        dispatchPomodoroEvent(pomodoroStandBy, userData);
    }
};

var pomodoroEvents = new PomodoroEvents();