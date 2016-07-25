function Pomodoro(time, category) {
    var duration = time,
        cateogry = category,
        moneyReward = 0,
        diamondsReward = 0,
        description = "",
        completed = false; // not completed
    
    // Setters & Getters
    
    this.setDuration = function (time) {
        duration = time;
    }
    
    this.setCategory = function (newCategory) {
        category = newCategory;
    }
    
    this.setReward = function (reward) {
        moneyReward = reward.money;
        diamondsReward = reward.diamonds;
    }
    
    this.setDescription = function (newDescription) {
        description = newDescription;
    }
    
    this.setCompleted = function (status) {
        completed = status;
    }
    
    this.getDuration = function () {
        return duration;
    }
    
    this.getCategory = function () {
        return category;
    }
    
    this.getMoneyReward = function () {
        return moneyReward;
    }
    
    this.getDiamondsReward = function () {
        return diamondsReward;
    }
    
    this.getDescription = function () {
        return description;
    }
    
    this.isCompleted = function () {
        return completed;
    }
}