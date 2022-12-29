class Coauthor {
    constructor () {
        this.name = "Coauthor " + player.coauthors.length
        this.speed = 0.01
        this.assigned_paper = null
        
    
        player.coauthors.push(this);
    
        let crow = d3.select("#coauthorlist").append("li")
            .attr("class", "gsc_rsb_aa")
            .style("display", "flex")
        this.crow = crow;
    
        // image
        let i = crow.append("span")
        i.append("img")
            .attr("src", Math.random() < 0.5? "img/f_reading.svg" : "img/m_reading.svg")
            .attr("width", "32")
            .attr("height", "32")
    
        // name
        let s = crow.append("span")
            .attr("class", "gsc_rsb_a_desc")
            
        s.append("a")
            .text(this.name)
    
        s.append("span")
            .attr("class", "gsc_rsb_a_ext")
            .text("Northeastern University")
    }

    update(){
        if (this.assigned_paper == null) {
            let papers = player.papers.filter(p => p.progress <= 0.9);
            if (papers.length == 0) this.assigned_paper = null;
            this.assigned_paper = papers[Math.floor(Math.random()*papers.length)];
        }

        this.assigned_paper.write(this.speed);
        if (this.assigned_paper.complete) this.assigned_paper = null;
    }
}