
let canvas = document.getElementById('canvas'),
shapeEl,
shapeEls,
EleCount,
ctx,
mouseDim,
ch,
cw,
i,
g;


mouseDim = {
    x: 'undefined',
    y: 'undefined'
};

EleCount = 100;

shapeEls = [];

ctx = canvas.getContext('2d');

//CANVAS WIDTH && HEIGHT
cw = canvas.width = window.innerWidth;
ch = canvas.height = window.innerHeight;

//WHEN WINDOW RESIZE UPDATE CANVAS WIDTH && HEIGHT
window.addEventListener('resize', () => {
    cw = canvas.width = window.innerWidth;
    ch = canvas.height = window.innerHeight;
});

// SHAPE EL CLASS 
shapeEl = function(x1, y1, vx, vy){

    this.x1 = x1;
    this.y1 = y1;
    this.vx = vx;
    this.vy = vy;

    this.color = '#ff7315';

    this.draw = () => {

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth   = 8;
        ctx.lineCap     = 'round';
        ctx.globalAlpha = .3;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x1, this.y1 + 10);
        ctx.stroke();

    };

    this.update = () => {

        if (mouseDim.x - this.x1 < 70 && mouseDim.x - this.x1 > -70 &&
            mouseDim.y - this.y1 < 70 && mouseDim.y - this.y1 > -70) {
                this.x1 -= vx;
                this.y1 -= vy;
        }
        
        this.draw();

    };
};

(function generateBubbles(){
    for (i = 0; i < EleCount; i++) {
        let x1 = Math.random() * cw,
            y1 = Math.random() * ch,
            vx = Math.random(),
            vy = Math.random() * 2;
            shapeEls.push(new shapeEl(x1, y1, vx, vy));
    }
})();

(function animateFunc(){
    ctx.clearRect(0, 0, cw, ch);
    for (g = 0; g < shapeEls.length; g++) {
        shapeEls[g].update();
    }
    requestAnimationFrame(animateFunc);
})();

canvas.addEventListener('mousemove', (e) => {
    mouseDim.x = e.x;
    mouseDim.y = e.y;
});