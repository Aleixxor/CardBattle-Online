var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const fs = require('fs');

let rawdata = fs.readFileSync('jsonFileData.json');  
let jsonFileData = JSON.parse(rawdata);  
console.log(jsonFileData);



let data = JSON.stringify(cards);  
console.log(data)
let collection="COL001";
let game = "CardBattle";
let cards = createCards(collection);
fs.writeFileSync(game+'/'+collection+'/0-50/cards.json', data);  

function createCards(collection){
    let cards = [];
    let example = {
        "id": "COL001-001",
        "name": "Poção Ruim",
        "type": "item",
        "description": "Cura 10 de vida.",
        "rarity": 1,
        "effects": [
            {
                "heal": 10
            }
        ],
        "imageUrl": ""
    };
    //if(card.type == 'item'){
    //  object + name = card.name
    // }
    let objects = ["Espada de ", "Escudo de ", "Lança de ", "Poção de ", "Tônico de ", "Garras de ", "Orbe de ", "Chicote de ", "Corrente de "];
    let names = ["Lithi","Inrin","Rorad","Franlak","Farmus","Thakhar","Thôrhu","Kisan","Gasdu","Mazbel","Gado","Mokon","Thorro","Geirbrand","Grukgun","Durmae","Sorg'hrím","Clorndur","Drokur","Din","Genfar","Dinri","Toa","Falsmae","Rorai","Dornmargrarg","Clornmê","Nos","Rindan","Fargud","Ba","Mikhaz","Gilkhaz","Thordo","Tolgril","Burtol","Umnu","Thicso","Thithain","Chripgran","Dwado","Avarg","Gorbrand","Avargtho","Náinthu","Lakdar","Dogi","Grímfran","Belgas","Dudo","Thogrím","Thecmarg","Doim","Dáinor","Modin","Tolchrip","Simar","Dwazag","Aran", "Alex", "Aleixxor"];
    // objects.length = 9;
    // names.length = 61;

    //if(card.type == 'attack'){
    //  ataques +" "+ extensoes = card.name
    // }
    let ataques = ["Cortada", "Explosão", "Porrada", "Apunhalada", "Chutada", "Lapada", "Estocada", "Estourada", "Erupção", "Ruptura", "Barreira", "Armadilha", "Corrente", "Sarrada"];
    let extensoes = ["de Cupcakes", "Vulcânica", "de Unicórnios", "Violenta", "Rápida", "de Fogo", "de Chamas Infernais", "de Pipoca", "de Água", "de Pedra", "Relâmpago", "Aquática", "Obscura", "das Trevas", "Luminosa", "Brilhante", "de Luz", "de Vento", "Astral", "Mental", "de Golfinhos", "Lhamal", "Narval", "Cachalote", "Dino", "Dracônica", "Animal", "Selvagem", "Fedorenta", "Cheirosa", "de Borboletas", "Monarca", "Aracnídea", "Silvestre", "das Flores", "Noturna", "Diurna", "Outonal", "Primaveril", "dos Sonhos", "Lunar", "Solar", "das Fadas", "do Amor", "Estelar", "de Corações", "de Pelúcias", "de Ursinhos", "de Pandas", "de Bebês"];
    //ataques.length = 14;
    //extensoes.length = 50;

    let card = {};

    for(let i=1; i<=50; i++){
        
        card.id = getCardID(collection, i);
        let object = objects[randomNumberBetween(0, objects.length-1)];
        let creator = names[randomNumberBetween(0, names.length-1)]
        card.name = object+creator;
        card.type = "item";
        //card.type = "attack";
        card.description = getCardDescription(card);
        function getCardRarity(effects){
            var effectsArray = Object.keys(effects);
            var rarity = 0;
            effectsArray.forEach(effect => {
                rarity = rarity+effects[effect];
            });
            rarity = rarity/100;
            return rarity;
        }

        card.rarity = Object.keys(card.effects).forEach(element => {
            card.effects[element]
        });
        
        console.log(card);

        cards.push({
            "id": collection+"-00"+i,
            "name": "Poção Ruim",
            "type": "item",
            "description": "Cura 10 de vida.",
            "rarity": 1,
            "effects": 
                {
                    "heal": 10
                },
            "imageUrl": ""
        })
    }

    names = shuffle(names);
    
    
    return cards;
}

function getCardDescription(card){
    description = "";
    if(card.effects.heal != undefined){
        description = description+"Cura "+card.effects.heal+" de vida.\n";
    }
    if(card.effects.damage != undefined){
        description = description+"Tira "+card.effects.damage+" de vida.\n";
    }
    if(card.effects.defenseUp != undefined){
        description = description+"Aumenta "+card.effects.defenseUp+" de escudo.\n";
    }
    if(card.effects.defenseDown != undefined){
        description = description+"Diminui "+card.effects.defenseDown+" de escudo.\n";
    }
    if(card.effects.attackUp != undefined){
        description = description+"Aumenta "+card.effects.attackUp+" de escudo.\n";
    }
    if(card.effects.attackDown != undefined){
        description = description+"Diminui "+card.effects.attackDown+" de escudo.\n";
    }
    return description;
}        
function getCardID(collection, i){
    if(i<10){
        card.id = collection+"-00"+i;
    }else if(i<100){
        card.id = collection+"-0"+i;
    }else if(i == 100){
        card.id = collection+"-"+i;
    }
    return id
}

function randomNumberBetween(min_value , max_value) {
    let random_number = Math.random() * (max_value-min_value) + min_value;
    return Math.floor(random_number);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // Enquanto houverem elementos para misturar...
    while (0 !== currentIndex) {

        // Escolhe um dos elementos restantes aleatoriamente...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // E troca com o elemento atual.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

app.get('/', function (req, res) {
    res.send('<h1>API Online</h1>');
});

io.on('connection', function (socket) {
    console.log(`Socket conectado: ${socket.id}`);
    socket.emit('previousMessages', messages);
    socket.broadcast.emit('newUser', newUserMessage);

    socket.on('sendMessage', data => {
        data = encryptDecrypt(data);
        messages.push(data);
        console.log(data);
        socket.broadcast.emit('receivedMessage', encryptDecrypt(data));
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});


http.listen(8080, function () {
    console.log('listening on *:8080');
});
