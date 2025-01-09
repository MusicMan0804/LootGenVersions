//Lootgen script created by Kevin T 2023
const rare = 500;
const huge = 200;
const large = 100;
const medium = 50;
const small = 10; 
const worthless = 5;

let curLoot = ""

const raresClassic = [ "Death Mask", "Gold Sandals", "Ruler's chestplate", "Ruler's Saddle", "Alexandrite (Transp Purple)", "Black Pearl", "Topaz (Transp Yellow)", "Gold Dragon Comb", "Jeweled Bottle Stopper", "Gold Crown", "Orichalcum"];

const hugesClassic = ["Chalace",  "Diamond", "Emerald", "Amethyst", "Ivory Game Set", "Cobra Diadem", "Marble Idol", "Gold Brooch", "Obsidian Idol", "Pearl Necklace", "Gold Music Box", "Platinum Bracelet", "Platinum Anklet"];

const largesClassic = ["Garnet (Transp Red)", "Aquamarine (Transp Teal)", "Peridot (Transp Olive)", "Tourmaline (Transp Pink)", "Boat Model", "Gold Necklace", 
"Gold Ring", "Gold armband", "Gold Diadem", "Amber", "Chrysoberyl (Transp Yellow)", "Coral", "Jade", "Pearl", "Spinel (Transl Red)", "Gold Anklet"];

const mediumsClassic = ["Gold Plated Dagger",  "Mahogany Box", "Ivory Game Pawn", "Silver Necklace", "Silver Ring", "Silver armband", "Silver Diadem", "Bloodstone (Opaque Grey)", "Carnelian (Opaque Orange)",
"Chalcedony (Opaque White)", "Chrysoprase (Transl Green", "Citrine (Transl Yellow)", "Jasper (Opaque Blue)", "Moonstone (Transl White Blue)", "Onyx", "Quartz", "Sardonyx (Opaque Red)", "Zircon (Transl Green)",
 "Stone Relief", "Silver Anklet", "Wooden Game Set"];

const smallsClassic =["Wooden Game Pawn", "Bronze Sword", "Folded Cloak","Stone Statue", "Gladiators Helmet", "Carving of Charioteer", "Hammer", "Water Skin", "Padlock", "Pole", "Cookpot", "Wooden Statue", 
"Clay Statue","Chalice", "Lizard", "Rope", "Wine Bottle", "Azurite (Opaque Blue)", "Agate (Transl Brown)", "Hematite (Opaque Grey)", "Malachite (Opaque Green)", "Lapis Lazuli (Blue)", "Obsidian",
 "Rhodochrosite (Opaque Pink)", "Box of Turqoise Figures", "Hempen Rope", "Bronze Ring", "Tinderbox", "Bound Book", "Iron Anklet"]; 

const worthlessesClassic = ["Amphora", "Piton", "Fishhook", "Pewter Lizard", "Pretty Rock",  "Rags", "Icosahedral Die", "Key",
"Iron Ring", "Iron Chain", "Clay Bowl", "Sandal", "Clay Cup", "Horse Shoe", "Folded Robe",  
"Jug", "Wax Tablet", "Sack", "Small Wheel", "Pulley", "Crab", "String", "Net", "Wooden Game Sticks or Dice", 
"Blank Scroll", "Bone Statuette", "Game Knuckles", "Brass Mug", "Leather Pouch", "Water Skin", "Boot", "Clay Dish", 
"Loaf of Bread", "Olive Oil Bottle", "Arrow", "Belt", "Folded Tunic", "Bottle", "Jar", "Glove", "Wooden Spoon", 
"Eating Utensils", "Iron Pot", "Iron Pan", "Wooden Rod", "Pen", "Charcoal"];


let subBtn = document.getElementById('submit');
let genBtn = document.getElementById('generate');
let chooseBtn = document.getElementById('choose');
let gNumber = document.getElementById('goldAmount');
let treasure = document.getElementById("treasure");
let downloadBtn = document.getElementById("down");

subBtn.addEventListener('click', function() {
    main(gNumber.value);
});

chooseBtn.addEventListener('click', function() {
    generate(0, true);
});

genBtn.addEventListener('click', function() {
    generate(gNumber.value, "");
});

downloadBtn.addEventListener('click', function() {
    download();
});

function main(gold) {
    event.preventDefault();
    document.getElementById("goldAmount").value = "";
    console.log("Main function called");
    if (gold < 0 || gold > 10000) {
        treasure.innerHTML = 'Invalid #!<br>(Valid Range: x > 0 and x <10000)';
    } else {
        let arr = [];
        let itemNum = calcItems(gold)
        arr = getItems(itemNum);
        let str =  "Total: " + gold + "<br>";
        //stringify arr
        for (let i = 0; i < arr.length; i++) {
            str += arr[i] +"<br>";
        }
        curLoot = str;
        treasure.innerHTML = str;
    }
}

function generate(cap, autoCap) {
    console.log("Suggest called got " +autoCap);
    event.preventDefault();
    if (autoCap == true) {
        let dec = Math.floor(Math.random() * 100);
        let sug;
        if (dec <= 65) { //75% chance to be 100gp or less
            sug = Math.floor(Math.random() * 100);
        } else if (dec > 65 && dec <= 95) { //20% chance to be 200 or less
            sug = Math.floor(Math.random() * 200);
        } else { //5% chance will be 400 or less
            sug = Math.floor(Math.random() * 400);
        }

        main(sug);
    } else {
        cap+
        main(Math.floor(Math.random() * cap));
    }
    
}

//This function uses a change algorithm to figure out how many items of each tier are needed
//val is the gold value
function calcItems(val) {
    let rareNum = 0;
    let hugeNum = 0;
    let largeNum = 0;
    let mediumNum = 0;
    let smallNum = 0;
    let worthlessNum = 0;
    let nums = [];
    let rem = 0;


    //get number of rares
    rareNum = Math.floor(val/rare);
    rem = val % rare;
    nums[0] = rareNum;

    hugeNum = Math.floor(rem/huge);
    rem = rem % huge;
    nums[1] = hugeNum;

    largeNum = Math.floor(rem/large);
    rem = rem % large ;
    nums[2] = largeNum;

    mediumNum = Math.floor(rem/medium);
    rem = rem % medium;
    nums[3] = mediumNum;

    let rand = Math.floor(Math.random() * 8);
    if (rand % 2 == 0) {
        smallNum = Math.floor(rem/small);
        rem = rem % small;
        nums[4] = smallNum;
    }

    rand = Math.floor(Math.random() * 4);
    if (rand  < 3) {
        worthlessNum = Math.floor(rem/worthless);
        rem = rem % worthless;
        nums[5] = worthlessNum;
    }

    nums[6] = rem; //bag of remaining gold

    //Deprecated
    //decided against magic items, please remove 
    rand = Math.floor(Math.random() * 1000);
    if (rand == 43) {
        nums[7] = 1;
    }

    rand = Math.floor(Math.random() * 100);
    if (rand == 43) {
        nums[8] = 1;
    }

    

    return nums;
    

}

function getItems(arr) {
    //amount of each rarity needed;
    let rareNum = arr[0];
    let hugeNum = arr[1];
    let largeNum = arr[2];
    let mediumNum = arr[3];
    let smallNum = arr[4];
    let worthlessNum = arr[5];
    let goldNum = arr[6];
    //let magicNum = arr[7];
    let index = 0;
    let j = 0;

    let resArr = [];

    //splits 
    //these have a random chance to split one item into two lower items of a lower tier
    let split = 0;
    for (let i = 0; i < rareNum; i++) {
        split = Math.floor(Math.random() * 100);
        if (split <= 75) {
            rareNum--;
            hugeNum += 2;
        }
    }

    for (let i = 0; i < hugeNum; i++) {
        split = Math.floor(Math.random() * 100);
        if (split <= 50) {
            hugeNum--;
            largeNum += 2;
        }
    }

    for (let i = 0; i < largeNum; i++) {
        split = Math.floor(Math.random() * 100);
        if (split <= 25) {
            largeNum--;
            mediumNum += 2;
        }
    }

    //build arr
    //if (magicNum != 0) {
    //    for (let i = 0; i < magicNum; i++) {
    //        index = Math.floor(Math.random() * magics.length);
    //        let item = magics[index];
    //       resArr[j] = item + "-MA";
    //       j++;
    //    }
    //}

    if (rareNum != 0) {
        for (let i = 0; i < rareNum; i++) {
            index = Math.floor(Math.random() * raresClassic.length);
            let item = raresClassic[index];
            resArr[j] = item + "-400";
            j++;
        }
    }

    if (hugeNum != 0) {
        for (let i = 0; i < hugeNum; i++) {
            index = Math.floor(Math.random() * hugesClassic.length);
            let item = hugesClassic[index];
            resArr[j] = item + "-200";
            j++;
        }
    }

    if (largeNum != 0) {
        for (let i = 0; i < largeNum; i++) {
            index = Math.floor(Math.random() * largesClassic.length);
            let item = largesClassic[index];
            resArr[j] = item + "-100";
            j++;
        }
    }

    if (mediumNum != 0) {
        for (let i = 0; i < mediumNum; i++) {
            index = Math.floor(Math.random() * mediumsClassic.length);
            let item = mediumsClassic[index];
            resArr[j] = item + "-50";
            j++;
        }
    }

    if (smallNum != 0) {
        for (let i = 0; i < smallNum; i++) {
            index = Math.floor(Math.random() * smallsClassic.length);
            let item = smallsClassic[index];
            resArr[j] = item + "-10";
            j++;
        }
    }


    if (worthlessNum != 0) {
        for (let i = 0; i < worthlessNum; i++) {
            index = Math.floor(Math.random() * worthlessesClassic.length);
            let item = worthlessesClassic[index];
            resArr[j] = item + "-5";
            j++;
        }
    }
    //last index is change 
    resArr[j] = "Loose Coins: " + goldNum;
    return resArr;
}
function download() {
    console.log("Attempting download")
    if(curLoot != "") {
        console.log("curloot is not null it is in fact" + curLoot)
        let element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(curLoot));
        element.setAttribute('download', "loot.html");

        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
    }
}