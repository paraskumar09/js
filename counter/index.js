let result=parseInt(document.querySelector('#result').textContent);

let minus=document.querySelector('.minus');
let plus=document.querySelector('.plus');

// minus.addEventListener('click',function(){
//     result--;
//     document.querySelector('#result').textContent=result;
//     change();
// })

// plus.addEventListener('click',function(){
//     result++;
//     document.querySelector('#result').textContent=result;
//     change();
// })

let incr=()=>{
    result++;
    document.querySelector('#result').textContent=result;
    change();
}

let dec=()=>
{
    result--;
    document.querySelector('#result').textContent=result;
    change();
}


function change(){
    var color = "";
    for(var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        // console.log(sub);
        color += (sub.length == 1 ? "0" + sub : sub);
    } 
    console.log(color);
    document.querySelector('.main').style.backgroundColor='#'+color;
}

let x=1;
console.log(x.toString(16) );

