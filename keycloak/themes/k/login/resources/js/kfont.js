const KFont = (function() {
    const TOWER = (x, h=4, b=76) => `M${x} ${b} L${x+2.5} ${h} L${x+5} ${b} Z`;
    const S1 = (x=6) => `M${x} 4 Q25 4 44 35 L38 35 Q25 14 ${x} 14 Z`;
    const S2 = (x=6) => `M${x} 76 Q25 76 44 45 L38 45 Q25 66 ${x} 66 Z`;
    const AU = (x=6) => `M${x} 20 Q25 -10 44 20 L44 30 Q25 0 ${x} 30 Z`;
    const AD = (x=6) => `M${x} 60 Q25 90 44 60 L44 50 Q25 80 ${x} 50 Z`;
    const AL = (x=12, y1=15, y2=65) => `M${x} ${y1} Q-5 40 ${x} ${y2} L${x+8} ${y2} Q3 40 ${x+8} ${y1} Z`;
    const AR = (x=38, y1=15, y2=65) => `M${x} ${y1} Q55 40 ${x} ${y2} L${x-8} ${y2} Q47 40 ${x-8} ${y1} Z`;
    const SW = (y, w=44, x=6) => `M${x} ${y+1} L${x+4} ${y+1} L${x+4} ${y+7} L${x} ${y+7} Z M${x+6} ${y} L${w-5} ${y} L${w} ${y+4} L${w-5} ${y+8} L${x+6} ${y+8} Z`;
    const LS = (y, w=46, mid=25) => `M${mid-3} ${y+1} L${mid+3} ${y+1} L${mid+3} ${y+7} L${mid-3} ${y+7} Z M${mid+5} ${y} L${w-2} ${y} L${w+2} ${y+4} L${w-2} ${y+8} L${mid+5} ${y+8} Z M${mid-5} ${y} L${50-w+2} ${y} L${50-w-2} ${y+4} L${50-w+2} ${y+8} L${mid-5} ${y+8} Z`;
    const LANCE = (bx, by, tx, ty, w=8) => {
        const dx = tx - bx; const dy = ty - by; const len = Math.sqrt(dx*dx + dy*dy) || 1;
        const ux = dx/len; const uy = dy/len; const vx = -uy; const vy = ux;
        const hlen = 12; const hx = tx - ux * hlen; const hy = ty - uy * hlen;
        return `M${bx-vx*w/2} ${by-vy*w/2} L${hx-vx*w/2} ${hy-vy*w/2} L${hx-vx*w} ${hy-vy*w} L${tx} ${ty} L${hx+vx*w} ${hy+vy*w} L${hx+vx*w/2} ${hy+vy*w/2} L${bx+vx*w/2} ${by+vy*w/2} Z`;
    };
    const BIRD_WING = (bx, by, tx, ty, side=1) => {
        const cx = bx + (tx-bx)*0.4 - side*10; const cy = by + (ty-by)*0.5;
        return `M${bx} ${by} Q${cx} ${cy} ${tx} ${ty} Q${cx+side*5} ${cy} ${bx+side*8} ${by} Z`;
    };
    const KATANA = (x, y, s=0.8) => `M${x-8*s} ${y-8*s} L${x+3*s} ${y+3*s} L${x} ${y+6*s} L${x-11*s} ${y-5*s} Z M${x} ${y} Q${x+25*s} ${y+15*s} ${x+45*s} ${y+25*s} L${x+40*s} ${y+25*s} Q${x+20*s} ${y+15*s} ${x} ${y+4*s} Z`;
    const GLOW_RING = (x, y, r) => `M${x-r} ${y} A${r} ${r} 0 1 1 ${x+r} ${y} A${r} ${r} 0 1 1 ${x-r} ${y} Z`;
    const BRIDGE = (x1, y1, cx, cy, x2, y2) => `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2} L${x2} ${y2+10} Q${cx} ${cy+10} ${x1} ${y1+10} Z`;
    const ROPE = (x, y, w=35, h=72, t=6) => {
        const r = t;
        return `M${x+w} ${y+h*0.25} Q${x+w} ${y} ${x+w/2} ${y} Q${x} ${y} ${x} ${y+h*0.25} C${x} ${y+h*0.55} ${x+w} ${y+h*0.45} ${x+w} ${y+h*0.75} Q${x+w} ${y+h} ${x+w/2} ${y+h} Q${x} ${y+h} ${x} ${y+h*0.75} L${x+r} ${y+h*0.75} Q${x+r} ${y+h-r} ${x+w/2} ${y+h-r} Q${x+w-r} ${y+h-r} ${x+w-r} ${y+h*0.75} C${x+w-r} ${y+h*0.55} ${x+r} ${y+h*0.45} ${x+r} ${y+h*0.25} Q${x+r} ${y+r} ${x+w/2} ${y+r} Q${x+w-r} ${y+r} ${x+w-r} ${y+h*0.25} Z`;
    };

    const LIBRARY = {
        A: `${LANCE(8, 76, 30, 4, 6)} ${LANCE(42, 76, 20, 4, 6)} ${SW(40, 40, 10)}`,
        B: `${TOWER(8)} ${S1(12)} ${S2(12)} ${SW(34, 40, 10)}`,
        C: `${AU(6)} ${AD(6)} ${AL(12)}`,
        D: `${TOWER(10)} ${S1(15)} ${S2(15)}`,
        E: `${TOWER(8)} ${SW(4, 44, 10)} ${SW(34, 38, 10)} ${SW(68, 44, 10)}`,
        F: `${TOWER(8)} ${SW(4, 44, 10)} ${SW(34, 38, 10)}`,
        G: `${AU(6)} ${AD(6)} ${AL(12)} M40 40 L46 40 L46 76 L40 76 Z`,
        H: `${TOWER(8)} ${TOWER(38)} ${SW(34, 42, 10)}`,
        I: TOWER(22),
        J: `${BRIDGE(44, 4, 44, 64, 25, 64)} ${BRIDGE(25, 64, 10, 64, 10, 45)}`,
        K: `${TOWER(10)} M14 50 Q40 10 44 18 L14 50 Z ${KATANA(14, 50)}`,
        L: `${TOWER(12)} ${SW(68, 40, 15)}`,
        M: `${TOWER(6)} ${TOWER(40)} ${BIRD_WING(10, 4, 25, 30, 1)} ${BIRD_WING(40, 4, 25, 30, -1)}`,
        N: `${TOWER(8)} ${TOWER(38)} ${BIRD_WING(12, 4, 38, 76, 1)}`,
        O: `${AU(6)} ${AD(6)} ${AL(12, 20, 60)} ${AR(38, 20, 60)} ${GLOW_RING(25, 40, 5)}`,
        P: `${TOWER(8)} ${S1(12)} ${SW(34, 38, 10)}`,
        Q: `${AU(6)} ${AD(6)} ${AL(12, 20, 60)} ${AR(38, 20, 60)} ${KATANA(30, 50, 1.2)}`,
        R: `${TOWER(8)} ${S1(12)} ${SW(34, 38, 10)} ${KATANA(12, 50)}`,
        S: ROPE(10, 4, 32, 72, 6),
        T: `${LS(4, 46, 25)} ${TOWER(22, 12)}`,
        U: `M8 4 L8 50 Q8 76 25 76 Q42 76 42 50 L42 4 Z`,
        V: `${BIRD_WING(10, 4, 25, 76, 1)} ${BIRD_WING(40, 4, 25, 76, -1)}`,
        W: `${BIRD_WING(6, 4, 18, 76, 1)} ${BIRD_WING(44, 4, 32, 76, -1)} ${LANCE(18, 76, 32, 12, 5)} ${LANCE(32, 76, 18, 12, 5)}`,
        X: `${LANCE(10, 76, 40, 4, 5)} ${LANCE(40, 76, 10, 4, 5)}`,
        Y: `${TOWER(22, 40, 76)} ${BIRD_WING(10, 4, 25, 40, 1)} ${BIRD_WING(40, 4, 25, 40, -1)}`,
        Z: `${LS(4, 46, 25)} ${LS(68, 46, 25)} ${LANCE(40, 12, 10, 68, 6)}`,
        "0": `${AU(6)} ${AD(6)} ${AL(12, 20, 60)} ${AR(38, 20, 60)}`,
        "1": `${LANCE(15, 20, 25, 4, 3)} ${TOWER(22)}`,
        "2": `${AU(6)} ${BRIDGE(44, 20, 44, 40, 6, 76)} ${SW(68, 44, 10)}`,
        "3": `${AU(6)} ${AD(6)} ${SW(34, 38, 12)} ${AR(38, 15, 65)}`,
        "4": `${TOWER(35)} ${LANCE(35, 4, 6, 45, 5)} ${SW(38, 46, 6)}`,
        "5": `${SW(4, 44, 10)} ${TOWER(12, 4, 40)} ${SW(34, 38, 12)} ${AD(8, 20)} ${AR(38, 40, 65)}`,
        "6": `${AU(6)} ${AD(10)} ${AL(12)} ${AR(38, 40, 65)} ${SW(34, 38, 12)}`,
        "7": `${SW(4, 44, 10)} ${LANCE(44, 4, 15, 76, 6)}`,
        "8": `${AU(6)} ${AD(6)} ${AL(12)} ${AR(38)} ${SW(34, 38, 10)}`,
        "9": `${AU(6)} ${AD(6)} ${AL(12, 20, 40)} ${AR(38)} ${SW(34, 38, 10)}`,
        "*": GLOW_RING(25, 40, 15),
        ".": GLOW_RING(25, 70, 4),
        "@": `${AU(6)} ${AD(6)} ${AL(12)} ${AR(38)} ${GLOW_RING(25, 40, 4)}`,
        "_": SW(70, 44, 4),
        "-": SW(36, 40, 6),
        "/": LANCE(10, 76, 40, 4, 4),
        " ": "M10 60 L40 60 L40 70 L10 70 Z"
    };

    const COLORS = {
        K: "#ff0055", // Red Accent
        O: "#ffcc00", // Gold Accent
        C: "#ffcc00", // Gold Accent
        Q: "#ffcc00", // Gold Accent
        I: "#00bac4", // Blue Accent
    };

    return {
        render: function(el) {
            const text = (el.getAttribute('data-text') || "").toUpperCase();
            const height = el.getAttribute('data-height') || 40;
            const defaultColor = el.getAttribute('data-color') || "#00bac4";
            el.innerHTML = "";
            el.style.display = "flex";
            el.style.gap = "4px";
            el.style.height = height + "px";

            text.split('').forEach(function(char) {
                var pathStr = LIBRARY[char];
                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("viewBox", "0 0 50 80");
                svg.style.height = height + "px";
                svg.style.width = "auto";
                svg.style.display = "block";
                
                var charColor = defaultColor;
                if (COLORS[char]) {
                    charColor = COLORS[char];
                }

                if (pathStr) {
                    var paths = pathStr.split(' Z').filter(p => p.trim()).map(p => p + ' Z');
                    paths.forEach(function(p, i) {
                        var isAccent = false;
                        if ((char === 'T' || char === 'F' || char === 'K') && (i === 1 || i === 2)) isAccent = true;
                        if (char === 'H' && i >= 2) isAccent = true;
                        if (char === 'W' && i < 2) isAccent = true;

                        var finalColor = isAccent ? "#ff0055" : charColor;
                        
                        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        pathEl.setAttribute("d", p);
                        pathEl.setAttribute("fill", finalColor);
                        svg.appendChild(pathEl);
                    });
                }
                el.appendChild(svg);
            });
        },
        renderAll: function() {
            var self = this;
            document.querySelectorAll('[data-text]').forEach(function(el) { self.render(el); });
            document.querySelectorAll('[data-kfont]').forEach(function(el) {
                var char = el.getAttribute('data-kfont');
                el.innerText = char; // Set innerText for character display
                el.setAttribute('data-text', char);
                el.setAttribute('data-height', 28);
                el.setAttribute('data-color', "#00bac4");
                // self.render(el); // Disable SVG rendering inside key boxes
            });
        }
    };
})();