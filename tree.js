var go=document.getElementById("go");
var pb=document.getElementById("+");
var mb=document.getElementById("-");
var xTable=mb.parentElement.parentElement;
var tr = document.createElement('tr');
tr.innerHTML='<th contenteditable=false>0<td border=1><p contenteditable></p>';
tr.classList.add("a");
xTable.insertBefore(tr,xTable.children[1]);
var canvas=document.getElementById("myCanvas");
canvas.width=document.body.clientWidth*0.8-20;
canvas.height=document.body.clientHeight-30;
width=canvas.width;
height=canvas.height;
var ctx = canvas.getContext("2d");
var mas=10;
dc=[-1,-10/9,NaN,NaN,NaN,-10/5,-10/4,-10/3,-5,-10,NaN,10,NaN,NaN,2.5,2,10/6,10/7,10/8,10/9,10/10,10/11,-10];
var ddo=getForm(dc);
function getMaxOfArray(numArray) {
   var umArray=[];
   for(i=0;i<numArray.lenght;i++){
      if(!isNaN(numArray[i])){
         umArray.push(numArray[i]);
      }
   }
   return Math.max.apply(null, umArray);
}
document.addEventListener('keydown', function(event){
   if (event.key=="ArrowUp")
   {
      mas*=10/9;
      drawing();
   }
   if (event.key=="ArrowDown")
   {
      mas*=0.9;
      drawing();
   }
});
pb.addEventListener('click', function(){
   var xTable=pb.parentElement.parentElement;
   var tr = document.createElement('tr');
   tr.innerHTML='<th contenteditable=false>'+(Number(xTable.children[xTable.children.length-3].firstChild.innerHTML)+1)+'<td border=1><p contenteditable></p>';
   tr.classList.add("a");
   xTable.insertBefore(tr,xTable.children[xTable.children.length-2]);
;
});

mb.addEventListener('click', function(){
   var xTable=mb.parentElement.parentElement;
   var tr = document.createElement('tr');
   tr.innerHTML='<th contenteditable=false>'+(Number(xTable.children[1].firstChild.innerHTML)-1)+'<td border=1><p contenteditable></p>';
   tr.classList.add("a");
   xTable.insertBefore(tr,xTable.children[1]);
;
});

go.addEventListener('click', function(){
   var xTable=mb.parentElement.parentElement;
   dc=[];
   for(i=1;i<xTable.children.length-2;i++){
      dc.push(Number(xTable.children[i].lastChild.lastChild.innerHTML));
   }
   dc.push(Number(xTable.children[1].firstChild.innerHTML));
   ddo=getForm(dc);
   drawing();
});
function formula(d,nnu){
   dd=0;
   if(nnu[0]!=0 & (dd+nnu[0]*d**nnu[3])==Number(dd+nnu[0]*d**nnu[3])){
      dd+=(nnu[0]*d**nnu[3]);
   }
   if(nnu[1]!=0 & (dd+nnu[1]*d**nnu[4])==Number(dd+nnu[1]*d**nnu[4])){
      dd+=Number(nnu[1]*d**nnu[4]);
   }
   if(nnu[2]!=0 & (dd+nnu[2]*d**nnu[5])==Number(dd+nnu[2]*d**nnu[5])){
      dd+=Number(nnu[2]*d**nnu[5]);
   }
   return dd+nnu[6];
}
function draw(dat,red){
   ctx.beginPath();
   ctx.strokeStyle=red;
   ctx.moveTo(width/2+dat[dat.length-1]*mas,height/2-dat[0]*mas);
   for(var i=0;i<dat.length-1;i++){
      if(isNaN(dat[i])){
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width/2+(i+dat[dat.length-1])*mas,height/2-dat[i]*mas);
      }
      else{
      ctx.lineTo(width/2+(i+dat[dat.length-1])*mas,height/2-dat[i]*mas);
      ctx.arc(width/2+(i+dat[dat.length-1])*mas,height/2-dat[i]*mas,1,0,Math.PI*2);}
   }
   ctx.stroke();
}
function change(number,data){
   nnumber1=[];
   for(var i=0;i<number.length;i++){
      nnumber1.push(number[i]);}
   for(var i=0;i<nnumber1.length;i++){
      var randd = rfi(-1000000,1000000)/100000;
      nnumber1[i]=Number((randd/50 + nnumber1[i]).toFixed(1));
   }
   var aav=errorr(number,data);
   var aaw=errorr(nnumber1,data)
   if (aav>aaw){
     return nnumber1;}
   return number;
}
function errorr(um,dat)
{
   var er=0;
   for(var x=0;x<dat.length-1;x++){
      var uuu=formula(x+dat[dat.length-1],um);
      if (!isNaN(uuu) & !isNaN(dat[x])){
        er+=Math.abs((dat[x])-uuu);}
   }
   return er;
}
function doo(nnumber1,a,b)
{
   data2=[];
   for(var x=a;x<b+1;x++){
      data2.push(formula(x,nnumber1));
   }
   data2.push(a);
   return data2;
}
function rfi(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function getForm(data){
var number=[0,0,0,0,0,0,0];
var died=0;
while(errorr(number,data)>0.000000000000001*getMaxOfArray(data) & died<200000){
   died++;
   number=change(number,data);}
   return number;   
}
function drawing(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.beginPath();
ctx.rect(width/2-2,height/2-2,4,4);
ctx.fill();
draw(doo(ddo,Math.round(-800/mas),Math.round(800/mas)),"red");
draw(dc,"blue");}
drawing();














