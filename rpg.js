"use scrict";

let player = {};
let enemy = {};
let combat = ["1", "1"];
let menu = {
    text: "",
}

function do_action(attaquant, attack) {
    console.log(attack.name);
    if (attaquant.attacks[attack.name].type_att === "pv-") {
        attaquant.enemy.pv -= attaquant.attacks[attack.name].pui * (attaquant.att / 100) - attaquant.enemy.def / 10;
        if (attaquant.enemy.pv < 0) {
            attaquant.enemy.pv = 0;
        }
    }
    if (attaquant.attacks[attack.name].type_att === "pv+") {
        attaquant.pv += attaquant.attacks[attack.name].pui * (attaquant.spe / 100)
        if (attaquant.pv > attaquant.pv_max) {
            attaquant.pv = attaquant.pv_max;
        }
    }
    if (attaquant.attacks[attack.name].type_att.substring(0, 6) === "boost+") {
        attaquant[attaquant.attacks[attack.name].type_att.substring(-1, 3)] += attaquant.attacks[attack.name].pui * (attaquant.spe / 100)
    }
    if (attaquant.attacks[attack.name].type_att.substring(0, 6) === "boost-") {
        attaquant.enemy[attaquant.attacks[attack.name].type_att.substring(-1, 3)] -= attaquant.attacks[attack.name].pui * (attaquant.spe / 100)
    }
    if (attaquant.attacks[attack.name].type_att.substring(0, 2) === "ct") {
        if (attaquant[attack.name].type_att.substring(-1, 5) === "enemy") {
            attaquant.type = attaquant.enemy.type;
        } else {
            attaquant.type = attaquant[attack.name].type_att.split('-')[1];
        }
    }
    if (attaquant.attacks[attack.name].type_att === "pre-") {
        for (att in attaquant.enemy.attacks) {
            attaquant.enemy.attacks[att].pre -= attaquant.enemy.attacks[att].pre * (attaquant.attacks[attack.name].pui / 100);
        }
    }
    return attaquant;
}

function tab_contain(tab, value) {
    for (let i = 0; i < tab.length; i++) {
        if (tab[i] === value) {
            return true;
        }
    }
    return false;
}

function action(attaquant, attack) {
    if (attaquant.attacks[attack.name].pp > 0) {
        if (!tab_contain(attaquant.enemy.type, attaquant.attacks[attack.name].type_imu)) {
            if (Math.random() <= attaquant.attacks[attack.name].pre) {
                attaquant = do_action(attaquant, attack);
                menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`;
            } else {
                menu.text = `${attaquant.name} rate ${attaquant.attacks[attack.name].name}`;
            }
        } else {
            menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy.name} est imunisé`;
        }
        attaquant.attacks[attack.name].pp--;
    } else {
        menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
    }
    aff_lifebar(enemy);
    return attaquant;
};

function get_clone(clone) {
    let out = {};
    for (let stat in clone) {
        out[stat] = clone[stat];
    }
    return out;
}

let attacks = {
    Abime: {
        name: "Abime",
        type: "sol",
        type_imu: "vol",
        pp: 5,
        pre: 0.3,
        pui: 1000000,
        type_att: "pv-",
        action: action
    },
    Acidarmure: {
        name: "Acidarmure",
        type: "Poison",
        type_imu: undefined,
        pp: 40,
        pre: 1,
        pui: 20,
        type_att: "boost+def",
        action: action
    },
    Acide: {
        name: "Acide",
        type: "Poison",
        type_imu: undefined,
        pp: 30,
        pre: 1,
        pui: 40,
        type_att: "pv-",
        action: action
    },
    Adaptation: {
        name: "Adaptation",
        type: "normal",
        type_imu: "spectre",
        pp: 30,
        pre: 1,
        pui: -1,
        type_att: "ct-enemy",
        action: action
    },
    Affutage: {
        name: "Affutage",
        type: "normal",
        type_imu: "spectre",
        pp: 30,
        pre: 1,
        pui: 10,
        type_att: "boost+att",
        action: action
    },
    Amnesie: {
        name: "Amnesie",
        type: "psy",
        type_imu: undefined,
        pp: 20,
        pre: 1,
        pui: 20,
        type_att: "boost+spe",
        action: action
    },
    Armure: {
        name: "Armure",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pre: 1,
        pui: 10,
        type_att: "boost+def",
        action: action
    },
    Balayage: {
        name: "Balayage",
        type: "combat",
        type_imu: "spectre",
        pp: 30,
        pre: 0.9,
        pui: 50,
        type_att: "pv-",
        action: action
    },
    Bec_vrille: {
        name: "Bec_vrille",
        type: "vol",
        type_imu: undefined,
        pp: 20,
        pre: 1,
        pui: 80,
        type_att: "pv-",
        action: action
    },
    Belier: {
        name: "Belier",
        type: "normal",
        type_imu: "undefined",
        pp: 20,
        pre: 0.85,
        pui: 90,
        type_att: "pv-",
        action: action
    },
    Blizzard: {
        name: "Blizzard",
        type: "grace",
        type_imu: undefined,
        pp: 5,
        pre: 0.9,
        pui: 120,
        type_att: "pv-",
        action: action
    },
    Bomb_oeuf: {
        name: "Bomb_oeuf",
        type: "normal",
        type_imu: undefined,
        pp: 10,
        pre: 0.75,
        pui: 100,
        type_att: "pv-",
        action: action
    },
    Bouclier: {
        name: "Bouclier",
        type: "psy",
        type_imu: undefined,
        pp: 10,
        pre: 1,
        pui: 20,
        type_att: "boost+def",
        action: action
    },
    Boul_armure: {
        name: "Boul_armure",
        type: "normal",
        type_imu: undefined,
        pp: 40,
        pre: 1,
        pui: 10,
        type_att: "boost+def",
        action: action
    },
    Bulles_D_O: {
        name: "Bulles_D_O",
        type: "eau",
        type_imu: undefined,
        pp: 20,
        pre: 1,
        pui: 65,
        type_att: "pv-",
        action: action
    },
    Cascade: {
        name: "Cascade",
        type: "eau",
        type_imu: undefined,
        pp: 15,
        pre: 1,
        pui: 80,
        type_att: "pv-",
        action: action
    },
    Charge: {
        name: "Charge",
        type: "normal",
        type_imu: "spectre",
        pp: 35,
        pre: 0.95,
        pui: 35,
        type_att: "pv-",
        action: action
    },
    Choc_mental: {
        name: "Choc_mental",
        type: "psy",
        type_imu: undefined,
        pp: 25,
        pre: 1,
        pui: 50,
        type_att: "pv-",
        action: action
    },
    Combo_griffe: {
        name: "Combo_griffe",
        type: "normal",
        type_imu: undefined,
        pp: 15,
        pre: 0.8,
        pui: 18 * (Math.random() * 4 + 1),
        type_att: "pv-",
        action: action
    },
    Constriction: {
        name: "Constriction",
        type: "normal",
        type_imu: "spectre",
        pp: 35,
        pre: 1,
        pui: 10,
        type_att: "pv-",
        action: action
    },
    Coud_boule: {
        name: "Coud_boule",
        type: "normal",
        type_imu: "spectre",
        pp: 15,
        pui: 70,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Coud_krane: {
        name: "Coud_krane",
        type: "normal",
        type_imu: "spectre",
        pp: 15,
        pui: 100,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Coupe: {
        name: "Coupe",
        type: "normal",
        type_imu: "spectre",
        pp: 30,
        pui: 50,
        pre: 0.95,
        type_att: "pv-",
        action: action
    },
    Coupe_vent: {
        name: "Coupe_vent",
        type: "normal",
        type_imu: "spectre",
        pp: 10,
        pui: 80,
        pre: 0.75,
        type_att: "pv-",
        action: action
    },
    Croc_de_mort: {
        name: "Croc_de_mort",
        type: "normal",
        type_imu: "spectre",
        pp: 15,
        pui: 80,
        pre: 0.70,
        type_att: "pv-",
        action: action
    },
    Croissance: {
        name: "Croissance",
        type: "normal",
        type_imu: "spectre",
        pp: 40,
        pui: 10,
        pre: 1,
        type_att: "boost+spe",
        action: action
    },
    Cru_aile: {
        name: "Cru_aile",
        type: "vol",
        type_imu: undefined,
        pp: 35,
        pui: 35,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Damocles: {
        name: "Damocles",
        type: "normal",
        type_imu: "spectre",
        pp: 10,
        pui: 100,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Danse_Fleur: {
        name: "Danse_Fleur",
        type: "plante",
        type_imu: undefined,
        pp: 20,
        pui: 70,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Danse_Lames: {
        name: "Danse_Lames",
        type: "normal",
        type_imu: "spectre",
        pp: 30,
        pui: 10,
        pre: 1,
        type_att: "boost+att",
        action: action
    },
    Dard_Nuee: {
        name: "Dard_Nuee",
        type: "Insecte",
        type_imu: undefined,
        pp: 20,
        pui: 14 * (Math.random * 3),
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Dard_Venin: {
        name: "Dard_Venin",
        type: "poison",
        type_imu: undefined,
        pp: 35,
        pui: 15 * (Math.random * 3),
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Deflagration: {
        name: "Deflagration",
        type: "feu",
        type_imu: undefined,
        pp: 5,
        pui: 120,
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Detritus: {
        name: "Detritus",
        type: "poison",
        type_imu: undefined,
        pp: 20,
        pui: 65,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Devoreve: {
        name: "Devoreve",
        type: "psy",
        type_imu: undefined,
        pp: 15,
        pui: 100,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Double_Dard: {
        name: "Double_Dard",
        type: "insecte",
        type_imu: undefined,
        pp: 20,
        pui: 25,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Double_pied: {
        name: "Double_pied",
        type: "combat",
        type_imu: "spectre",
        pp: 30,
        pui: 60,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Draco_rage: {
        name: "Draco_rage",
        type: "dragon",
        type_imu: undefined,
        pp: 10,
        pui: 40,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Eboulement: {
        name: "Eboulement",
        type: "roche",
        type_imu: undefined,
        pp: 10,
        pui: 80,
        pre: 0.9,
        type_att: "pv-",
        action: action
    },
    Eclair: {
        name: "Eclair",
        type: "electrik",
        type_imu: "sol",
        pp: 30,
        pui: 40,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    E_coque: {
        name: "E_coque",
        type: "normal",
        type_imu: "spectre",
        pp: 10,
        pui: 50,
        pre: 1,
        type_att: "pv+",
        action: action
    },
    Ecrasement: {
        name: "Ecrasement",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pui: 65,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Ecras_face: {
        name: "Ecras_face",
        type: "normal",
        type_imu: "spectre",
        pp: 35,
        pui: 40,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Ecume: {
        name: "Ecume",
        type: "eau",
        type_imu: undefined,
        pp: 30,
        pui: 20,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Empal_Korne: {
        name: "Empal_Korne",
        type: "normal",
        type_imu: "spectre",
        pp: 5,
        pui: 1000000,
        pre: 0.3,
        type_att: "pv-",
        action: action
    },
    Fatal_foudre: {
        name: "Fatal_foudre",
        type: "electrik",
        type_imu: "sol",
        pp: 10,
        pui: 120,
        pre: 0.7,
        type_att: "pv-",
        action: action
    },
    Flammeche: {
        name: "Flammeche",
        type: "feu",
        type_imu: "sol",
        pp: 25,
        pui: 40,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Flash: {
        name: "Flash",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pui: 10,
        pre: 0.7,
        type_att: "pre-",
        action: action
    },
    Force: {
        name: "Force",
        type: "normal",
        type_imu: "spectre",
        pp: 15,
        pui: 80,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Force_Poigne: {
        name: "Force_Poigne",
        type: "normal",
        type_imu: "spectre",
        pp: 30,
        pui: 55,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Fouet_Lianes: {
        name: "Fouet_Lianes",
        type: "plante",
        type_imu: undefined,
        pp: 10,
        pui: 35,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Frappe_Atlas: {
        name: "Frappe_Atlas",
        type: "combat",
        type_imu: "spectre",
        pp: 20,
        pui: 50,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Frenesie: {
        name: "Frenesie",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pui: 20,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Furie: {
        name: "Furie",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pui: 15 * (Math.random * 3),
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Griffe: {
        name: "Griffe",
        type: "normal",
        type_imu: "spectre",
        pp: 30,
        pui: 40,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Grincement: {
        name: "Grincement",
        type: "normal",
        type_imu: "spectre",
        pp: 40,
        pui: 10,
        pre: 0.85,
        type_att: "boost-def",
        action: action
    },
    Groz_Yeux: {
        name: "Groz_Yeux",
        type: "normal",
        type_imu: "spectre",
        pp: 30,
        pui: 10,
        pre: 100,
        type_att: "boost-def",
        action: action
    },
    Guillotine: {
        name: "Guillotine",
        type: "normal",
        type_imu: "spectre",
        pp: 5,
        pui: 10000000,
        pre: 0.3,
        type_att: "boost-def",
        action: action
    },
    Hate: {
        name: "Hate",
        type: "psy",
        type_imu: undefined,
        pp: 30,
        pui: 10,
        pre: 1,
        type_att: "boost-vit",
        action: action
    },
    Hydrocanon: {
        name: "Hydrocanon",
        type: "eau",
        type_imu: undefined,
        pp: 5,
        pui: 120,
        pre: 0.8,
        type_att: "pv-",
        action: action
    },
    Jet_de_sable: {
        name: "Jet_de_sable",
        type: "normal",
        type_imu: "spectre",
        pp: 15,
        pui: 10,
        pre: 1,
        type_att: "pre-",
        action: action
    },
    Jet_pierre: {
        name: "Jet_pierre",
        type: "roche",
        type_imu: undefined,
        pp: 15,
        pui: 60,
        pre: 0.75,
        type_att: "pv-",
        action: action
    },
    Koud_Korne: {
        name: "Koud_Korne",
        type: "normal",
        type_imu: "spectre",
        pp: 25,
        pui: 65,
        pre: 1,
        type_att: "pv-",
        action: action
    },

}

function getRandomkeys(obj) {
    let i = 0;
    for (key in obj) {
        i++;
    }
    let rand = getRandomInt(0, i);
    i = 0;
    for (key in obj) {
        if (i === rand) {
            return key;
        }
        i++;
    }
}

function get_rand_att(attacks) {
    rand0 = getRandomkeys(attacks);
    rand1 = getRandomkeys(attacks);
    rand2 = getRandomkeys(attacks);
    rand3 = getRandomkeys(attacks);
    let out = {};
    out[attacks[rand0].name] = attacks[rand0];
    out[attacks[rand1].name] = attacks[rand1];
    out[attacks[rand2].name] = attacks[rand2];
    out[attacks[rand3].name] = attacks[rand3];
    return out;
}

let pkms = [{
    name: "Bulbizarre",
    img: "img/pkm/Bulbizarre.png",
    type: ["plante", "poison"],
    pv: 45,
    pv_max: 45,
    att: 49,
    def: 49,
    vit: 45,
    spe: 65,
    attacks: {
        Abime: get_clone(attacks.Abime),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        Belier: get_clone(attacks.Belier),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Herbizarre",
    img: "img/pkm/Herbizarre.png",
    type: ["plante", "poison"],
    pv: 60,
    pv_max: 60,
    att: 62,
    def: 63,
    vit: 60,
    spe: 80,
    attacks: {
        Abime: get_clone(attacks.Abime),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        Belier: get_clone(attacks.Belier),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Florizarre",
    img: "img/pkm/Florizarre.png",
    type: ["plante", "poison"],
    pv: 80,
    pv_max: 80,
    att: 82,
    def: 82,
    vit: 80,
    spe: 100,
    attacks: {
        Abime: get_clone(attacks.Abime),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        Belier: get_clone(attacks.Belier),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Salamèche",
    img: "img/pkm/Salamèche.png",
    type: ["feu"],
    pv: 39,
    pv_max: 39,
    att: 52,
    def: 43,
    vit: 65,
    spe: 50,
    attacks: {
        Abime: get_clone(attacks.Abime),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        Belier: get_clone(attacks.Belier),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Reptincel",
    img: "img/pkm/Reptincel.png",
    type: ["feu"],
    pv: 58,
    pv_max: 58,
    att: 64,
    def: 58,
    vit: 80,
    spe: 65,
    attacks: {
        Abime: get_clone(attacks.Abime),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        Belier: get_clone(attacks.Belier),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Dracaufeu",
    img: "img/pkm/Dracaufeu.png",
    type: ["feu", "vol"],
    pv: 78,
    pv_max: 78,
    att: 84,
    def: 78,
    vit: 100,
    spe: 85,
    attacks: {
        Abime: get_clone(attacks.Abime),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        Belier: get_clone(attacks.Belier),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Carapuce",
    img: "img/pkm/Carapuce.png",
    type: ["eau"],
    pv: 44,
    pv_max: 44,
    att: 48,
    def: 65,
    vit: 43,
    spe: 50,
    attacks: {
        Abime: get_clone(attacks.Abime),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        Belier: get_clone(attacks.Belier),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Carabaffe",
    img: "img/pkm/Carabaffe.png",
    type: ["eau"], // 59 - 63 - 80 - 58 - 65
    pv: 59,
    pv_max: 59,
    att: 63,
    def: 80,
    vit: 58,
    spe: 65,
    attacks: {
        Abime: get_clone(attacks.Abime),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        Belier: get_clone(attacks.Belier),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Tortank",
    img: "img/pkm/Tortank.png",
    type: ["eau"], //79 - 83 - 100 - 78 - 85
    pv: 79,
    pv_max: 79,
    att: 83,
    def: 100,
    vit: 78,
    spe: 85,
    attacks: {
        Abime: get_clone(attacks.Abime),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        Belier: get_clone(attacks.Belier),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Chenipan",
    img: "img/pkm/Chenipan.png",
    type: ["insect"],
    pv: 45,
    pv_max: 45,
    att: 30,
    def: 35,
    vit: 45,
    spe: 20,
    attacks: {
        Abime: get_clone(attacks.Abime),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        Belier: get_clone(attacks.Belier),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Chrysacier",
    img: "img/pkm/Chrysacier.png",
    type: ["insect"], //50 - 20 - 55 - 30 - 25
    pv: 50,
    pv_max: 50,
    att: 20,
    def: 55,
    vit: 30,
    spe: 25,
    attacks: {
        Abime: get_clone(attacks.Abime),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        Belier: get_clone(attacks.Belier),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Papilusion",
    img: "img/pkm/Papilusion.png",
    type: ["insect", "vol"], //60 - 45 - 50 - 70 - 80
    pv: 60,
    pv_max: 60,
    att: 45,
    def: 50,
    vit: 70,
    spe: 80,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Aspicot",
    img: "img/pkm/Aspicot.png",
    type: ["insect", "poison"],
    pv: 40,
    pv_max: 40,
    att: 35,
    def: 30,
    vit: 50,
    spe: 20,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Coconfort",
    img: "img/pkm/Coconfort.png",
    type: ["insect", "poison"], //45 - 25 - 50 - 35 - 25
    pv: 45,
    pv_max: 45,
    att: 25,
    def: 50,
    vit: 35,
    spe: 25,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Dardargnan",
    img: "img/pkm/Dardargnan.png",
    type: ["insect", "poison"], //65 - 80 - 40 - 75 - 45
    pv: 65,
    pv_max: 65,
    att: 80,
    def: 40,
    vit: 75,
    spe: 45,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Roucool",
    img: "img/pkm/Roucool.png",
    type: ["normal", "vol"], //40 - 45 - -40 - 56 - 35
    pv: 40,
    pv_max: 40,
    att: 45,
    def: 40,
    vit: 56,
    spe: 35,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Roucoups",
    img: "img/pkm/Roucoups.png",
    type: ["normal", "vol"], //63 - 60 - 55 - 71 - 50
    pv: 63,
    pv_max: 63,
    att: 60,
    def: 55,
    vit: 71,
    spe: 50,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Rattata",
    img: "img/pkm/Rattata.png",
    type: ["normal"], //30 - 56 - 35 - 72 - 25
    pv: 30,
    pv_max: 30,
    att: 56,
    def: 35,
    vit: 72,
    spe: 25,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Rattatac",
    img: "img/pkm/Rattatac.png",
    type: ["normal"], //55 - 81 - 60 - 97 - 50
    pv_max: 55,
    pv: 55,
    att: 81,
    def: 60,
    vit: 97,
    spe: 50,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Piafabec",
    img: "img/pkm/Piafabec.png",
    type: ["normal", "vol"], //40 - 60 - 30 - 70 - 31
    pv_max: 40,
    pv: 40,
    att: 60,
    def: 30,
    vit: 70,
    spe: 31,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Rapasdepic",
    img: "img/pkm/Rapasdepic.png",
    type: ["normal", "vol"],
    pv_max: 65,
    pv: 65,
    att: 90,
    def: 65,
    vit: 100,
    spe: 61,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Abo",
    img: "img/pkm/Abo.png",
    type: ["poison"],
    pv_max: 35,
    pv: 35,
    att: 60,
    def: 44,
    vit: 55,
    spe: 40,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Arbok",
    img: "img/pkm/Arbok.png",
    type: ["poison"],
    pv_max: 60,
    pv: 60,
    att: 85,
    def: 69,
    vit: 80,
    spe: 65,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Pikachu",
    img: "img/pkm/Pikachu,.png",
    type: ["electrik"],
    pv_max: 35,
    pv: 35,
    att: 55,
    def: 30,
    vit: 90,
    spe: 50,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Raichu",
    img: "img/pkm/Raichu,.png",
    type: ["electrik"],
    pv_max: 60,
    pv: 60,
    att: 90,
    def: 55,
    vit: 100,
    spe: 90,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Sabelette",
    img: "img/pkm/Sabelette,.png",
    type: ["sol"],
    pv_max: 50,
    pv: 50,
    att: 75,
    def: 85,
    vit: 40,
    spe: 30,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Sablaireau",
    img: "img/pkm/Sablaireau,.png",
    type: ["sol"],
    pv_max: 75,
    pv: 75,
    att: 100,
    def: 110,
    vit: 65,
    spe: 55,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Nidoran_F",
    img: "img/pkm/Nidoran_F,.png",
    type: ["poison"],
    pv_max: 55,
    pv: 55,
    att: 47,
    def: 52,
    vit: 41,
    spe: 40,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Nidorina",
    img: "img/pkm/Nidorina,.png",
    type: ["poison"],
    pv_max: 70,
    pv: 70,
    att: 62,
    def: 67,
    vit: 56,
    spe: 55,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Nidoqueen",
    img: "img/pkm/Nidoqueen,.png",
    type: ["poison", "sol"],
    pv_max: 90,
    pv: 90,
    att: 82,
    def: 87,
    vit: 76,
    spe: 75,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Nidoran_M",
    img: "img/pkm/Nidoran_M,.png",
    type: ["poison"],
    pv_max: 46,
    pv: 46,
    att: 57,
    def: 40,
    vit: 50,
    spe: 40,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Nidorino",
    img: "img/pkm/Nidorino,.png",
    type: ["poison"],
    pv_max: 61,
    pv: 61,
    att: 72,
    def: 57,
    vit: 65,
    spe: 55,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Nidoking",
    img: "img/pkm/Nidoking,.png",
    type: ["poison", "sol"],
    pv_max: 81,
    pv: 81,
    att: 92,
    def: 77,
    vit: 85,
    spe: 75,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Mélofée",
    img: "img/pkm/Mélofée.png",
    type: ["normal"],
    pv_max: 70,
    pv: 70,
    att: 45,
    def: 48,
    vit: 35,
    spe: 60,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Mélodelfe",
    img: "img/pkm/Mélodelfe.png",
    type: ["normal"],
    pv_max: 95,
    pv: 95,
    att: 70,
    def: 73,
    vit: 60,
    spe: 85,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Goupix",
    img: "img/pkm/Goupix.png",
    type: ["feu"],
    pv_max: 95,
    pv: 95,
    att: 70,
    def: 73,
    vit: 60,
    spe: 85,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Feunard",
    img: "img/pkm/Feunard.png",
    type: ["feu"],
    pv_max: 73,
    pv: 73,
    att: 76,
    def: 75,
    vit: 100,
    spe: 100,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Rondoudou",
    img: "img/pkm/Rondoudou.png",
    type: ["normal"],
    pv_max: 115,
    pv: 115,
    att: 45,
    def: 20,
    vit: 20,
    spe: 25,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Grodoudou",
    img: "img/pkm/Grodoudou.png",
    type: ["normal"],
    pv_max: 140,
    pv: 140,
    att: 70,
    def: 45,
    vit: 45,
    spe: 50,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Nosferapti",
    img: "img/pkm/Nosferapti.png",
    type: ["poison", "vol"],
    pv_max: 40,
    pv: 40,
    att: 45,
    def: 35,
    vit: 55,
    spe: 40,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Nosferapti",
    img: "img/pkm/Nosferapti.png",
    type: ["poison", "vol"],
    pv_max: 40,
    pv: 40,
    att: 45,
    def: 35,
    vit: 55,
    spe: 40,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Nosferalto",
    img: "img/pkm/Nosferalto.png",
    type: ["poison", "vol"],
    pv_max: 75,
    pv: 75,
    att: 80,
    def: 70,
    vit: 90,
    spe: 75,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Mystherbe",
    img: "img/pkm/Mystherbe.png",
    type: ["poison", "plante"],
    pv_max: 45,
    pv: 45,
    att: 50,
    def: 55,
    vit: 30,
    spe: 75,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Ortide",
    img: "img/pkm/Ortide.png",
    type: ["poison", "plante"],
    pv_max: 60,
    pv: 60,
    att: 65,
    def: 70,
    vit: 40,
    spe: 85,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Rafflesia",
    img: "img/pkm/Rafflesia.png",
    type: ["poison", "plante"],
    pv_max: 75,
    pv: 75,
    att: 80,
    def: 85,
    vit: 50,
    spe: 100,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Paras",
    img: "img/pkm/Paras.png",
    type: ["insect", "plante"],
    pv_max: 35,
    pv: 35,
    att: 70,
    def: 55,
    vit: 25,
    spe: 55,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Parasect",
    img: "img/pkm/Parasect.png",
    type: ["insect", "plante"],
    pv_max: 60,
    pv: 60,
    att: 95,
    def: 80,
    vit: 30,
    spe: 80,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Mimitoss",
    img: "img/pkm/Mimitoss.png",
    type: ["insect", "poison"],
    pv_max: 60,
    pv: 60,
    att: 55,
    def: 50,
    vit: 45,
    spe: 40,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Aéromite",
    img: "img/pkm/Aéromite.png",
    type: ["insect", "poison"],
    pv_max: 60,
    pv: 60,
    att: 55,
    def: 50,
    vit: 45,
    spe: 40,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Mackogneur",
    img: "img/pkm/Mackogneur.png",
    type: ["combat"], //90 - 130 - 80 - 55 - 65
    pv: 90,
    pv_max: 90,
    att: 130,
    def: 80,
    vit: 55,
    spe: 65,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Arcanin",
    img: "img/pkm/Arcanin.png",
    type: ["feu"], //90 - 110 - 80 - 95 - 80
    pv: 90,
    pv_max: 90,
    att: 110,
    def: 80,
    vit: 95,
    spe: 80,
    attacks: {
        Deflagration: get_clone(attacks.Deflagration),
        Boul_armure: get_clone(attacks.Boul_armure),
        Jet_de_sable: get_clone(attacks.Jet_de_sable),
        E_coque: get_clone(attacks.E_coque)
    },
    enemy: {}
}, {
    name: "Mew",
    img: "img/pkm/Mew.gif",
    type: ["normal", "feu", "eau", "plante", "electrik", "glace", "combat",
        "poison", "sol", "vol", "psy", "insecte", "roche", "spectre", "dragon"
    ],
    pv: 100000,
    pv_max: 100000,
    att: 100000,
    def: 100000,
    vit: 100000,
    spe: 100000,
    attacks: get_rand_att(attacks),
    enemy: {}
}]

function make_att_buttons(player, att) {
    return function() {
        player = att.action(player, att);
    };
}

function create_buttons(player, attacks) {
    for (attack in attacks) {
        let button = document.createElement('button');
        button.textContent = attacks[attack].name;
        button.addEventListener("click", make_att_buttons(player, attacks[attack]));
        document.querySelector("#textzone").appendChild(button);
    }
    return;
}

function aff_lifebar(player) {
    let lifebar_player = document.querySelector("#playerbar");
    let lifebar_enemy = document.querySelector("#enemybar");
    lifebar_player.style.width = ((player.pv / player.pv_max) * 40).toString() + "%";
    lifebar_player.style.height = "1em";
    lifebar_player.style.background = "red";
    lifebar_enemy.style.width = ((player.enemy.pv / player.enemy.pv_max) * 40).toString() + "%";
    lifebar_enemy.style.height = "1em";
    lifebar_enemy.style.background = "green";
}

function getPokemon(pkms) {
    let rand = Math.round(Math.random() * (pkms.length - 1));
    let player = {};
    for (let stat in pkms[rand]) {
        player[stat] = pkms[rand][stat];
    }
    return player;
}

let turn = 2;
document.querySelector("main").innerHTML = "";
document.querySelector("#textzone").innerHTML = "";
player = getPokemon(pkms);
enemy = getPokemon(pkms);
player.enemy = enemy;
enemy.enemy = player;
let player_aff = document.createElement('img');
let enemy_aff = document.createElement('img');
player_aff.src = `${player.img}`;
enemy_aff.src = `${enemy.img}`;
document.querySelector("main").appendChild(player_aff);
document.querySelector("main").appendChild(enemy_aff);
let text = document.createElement("p");
text.textContent = `Le joueur envoie ${player.name} et l'adversaire envoie ${player.enemy.name}`;
document.querySelector("#textzone").appendChild(text);
aff_lifebar(enemy);

buttons = document.querySelectorAll(".combat");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        turn = 2;
        document.querySelector("main").innerHTML = "";
        document.querySelector("#textzone").innerHTML = "";
        player = getPokemon(pkms);
        enemy = getPokemon(pkms);
        player.enemy = enemy;
        enemy.enemy = player;
        let player_aff = document.createElement('img');
        let enemy_aff = document.createElement('img');
        player_aff.src = `${player.img}`;
        enemy_aff.src = `${enemy.img}`;
        document.querySelector("main").appendChild(player_aff);
        document.querySelector("main").appendChild(enemy_aff);
        let text = document.createElement("p");
        text.textContent = `Le joueur envoie ${player.name} et l'adversaire envoie ${player.enemy.name}`;
        document.querySelector("#textzone").appendChild(text);
        aff_lifebar(enemy);
    });
}

document.querySelector("#PVSP").addEventListener("click", function() {
    combat = ["1", "1"];
});
document.querySelector("#PVSIA").addEventListener("click", function() {
    combat = ["IA", "1"];
});
document.querySelector("#IAVSIA").addEventListener("click", function() {
    combat = ["IA", "IA"];
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function ia(attaquant, attacks) {
    let i = 0;
    menu.text = `${attaquant.name} choisie une attaque`;
    let text = document.createElement("p");
    text.textContent = menu.text;
    document.querySelector("#textzone").appendChild(text);
    for (att in attaquant.attacks) {
        i++;
    }
    let rand = getRandomInt(0, i);
    i = 0;
    for (att in attaquant.attacks) {
        if (i === rand) {
            return {
                attaquant: attaquant,
                action: attaquant.attacks[att].action,
                key_att: att
            };
        }
        i++;
    }
    return {
        attaquant: attaquant,
        action: attaquant.attacks[att].action,
        key_att: att
    };
}
let ia_return = {};
document.querySelector("#textzone").addEventListener("click", function() {
    document.querySelector("#textzone").innerHTML = "";
    aff_lifebar(enemy);
    if (player.pv > 0 && player.enemy.pv > 0 && turn % 4 === 0) {
        if (combat[0] === "IA") {
            ia_return = ia(enemy, enemy.attacks);
            enemy = ia_return.attaquant;
        } else if (combat[0] === "1") {
            create_buttons(enemy, enemy.attacks);
        }
    } else if (player.pv > 0 && player.enemy.pv > 0 && turn % 4 === 1) {
        if (combat[0] === "IA") {
            ia_return.action(ia_return.attaquant, ia_return.attaquant.attacks[ia_return.key_att]);
        }
        let text = document.createElement("p");
        text.textContent = menu.text;
        document.querySelector("#textzone").appendChild(text);
    } else if (player.pv > 0 && player.enemy.pv > 0 && turn % 4 === 2) {
        if (combat[1] === "IA") {
            ia_return = ia(player, player.attacks);
            player = ia_return.attaquant;
        } else if (combat[1] === "1") {
            create_buttons(player, player.attacks);
        }
    } else if (player.pv > 0 && player.enemy.pv > 0 && turn % 4 === 3) {
        if (combat[1] === "IA") {
            ia_return.action(ia_return.attaquant, ia_return.attaquant.attacks[ia_return.key_att]);
        }
        let text = document.createElement("p");
        text.textContent = menu.text;
        document.querySelector("#textzone").appendChild(text);
    } else if (player.pv === 0) {
        menu.text = `${player.name} est K.O\n${player.enemy.name} gagne`;
        let text = document.createElement("p");
        text.textContent = menu.text;
        document.querySelector("#textzone").appendChild(text);
    } else if (player.enemy.pv === 0) {
        menu.text = `${player.enemy.name} est K.O\n${player.name} gagne`;
        let text = document.createElement("p");
        text.textContent = menu.text;
        document.querySelector("#textzone").appendChild(text);
    }
    turn++;
});

document.querySelector("#textzone").addEventListener("keydown", function() {
    document.querySelector("#textzone").innerHTML = "";
    aff_lifebar(enemy);
    if (player.pv > 0 && player.enemy.pv > 0 && turn % 4 === 0) {
        if (combat[0] === "IA") {
            ia_return = ia(enemy, enemy.attacks);
            enemy = ia_return.attaquant;
        } else if (combat[0] === "1") {
            create_buttons(enemy, enemy.attacks);
        }
    } else if (player.pv > 0 && player.enemy.pv > 0 && turn % 4 === 1) {
        if (combat[0] === "IA") {
            ia_return.action(ia_return.attaquant, ia_return.attaquant.attacks[ia_return.key_att]);
        }
        let text = document.createElement("p");
        text.textContent = menu.text;
        document.querySelector("#textzone").appendChild(text);
    } else if (player.pv > 0 && player.enemy.pv > 0 && turn % 4 === 2) {
        if (combat[1] === "IA") {
            ia_return = ia(player, player.attacks);
            player = ia_return.attaquant;
        } else if (combat[1] === "1") {
            create_buttons(player, player.attacks);
        }
    } else if (player.pv > 0 && player.enemy.pv > 0 && turn % 4 === 3) {
        if (combat[1] === "IA") {
            ia_return.action(ia_return.attaquant, ia_return.attaquant.attacks[ia_return.key_att]);
        }
        let text = document.createElement("p");
        text.textContent = menu.text;
        document.querySelector("#textzone").appendChild(text);
    } else if (player.pv === 0) {
        menu.text = `${player.name} est K.O\n${player.enemy.name} gagne`;
        let text = document.createElement("p");
        text.textContent = menu.text;
        document.querySelector("#textzone").appendChild(text);
    } else if (player.enemy.pv === 0) {
        menu.text = `${player.enemy.name} est K.O\n${player.name} gagne`;
        let text = document.createElement("p");
        text.textContent = menu.text;
        document.querySelector("#textzone").appendChild(text);
    }
    turn++;
});