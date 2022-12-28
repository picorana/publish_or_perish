let player = {
    total_citations: 0,
    papers: [],
    tickspeed: 100,
    citations_by_year: {},
    current_date: new Date(),
    current_year: new Date().getFullYear(),
    start_date: new Date(),
    update_cycles_per_year: 100,
    update_cycles: 0,
    money: 0,
    coauthors: [],
}

let upgrades = [
    {
        name: "Drink Coffee",
        desc: "10% faster writing speed",
        cost: 10,
        effect: function(){
            player.tickspeed *= .9;
        },
        unlocked: false,
    }, {
        name: "Drink More Coffee",
        desc: "10% faster writing speed",
        cost: 100,
        effect: function(){
            player.tickspeed *= .9;
        },
        unlocked: false,
    }, {
        name: "Get coauthor",
        desc: "Coauthors can help you write papers",
        cost: 0,
        effect: function(){
            add_coauthor();
        },
        unlocked: false,
    }
]

let hist = new Hist();

function gen_paper_title(){
    return "New Paper";
}

function add_paper(){
    let new_paper = {
        title: gen_paper_title(),
        citations: 0,
        authors: [],
        progress: 0,
        speed: Math.random()*0.5,
        year: player.current_year,
    }
    player.papers.push(new_paper);

    let main_col = document.getElementById("gsc_a_b");
    new_paper.div = document.createElement("tr");
    main_col.insertBefore(new_paper.div, main_col.firstChild);

    new_paper.div.className = "gsc_a_tr";

    new_paper.div.td = document.createElement("td");
    new_paper.div.td.className = "gsc_a_t";
    new_paper.div.appendChild(new_paper.div.td);

    new_paper.div.ttl = document.createElement("a");
    new_paper.div.ttl.className = "gsc_a_at";
    new_paper.div.appendChild(new_paper.div.ttl);
    new_paper.div.ttl.innerHTML = new_paper.title;

    new_paper.div.cit = document.createElement("td");
    new_paper.div.cit.className = "gsc_a_c";
    new_paper.div.appendChild(new_paper.div.cit);
    new_paper.div.cit.innerHTML = new_paper.citations;

    new_paper.div.yr = document.createElement("td");
    new_paper.div.yr.className = "gsc_a_y";
    new_paper.div.appendChild(new_paper.div.yr);
    new_paper.div.yr.innerHTML = new_paper.year;

    new_paper.div.progress_btn = document.createElement("button");
    new_paper.div.progress_btn.className = "gsc_a_ac";
    new_paper.div.progress_btn.innerHTML = "Write";
    new_paper.div.progress_btn.style.margin = "10px";
    new_paper.div.progress_btn.onclick = function(){
        new_paper.progress += 0.1;
        if (new_paper.progress >= 0.9) {
            new_paper.div.progress_btn.innerHTML = "Done";
            new_paper.div.progress_btn.disabled = true;
        }
        else new_paper.div.progress_btn.innerHTML = Math.round(new_paper.progress*100) + "%";
    }
    new_paper.div.ttl.appendChild(new_paper.div.progress_btn);
}

function update_total_citations(){
    let total_citations = 0;
    for (let paper of player.papers){
        total_citations += paper.citations;
    }
    player.total_citations = total_citations;
    document.getElementById("all_cit").innerHTML = Math.round(total_citations);
}

function update_h_index(){
    let h_index = 0;
    let citations = [];
    for (let paper of player.papers){
        citations.push(paper.citations);
    }
    citations.sort((a, b) => b - a);
    for (let i = 0; i < citations.length; i++){
        if (citations[i] >= i+1) h_index = i+1;
    }
    document.getElementById("all_h-index").innerHTML = h_index;
}

function update_i10_index(){
    let i10_index = 0;
    let citations = [];
    for (let paper of player.papers){
        citations.push(paper.citations);
    }
    citations.sort((a, b) => b - a);
    for (let i = 0; i < citations.length; i++){
        if (citations[i] >= 10) i10_index++;
    }
    document.getElementById("all_i10_index").innerHTML = i10_index;
}

function check_upgrade_unlock_conditions(upgrade){
    return true;
}

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
        if (player.total_citations < upgrade.cost) return;
        player.total_citations -= upgrade.cost;
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

function update(){
    for (let paper of player.papers){
        if (paper.progress < 0.9) continue;

        paper.citations += paper.speed;
        paper.div.cit.innerHTML = Math.round(paper.citations);
        player.citations_by_year[player.current_year] += paper.speed;
    }

    if (player.papers.every(p => p.progress >= 0.9)) add_paper();

    for (let upgrade of upgrades){
        if (upgrade.unlocked) continue;
        if (!check_upgrade_unlock_conditions(upgrade)) continue;
        upgrade.unlocked = true;
        draw_upgrade(upgrade);
    }

    update_total_citations();
    update_h_index();
    update_i10_index();
    hist.update();

    player.update_cycles++;
    if (player.update_cycles % player.update_cycles_per_year == 0) {
        player.current_year += 1;
        player.update_cycles = 0;
        player.citations_by_year[player.current_year] = 0;
    }

    setTimeout(update, player.tickspeed);
}

function add_coauthor(){
    let coauthor = {
        name: "Coauthor " + player.coauthors.length,
        speed: 1,
        assigned_paper: null,
    }

    player.coauthors.push(coauthor);
}

function init(){
    player.citations_by_year[player.current_year] = 0;

    add_paper();
    add_coauthor();
    
    update();
}

init();