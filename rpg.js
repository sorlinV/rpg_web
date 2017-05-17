let player = {
    name: "Bulbizarre",
    img: "img/pkm/bulbizarre.png",
    type: ["plante", "poison"],
    pv: 45,
    pv_max: 45,
    att: 49,
    def: 49,
    vit: 45,
    spe: 65,
    attacks: {},
    enemy: {}
}

let enemy = {
    name: "Bulbizarre",
    img: "img/pkm/bulbizarre.png",
    type: ["plante", "poison"],
    pv: 45,
    pv_max: 45,
    att: 49,
    def: 49,
    vit: 45,
    spe: 65,
    attacks: {},
    enemy: player
}

player.enemy = enemy;

let menu = {
    text: "",
}

function do_action(attaquant, attack) {
    if (attaquant.attacks[attack.name].type_att === "pv-") {
        attaquant.enemy.pv -= attaquant.attacks[attack.name].pui * (attaquant.att / 100)
        if (attaquant.enemy.pv < 0) {
            attaquant.enemy.pv = 0;
        }
    }
    if (attaquant[attack.type_att === "pv+"]) {
        attaquant.pv += attaquant.attacks[attack.name].pui * (attaquant.spe / 100)
        if (attaquant.pv > attaquant.pv_max) {
            attaquant.pv = attaquant.pv_max;
        }
    }
    if (attaquant[attack.name].type_att.substring(0, 6) === "boost+") {
        attaquant[attaquant[attack.name].type_att.substring(-1, 3)] += attaquant.attacks[attack.name].pui * (attaquant.spe / 100)
    }
    if (attaquant[attack.name].type_att.substring(0, 6) === "boost-") {
        attaquant.enemy[attaquant[attack.name].type_att.substring(-1, 3)] -= attaquant.attacks[attack.name].pui * (attaquant.spe / 100)
    }
    if (attaquant[attack.name].type_att.substring(0, 2) === "ct") {
        if (attaquant[attack.name].type_att.substring(-1, 5) === "enemy") {
            attaquant.type = attaquant.enemy.type;
        } else {
            attaquant.type = attaquant[attack.name].type_att.split('-')[1];
        }
    }
    return attaquant;
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
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu)) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Acidarmure: {
        name: "Acidarmure",
        type: "Poison",
        type_imu: undefined,
        pp: 40,
        pre: 1,
        pui: 20,
        type_att: "boost+def",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Acide: {
        name: "Acide",
        type: "Poison",
        type_imu: undefined,
        pp: 30,
        pre: 1,
        pui: 40,
        type_att: "pv-",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Adaptation: {
        name: "Adaptation",
        type: "normal",
        type_imu: "spectre",
        pp: 30,
        pre: 1,
        pui: -1,
        type_att: "ct-enemy",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Affutage: {
        name: "Affutage",
        type: "normal",
        type_imu: "spectre",
        pp: 30,
        pre: 1,
        pui: 10,
        type_att: "boost+att",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Amnesie: {
        name: "Amnesie",
        type: "psy",
        type_imu: undefined,
        pp: 20,
        pre: 1,
        pui: 20,
        type_att: "boost+spe",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Armure: {
        name: "Armure",
        type: "normal",
        type_imu: "spectre",
        pp: 20,
        pre: 1,
        pui: 10,
        type_att: "boost+def",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Balayage: {
        name: "Balayage",
        type: "combat",
        type_imu: "spectre",
        pp: 30,
        pre: 0.9,
        pui: 50,
        type_att: "pv-",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Bec_vrille: {
        name: "Bec_vrille",
        type: "vol",
        type_imu: undefined,
        pp: 20,
        pre: 1,
        pui: 80,
        type_att: "pv-",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Belier: {
        name: "Belier",
        type: "normal",
        type_imu: undefined,
        pp: 20,
        pre: 0.85,
        pui: 90,
        type_att: "pv-",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Blizzard: {
        name: "Blizzard",
        type: "grace",
        type_imu: undefined,
        pp: 5,
        pre: 0.9,
        pui: 120,
        type_att: "pv-",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Bomb_oeuf: {
        name: "Bomb_oeuf",
        type: "normal",
        type_imu: undefined,
        pp: 10,
        pre: 0.75,
        pui: 100,
        type_att: "pv-",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Bouclier: {
        name: "Bouclier",
        type: "psy",
        type_imu: undefined,
        pp: 10,
        pre: 1,
        pui: 20,
        type_att: "boost+def",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Boul_armure: {
        name: "Boul_armure",
        type: "normal",
        type_imu: undefined,
        pp: 40,
        pre: 1,
        pui: 10,
        type_att: "boost+def",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Bulles_D_O: {
        name: "Bulles_D_O",
        type: "eau",
        type_imu: undefined,
        pp: 20,
        pre: 1,
        pui: 65,
        type_att: "pv-",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Cascade: {
        name: "Cascade",
        type: "eau",
        type_imu: undefined,
        pp: 15,
        pre: 1,
        pui: 80,
        type_att: "pv-",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Charge: {
        name: "Charge",
        type: "normal",
        type_imu: "spectre",
        pp: 35,
        pre: 0.95,
        pui: 35,
        type_att: "pv-",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        attaquant = do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Choc_mental: {
        name: "Choc_mental",
        type: "psy",
        type_imu: undefined,
        pp: 25,
        pre: 1,
        pui: 50,
        type_att: "pv-",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        attaquant = do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
    Combo_griffe: {
        name: "Combo_griffe",
        type: "normal",
        type_imu: undefined,
        pp: 0.8,
        pui: 18 * (Math.random() * 4 + 1),
        type_att: "pv-",
        action: function(attaquant, attack) {
            if (attaquant.attacks[attack.name].pp > 0) {
                if (!attaquant.enemy.type.find(attaquant.attacks[attack.name].type_imu) || attaquant.attacks[attack.name].type_imu === undefined) {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        attaquant = do_action(attaquant, attack);
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name}`
                    }
                } else {
                    if (Math.random <= attaquant.attacks[attack.name].pre) {
                        menu.text = `${attaquant.name} utilise ${attaquant.attacks[attack.name].name} mais ${attaquant.enemy} est imunisé`
                    }
                }
                attaquant.attacks[attack.name].pp--;
                return attaquant;
            } else {
                menu.text = `${attaquant.attacks[attack.name].name} n'a plus de pp`;
                return false;
            }
        }
    },
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
        Abime: attacks.Abime,
        Bomb_oeuf: attacks.Bomb_oeuf,
        Belier: attacks.Belier,
        Bulles_D_O: attacks.Bulles_D_O
    },
    enemy: player
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
    attacks: { Abime: attacks.Abime, Bomb_oeuf: attacks.Bomb_oeuf, Belier: attacks.Belier, Bulles_D_O: attacks.Bulles_D_O },
    enemy: player
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
    attacks: { Abime: attacks.Abime, Bomb_oeuf: attacks.Bomb_oeuf, Belier: attacks.Belier, Bulles_D_O: attacks.Bulles_D_O },
    enemy: player
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
        Abime: attacks.Abime,
        Bomb_oeuf: attacks.Bomb_oeuf,
        Belier: attacks.Belier,
        Bulles_D_O: attacks.Bulles_D_O
    },
    enemy: player
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
        Abime: attacks.Abime,
        Bomb_oeuf: attacks.Bomb_oeuf,
        Belier: attacks.Belier,
        Bulles_D_O: attacks.Bulles_D_O
    },
    enemy: player
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
        Abime: attacks.Abime,
        Bomb_oeuf: attacks.Bomb_oeuf,
        Belier: attacks.Belier,
        Bulles_D_O: attacks.Bulles_D_O
    },
    enemy: player
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
        Abime: attacks.Abime,
        Bomb_oeuf: attacks.Bomb_oeuf,
        Belier: attacks.Belier,
        Bulles_D_O: attacks.Bulles_D_O
    },
    enemy: player
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
        Abime: attacks.Abime,
        Bomb_oeuf: attacks.Bomb_oeuf,
        Belier: attacks.Belier,
        Bulles_D_O: attacks.Bulles_D_O
    },
    enemy: player
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
        Abime: attacks.Abime,
        Bomb_oeuf: attacks.Bomb_oeuf,
        Belier: attacks.Belier,
        Bulles_D_O: attacks.Bulles_D_O
    },
    enemy: player
}, {
    name: "Chenipan",
    img: "img/pkm/Chenipan.png",
    type: ["insect"], //45 - 30 - 35 - 45 - 20
    pv: 45,
    pv_max: 45,
    att: 30,
    def: 35,
    vit: 45,
    spe: 20,
    attacks: {
        Abime: attacks.Abime,
        Bomb_oeuf: attacks.Bomb_oeuf,
        Belier: attacks.Belier,
        Bulles_D_O: attacks.Bulles_D_O
    },
    enemy: player
}]

function create_buttons(attacks) {
    for (attack in attacks) {
        let button = document.createElement('button');
        button.textContent = attacks[attack].name;
        console.log(attacks[attack].pp);
        button.addEventListener("click", function() {
            player = attacks[attack].action(player, attacks[attack]);
        });
        document.querySelector("main").appendChild(button);
    }
}

document.querySelector("button").addEventListener("click", function() {
    document.querySelector("main").innerHTML = "";
    player = pkms[Math.round(Math.random() * (pkms.length - 1))];
    enemy = pkms[Math.round(Math.random() * (pkms.length - 1))];
    player.enemy = enemy;
    let player_aff = document.createElement('img');
    let enemy_aff = document.createElement('img');
    player_aff.src = `${player.img}`
    enemy_aff.src = `${enemy.img}`
    document.querySelector("main").appendChild(player_aff);
    document.querySelector("main").appendChild(enemy_aff);
    create_buttons(player.attacks);
});