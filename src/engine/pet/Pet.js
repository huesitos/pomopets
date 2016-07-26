var PET_LOYALTY_MIN = 0,
    PET_LOYALTY_MAX = 10,
    PET_LOYALTY_LEVELS = [
        "black", 
        "gray", 
        "purple", 
        "blue", 
        "green", 
        "yellow", 
        "orange", 
        "pink", 
        "red", 
        "gold"
    ],
    PET_LOYALTY_COLORS = {
        black: new cc.Color(0, 0, 0),
        gray: new cc.Color(150, 150, 150),
        purple: new cc.Color(139, 0, 139),
        blue: new cc.Color(0, 0, 255),
        green: new cc.Color(0, 255, 0),
        yellow: new cc.Color(255, 255, 0),
        orange: new cc.Color(0xff, 0x74, 0),
        pink: new cc.Color(255, 192, 203),
        red: new cc.Color(255, 0, 0),
        gold: new cc.Color(255, 215, 0)
    },
    PET_HEART_STARTING_SCALE = 0.4;
    PET_HEART_SCALE_DIFF = (1 - PET_HEART_STARTING_SCALE)/PET_LOYALTY_LEVELS.length,
    PET_LOYALTY_PENALTY = 0.10,
    PET_LOYALTY_REWARD = 0.10;

function Pet(species, loyalty = 0) {
    this.species = species;
    this.loyalty = loyalty;
    this.asleep = false;
    
    this.increaseLoyalty = function (reward = 0) {
        loyalty += reward;
        
        if (loyalty > PET_LOYALTY_MAX)
            loyalty = PET_LOYALTY_MAX;
    }
    
    this.decreaseLoyalty = function (penalty = 0) {
        loyalty -= penalty;
        
        if (loyalty < PET_LOYALTY_MIN)
            loyalty = PET_LOYALTY_MIN;
    }
}