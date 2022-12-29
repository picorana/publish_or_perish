class Paper {
    constructor(){
        this.title = this.gen_paper_title()
        this.citations = 0
        this.authors = []
        this.progress = 0
        this.speed = Math.random()*0.5
        this.year = player.current_year
        this.complete = false;
        
        player.papers.push(this);
    
        let main_col = document.getElementById("gsc_a_b");
        this.div = document.createElement("tr");
        main_col.insertBefore(this.div, main_col.firstChild);
    
        this.div.className = "gsc_a_tr";
    
        this.div.td = document.createElement("td");
        this.div.td.className = "gsc_a_t";
        this.div.appendChild(this.div.td);
    
        this.div.ttl = document.createElement("a");
        this.div.ttl.className = "gsc_a_at";
        this.div.appendChild(this.div.ttl);
        this.div.ttl.innerHTML = this.title;
    
        this.div.cit = document.createElement("td");
        this.div.cit.className = "gsc_a_c";
        this.div.appendChild(this.div.cit);
        this.div.cit.innerHTML = this.citations;
    
        this.div.yr = document.createElement("td");
        this.div.yr.className = "gsc_a_y";
        this.div.appendChild(this.div.yr);
        this.div.yr.innerHTML = this.year;
    
        this.div.progress_btn = document.createElement("button");
        this.div.progress_btn.className = "gsc_a_ac";
        this.div.progress_btn.innerHTML = "Write";
        this.div.progress_btn.style.margin = "10px";
        this.div.progress_btn.onclick = () => this.write(player.write_per_click)
        this.div.ttl.appendChild(this.div.progress_btn);
    }

    write(amount){
        this.progress += amount;
        if (this.progress >= 0.9) {
            this.div.progress_btn.innerHTML = "Done";
            this.div.progress_btn.disabled = true;
            this.complete = true;
        }
        else this.div.progress_btn.innerHTML = Math.round(this.progress*100) + "%";
    }

    gen_paper_title(){
        return "New Paper";
    }
}