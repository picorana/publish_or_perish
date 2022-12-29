let upgrades = [
    {
        name: "Drink Coffee",
        desc: "2x writing per click",
        cost: 10,
        effect: function(){
            player.write_per_click *= 2;
        },
        unlocked: false,
    }, {
        name: "Get coauthor",
        desc: "Coauthors automatically write papers",
        cost: 0,
        effect: function(){
            add_coauthor();
        },
        unlocked: false,
    }, {
        name: "Get a grant",
        desc: "2x money per citation",
        cost: 100,
        effect: function(){
            player.money_citations_factor *= 2;
            update_money_formula();
        }
    }
]

function draw_upgrade(upgrade){
    let upgraderow = document.getElementById("gsc_prf_nbar_btns");

    upgrade.div = document.createElement("div");
    upgrade.div.className = "upgrade_card";
    upgraderow.appendChild(upgrade.div);

    upgrade.div.btn = document.createElement("button");
    upgrade.div.btn.className = "gsc_prf_pua gsc_prf_pua-upgrade";
    upgrade.div.btn.innerHTML = upgrade.name;
    upgrade.div.appendChild(upgrade.div.btn);

    upgrade.div.btn.onclick = function(){
        if (player.money < upgrade.cost) return;
        player.money -= upgrade.cost;
        upgrade.effect();
        update_total_citations();
        upgrade.div.style.display = "none";
    }

    upgrade.div.desc = document.createElement("div");
    upgrade.div.desc.className = "gsc_prf_pud";
    upgrade.div.desc.innerHTML = upgrade.desc;
    upgrade.div.appendChild(upgrade.div.desc);

    upgrade.div.cost = document.createElement("div");
    upgrade.div.cost.className = "gsc_prf_puc";
    upgrade.div.cost.innerHTML = "cost: " + upgrade.cost;
    upgrade.div.appendChild(upgrade.div.cost);

    // upgrade.div.cost_icon = document.createElement("img");

}

function check_upgrade_unlock_conditions(upgrade){
    return true;
}
