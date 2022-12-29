let testing = false;

let player = {
    total_citations: 0,
    papers: [],
    tickspeed: 1000,
    citations_by_year: {},
    current_date: new Date(),
    current_year: new Date().getFullYear(),
    start_date: new Date(),
    update_cycles_per_year: 100,
    update_cycles: 0,

    money: 0,
    money_citations_factor: 0.1,
    
    coauthors: [],
    write_per_click: 0.05,
}

// testing currently goes at 10x speed
if (testing){
    player.tickspeed = 100;
    add_coauthor();
}

let hist = new Hist();

function add_paper(){
    new Paper();
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

function update_money(){
    player.money += player.total_citations * player.money_citations_factor;
    document.getElementById("money_val").innerHTML = "Money: " + Math.round(player.money);
}

function update_money_formula(){
    document.getElementById("money_formula").innerHTML = "Money = citations * " + player.money_citations_factor;
}

function show_info(){
    document.getElementById("info").style.display = "block";
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
    update_coauthors();
    hist.update();
    update_money();

    player.update_cycles++;
    if (player.update_cycles % player.update_cycles_per_year == 0) {
        player.current_year += 1;
        player.update_cycles = 0;
        player.citations_by_year[player.current_year] = 0;
    }

    setTimeout(update, player.tickspeed);
}

function update_coauthors(){
    for (let coauthor of player.coauthors){
        coauthor.update();
    }
}

function add_coauthor(){
    new Coauthor();
}

function init(){
    player.citations_by_year[player.current_year] = 0;

    add_paper();
    // add_coauthor();
    
    update();
}

init();