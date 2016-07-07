var InventorySingleton = (function () {
    var instance;
    
    function Inventory() {
        var money = 0,
            diamonds = 0;
        
        function loadInventory() {
            var m = cc.sys.localStorage.getItem(
                JSON.stringify("money")
            );
            money = JSON.parse(m);
            
            var d = cc.sys.localStorage.getItem(
                JSON.stringify("diamonds")
            );
            diamonds = JSON.parse(d);
            
            if (!diamonds)
                diamonds = 0;
            if (!money)
                money = 0;
        }
        
        loadInventory();
        
        function saveInventory() {
            cc.sys.localStorage.setItem(
                JSON.stringify("money"),
                JSON.stringify(money)
            );
            cc.sys.localStorage.setItem(
                JSON.stringify("diamonds"),
                JSON.stringify(diamonds)
            );
        }
        
        this.calculateReward = function (time) {
            // calculates the reward based on the pomodoro time

            // TODO: function to calculate reward

            var reward = new Reward(10, 1);

            return reward;
        }

        this.acceptReward = function (reward) {
            money += reward.money;
            diamonds += reward.diamonds;
            
            saveInventory();
        }

        this.isAffordableWithMoney = function (price) {
            return price <= money;
        }

        this.isAffordableWithDiamonds = function (price) {
            return price <= diamonds;
        }
        
        this.getMoney = function () {
            return money;
        }
        
        this.getDiamonds = function () {
            return diamonds;
        }

        this.spendMoney = function (money) {
            money -= money;
        }

        this.spendDiamonds = function (diamonds) {
            diamonds -= diamonds;
        }

        this.addOutfit = function (outfit) {
            outfits.push(outfit);
        }

        this.getOutfits = function () {
            return outfits.slice();
        }

        this.addFood = function (food) {
            foods.push(food);
        }

        this.getFoods = function () {
            return foods.slice();
        }

        this.addPet = function (pet) {
            pets.push(pet);
        }

        this.getPets = function () {
            return pets.slice();
        }
    }
    
    function createInstance() {
        return new Inventory();
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

var inventory = InventorySingleton.getInstance();

function Reward(money, diamonds) {
    this.money = money;
    this.diamonds = diamonds;
}