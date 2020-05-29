const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let drawing=false;
const edge = 80;
const mouse={
  x : null,   y : null  }

window.addEventListener('mousemove',function(event){
  mouse.x=event.x;   mouse.y=event.y;
});

class Root {
  constructor (x,y,color,centerX,centerY) {
    this.x=x;  this.y=y;  this.color=color; this.centerY=centerY; this.centerX=centerX;
    this.speedX=0;  this.speedY=0;
  }
  draw(){
      this.speedX += (Math.random() - 0.5) / 2;
      this.speedY += (Math.random() - 0.5) / 2;
      this.x += this.speedX;  this.y+=this.speedY;

      const distance=Math.hypot(this.x - this.centerX , this.y-this.centerY);
      const radius =(-distance / edge + 1) * edge / 10; //radius reducimg function depending on distance away from center point and current point


     if (radius>0){ //or else system crash as it runs again nd again for those non existing circles
        requestAnimationFrame(this.draw.bind(this));
        ctx.beginPath();
        ctx.arc(this.x,this.y,radius,0,2*Math.PI,false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle='black';
        ctx.stroke();
        ctx.closePath();
    }
  }
}
function branchOut(){
if (drawing){
  const centerX = mouse.x;  const centerY = mouse.y; //capture b4 passing or esle they it wont be same if pass the dynamic value
  for (let i=0;i<3;i++){
    const root = new Root(mouse.x,mouse.y,'red',centerX,centerY);
    root.draw();
  }
}

}


window.addEventListener('resize',function(){
  canvas.width=innerWidth; canvas.height=innerHeight;
});


window.addEventListener('mousemove',function(){
  //ctx.fillStyle='rgba(255,255,255,0.05)';
  //ctx.fillRect(0,0,canvas.width,canvas.height);
  branchOut();
})

window.addEventListener('mousedown',function(){
  drawing=true;
})
window.addEventListener('mouseup',function(){
  drawing=false;
})
