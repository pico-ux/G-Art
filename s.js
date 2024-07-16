// setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Particle {
    constructor(effect, color, initialLife){
        this.effect = effect;
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.radius = Math.random() * 10 + 1;
        this.life = initialLife;
        this.color = color;
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
    update(){
        this.life--;
    }
}

class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 50;
        this.initialLife = 10;
        this.maxCycles = maxCycles;
        this.currentCycle = 0;
        this.createParticles();
    }
    createParticles(){
        const color = this.randomColor();
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this, color, this.initialLife));
        }
    }    
    handleParticles(context){
        context.clearRect(0, 0, this.width, this.height);
        this.particles = this.particles.filter(particle => particle.life > 0);
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(context);
        });
    }
    addParticles(){
        if (this.currentCycle < this.maxCycles) {
        const color = this.randomColor();
        this.initialLife += 10;
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this, color, this.initialLife));
        }
        this.currentCycle++;
    } else {
        console.log("Max cycles reached. Stopping particle creation.");
        clearInterval(this.intervalId);
        }
    }
    randomColor(){
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }
}
const maxCycles = 200;
const effect = new Effect(canvas);


function animate() {
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();

setInterval(() => {
    effect.addParticles();
    effect.handleParticles(ctx);
}, 100)