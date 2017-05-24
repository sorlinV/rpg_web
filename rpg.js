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
        if (attaquant.attacks[attack.name].pui * (attaquant.att / 100) - attaquant.enemy.def / 10 >= 0) {
            attaquant.enemy.pv -= attaquant.attacks[attack.name].pui * (attaquant.att / 100) - attaquant.enemy.def / 10;
        }
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
    if (attaquant.attacks[attack.name].type_att === "morph") {
        attaquant.img = attaquant.enemy.img;
        attaquant.attacks = get_clone(attaquant.enemy.attacks);
        attaquant.type = attaquant.enemy.type;
        let player_aff = document.createElement('img');
        let enemy_aff = document.createElement('img');
        player_aff.src = `${player.img}`;
        enemy_aff.src = `${enemy.img}`;
        document.querySelector("main").innerHTML = "";
        document.querySelector("main").appendChild(player_aff);
        document.querySelector("main").appendChild(enemy_aff);
        aff_lifebar(enemy);
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
}

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
    Lance_Flamme: {
        name: "Lance_Flamme",
        type: "feu",
        type_imu: undefined,
        pp: 15,
        pui: 95,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Lance_Soleil: {
        name: "Lance_Soleil",
        type: "plante",
        type_imu: undefined,
        pp: 10,
        pui: 120,
        pre: 0.7,
        type_att: "pv-",
        action: action
    },
    Laser_Glace: {
        name: "Laser_Glace",
        type: "glace",
        type_imu: undefined,
        pp: 10,
        pui: 95,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Lechouille: {
        name: "Lechouille",
        type: "spectre",
        type_imu: "normal",
        pp: 30,
        pui: 20,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Ligotage: {
        name: "Ligotage",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pui: 15,
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    liliput: {
        name: "liliput",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pui: 10,
        pre: 1,
        type_att: "pre-",
        action: action
    },
    Lutte: {
        name: "Lutte",
        type: "normal",
        type_imu: "spectre",
        pp: 100000000,
        pui: 100,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Mania: {
        name: "Mania",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pui: 90,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Massd_Os: {
        name: "Massd_Os",
        type: "sol",
        type_imu: "vol",
        pp: 20,
        pui: 65,
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Mawashi_Geri: {
        name: "Mawashi_Geri",
        type: "combat",
        type_imu: "spectre",
        pp: 15,
        pui: 60,
        pre: 0.8,
        type_att: "pv-",
        action: action
    },
    Mega_sangsue: {
        name: "Mega_sangsue",
        type: "plante",
        type_imu: undefined,
        pp: 10,
        pui: 40,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Meteores: {
        name: "Meteores",
        type: "normal",
        type_imu: undefined,
        pp: 20,
        pui: 60,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Metronome: {
        name: "Metronome",
        type: "normal",
        type_imu: undefined,
        pp: 10,
        pui: 20,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Mimique: {
        name: "Mimique",
        type: "vol",
        type_imu: undefined,
        pp: 20,
        pui: 20,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Mimi_queue: {
        name: "Mimi_queue",
        type: "normal",
        type_imu: "spectre",
        pp: 30,
        pui: 10,
        pre: 1,
        type_att: "boost-def",
        action: action
    },
    Morphing: {
        name: "Morphing",
        type: "normal",
        type_imu: "spectre",
        pp: 10,
        pui: 1,
        pre: 1,
        type_att: "morph",
        action: action
    },
    Morsure: {
        name: "Morsure",
        type: "normal",
        type_imu: "spectre",
        pp: 25,
        pui: 60,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Mur_lumiere: {
        name: "Mur_lumiere",
        type: "psy",
        type_imu: undefined,
        pp: 30,
        pui: 10,
        pre: 1,
        type_att: "boost-att",
        action: action
    },
    Onde_Boreale: {
        name: "Onde_Boreale",
        type: "glace",
        type_imu: undefined,
        pp: 20,
        pui: 65,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Osmerang: {
        name: "Osmerang",
        type: "sol",
        type_imu: "vol",
        pp: 10,
        pui: 50 * getRandomInt(1, 3),
        pre: 0.9,
        type_att: "pv-",
        action: action
    },
    Picanon: {
        name: "Picanon",
        type: "normal",
        type_imu: "spectre",
        pp: 15,
        pui: 50 * getRandomInt(1, 5),
        pre: 0.9,
        type_att: "pv-",
        action: action
    },
    Picpic: {
        name: "Picpic",
        type: "vol",
        type_imu: undefined,
        pp: 35,
        pui: 35,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Pied_saute: {
        name: "Pied_saute",
        type: "combat",
        type_imu: "spectre",
        pp: 25,
        pui: 70,
        pre: 0.95,
        type_att: "pv-",
        action: action
    },
    Pied_Voltige: {
        name: "Pied_Voltige",
        type: "combat",
        type_imu: "spectre",
        pp: 20,
        pui: 85,
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Pilonnage: {
        name: "Pilonnage",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pui: 15,
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Pince_Masse: {
        name: "Pince_Masse",
        type: "eau",
        type_imu: undefined,
        pp: 10,
        pui: 90,
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Pique: {
        name: "Pique",
        type: "vol",
        type_imu: undefined,
        pp: 5,
        pui: 140,
        pre: 0.9,
        type_att: "pv-",
        action: action
    },
    Pistolet_a_O: {
        name: "Pistolet_a_O",
        type: "eau",
        type_imu: undefined,
        pp: 20,
        pui: 40,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Plaquage: {
        name: "Plaquage",
        type: "normal",
        type_imu: "spectre",
        pp: 15,
        pui: 85,
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Plaquage: {
        name: "Plaquage",
        type: "normal",
        type_imu: "spectre",
        pp: 15,
        pui: 85,
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Poing_Comete: {
        name: "Poing_Comete",
        type: "normal",
        type_imu: "spectre",
        pp: 15,
        pui: 18 * getRandomInt(1, 6),
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Poing_De_Feu: {
        name: "Poing_De_Feu",
        type: "feu",
        type_imu: undefined,
        pp: 15,
        pui: 75,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Poing_Karate: {
        name: "Poing_Karate",
        type: "normal",
        type_imu: "spectre",
        pp: 25,
        pui: 50,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Poing_Eclair: {
        name: "Poing_Eclair",
        type: "electrik",
        type_imu: undefined,
        pp: 15,
        pui: 75,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Poinglace: {
        name: "Poinglace",
        type: "glace",
        type_imu: undefined,
        pp: 15,
        pui: 75,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Protection: {
        name: "Protection",
        type: "psy",
        type_imu: undefined,
        pp: 20,
        pui: 10,
        pre: 1,
        type_att: "boost-spe",
        action: action
    },
    Psyko: {
        name: "Psyko",
        type: "psy",
        type_imu: undefined,
        pp: 10,
        pui: 90,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Puissance: {
        name: "Puissance",
        type: "normal",
        type_imu: "spectre",
        pp: 10,
        pui: 90,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Rafale_Psy: {
        name: "Rafale_Psy",
        type: "psy",
        type_imu: undefined,
        pp: 20,
        pui: 65,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Reflet: {
        name: "Reflet",
        type: "normal",
        type_imu: "spectre",
        pp: 15,
        pui: 10,
        pre: 1,
        type_att: "pre-",
        action: action
    },
    Repli: {
        name: "Repli",
        type: "eau",
        type_imu: undefined,
        pp: 40,
        pui: 10,
        pre: 1,
        type_att: "boost+def",
        action: action
    },
    Rugissement: {
        name: "Rugissement",
        type: "normal",
        type_imu: "spectre",
        pp: 10,
        pui: 10,
        pre: 1,
        type_att: "boost-att",
        action: action
    },
    Secretion: {
        name: "Secretion",
        type: "insecte",
        type_imu: undefined,
        pp: 40,
        pui: 10,
        pre: 1,
        type_att: "boost-vit",
        action: action
    },
    Seisme: {
        name: "Seisme",
        type: "sol",
        type_imu: "vol",
        pp: 10,
        pui: 100,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Soin: {
        name: "Soin",
        type: "normal",
        type_imu: "spectre",
        pp: 10,
        pui: 40,
        pre: 1,
        type_att: "pv+",
        action: action
    },
    Sonicboom: {
        name: "Sonicboom",
        type: "normal",
        type_imu: undefined,
        pp: 20,
        pui: 20,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Souplesse: {
        name: "Souplesse",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pui: 80,
        pre: 0.75,
        type_att: "pv-",
        action: action
    },
    Surf: {
        name: "Surf",
        type: "eau",
        type_imu: undefined,
        pp: 15,
        pui: 95,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Telekinesie: {
        name: "Telekinesie",
        type: "psy",
        type_imu: undefined,
        pp: 15,
        pui: 10,
        pre: 0.75,
        type_att: "pre-",
        action: action
    },
    Teleport: {
        name: "Teleport",
        type: "psy",
        type_imu: undefined,
        pp: 20,
        pui: 10,
        pre: 1,
        type_att: "morph",
        action: action
    },
    Tenebre: {
        name: "Tenebre",
        type: "spectre",
        type_imu: "normal",
        pp: 15,
        pui: 60,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Tonnerre: {
        name: "Tonnerre",
        type: "electrik",
        type_imu: undefined,
        pp: 15,
        pui: 95,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Torgnoles: {
        name: "Torgnoles",
        type: "normal",
        type_imu: "spectre",
        pp: 10,
        pui: 15 * getRandomInt(1, 6),
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Tornade: {
        name: "Tornade",
        type: "vol",
        type_imu: undefined,
        pp: 35,
        pui: 40,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Tranche: {
        name: "Tranche",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pui: 70,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Tranch_Herbe: {
        name: "Tranch_Herbe",
        type: "plante",
        type_imu: undefined,
        pp: 25,
        pui: 55,
        pre: 0.95,
        type_att: "pv-",
        action: action
    },
    Trempette: {
        name: "Trempette",
        type: "eau",
        type_imu: undefined,
        pp: 40,
        pui: 0,
        pre: 1,
        type_att: "nothing",
        action: action
    },
    Triplattaque: {
        name: "Triplattaque",
        type: "normal",
        type_imu: "spectre",
        pp: 10,
        pui: 80,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Tunnel: {
        name: "Tunnel",
        type: "sol",
        type_imu: "vol",
        pp: 10,
        pui: 100,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Ultimapoing: {
        name: "Ultimapoing",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pui: 80,
        pre: 0.85,
        type_att: "pv-",
        action: action
    },
    Ultimawhashi: {
        name: "Ultimawhashi",
        type: "normal",
        type_imu: "spectre",
        pp: 5,
        pui: 120,
        pre: 0.75,
        type_att: "pv-",
        action: action
    },
    Ultralaser: {
        name: "Ultralaser",
        type: "normal",
        type_imu: "spectre",
        pp: 5,
        pui: 120,
        pre: 0.9,
        type_att: "pv-",
        action: action
    },
    Uppercut: {
        name: "Uppercut",
        type: "normal",
        type_imu: "spectre",
        pp: 10,
        pui: 70,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Vague_Psy: {
        name: "Vague_Psy",
        type: "psy",
        type_imu: undefined,
        pp: 15,
        pui: 70,
        pre: 0.8,
        type_att: "pv-",
        action: action
    },
    Vampigraine: {
        name: "Vampigraine",
        type: "plante",
        type_imu: undefined,
        pp: 10,
        pui: 30,
        pre: 0.9,
        type_att: "pv-",
        action: action
    },
    Vampirisme: {
        name: "Vampirisme",
        type: "insecte",
        type_imu: undefined,
        pp: 15,
        pui: 20,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Vive_Attaque: {
        name: "Vive_Attaque",
        type: "normal",
        type_imu: "spectre",
        pp: 30,
        pui: 40,
        pre: 1,
        type_att: "pv-",
        action: action
    },
    Vol: {
        name: "Vol",
        type: "vol",
        type_imu: undefined,
        pp: 15,
        pui: 70,
        pre: 0.95,
        type_att: "pv-",
        action: action
    },
    Yoga: {
        name: "Yoga",
        type: "psy",
        type_imu: undefined,
        pp: 40,
        pui: 10,
        pre: 1,
        type_att: "boost+att",
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
        Vampigraine: get_clone(attacks.Vampigraine),
        Fouet_Lianes: get_clone(attacks.Fouet_Lianes),
        Belier: get_clone(attacks.Belier),
        Lance_Soleil: get_clone(attacks.Lance_Soleil)
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
        Tranch_Herbe: get_clone(attacks.Tranch_Herbe),
        Croissance: get_clone(attacks.Croissance),
        Lance_Soleil: get_clone(attacks.Lance_Soleil)
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
        Fouet_Lianes: get_clone(attacks.Fouet_Lianes),
        Tranch_Herbe: get_clone(attacks.Tranch_Herbe),
        Damocles: get_clone(attacks.Damocles),
        Seisme: get_clone(attacks.Seisme),
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
        Griffe: get_clone(attacks.Griffe),
        Rugissement: get_clone(attacks.Rugissement),
        Flammeche: get_clone(attacks.Flammeche),
        Tranche: get_clone(attacks.Tranche)
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
        Flammeche: get_clone(attacks.Flammeche),
        Lance_Flamme: get_clone(attacks.Lance_Flamme),
        Tranche: get_clone(attacks.Tranche),
        Draco_rage: get_clone(attacks.Draco_rage)
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
        Draco_rage: get_clone(attacks.Draco_rage),
        Danse_Lames: get_clone(attacks.Danse_Lames),
        Lance_Flamme: get_clone(attacks.Lance_Flamme),
        Cru_aile: get_clone(attacks.Cru_aile)
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
        Ecume: get_clone(attacks.Ecume),
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Morsure: get_clone(attacks.Morsure),
        Repli: get_clone(attacks.Repli)
    },
    enemy: {}
}, {
    name: "Carabaffe",
    img: "img/pkm/Carabaffe.png",
    type: ["eau"],
    pv: 59,
    pv_max: 59,
    att: 63,
    def: 80,
    vit: 58,
    spe: 65,
    attacks: {
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Repli: get_clone(attacks.Repli),
        Coud_krane: get_clone(attacks.Coud_krane),
        Hydrocanon: get_clone(attacks.Hydrocanon)
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
        Morsure: get_clone(attacks.Morsure),
        Hydrocanon: get_clone(attacks.Hydrocanon),
        Coud_krane: get_clone(attacks.Coud_krane),
        Mimi_queue: get_clone(attacks.Mimi_queue)
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
        Charge: get_clone(attacks.Charge),
        Secretion: get_clone(attacks.Secretion),
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
        Armure: get_clone(attacks.Armure)
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
        Choc_mental: get_clone(attacks.Choc_mental),
        Tornade: get_clone(attacks.Tornade),
        Rafale_Psy: get_clone(attacks.Rafale_Psy),
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
        Dard_Venin: get_clone(attacks.Dard_Venin),
        Secretion: get_clone(attacks.Secretion),
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
        Armure: get_clone(attacks.Armure),
    },
    enemy: {}
}, {
    name: "Dardargnan",
    img: "img/pkm/Dardargnan.png",
    type: ["insect", "poison"],
    pv: 65,
    pv_max: 65,
    att: 80,
    def: 40,
    vit: 75,
    spe: 45,
    attacks: {
        Puissance: get_clone(attacks.Puissance),
        Double_Dard: get_clone(attacks.Double_Dard),
        Dard_Nuee: get_clone(attacks.Dard_Nuee),
        Hate: get_clone(attacks.Hate)
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
        Jet_de_sable: get_clone(attacks.Jet_de_sable),
        Vive_Attaque: get_clone(attacks.Vive_Attaque),
        Hate: get_clone(attacks.Hate)
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
        Jet_de_sable: get_clone(attacks.Jet_de_sable),
        Cru_aile: get_clone(attacks.Cru_aile),
        Hate: get_clone(attacks.Hate),
        Tornade: get_clone(attacks.Tornade)
    },
    enemy: {}
}, {
    name: "Rattata",
    img: "img/pkm/Rattata.png",
    type: ["normal"],
    pv: 30,
    pv_max: 30,
    att: 56,
    def: 35,
    vit: 72,
    spe: 25,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Puissance: get_clone(attacks.Puissance),
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
        Morsure: get_clone(attacks.Morsure),
        Damocles: get_clone(attacks.Damocles),
        Danse_Lames: get_clone(attacks.Danse_Lames)
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
        Picpic: get_clone(attacks.Picpic),
        Groz_Yeux: get_clone(attacks.Groz_Yeux),
        Mimique: get_clone(attacks.Mimique),
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
        Picpic: get_clone(attacks.Picpic),
        Furie: get_clone(attacks.Furie),
        Hate: get_clone(attacks.Hate),
        Bec_vrille: get_clone(attacks.Bec_vrille)
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
        Ligotage: get_clone(attacks.Ligotage),
        Morsure: get_clone(attacks.Morsure),
        Acide: get_clone(attacks.Acide),
        Dard_Venin: get_clone(attacks.Dard_Venin)
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
        Ligotage: get_clone(attacks.Ligotage),
        Morsure: get_clone(attacks.Morsure),
        Acide: get_clone(attacks.Acide),
        Dard_Venin: get_clone(attacks.Dard_Venin)
    },
    enemy: {}
}, {
    name: "Pikachu",
    img: "img/pkm/Pikachu.png",
    type: ["electrik"],
    pv_max: 35,
    pv: 35,
    att: 55,
    def: 30,
    vit: 90,
    spe: 50,
    attacks: {
        Eclair: get_clone(attacks.Eclair),
        Vive_Attaque: get_clone(attacks.Vive_Attaque),
        Reflet: get_clone(attacks.Reflet),
        Tonnerre: get_clone(attacks.Tonnerre)
    },
    enemy: {}
}, {
    name: "Raichu",
    img: "img/pkm/Raichu.png",
    type: ["electrik"],
    pv_max: 60,
    pv: 60,
    att: 90,
    def: 55,
    vit: 100,
    spe: 90,
    attacks: {
        Eclair: get_clone(attacks.Eclair),
        Tonnerre: get_clone(attacks.Tonnerre),
        Fatal_foudre: get_clone(attacks.Fatal_foudre),
        Poing_Eclair: get_clone(attacks.Poing_Eclair)
    },
    enemy: {}
}, {
    name: "Sabelette",
    img: "img/pkm/Sabelette.png",
    type: ["sol"],
    pv_max: 50,
    pv: 50,
    att: 75,
    def: 85,
    vit: 40,
    spe: 30,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Boul_armure: get_clone(attacks.Boul_armure),
        Combo_griffe: get_clone(attacks.Combo_griffe),
        Tranche: get_clone(attacks.Tranche)
    },
    enemy: {}
}, {
    name: "Sablaireau",
    img: "img/pkm/Sablaireau.png",
    type: ["sol"],
    pv_max: 75,
    pv: 75,
    att: 100,
    def: 110,
    vit: 65,
    spe: 55,
    attacks: {
        Jet_de_sable: get_clone(attacks.Jet_de_sable),
        Meteores: get_clone(attacks.Meteores),
        Combo_griffe: get_clone(attacks.Combo_griffe),
        Tranche: get_clone(attacks.Tranche)
    },
    enemy: {}
}, {
    name: "Nidoran_F",
    img: "img/pkm/Nidoran_F.png",
    type: ["poison"],
    pv_max: 55,
    pv: 55,
    att: 47,
    def: 52,
    vit: 41,
    spe: 40,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Double_pied: get_clone(attacks.Double_pied),
        Dard_Venin: get_clone(attacks.Dard_Venin),
        Combo_griffe: get_clone(attacks.Combo_griffe)
    },
    enemy: {}
}, {
    name: "Nidorina",
    img: "img/pkm/Nidorina.png",
    type: ["poison"],
    pv_max: 70,
    pv: 70,
    att: 62,
    def: 67,
    vit: 56,
    spe: 55,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Double_pied: get_clone(attacks.Double_pied),
        Dard_Venin: get_clone(attacks.Dard_Venin),
        Morsure: get_clone(attacks.Morsure)
    },
    enemy: {}
}, {
    name: "Nidoqueen",
    img: "img/pkm/Nidoqueen.png",
    type: ["poison", "sol"],
    pv_max: 90,
    pv: 90,
    att: 82,
    def: 87,
    vit: 76,
    spe: 75,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Double_pied: get_clone(attacks.Double_pied),
        Dard_Venin: get_clone(attacks.Dard_Venin),
        Morsure: get_clone(attacks.Morsure)
    },
    enemy: {}
}, {
    name: "Nidoran_M",
    img: "img/pkm/Nidoran_M.png",
    type: ["poison"],
    pv_max: 46,
    pv: 46,
    att: 57,
    def: 40,
    vit: 50,
    spe: 40,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Double_pied: get_clone(attacks.Double_pied),
        Dard_Venin: get_clone(attacks.Dard_Venin),
        Furie: get_clone(attacks.Furie)
    },
    enemy: {}
}, {
    name: "Nidorino",
    img: "img/pkm/Nidorino.png",
    type: ["poison"],
    pv_max: 61,
    pv: 61,
    att: 72,
    def: 57,
    vit: 65,
    spe: 55,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Double_pied: get_clone(attacks.Double_pied),
        Dard_Venin: get_clone(attacks.Dard_Venin),
        Empal_Korne: get_clone(attacks.Empal_Korne)
    },
    enemy: {}
}, {
    name: "Nidoking",
    img: "img/pkm/Nidoking.png",
    type: ["poison", "sol"],
    pv_max: 81,
    pv: 81,
    att: 92,
    def: 77,
    vit: 85,
    spe: 75,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Double_pied: get_clone(attacks.Double_pied),
        Dard_Venin: get_clone(attacks.Dard_Venin),
        Empal_Korne: get_clone(attacks.Empal_Korne)
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
        Torgnoles: get_clone(attacks.Torgnoles),
        Metronome: get_clone(attacks.Metronome),
        liliput: get_clone(attacks.liliput),
        Ecras_face: get_clone(attacks.Ecras_face)
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
        Torgnoles: get_clone(attacks.Torgnoles),
        Metronome: get_clone(attacks.Metronome),
        liliput: get_clone(attacks.liliput),
        Ecras_face: get_clone(attacks.Ecras_face)
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
        Flammeche: get_clone(attacks.Flammeche),
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Vive_Attaque: get_clone(attacks.Vive_Attaque)
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
        Flammeche: get_clone(attacks.Flammeche),
        Vive_Attaque: get_clone(attacks.Vive_Attaque),
        Lance_Flamme: get_clone(attacks.Lance_Flamme),
        Deflagration: get_clone(attacks.Deflagration)
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
        Boul_armure: get_clone(attacks.Boul_armure),
        Torgnoles: get_clone(attacks.Torgnoles),
        Plaquage: get_clone(attacks.Plaquage),
        Boul_armure: get_clone(attacks.Boul_armure)
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
        Boul_armure: get_clone(attacks.Boul_armure),
        Torgnoles: get_clone(attacks.Torgnoles),
        Plaquage: get_clone(attacks.Plaquage),
        Boul_armure: get_clone(attacks.Boul_armure)
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
        Vampirisme: get_clone(attacks.Vampirisme),
        Morsure: get_clone(attacks.Morsure),
        Cru_aile: get_clone(attacks.Cru_aile),
        Meteores: get_clone(attacks.Meteores)
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
        Vampirisme: get_clone(attacks.Vampirisme),
        Morsure: get_clone(attacks.Morsure),
        Cru_aile: get_clone(attacks.Cru_aile),
        Meteores: get_clone(attacks.Meteores)
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
        Acide: get_clone(attacks.Acide),
        Mega_sangsue: get_clone(attacks.Mega_sangsue),
        Danse_Fleur: get_clone(attacks.Danse_Fleur),
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
        Acide: get_clone(attacks.Acide),
        Mega_sangsue: get_clone(attacks.Mega_sangsue),
        Danse_Fleur: get_clone(attacks.Danse_Fleur),
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
        Acide: get_clone(attacks.Acide),
        Mega_sangsue: get_clone(attacks.Mega_sangsue),
        Danse_Fleur: get_clone(attacks.Danse_Fleur),
        Lance_Soleil: get_clone(attacks.Lance_Soleil)
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
        Griffe: get_clone(attacks.Griffe),
        Vampirisme: get_clone(attacks.Vampirisme),
        Tranche: get_clone(attacks.Tranche),
        Croissance: get_clone(attacks.Croissance)
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
        Griffe: get_clone(attacks.Griffe),
        Vampirisme: get_clone(attacks.Vampirisme),
        Tranche: get_clone(attacks.Tranche),
        Mega_sangsue: get_clone(attacks.Mega_sangsue)
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
        Choc_mental: get_clone(attacks.Choc_mental),
        Vampirisme: get_clone(attacks.Vampirisme),
        Rafale_Psy: get_clone(attacks.Rafale_Psy)
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
        Tornade: get_clone(attacks.Tornade),
        Choc_mental: get_clone(attacks.Choc_mental),
        Vampirisme: get_clone(attacks.Vampirisme),
        Psyko: get_clone(attacks.Psyko)
    },
    enemy: {}
}, {
    name: "Taupiqueur",
    img: "img/pkm/Taupiqueur.png",
    type: ["sol"],
    pv_max: 10,
    pv: 10,
    att: 55,
    def: 25,
    vit: 95,
    spe: 45,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Jet_de_sable: get_clone(attacks.Jet_de_sable),
        Tunnel: get_clone(attacks.Tunnel),
        Tranche: get_clone(attacks.Tranche)
    },
    enemy: {}
}, {
    name: "Triopikeur",
    img: "img/pkm/Triopikeur.png",
    type: ["sol"],
    pv_max: 35,
    pv: 35,
    att: 80,
    def: 50,
    vit: 120,
    spe: 70,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Jet_de_sable: get_clone(attacks.Jet_de_sable),
        Tunnel: get_clone(attacks.Tunnel),
        Seisme: get_clone(attacks.Seisme)
    },
    enemy: {}
}, {
    name: "Miaouss",
    img: "img/pkm/Miaouss.png",
    type: ["normal"],
    pv_max: 40,
    pv: 40,
    att: 45,
    def: 35,
    vit: 90,
    spe: 40,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Rugissement: get_clone(attacks.Rugissement),
        Tranche: get_clone(attacks.Tranche),
        Morsure: get_clone(attacks.Morsure)
    },
    enemy: {}
}, {
    name: "Persian",
    img: "img/pkm/Persian.png",
    type: ["normal"],
    pv_max: 65,
    pv: 65,
    att: 70,
    def: 60,
    vit: 115,
    spe: 65,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Rugissement: get_clone(attacks.Rugissement),
        Tranche: get_clone(attacks.Tranche),
        Morsure: get_clone(attacks.Morsure)
    },
    enemy: {}
}, {
    name: "Psykokwak",
    img: "img/pkm/Psykokwak.png",
    type: ["eau"],
    pv_max: 50,
    pv: 50,
    att: 48,
    def: 48,
    vit: 55,
    spe: 50,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Combo_griffe: get_clone(attacks.Combo_griffe)
    },
    enemy: {}
}, {
    name: "Akwakwak",
    img: "img/pkm/Akwakwak.png",
    type: ["eau"],
    pv_max: 80,
    pv: 80,
    att: 82,
    def: 78,
    vit: 85,
    spe: 80,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Choc_mental: get_clone(attacks.Choc_mental),
        Psyko: get_clone(attacks.Psyko),
        Hydrocanon: get_clone(attacks.Hydrocanon)
    },
    enemy: {}
}, {
    name: "Férosinge",
    img: "img/pkm/Férosinge.png",
    type: ["combat"],
    pv_max: 40,
    pv: 40,
    att: 80,
    def: 35,
    vit: 70,
    spe: 35,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Poing_Karate: get_clone(attacks.Poing_Karate),
        Frappe_Atlas: get_clone(attacks.Frappe_Atlas),
        Mania: get_clone(attacks.Mania)
    },
    enemy: {}
}, {
    name: "Colossinge",
    img: "img/pkm/Colossinge.png",
    type: ["combat"],
    pv_max: 65,
    pv: 65,
    att: 105,
    def: 60,
    vit: 95,
    spe: 60,
    attacks: {
        Griffe: get_clone(attacks.Griffe),
        Poing_Karate: get_clone(attacks.Poing_Karate),
        Frappe_Atlas: get_clone(attacks.Frappe_Atlas),
        Mania: get_clone(attacks.Mania)
    },
    enemy: {}
}, {
    name: "Caninos",
    img: "img/pkm/Caninos.png",
    type: ["feu"],
    pv_max: 55,
    pv: 55,
    att: 70,
    def: 45,
    vit: 60,
    spe: 60,
    attacks: {
        Morsure: get_clone(attacks.Morsure),
        Belier: get_clone(attacks.Belier),
        Lance_Flamme: get_clone(attacks.Lance_Flamme),
        Groz_Yeux: get_clone(attacks.Groz_Yeux)
    },
    enemy: {}
}, {
    name: "Arcanin",
    img: "img/pkm/Arcanin.png",
    type: ["feu"],
    pv_max: 90,
    pv: 90,
    att: 110,
    def: 80,
    vit: 95,
    spe: 80,
    attacks: {
        Deflagration: get_clone(attacks.Deflagration),
        Vive_Attaque: get_clone(attacks.Vive_Attaque),
        Morsure: get_clone(attacks.Morsure),
        Lance_Flamme: get_clone(attacks.Lance_Flamme)
    },
    enemy: {}
}, {
    name: "Ptitard",
    img: "img/pkm/Ptitard.png",
    type: ["eau"],
    pv_max: 40,
    pv: 40,
    att: 50,
    def: 40,
    vit: 90,
    spe: 40,
    attacks: {
        Ecume: get_clone(attacks.Ecume),
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Torgnoles: get_clone(attacks.Torgnoles)
    },
    enemy: {}
}, {
    name: "Tétarte",
    img: "img/pkm/Tétarte.png",
    type: ["eau"],
    pv_max: 65,
    pv: 65,
    att: 65,
    def: 65,
    vit: 90,
    spe: 50,
    attacks: {
        Hydrocanon: get_clone(attacks.Hydrocanon),
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Torgnoles: get_clone(attacks.Torgnoles),
        Repli: get_clone(attacks.Repli)
    },
    enemy: {}
}, {
    name: "Tartard",
    img: "img/pkm/Tartard.png",
    type: ["eau", "combat"],
    pv_max: 90,
    pv: 90,
    att: 85,
    def: 95,
    vit: 70,
    spe: 70,
    attacks: {
        Hydrocanon: get_clone(attacks.Hydrocanon),
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Torgnoles: get_clone(attacks.Torgnoles),
        Repli: get_clone(attacks.Repli)
    },
    enemy: {}
}, {
    name: "Abra",
    img: "img/pkm/Abra.png",
    type: ["psy"],
    pv_max: 25,
    pv: 25,
    att: 20,
    def: 15,
    vit: 90,
    spe: 105,
    attacks: {
        Teleport: get_clone(attacks.Teleport)
    },
    enemy: {}
}, {
    name: "Kadabra",
    img: "img/pkm/Kadabra.png",
    type: ["psy"],
    pv_max: 40,
    pv: 40,
    att: 35,
    def: 30,
    vit: 105,
    spe: 120,
    attacks: {
        Telekinesie: get_clone(attacks.Telekinesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Soin: get_clone(attacks.Soin),
        Psyko: get_clone(attacks.Psyko)
    },
    enemy: {}
}, {
    name: "Alakazam",
    img: "img/pkm/Alakazam.png",
    type: ["psy"],
    pv_max: 55,
    pv: 55,
    att: 50,
    def: 45,
    vit: 120,
    spe: 135,
    attacks: {
        Telekinesie: get_clone(attacks.Telekinesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Soin: get_clone(attacks.Soin),
        Psyko: get_clone(attacks.Psyko)
    },
    enemy: {}
}, {
    name: "Machoc",
    img: "img/pkm/Machoc.png",
    type: ["combat"],
    pv_max: 70,
    pv: 70,
    att: 80,
    def: 50,
    vit: 35,
    spe: 35,
    attacks: {
        Balayage: get_clone(attacks.Balayage),
        Puissance: get_clone(attacks.Puissance),
        Balayage: get_clone(attacks.Balayage),
    },
    enemy: {}
}, {
    name: "Machopeur",
    img: "img/pkm/Machopeur.png",
    type: ["combat"],
    pv_max: 80,
    pv: 80,
    att: 100,
    def: 70,
    vit: 45,
    spe: 50,
    attacks: {
        Balayage: get_clone(attacks.Balayage),
        Poing_Karate: get_clone(attacks.Poing_Karate),
        Puissance: get_clone(attacks.Puissance),
        Balayage: get_clone(attacks.Balayage)
    },
    enemy: {}
}, {
    name: "Mackogneur",
    img: "img/pkm/Mackogneur.png",
    type: ["combat"],
    pv_max: 90,
    pv: 90,
    att: 130,
    def: 80,
    vit: 55,
    spe: 65,
    attacks: {
        Balayage: get_clone(attacks.Balayage),
        Poing_Karate: get_clone(attacks.Poing_Karate),
        Puissance: get_clone(attacks.Puissance),
        Balayage: get_clone(attacks.Balayage)
    },
    enemy: {}
}, {
    name: "Chétiflor",
    img: "img/pkm/Chétiflor.png",
    type: ["plante", "poison"],
    pv_max: 50,
    pv: 50,
    att: 75,
    def: 35,
    vit: 40,
    spe: 70,
    attacks: {
        Fouet_Lianes: get_clone(attacks.Fouet_Lianes),
        Croissance: get_clone(attacks.Croissance),
        Acide: get_clone(attacks.Acide),
        Tranch_Herbe: get_clone(attacks.Tranch_Herbe)
    },
    enemy: {}
}, {
    name: "Boustiflor",
    img: "img/pkm/Boustiflor.png",
    type: ["plante", "poison"],
    pv_max: 65,
    pv: 65,
    att: 90,
    def: 50,
    vit: 55,
    spe: 85,
    attacks: {
        Fouet_Lianes: get_clone(attacks.Fouet_Lianes),
        Croissance: get_clone(attacks.Croissance),
        Acide: get_clone(attacks.Acide),
        Tranch_Herbe: get_clone(attacks.Tranch_Herbe)
    },
    enemy: {}
}, {
    name: "Empiflor",
    img: "img/pkm/Empiflor.png",
    type: ["plante", "poison"],
    pv_max: 80,
    pv: 80,
    att: 105,
    def: 65,
    vit: 70,
    spe: 100,
    attacks: {
        Fouet_Lianes: get_clone(attacks.Fouet_Lianes),
        Croissance: get_clone(attacks.Croissance),
        Acide: get_clone(attacks.Acide),
        Tranch_Herbe: get_clone(attacks.Tranch_Herbe)
    },
    enemy: {}
}, {
    name: "Tentacool",
    img: "img/pkm/Tentacool.png",
    type: ["eau", "poison"],
    pv_max: 40,
    pv: 40,
    att: 40,
    def: 35,
    vit: 70,
    spe: 100,
    attacks: {
        Dard_Venin: get_clone(attacks.Dard_Venin),
        Acide: get_clone(attacks.Acide),
        Hydrocanon: get_clone(attacks.Hydrocanon),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Tentacruel",
    img: "img/pkm/Tentacruel.png",
    type: ["eau", "poison"],
    pv_max: 80,
    pv: 80,
    att: 70,
    def: 65,
    vit: 100,
    spe: 120,
    attacks: {
        Dard_Venin: get_clone(attacks.Dard_Venin),
        Acide: get_clone(attacks.Acide),
        Hydrocanon: get_clone(attacks.Hydrocanon),
        Bulles_D_O: get_clone(attacks.Bulles_D_O)
    },
    enemy: {}
}, {
    name: "Racaillou",
    img: "img/pkm/Racaillou.png",
    type: ["roche", "sol"],
    pv_max: 40,
    pv: 40,
    att: 80,
    def: 100,
    vit: 20,
    spe: 30,
    attacks: {
        Boul_armure: get_clone(attacks.Boul_armure),
        Charge: get_clone(attacks.Charge),
        Jet_pierre: get_clone(attacks.Jet_pierre),
    },
    enemy: {}
}, {
    name: "Gravalanch",
    img: "img/pkm/Gravalanch.png",
    type: ["roche", "sol"],
    pv_max: 55,
    pv: 55,
    att: 95,
    def: 115,
    vit: 35,
    spe: 45,
    attacks: {
        Boul_armure: get_clone(attacks.Boul_armure),
        Charge: get_clone(attacks.Charge),
        Jet_pierre: get_clone(attacks.Jet_pierre),
        Seisme: get_clone(attacks.Seisme)
    },
    enemy: {}
}, {
    name: "Grolem",
    img: "img/pkm/Grolem.png",
    type: ["roche", "sol"],
    pv_max: 80,
    pv: 80,
    att: 110,
    def: 130,
    vit: 45,
    spe: 55,
    attacks: {
        Boul_armure: get_clone(attacks.Boul_armure),
        Charge: get_clone(attacks.Charge),
        Jet_pierre: get_clone(attacks.Jet_pierre),
        Seisme: get_clone(attacks.Seisme)
    },
    enemy: {}
}, {
    name: "Ponyta",
    img: "img/pkm/Ponyta.png",
    type: ["roche", "sol"],
    pv_max: 80,
    pv: 80,
    att: 110,
    def: 130,
    vit: 45,
    spe: 55,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Flammeche: get_clone(attacks.Flammeche),
        Hate: get_clone(attacks.Hate)
    },
    enemy: {}
}, {
    name: "Galopa",
    img: "img/pkm/Galopa.png",
    type: ["feu"],
    pv_max: 65,
    pv: 65,
    att: 100,
    def: 70,
    vit: 105,
    spe: 80,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Rugissement: get_clone(attacks.Rugissement),
        Flammeche: get_clone(attacks.Flammeche),
        Deflagration: get_clone(attacks.Deflagration)
    },
    enemy: {}
}, {
    name: "Ramoloss",
    img: "img/pkm/Ramoloss.png",
    type: ["eau", "psy"],
    pv_max: 90,
    pv: 90,
    att: 65,
    def: 65,
    vit: 15,
    spe: 40,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Choc_mental: get_clone(attacks.Choc_mental),
        Psyko: get_clone(attacks.Psyko)
    },
    enemy: {}
}, {
    name: "Flagadoss",
    img: "img/pkm/Flagadoss.png",
    type: ["eau", "psy"],
    pv_max: 95,
    pv: 95,
    att: 75,
    def: 110,
    vit: 30,
    spe: 80,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Choc_mental: get_clone(attacks.Choc_mental),
        Psyko: get_clone(attacks.Psyko)
    },
    enemy: {}
}, {
    name: "Magneti",
    img: "img/pkm/Magneti.png",
    type: ["electrik"],
    pv_max: 25,
    pv: 25,
    att: 35,
    def: 70,
    vit: 45,
    spe: 95,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Eclair: get_clone(attacks.Eclair),
        Meteores: get_clone(attacks.Meteores),
    },
    enemy: {}
}, {
    name: "Magneton",
    img: "img/pkm/Magneton.png",
    type: ["electrik"],
    pv_max: 50,
    pv: 50,
    att: 60,
    def: 95,
    vit: 70,
    spe: 120,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Eclair: get_clone(attacks.Eclair),
        Meteores: get_clone(attacks.Meteores),
        Tonnerre: get_clone(attacks.Tonnerre)
    },
    enemy: {}
}, {
    name: "Canard_Poireau",
    img: "img/pkm/Canarticho.png",
    type: ["normal", "vol"],
    pv_max: 52,
    pv: 52,
    att: 65,
    def: 55,
    vit: 60,
    spe: 58,
    attacks: {
        Picpic: get_clone(attacks.Picpic),
        Jet_de_sable: get_clone(attacks.Jet_de_sable),
        Tranche: get_clone(attacks.Tranche),
        Hate: get_clone(attacks.Hate)
    },
    enemy: {}
}, {
    name: "Doduo",
    img: "img/pkm/Doduo.png",
    type: ["normal", "vol"],
    pv_max: 35,
    pv: 35,
    att: 85,
    def: 45,
    vit: 75,
    spe: 35,
    attacks: {
        Picpic: get_clone(attacks.Picpic),
        Furie: get_clone(attacks.Furie),
        Triplattaque: get_clone(attacks.Triplattaque),
        Bec_vrille: get_clone(attacks.Bec_vrille)
    },
    enemy: {}
}, {
    name: "Dodrio",
    img: "img/pkm/Dodrio.png",
    type: ["normal", "vol"],
    pv_max: 60,
    pv: 60,
    att: 110,
    def: 70,
    vit: 100,
    spe: 60,
    attacks: {
        Picpic: get_clone(attacks.Picpic),
        Furie: get_clone(attacks.Furie),
        Triplattaque: get_clone(attacks.Triplattaque),
        Bec_vrille: get_clone(attacks.Bec_vrille)
    },
    enemy: {}
}, {
    name: "Otaria",
    img: "img/pkm/Otaria.png",
    type: ["eau"],
    pv_max: 65,
    pv: 65,
    att: 45,
    def: 55,
    vit: 45,
    spe: 70,
    attacks: {
        Coud_boule: get_clone(attacks.Coud_boule),
        Rugissement: get_clone(attacks.Rugissement),
        Hydrocanon: get_clone(attacks.Hydrocanon),
        Laser_Glace: get_clone(attacks.Laser_Glace)
    },
    enemy: {}
}, {
    name: "Lamantine",
    img: "img/pkm/Lamantine.png",
    type: ["eau", "glace"],
    pv_max: 90,
    pv: 90,
    att: 70,
    def: 80,
    vit: 70,
    spe: 95,
    attacks: {
        Ecras_face: get_clone(attacks.Ecras_face),
        Armure: get_clone(attacks.Armure),
        Detritus: get_clone(attacks.Detritus),
        liliput: get_clone(attacks.liliput)
    },
    enemy: {}
}, {
    name: "Tadmorv",
    img: "img/pkm/Tadmorv.png",
    type: ["poison"],
    pv_max: 80,
    pv: 80,
    att: 80,
    def: 50,
    vit: 25,
    spe: 40,
    attacks: {
        Ecras_face: get_clone(attacks.Ecras_face),
        Armure: get_clone(attacks.Armure),
        Detritus: get_clone(attacks.Detritus),
        Acidarmure: get_clone(attacks.Acidarmure)
    },
    enemy: {}
}, {
    name: "Grotadmorv",
    img: "img/pkm/Grotadmorv.png",
    type: ["poison"],
    pv_max: 105,
    pv: 105,
    att: 105,
    def: 75,
    vit: 50,
    spe: 65,
    attacks: {
        Ecras_face: get_clone(attacks.Ecras_face),
        Armure: get_clone(attacks.Armure),
        Detritus: get_clone(attacks.Detritus),
        Acidarmure: get_clone(attacks.Acidarmure)
    },
    enemy: {}
}, {
    name: "Kokiyas",
    img: "img/pkm/Kokiyas.png",
    type: ["eau"],
    pv_max: 30,
    pv: 30,
    att: 65,
    def: 100,
    vit: 40,
    spe: 45,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Repli: get_clone(attacks.Repli),
        Onde_Boreale: get_clone(attacks.Onde_Boreale),
        Laser_Glace: get_clone(attacks.Laser_Glace)
    },
    enemy: {}
}, {
    name: "Crustabri",
    img: "img/pkm/Crustabri.png",
    type: ["eau", "glace"],
    pv_max: 50,
    pv: 50,
    att: 95,
    def: 180,
    vit: 70,
    spe: 85,
    attacks: {
        Hydrocanon: get_clone(attacks.Hydrocanon),
        Repli: get_clone(attacks.Repli),
        Onde_Boreale: get_clone(attacks.Onde_Boreale),
        Laser_Glace: get_clone(attacks.Laser_Glace)
    },
    enemy: {}
}, {
    name: "Fantominus",
    img: "img/pkm/Fantominus.png",
    type: ["spectre", "poison"],
    pv_max: 30,
    pv: 30,
    att: 35,
    def: 30,
    vit: 80,
    spe: 100,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Choc_mental: get_clone(attacks.Choc_mental),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Spectrum",
    img: "img/pkm/Spectrum.png",
    type: ["spectre", "poison"],
    pv_max: 45,
    pv: 45,
    att: 50,
    def: 45,
    vit: 95,
    spe: 115,
    attacks: {
        Lechouille: get_clone(attacks.Lechouille),
        Tenebre: get_clone(attacks.Tenebre),
        Devoreve: get_clone(attacks.Devoreve),
        Psyko: get_clone(attacks.Psyko)

    },
    enemy: {}
}, {
    name: "Ectoplasma",
    img: "img/pkm/Ectoplasma.png",
    type: ["spectre", "poison"],
    pv_max: 60,
    pv: 60,
    att: 65,
    def: 60,
    vit: 110,
    spe: 130,
    attacks: {
        Lechouille: get_clone(attacks.Lechouille),
        Tenebre: get_clone(attacks.Tenebre),
        Tonnerre: get_clone(attacks.Tonnerre),
        Psyko: get_clone(attacks.Psyko)
    },
    enemy: {}
}, {
    name: "Onix",
    img: "img/pkm/Onix.png",
    type: ["roche", "sol"],
    pv_max: 35,
    pv: 35,
    att: 45,
    def: 160,
    vit: 70,
    spe: 30,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Jet_pierre: get_clone(attacks.Jet_pierre),
        Souplesse: get_clone(attacks.Souplesse),
        Protection: get_clone(attacks.Protection)
    },
    enemy: {}
}, {
    name: "Soporifik",
    img: "img/pkm/Soporifik.png",
    type: ["psy"],
    pv_max: 60,
    pv: 60,
    att: 48,
    def: 45,
    vit: 42,
    spe: 90,
    attacks: {
        Ecras_face: get_clone(attacks.Ecras_face),
        Yoga: get_clone(attacks.Yoga),
        Choc_mental: get_clone(attacks.Choc_mental),
        Psyko: get_clone(attacks.Psyko)
    },
    enemy: {}
}, {
    name: "Hypnomade",
    img: "img/pkm/Hypnomade.png",
    type: ["psy"],
    pv_max: 85,
    pv: 85,
    att: 73,
    def: 70,
    vit: 67,
    spe: 115,
    attacks: {
        Ecras_face: get_clone(attacks.Ecras_face),
        Yoga: get_clone(attacks.Yoga),
        Choc_mental: get_clone(attacks.Choc_mental),
        Psyko: get_clone(attacks.Psyko)
    },
    enemy: {}
}, {
    name: "Krabby",
    img: "img/pkm/Krabby.png",
    type: ["eau"],
    pv_max: 30,
    pv: 30,
    att: 105,
    def: 90,
    vit: 50,
    spe: 25,
    attacks: {
        Ecume: get_clone(attacks.Ecume),
        Armure: get_clone(attacks.Armure),
        Bulles_D_O: get_clone(attacks.Bulles_D_O),
        Souplesse: get_clone(attacks.Souplesse)
    },
    enemy: {}
}, {
    name: "Krabboss",
    img: "img/pkm/Krabboss.png",
    type: ["eau"],
    pv_max: 55,
    pv: 55,
    att: 130,
    def: 115,
    vit: 75,
    spe: 50,
    attacks: {
        Ecume: get_clone(attacks.Ecume),
        Hydrocanon: get_clone(attacks.Hydrocanon),
        Bulles_D_O: get_clone(attacks.Bulles_D_O),
        Souplesse: get_clone(attacks.Souplesse)
    },
    enemy: {}
}, {
    name: "Voltorbe",
    img: "img/pkm/Voltorbe.png",
    type: ["electrik"],
    pv_max: 40,
    pv: 40,
    att: 30,
    def: 50,
    vit: 100,
    spe: 55,
    attacks: {
        Eclair: get_clone(attacks.Eclair),
        Meteores: get_clone(attacks.Meteores),
        Tonnerre: get_clone(attacks.Tonnerre),
        Charge: get_clone(attacks.Charge)
    },
    enemy: {}
}, {
    name: "Électrode",
    img: "img/pkm/Électrode.png",
    type: ["electrik"],
    pv_max: 60,
    pv: 60,
    att: 50,
    def: 70,
    vit: 140,
    spe: 80,
    attacks: {
        Eclair: get_clone(attacks.Eclair),
        Meteores: get_clone(attacks.Meteores),
        Tonnerre: get_clone(attacks.Tonnerre),
        Fatal_foudre: get_clone(attacks.Fatal_foudre)
    },
    enemy: {}
}, {
    name: "Noeunoeuf",
    img: "img/pkm/Noeunoeuf.png",
    type: ["plante", "psy"],
    pv_max: 60,
    pv: 60,
    att: 40,
    def: 80,
    vit: 40,
    spe: 60,
    attacks: {
        Pilonnage: get_clone(attacks.Pilonnage),
        Protection: get_clone(attacks.Protection),
        Vampigraine: get_clone(attacks.Vampigraine),
        Choc_mental: get_clone(attacks.Choc_mental)
    },
    enemy: {}
}, {
    name: "Noadkoko",
    img: "img/pkm/Noadkoko.png",
    type: ["plante", "psy"],
    pv_max: 95,
    pv: 95,
    att: 95,
    def: 85,
    vit: 55,
    spe: 125,
    attacks: {
        Pilonnage: get_clone(attacks.Pilonnage),
        Ecrasement: get_clone(attacks.Ecrasement),
        Choc_mental: get_clone(attacks.Choc_mental),
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf)
    },
    enemy: {}
}, {
    name: "Osselait",
    img: "img/pkm/Osselait.png",
    type: ["sol"],
    pv_max: 50,
    pv: 50,
    att: 50,
    def: 95,
    vit: 35,
    spe: 40,
    attacks: {
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Massd_Os: get_clone(attacks.Massd_Os),
        Puissance: get_clone(attacks.Puissance),
        Osmerang: get_clone(attacks.Osmerang)
    },
    enemy: {}
}, {
    name: "Ossatueur",
    img: "img/pkm/Ossatueur.png",
    type: ["sol"],
    pv_max: 60,
    pv: 60,
    att: 80,
    def: 110,
    vit: 45,
    spe: 50,
    attacks: {
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Massd_Os: get_clone(attacks.Massd_Os),
        Puissance: get_clone(attacks.Puissance),
        Osmerang: get_clone(attacks.Osmerang)
    },
    enemy: {}
}, {
    name: "Kicklee",
    img: "img/pkm/Kicklee.png",
    type: ["combat"],
    pv_max: 50,
    pv: 50,
    att: 120,
    def: 53,
    vit: 87,
    spe: 35,
    attacks: {
        Double_pied: get_clone(attacks.Double_pied),
        Yoga: get_clone(attacks.Yoga),
        Mawashi_Geri: get_clone(attacks.Mawashi_Geri),
        Ultimawhashi: get_clone(attacks.Ultimawhashi)
    },
    enemy: {}
}, {
    name: "Tygnon",
    img: "img/pkm/Tygnon.png",
    type: ["combat"],
    pv_max: 50,
    pv: 50,
    att: 105,
    def: 79,
    vit: 76,
    spe: 35,
    attacks: {
        Poing_Comete: get_clone(attacks.Poing_Comete),
        Poing_De_Feu: get_clone(attacks.Poing_De_Feu),
        Ultimapoing: get_clone(attacks.Ultimapoing),
        Hate: get_clone(attacks.Hate)
    },
    enemy: {}
}, {
    name: "Excelangue",
    img: "img/pkm/Excelangue.png",
    type: ["normal"],
    pv_max: 90,
    pv: 90,
    att: 55,
    def: 75,
    vit: 30,
    spe: 60,
    attacks: {
        Boul_armure: get_clone(attacks.Boul_armure),
        Ligotage: get_clone(attacks.Ligotage),
        Souplesse: get_clone(attacks.Souplesse),
        Grincement: get_clone(attacks.Grincement)
    },
    enemy: {}
}, {
    name: "Smogo",
    img: "img/pkm/Smogo.png",
    type: ["poison"],
    pv_max: 40,
    pv: 40,
    att: 65,
    def: 95,
    vit: 35,
    spe: 60,
    attacks: {
        Detritus: get_clone(attacks.Detritus),
        Acide: get_clone(attacks.Acide)
    },
    enemy: {}
}, {
    name: "Smogogo",
    img: "img/pkm/Smogogo.png",
    type: ["poison"],
    pv_max: 65,
    pv: 65,
    att: 90,
    def: 120,
    vit: 60,
    spe: 85,
    attacks: {
        Detritus: get_clone(attacks.Detritus),
        Acide: get_clone(attacks.Acide),
        Coupe: get_clone(attacks.Coupe),
    },
    enemy: {}
}, {
    name: "Rhinocorne",
    img: "img/pkm/Rhinocorne.png",
    type: ["sol", "roche"],
    pv_max: 80,
    pv: 80,
    att: 85,
    def: 95,
    vit: 25,
    spe: 30,
    attacks: {
        Koud_Korne: get_clone(attacks.Koud_Korne),
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Furie: get_clone(attacks.Furie),
        Belier: get_clone(attacks.Belier)
    },
    enemy: {}
}, {
    name: "Rhinoféros",
    img: "img/pkm/Rhinoféros.png",
    type: ["sol", "roche"],
    pv_max: 105,
    pv: 105,
    att: 130,
    def: 120,
    vit: 40,
    spe: 45,
    attacks: {
        Koud_Korne: get_clone(attacks.Koud_Korne),
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Furie: get_clone(attacks.Furie),
        Belier: get_clone(attacks.Belier)
    },
    enemy: {}
}, {
    name: "Leveinard",
    img: "img/pkm/Leveinard.png",
    type: ["normal"],
    pv_max: 250,
    pv: 250,
    att: 5,
    def: 5,
    vit: 50,
    spe: 105,
    attacks: {
        Bomb_oeuf: get_clone(attacks.Bomb_oeuf),
        E_coque: get_clone(attacks.E_coque),
        liliput: get_clone(attacks.liliput),
        Damocles: get_clone(attacks.Damocles)
    },
    enemy: {}
}, {
    name: "Saquedeneu",
    img: "img/pkm/Saquedeneu.png",
    type: ["plante"],
    pv_max: 65,
    pv: 65,
    att: 55,
    def: 115,
    vit: 60,
    spe: 100,
    attacks: {
        Constriction: get_clone(attacks.Constriction),
        Croissance: get_clone(attacks.Croissance),
        Fouet_Lianes: get_clone(attacks.Fouet_Lianes),
        Souplesse: get_clone(attacks.Souplesse)
    },
    enemy: {}
}, {
    name: "Kangourex",
    img: "img/pkm/Kangourex.png",
    type: ["normal"],
    pv_max: 105,
    pv: 105,
    att: 95,
    def: 80,
    vit: 90,
    spe: 40,
    attacks: {
        Morsure: get_clone(attacks.Morsure),
        Poing_Comete: get_clone(attacks.Poing_Comete),
        Ultimapoing: get_clone(attacks.Ultimapoing),
        Uppercut: get_clone(attacks.Uppercut)
    },
    enemy: {}
}, {
    name: "Hypotrempe",
    img: "img/pkm/Hypotrempe.png",
    type: ["eau"],
    pv_max: 30,
    pv: 30,
    att: 40,
    def: 70,
    vit: 60,
    spe: 70,
    attacks: {
        ecume: get_clone(attacks.ecume),
        Groz_Yeux: get_clone(attacks.Groz_Yeux),
        Puissance: get_clone(attacks.Puissance),
        Hate: get_clone(attacks.Hate)
    },
    enemy: {}
}, {
    name: "Hypocéan",
    img: "img/pkm/Hypocéan.png",
    type: ["eau"],
    pv_max: 55,
    pv: 55,
    att: 65,
    def: 95,
    vit: 85,
    spe: 95,
    attacks: {
        ecume: get_clone(attacks.ecume),
        Groz_Yeux: get_clone(attacks.Groz_Yeux),
        Puissance: get_clone(attacks.Puissance),
        Hydrocanon: get_clone(attacks.Hydrocanon)
    },
    enemy: {}
}, {
    name: "Poissirène",
    img: "img/pkm/Hypocéan.png",
    type: ["eau"],
    pv_max: 45,
    pv: 45,
    att: 67,
    def: 60,
    vit: 63,
    spe: 50,
    attacks: {
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Picpic: get_clone(attacks.Picpic),
        Koud_Korne: get_clone(attacks.Koud_Korne),
        Furie: get_clone(attacks.Furie)
    },
    enemy: {}
}, {
    name: "Poissoroy",
    img: "img/pkm/Poissoroy.png",
    type: ["eau"],
    pv_max: 80,
    pv: 80,
    att: 92,
    def: 65,
    vit: 68,
    spe: 80,
    attacks: {
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Picpic: get_clone(attacks.Picpic),
        Koud_Korne: get_clone(attacks.Koud_Korne),
        Hydrocanon: get_clone(attacks.Hydrocanon)
    },
    enemy: {}
}, {
    name: "Stari",
    img: "img/pkm/Stari.png",
    type: ["eau"],
    pv_max: 30,
    pv: 30,
    att: 45,
    def: 55,
    vit: 85,
    spe: 70,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Soin: get_clone(attacks.Soin),
        liliput: get_clone(attacks.liliput)
    },
    enemy: {}
}, {
    name: "Staross",
    img: "img/pkm/Staross.png",
    type: ["eau", "psy"],
    pv_max: 60,
    pv: 60,
    att: 75,
    def: 85,
    vit: 115,
    spe: 100,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Soin: get_clone(attacks.Soin),
        Hydrocanon: get_clone(attacks.Hydrocanon)
    },
    enemy: {}
}, {
    name: "M.Mime",
    img: "img/pkm/M.Mime.png",
    type: ["psy"],
    pv_max: 40,
    pv: 40,
    att: 45,
    def: 65,
    vit: 90,
    spe: 100,
    attacks: {
        Bouclier: get_clone(attacks.Bouclier),
        Yoga: get_clone(attacks.Yoga),
        Choc_mental: get_clone(attacks.Choc_mental),
        Psyko: get_clone(attacks.Psyko)
    },
    enemy: {}
}, {
    name: "Insécateur",
    img: "img/pkm/Insécateur.png",
    type: ["insecte", "vol"],
    pv_max: 70,
    pv: 70,
    att: 110,
    def: 80,
    vit: 105,
    spe: 55,
    attacks: {
        Groz_Yeux: get_clone(attacks.Groz_Yeux),
        Vive_Attaque: get_clone(attacks.Vive_Attaque),
        Hate: get_clone(attacks.Hate),
        Reflet: get_clone(attacks.Reflet)
    },
    enemy: {}
}, {
    name: "Lippoutou",
    img: "img/pkm/Lippoutou.png",
    type: ["glace", "psy"],
    pv_max: 65,
    pv: 65,
    att: 50,
    def: 35,
    vit: 95,
    spe: 95,
    attacks: {
        Ecras_face: get_clone(attacks.Ecras_face),
        Lechouille: get_clone(attacks.Lechouille),
        Poinglace: get_clone(attacks.Poinglace),
        Plaquage: get_clone(attacks.Plaquage)
    },
    enemy: {}
}, {
    name: "Élektek",
    img: "img/pkm/Élektek.png",
    type: ["eletrik"],
    pv_max: 65,
    pv: 65,
    att: 50,
    def: 35,
    vit: 95,
    spe: 95,
    attacks: {
        Eclair: get_clone(attacks.Eclair),
        Balayage: get_clone(attacks.Balayage),
        Meteores: get_clone(attacks.Meteores),
        Poing_Eclair: get_clone(attacks.Poing_Eclair)
    },
    enemy: {}
}, {
    name: "Magmar",
    img: "img/pkm/Magmar.png",
    type: ["feu"],
    pv_max: 65,
    pv: 65,
    att: 95,
    def: 57,
    vit: 93,
    spe: 85,
    attacks: {
        Flammeche: get_clone(attacks.Flammeche),
        Poing_De_Feu: get_clone(attacks.Poing_De_Feu),
        Groz_Yeux: get_clone(attacks.Groz_Yeux),
        Deflagration: get_clone(attacks.Deflagration)
    },
    enemy: {}
}, {
    name: "Scarabrute",
    img: "img/pkm/Scarabrute.png",
    type: ["insecte"],
    pv_max: 65,
    pv: 65,
    att: 125,
    def: 100,
    vit: 85,
    spe: 55,
    attacks: {
        Puissance: get_clone(attacks.Puissance),
        Croissance: get_clone(attacks.Croissance),
        Frappe_Atlas: get_clone(attacks.Frappe_Atlas),
        Mania: get_clone(attacks.Mania)
    },
    enemy: {}
}, {
    name: "Tauros",
    img: "img/pkm/Tauros.png",
    type: ["normal"],
    pv_max: 75,
    pv: 75,
    att: 100,
    def: 95,
    vit: 110,
    spe: 70,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Koud_Korne: get_clone(attacks.Koud_Korne),
        Mania: get_clone(attacks.Mania)
    },
    enemy: {}
}, {
    name: "Magicarpe",
    img: "img/pkm/Magicarpe.png",
    type: ["eau"],
    pv_max: 20,
    pv: 20,
    att: 10,
    def: 55,
    vit: 80,
    spe: 20,
    attacks: {
        Trempette: get_clone(attacks.Trempette)
    },
    enemy: {}
}, {
    name: "Léviator",
    img: "img/pkm/Léviator.png",
    type: ["eau", "vol"],
    pv_max: 95,
    pv: 95,
    att: 125,
    def: 79,
    vit: 81,
    spe: 100,
    attacks: {
        Morsure: get_clone(attacks.Morsure),
        Draco_rage: get_clone(attacks.Draco_rage),
        Hydrocanon: get_clone(attacks.Hydrocanon),
        Ultralaser: get_clone(attacks.Ultralaser)
    },
    enemy: {}
}, {
    name: "Lokhlass",
    img: "img/pkm/Lokhlass.png",
    type: ["eau", "glace"],
    pv_max: 130,
    pv: 130,
    att: 85,
    def: 80,
    vit: 60,
    spe: 95,
    attacks: {
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Hydrocanon: get_clone(attacks.Hydrocanon),
        Plaquage: get_clone(attacks.Plaquage),
        Laser_Glace: get_clone(attacks.Laser_Glace)
    },
    enemy: {}
}, {
    name: "Métamorph",
    img: "img/pkm/Métamorph.png",
    type: ["normal"],
    pv_max: 48,
    pv: 48,
    att: 48,
    def: 48,
    vit: 48,
    spe: 48,
    attacks: {
        Morphing: get_clone(attacks.Morphing)
    },
    enemy: {}
}, {
    name: "Évoli",
    img: "img/pkm/Évoli.png",
    type: ["normal"],
    pv_max: 55,
    pv: 55,
    att: 55,
    def: 50,
    vit: 55,
    spe: 65,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Jet_de_sable: get_clone(attacks.Jet_de_sable),
        Belier: get_clone(attacks.Belier)
    },
    enemy: {}
}, {
    name: "Aquali",
    img: "img/pkm/Aquali.png",
    type: ["eau"],
    pv_max: 130,
    pv: 130,
    att: 65,
    def: 60,
    vit: 65,
    spe: 110,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Jet_de_sable: get_clone(attacks.Jet_de_sable),
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Hydrocanon: get_clone(attacks.Hydrocanon)
    },
    enemy: {}
}, {
    name: "Voltali",
    img: "img/pkm/Voltali.png",
    type: ["electrik"],
    pv_max: 130,
    pv: 130,
    att: 65,
    def: 60,
    vit: 65,
    spe: 110,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Mimi_queue: get_clone(attacks.Mimi_queue),
        Eclair: get_clone(attacks.Eclair),
        Hate: get_clone(attacks.Hate)
    },
    enemy: {}
}, {
    name: "Pyroli",
    img: "img/pkm/Pyroli.png",
    type: ["feu"],
    pv_max: 65,
    pv: 65,
    att: 130,
    def: 60,
    vit: 65,
    spe: 110,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Jet_de_sable: get_clone(attacks.Jet_de_sable),
        Flammeche: get_clone(attacks.Flammeche),
        Deflagration: get_clone(attacks.Deflagration)
    },
    enemy: {}
}, {
    name: "Porygon",
    img: "img/pkm/Porygon.png",
    type: ["normal"],
    pv_max: 65,
    pv: 65,
    att: 60,
    def: 70,
    vit: 40,
    spe: 75,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Rafale_Psy: get_clone(attacks.Rafale_Psy),
        Soin: get_clone(attacks.Soin),
        Triplattaque: get_clone(attacks.Triplattaque)
    },
    enemy: {}
}, {
    name: "Amonita",
    img: "img/pkm/Amonita.png",
    type: ["roche", "eau"],
    pv_max: 35,
    pv: 35,
    att: 40,
    def: 100,
    vit: 35,
    spe: 90,
    attacks: {
        Constriction: get_clone(attacks.Constriction),
        Repli: get_clone(attacks.Repli),
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Hydrocanon: get_clone(attacks.Hydrocanon)
    },
    enemy: {}
}, {
    name: "Amonistar",
    img: "img/pkm/Amonistar.png",
    type: ["roche", "eau"],
    pv_max: 70,
    pv: 70,
    att: 60,
    def: 125,
    vit: 55,
    spe: 115,
    attacks: {
        Repli: get_clone(attacks.Repli),
        Pistolet_a_O: get_clone(attacks.Pistolet_a_O),
        Groz_Yeux: get_clone(attacks.Groz_Yeux),
        Hydrocanon: get_clone(attacks.Hydrocanon)
    },
    enemy: {}
}, {
    name: "Kabuto",
    img: "img/pkm/Kabuto.png",
    type: ["roche", "eau"],
    pv_max: 30,
    pv: 30,
    att: 80,
    def: 90,
    vit: 55,
    spe: 45,
    attacks: {
        Armure: get_clone(attacks.Armure),
        Griffe: get_clone(attacks.Griffe),
        Groz_Yeux: get_clone(attacks.Groz_Yeux),
        Jet_de_sable: get_clone(attacks.Jet_de_sable)
    },
    enemy: {}
}, {
    name: "Kabutops",
    img: "img/pkm/Kabutops.png",
    type: ["poison", "eau"],
    pv_max: 60,
    pv: 60,
    att: 115,
    def: 105,
    vit: 80,
    spe: 70,
    attacks: {
        Armure: get_clone(attacks.Armure),
        Griffe: get_clone(attacks.Griffe),
        Groz_Yeux: get_clone(attacks.Groz_Yeux),
        Jet_de_sable: get_clone(attacks.Jet_de_sable)
    },
    enemy: {}
}, {
    name: "Ptéra",
    img: "img/pkm/Ptéra.png",
    type: ["roche", "vol"],
    pv_max: 80,
    pv: 80,
    att: 105,
    def: 65,
    vit: 130,
    spe: 60,
    attacks: {
        Cru_aile: get_clone(attacks.Cru_aile),
        Morsure: get_clone(attacks.Morsure),
        Hate: get_clone(attacks.Hate),
        Belier: get_clone(attacks.Belier)
    },
    enemy: {}
}, {
    name: "Ronflex",
    img: "img/pkm/Ronflex.png",
    type: ["normal"],
    pv_max: 160,
    pv: 160,
    att: 110,
    def: 65,
    vit: 30,
    spe: 65,
    attacks: {
        Charge: get_clone(attacks.Charge),
        Amnesie: get_clone(attacks.Amnesie),
        Lechouille: get_clone(attacks.Lechouille),
        Ultralaser: get_clone(attacks.Ultralaser)
    },
    enemy: {}
}, {
    name: "Artikodin",
    img: "img/pkm/Artikodin.png",
    type: ["glace", "vol"],
    pv_max: 90,
    pv: 90,
    att: 85,
    def: 100,
    vit: 85,
    spe: 125,
    attacks: {
        Tornade: get_clone(attacks.Tornade),
        Hate: get_clone(attacks.Hate),
        Laser_Glace: get_clone(attacks.Laser_Glace),
        Blizzard: get_clone(attacks.Blizzard)
    },
    enemy: {}
}, {
    name: "Électhor",
    img: "img/pkm/Électhor.png",
    type: ["electrik", "vol"],
    pv_max: 90,
    pv: 90,
    att: 90,
    def: 85,
    vit: 100,
    spe: 125,
    attacks: {
        Eclair: get_clone(attacks.Eclair),
        Picpic: get_clone(attacks.Picpic),
        Bec_vrille: get_clone(attacks.Bec_vrille),
        Fatal_foudre: get_clone(attacks.Fatal_foudre)
    },
    enemy: {}
}, {
    name: "Sulfura",
    img: "img/pkm/Sulfura.png",
    type: ["feu", "vol"],
    pv_max: 90,
    pv: 90,
    att: 100,
    def: 90,
    vit: 90,
    spe: 125,
    attacks: {
        Cru_aile: get_clone(attacks.Cru_aile),
        Hate: get_clone(attacks.Hate),
        Lance_Flamme: get_clone(attacks.Lance_Flamme),
        Lance_Soleil: get_clone(attacks.Lance_Soleil)
    },
    enemy: {}
}, {
    name: "Minidraco",
    img: "img/pkm/Minidraco.png",
    type: ["dragon"],
    pv_max: 41,
    pv: 41,
    att: 64,
    def: 45,
    vit: 50,
    spe: 50,
    attacks: {
        Groz_Yeux: get_clone(attacks.Groz_Yeux),
        Draco_rage: get_clone(attacks.Draco_rage),
        Souplesse: get_clone(attacks.Souplesse),
        Hate: get_clone(attacks.Hate)
    },
    enemy: {}
}, {
    name: "Draco",
    img: "img/pkm/Draco.png",
    type: ["dragon"],
    pv_max: 61,
    pv: 61,
    att: 84,
    def: 65,
    vit: 70,
    spe: 70,
    attacks: {
        Groz_Yeux: get_clone(attacks.Groz_Yeux),
        Draco_rage: get_clone(attacks.Draco_rage),
        Souplesse: get_clone(attacks.Souplesse),
        Ultralaser: get_clone(attacks.Ultralaser)
    },
    enemy: {}
}, {
    name: "Dracolosse",
    img: "img/pkm/Dracolosse.png",
    type: ["dragon", "vol"],
    pv_max: 61,
    pv: 61,
    att: 84,
    def: 65,
    vit: 70,
    spe: 70,
    attacks: {
        Groz_Yeux: get_clone(attacks.Groz_Yeux),
        Draco_rage: get_clone(attacks.Draco_rage),
        Souplesse: get_clone(attacks.Souplesse),
        Ultralaser: get_clone(attacks.Ultralaser)
    },
    enemy: {}
}, {
    name: "Mewtwo",
    img: "img/pkm/Mewtwo.png",
    type: ["psy"],
    pv_max: 106,
    pv: 106,
    att: 110,
    def: 90,
    vit: 130,
    spe: 154,
    attacks: {
        Choc_mental: get_clone(attacks.Choc_mental),
        Psyko: get_clone(attacks.Psyko),
        Soin: get_clone(attacks.Soin),
        Meteores: get_clone(attacks.Meteores)
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
    lifebar_enemy.style.background = "blue";
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

function aff(player, enemy) {
    turn = 2;
    let player_aff = document.createElement('img');
    let enemy_aff = document.createElement('img');
    player_aff.src = `${player.img}`;
    enemy_aff.src = `${enemy.img}`;
    document.querySelector("main").innerHTML = "";
    document.querySelector("#textzone").innerHTML = "";
    document.querySelector("main").appendChild(player_aff);
    document.querySelector("main").appendChild(enemy_aff);
    let text = document.createElement("p");
    text.textContent = `Le joueur envoie ${player.name} et l'adversaire envoie ${player.enemy.name}`;
    document.querySelector("#textzone").appendChild(text);
    aff_lifebar(enemy);
}

buttons = document.querySelectorAll(".combat");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        player = getPokemon(pkms);
        enemy = getPokemon(pkms);
        player.enemy = enemy;
        enemy.enemy = player;
        aff(player, enemy);
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

document.addEventListener("keydown", function() {
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

function make_get_player(pkm) {
    return function() {
        player = get_clone(pkm);
        if (enemy !== null) {
            player.enemy = enemy;
            enemy.enemy = player;
            aff(player, enemy);
        }
        document.querySelector("#left").remove();
    };
}

function make_get_enemy(pkm) {
    return function() {
        enemy = get_clone(pkm);
        if (player !== null) {
            enemy.enemy = player;
            player.enemy = enemy;
            aff(player, enemy);
        }
        document.querySelector("#right").remove();
    };
}

document.querySelector("#list_pkms").addEventListener("click", function() {
    player = null;
    enemy = null;
    main = document.querySelector("main");
    main.innerHTML = `<div id="left"></div><div id="right"></div>`;
    for (let pkm of pkms) {
        let pkm_elem = document.createElement("Button");
        pkm_elem.innerHTML = `name: ${pkm.name} type: ${pkm.type[0]} pv: ${pkm.pv_max}
        att: ${pkm.att} def: ${pkm.def} vit: ${pkm.vit} spe: ${pkm.spe} <img src=${pkm.img} alt=${pkm.img}>`;
        pkm_elem.addEventListener("click", make_get_player(pkm));
        document.querySelector("#left").appendChild(pkm_elem);
    }
    for (let pkm of pkms) {
        let pkm_elem = document.createElement("Button");
        pkm_elem.innerHTML = `name: ${pkm.name} type: ${pkm.type[0]} pv: ${pkm.pv_max}
        att: ${pkm.att} def: ${pkm.def} vit: ${pkm.vit} spe: ${pkm.spe} <img src=${pkm.img} alt=${pkm.img}>`;
        pkm_elem.addEventListener("click", make_get_enemy(pkm));
        document.querySelector("#right").appendChild(pkm_elem);
    }
});