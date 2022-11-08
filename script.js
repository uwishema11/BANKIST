'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnscrollTo= document.querySelector(".btn--scroll-to");
const section1= document.querySelector("#section--1");
const features= document.querySelector(".features")
const nav= document.querySelector("nav")
const tabs= document.querySelectorAll(".operations__tab-container");
const tabsContentaier= document.querySelector(".operations__tab-container");
const tabsContent=document.querySelectorAll(".operations__content");


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach( btn =>btn.addEventListener
    ('click',openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



btnscrollTo.addEventListener("click",(e)=>{
  section1.scrollIntoView({behavior:"smooth"})
})


 
document.querySelector('.nav__links').addEventListener("click", function(e){
  e.preventDefault();
  console.log(e.target)
// matching strategy
if(e.target.classList.contains('nav__link')){
  const id=e.target.getAttribute('href')
  document.querySelector(id).scrollIntoView({behavior:"smooth"})
  
}
 
});

// tabbed compents

tabsContentaier.addEventListener("click",function(e){
  const clicked= e.target.closest(".operations__tab");
  if(!clicked) return;

  //remove active classes 

  tabs.forEach((el)=>el.classList.remove(".operations__tab--active"))
  tabsContent.forEach((c)=>{
    c.classList.remove("operations__content--active")})

    //activate classes 
  clicked.classList.add("operations__tab--active")
 document
 .querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

});



// sticky navigation :using intersection observer API

const navRecord= nav.getBoundingClientRect().height;

const headerObject={
  root:null,
  threshold:0,
  rootMargin:`-${navRecord}px`
}

const headerCallBack= function(entries){
  const [entry] =entries;

 if(!entry.isIntersecting){
  nav.classList.add("sticky")
 }
 else{
  nav.classList.remove("sticky")
 }
}

const header= document.querySelector(".header")

const headObserver = new IntersectionObserver(headerCallBack,headerObject)
headObserver.observe(header)


//reveal sections using intersection api


const Allsection= document.querySelectorAll(".section")

const revealSection= function(entries,obsever){
  const [entry]=entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove("section__hidden")
  obsever.unobserve(entry.target)
}

const sectionObserver= new IntersectionObserver(revealSection,{
  root:null,
  threshold: 0.15
})

Allsection.forEach((section)=>{
  sectionObserver.observe(section)
  section.classList.add("section__hidden")
})

//lazy loading images 

const loadImage =function(entries,observer){
  const [entry]=entries
  entry.target.src=entry.target.dataset.src;
  entry.target.addEventListener("load", ()=>{
    entry.target.classList.remove("lazy-img")
  });
  observer.unobserve(entry.target)
};

const imgTarget= document.querySelectorAll("img[data-src]")

const imgObserver= new IntersectionObserver(loadImage,{
root:null,
threshold:0,
rootMargin: '200px'
})
imgTarget.forEach((img)=>imgObserver.observe(img))


// slider components

function slider (){
  
const slides=document.querySelectorAll(".slide");
const slider= document.querySelector(".slider")
const dotsContainer =document.querySelector(".dots")
const btnLeft=document.querySelector(".slider__btn--left")
const btnRigt=document.querySelector(".slider__btn--right")


//slides function

const activateDots = (slide)=>{
  document.querySelectorAll(".dots__dot")
  .forEach((dot)=>{
   dot.classList.remove('dots__dot--active')
  
  });
  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
 .classList.add('dots__dot--active')
 };

const createDots = function(){
  slides.forEach( function (_, i){

    dotsContainer.insertAdjacentHTML("beforeend",`<button class='dots__dot' data-slide='${i}'></button>`)
  })
}



const goToSlide = (slide)=>{
  slides.forEach((s,i)=>{
    s.style.transform=`translateX(${100*(i-slide)}%)`
  });
}


let culSlide= 0;
let maxSlde=slides.length-1;


const goToNextSlide =()=>{
  if(culSlide===maxSlde){
    culSlide=0;
  } else{
    culSlide++;
  }
  goToSlide(culSlide)
  activateDots (culSlide)
};


const goToPreSlide =()=>{
  if(culSlide===0){
    culSlide=maxSlde;
  } else{
    culSlide--;
  }
  goToSlide(culSlide)
  activateDots (culSlide)
};

const init =function(){
  goToSlide(0)
  createDots();
  activateDots(0)
}

init();

document.addEventListener('keydown',function(e){

if(e.key==="ArrowLeft"){
  goToPreSlide();
}
if(e.key==='ArrowRight'){
  goToNextSlide()
}
});

btnRigt.addEventListener("click",goToNextSlide)

btnLeft.addEventListener('click',goToPreSlide)

dotsContainer.addEventListener('click',(e)=>{
  console.log(e.target)
  if(e.target.classList.contains('dots__dot')){
    const {slide}=e.target.dataset;
    goToSlide(slide)
    activateDots (slide)
  }
});

};

slider();










































































// selecting elements 


// console.log(document.documentElement)
// const header=document.querySelector('.header')
// console.log(header)
// document.getElementById('section_id')
// document.getElementsByTagName('tagname')      // return html collection
// document.getElementsByClassName('clssname')   // return html collection

//creating and inserting elements
 
//  const message=document.createElement("div")
//  message.classList.add("cookie-message")
//  message.innerHTML='we use cookies for adding functionality and analytics <button class=" btn btn--close-cookie">Got it</button>'
// console.log(message)

// // header.prepend(message)
// header.append(message)
// document.querySelector(".btn--close-cookie")
// .addEventListener("click", ()=>{
//   message.remove();
// });


//styles
// message.style.backgroundColor = "#37383d";


// document.querySelectorAll(".nav__link").forEach( function(el){
// el.addEventListener("click", function(e){
//   e.preventDefault();
//   const id= this.getAttribute('href')
//   document.querySelector(id).scrollIntoView({behavior:"smooth"})
// })
// })

//1. add event listener to a common parent element  of all elements we are interested in 
//2. determine what element originated the event

// const h1=document.querySelector('h1')
// h1.closest(".header").style.background= 'var(--gradient-secondary)';















// const h1= document.querySelector('h1');
// h1.addEventListener("mouseenter",(e)=>{
//   console.log(" you are not allowed to copy this contents")
// })
// h1.addEventListener("mouseenter",(e)=>{
//   console.log("you are clicking")
// })

// to create a random color

//  const randomInt= (min,max)=>{
//   return Math.floor(Math.random() * (max-min +1) +min)
//  }
//  const randomColor =()=>{
//   return `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`
//  }
//  document.querySelector(".nav__link").addEventListener("click",function(e){
//   this.style.backgroundColor=randomColor();
//  })

//  document.querySelector(".nav__links").addEventListener("click",function(e){
//   this.style.backgroundColor=randomColor();
//  })

//  document.querySelector(".nav").addEventListener("click",function(e){
//   this.style.backgroundColor=randomColor();
//  }) 