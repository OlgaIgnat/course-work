// const body = document.querySelector("body");
// const lockPadding = document.querySelectorAll(".lock_padding");//получаем все объекты с классом .lock_padding(фиксированные)
// console.log(lockPadding);
// const timeout = 800;


// function bodyLock(){   
//     const lockPaddingValue = window.innerWidth - document.querySelector('.container').offsetWidth + 'px';
//     console.log(lockPaddingValue);
//      if(lockPadding.length > 0){
//          for(let i = 0; i < lockPadding.length; i++){
//              const el = lockPadding[i];           
//              el.style.paddingRight = lockPaddingValue;
//          }
//      }
//     body.style.paddingRight = lockPaddingValue;
//     body.classList.add('lock');     
//    }
  
//   function bodyUnLock(){
//        setTimeout(function(){
//            if(lockPadding.length > 0){
//                for (let i = 0; i< lockPadding.length; i++){
//                    const el = lockPadding[i];
//                    el.style.paddingRight = '0px';            
//                }
//            }
//            body.style.paddingRight = '0px';
//           body.classList.remove('lock');
//        }, timeout);       
//   }

 
 /* этот код помечает картинки, для удобства разработки */
 let i = 1;
 for(let li of carousel.querySelectorAll('li')) {
   li.style.position = 'relative';
   li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
   i++;
 }

 let width = 280; // ширина картинки
 let count = 4; // видимое количество изображений

 let list = carousel.querySelector('ul');
 let listElems = carousel.querySelectorAll('li');
 let listElemsA = carousel.querySelectorAll('a');
 let listElemsImg = carousel.querySelectorAll('img');
 console.log(listElemsA); 

 let position = 0; // положение ленты прокрутки

 carousel.querySelector('.prev').onclick = function() {   // сдвиг влево  
   position += width * count;   
   position = Math.min(position, 0)
   list.style.marginLeft = position + 'px';
 }

 carousel.querySelector('.next').onclick = function() {    // сдвиг вправо  
   position -= width * count;  
   position = Math.max(position, -width * (listElems.length - count));
   list.style.marginLeft = position + 'px';
 } 

const modalLinks = document.querySelectorAll(".modal_link");
const modal = document.querySelectorAll(".modal");
const popupClose = document.querySelectorAll(".popup_close");


modalLinks.forEach(function(item){
  item.addEventListener('click', function(){
      const popupName = item.getAttribute('href').replace('#','');
      document.getElementById(popupName).classList.add("visible");      
  });    
})

popupClose.forEach(function(item){   
  item.addEventListener('click', function(e){ 
    let parent= item.closest(".modal");         
    parent.classList.remove("visible");    
  });  
})

window.onclick = function (event) {  
  modal.forEach(function(elem){
    if (event.target == elem) { 
    console.log(event.target)
    elem.classList.remove("visible");
    };
  });
}    
