var PetManagerSingleton = (function () {
    var instance;
    
    function PetManager() {
        var currentPet = null;
        var that = this;
        
        this.loadPet = function () {
            var pet = JSON.parse(cc.sys.localStorage.getItem(
                JSON.stringify("currentPetInfo")
            ));
            // if a pet exists, load the pet
            // if it doesn't, create a new default pet
            if (pet) {
                currentPet = new Pet(
                    pet["species"],
                    pet["loyalty"]
                );
                this.setPetAsleep(pet["asleep"]);
            } else {
                currentPet = new Pet("cat");
            }
        }
                
        var savePet = () => {
            var petInfo = {
                species: currentPet.species,
                loyalty: currentPet.loyalty,
                asleep: currentPet.asleep
            }
            
            cc.sys.localStorage.setItem(
                JSON.stringify("currentPetInfo"),
                JSON.stringify(petInfo)
            );
        }
        
        this.getAnimation = function (type) {
            var species = currentPet.species;
            var options = petsRes[species][type].length;
            
            // some types of animation has multiple choices
            var randomChoice = Math.floor(Math.random() * options);
            var selectedAnim = petsRes[species][type][randomChoice];
        
            return selectedAnim;
        }
        
        this.applyLoyaltyReward = function (bonus) {
            var reward = PET_LOYALTY_REWARD + bonus;
            
            currentPet.increaseLoyalty(reward);
            savePet();
        }
        
        this.applyLoyaltyPenalty = function (bonus) {
            var penalty = PET_LOYALTY_PENALTY + bonus;
            
            currentPet.decreaseLoyalty(bonus);
            savePet();
        }
        
        // Pet getters & setters
        
        this.getPetSpecies = function () {
            return currentPet.species;
        }

        this.getPetLoyalty = function () {
            return currentPet.loyalty;
        }

        this.getPetLoyaltyColor = function () {
            var loyalty_level = PET_LOYALTY_LEVELS[Math.floor(currentPet.loyalty)];
            return PET_LOYALTY_COLORS[loyalty_level];
        }

        this.getPetHeartSize = function () {
            // based on the current loyalty, how much should the 
            // scale differ
            var scaleDiff = PET_HEART_SCALE_DIFF * Math.floor(currentPet.loyalty);
            var scale = PET_HEART_STARTING_SCALE + scaleDiff;

            return scale;
        }

        this.isPetAsleep = function () {
            return currentPet.asleep;
        }

        this.setPetAsleep = function (sleep) {
            currentPet.asleep = sleep;
        }
    }
    
    function createInstance() {
        return new PetManager();
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

var petManager = PetManagerSingleton.getInstance();