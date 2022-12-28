class Hist {
    constructor(){
        this.rectwidth = 7;
    
        this.hist_svg = d3.select("#hist_svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .style("max-height", "174px")
            .attr("viewBox", "0 0 100 100")
            // .attr("preserveAspectRatio", "xMinYMin meet");
    
        let yearstart = player.current_year - 7;
        let yearend = player.current_year;
    
        this.xscale = d3.scaleLinear()
            .domain([yearstart, yearend])
            .range([0, 110]);
    
        this.yscale = d3.scaleLinear()
            .domain([0, 10])
            .range([100, 0]);
    
        let xaxis = d3.axisBottom(this.xscale);
        let yaxis = d3.axisLeft(this.yscale);

        for (let i = 0; i < 3; i++){
            this.hist_svg.append("line")
                .attr("x1", -10)
                .attr("y1", i*33 + 5)
                .attr("x2", 110)
                .attr("y2", i*33 + 5)
                .attr("stroke", "#ddd")
                .attr("stroke-width", 0.5);

            this.hist_svg.append("text")
                .attr("x", 125)
                .attr("y", i*33 + 7)
                .attr("text-anchor", "start")
                .attr("font-size", "0.45em")
                .style("fill", "gray")
                .attr("id", "maxnumcit_" + i)
                .text("");
        }
    
        for (let i=yearstart; i<=yearend; i++){
            this.hist_svg.append("rect")
                .attr("x", this.xscale(i) - this.rectwidth/2)
                .attr("y", 0)
                .attr("width", this.rectwidth)
                .attr("height", 0)
                .attr("id", "rect_" + (i - yearstart))
                .attr("fill", "gray");
    
            this.hist_svg.append("text")
                .attr("x", this.xscale(i))
                .attr("y", 90)
                .attr("text-anchor", "middle")
                .attr("font-size", "0.45em")
                .style("fill", "gray")
                .attr("id", "yrtext_" + (i - yearstart))
                .text(i);
        }

        
    }

    update(){
        let yearstart = player.current_year - 7;
        let yearend = player.current_year;

        this.xscale = d3.scaleLinear()
            .domain([yearstart, yearend])
            .range([0, 110]);

        let maxval = Object.values(player.citations_by_year).reduce((a, b) => Math.max(a, b));
        this.yscale = d3.scaleLinear()
            .domain([0, maxval])
            .range([100, 0]);

        for (let i=0; i<8; i++){
            if (player.citations_by_year[yearstart + i] == undefined) continue;
            if (player.citations_by_year[yearstart + i] == 0) {
                d3.select("#rect_" + i)
                    .attr("height", 0);
                continue;
            }

            let r = d3.select("#rect_" + i);
            r.attr("y", this.yscale(player.citations_by_year[yearstart + i]) - 20)
                .attr("height", 100 - this.yscale(player.citations_by_year[yearstart + i]))  
        
            d3.select("#yrtext_" + i)
                .text(i + yearstart);
        }

        for (let i=0; i<3; i++){
            d3.select("#maxnumcit_" + i)
                .text(Math.floor(maxval/3 * ((3-i)+1)));
        }
    }
}