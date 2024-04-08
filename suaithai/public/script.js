// CreateBubble effect
const bubbles = document.querySelector("#bubble");
function CreateBubble(){
   for(let i=1; i<=8; i++){
      const bubble = document.createElement("div");
      bubble.classList.add(`bubble`)
      const positionX = Math.floor(Math.random()*101);
      const positionY = Math.floor(Math.random()*101);
      bubble.style.left = `${positionX}%`;
      bubble.style.top = `${positionY}%`;
      bubbles.append(bubble);
   }
}

CreateBubble();

//header scroll animations element
// const bubbles = document.querySelector("#bubble"); included!
const cloudTop = document.querySelector("#cloud-top");
const cloudBottom = document.querySelector("#cloud-bottom");
const headerBackground = document.querySelector("#header-background");
const headerNav = document.querySelector("#header-nav");
const headerContactBtn = document.querySelector("#header-contact-btn");
const headerContact = document.querySelector("#header-contact");
let bestScroll = 0;

//check scroll status
function scrollStatus(scroll){
   if(scroll > bestScroll){
      return "down";
   }
   else if(scroll < bestScroll){
      return "up";
   }
}

//when scroll
function Scroll(){
   const scroll = Math.floor(window.scrollY);

   HamNavHide();
   HamBtnClose();

   if(scrollStatus(scroll) === "up"){
      if(scroll <= 300){
         headerAnimationsScroll("up");
         navHide()
      }
      else if(scroll > 300){
         navShow();
      }
   }
   else if(scrollStatus(scroll) === "down"){
      if(scroll >= 300){
         headerAnimationsScroll("down");
         navHide();
      }
   }
   bestScroll = scroll;
}

//element should be up, down or base?
function ClassListAnimate(element,direction,scrollStatus){
   element.classList.add("transition-all");
   if(element !== headerContact){
      element.classList.add("duration-[1s]");
   } 
   if(scrollStatus == "down"){
      if(direction == "up"){
         element.classList.add("-translate-y-[200%]");
      }
      else if(direction == "down"){
         element.classList.add("translate-y-[200%]");
      }
   }
   else if(scrollStatus == "up"){
      if(direction == "down"){
         element.classList.remove("-translate-y-[200%]");
      }
      else if(direction == "up"){
         element.classList.remove("translate-y-[200%]");
      }
   }
}

//animate when scroll
function headerAnimationsScroll(scrollStatus){
   if(scrollStatus == "down"){
      ClassListAnimate(cloudBottom,"down","down");
      ClassListAnimate(headerContactBtn,"down",scrollStatus);
      ClassListAnimate(cloudTop,"up",scrollStatus);
      ClassListAnimate(headerNav,"up",scrollStatus);
      ClassListAnimate(bubbles,"up",scrollStatus)
      ClassListAnimate(headerContact,"down",scrollStatus);
      headerBackground.classList.add("contrast-[0.4]");
   }
   else if(scrollStatus == "up"){
      ClassListAnimate(cloudBottom,"up",scrollStatus);
      ClassListAnimate(headerContactBtn,"up",scrollStatus);
      ClassListAnimate(cloudTop,"down",scrollStatus);
      ClassListAnimate(headerNav,"down",scrollStatus);
      ClassListAnimate(bubbles,"down",scrollStatus)
      ClassListAnimate(headerContact,"up",scrollStatus);
      headerBackground.classList.remove("contrast-[0.4]");
   }
}

window.addEventListener("scroll", Scroll);

//nav hide and show
const fixedNav = document.querySelector("#fixed-nav");

function navShow(){
   fixedNav.classList.remove("-top-[100%]")
   fixedNav.classList.add("top-[0]");
}
function navHide(){
   fixedNav.classList.remove("top-[0]")
   fixedNav.classList.add("-top-[100%]");
}

// contact hide & show
// const headerContactBtn = document.querySelector("#header-contact-btn"); included!
const fixedContactBtn = document.querySelector("#fixed-contact-btn");
// const headerContact = document.querySelector("header-contact"); include
const fixedContact = document.querySelector("#fixed-contact");

function HeaderContactAnimation(){
   headerContact.classList.toggle("-bottom-[200%]");
   headerContact.classList.toggle("bottom-[8rem]");
}
function FixedContactAnimation(){
   fixedContact.classList.toggle("top-[6rem]");
}

function FixedContactHide(){
   fixedContact.classList.remove("top-[6rem]");
}

headerContactBtn.addEventListener("click",HeaderContactAnimation);
fixedContactBtn.addEventListener("click",FixedContactAnimation);

window.addEventListener("scroll", FixedContactHide);

// small screen nav show
const hamBtn = document.querySelector("#ham-btn");
const hamNav = document.querySelector("#ham-nav");

function HamNavHide(){
   hamNav.classList.remove("left-[0]");
   hamNav.classList.add("-left-[200%]");
}

function HamNavShowAndHide(){
   hamNav.classList.toggle("left-[0]");
   hamNav.classList.toggle("-left-[200%]");
   HamBtnCloseAndOpen();
}

function HamBtnClose(){
   const first = hamBtn.querySelectorAll("div")[0];
   const second = hamBtn.querySelectorAll("div")[1];
   //default space
   first.classList.remove("translate-y-[0.25rem]");
   second.classList.remove("-translate-y-[0.25rem]");
   //default width
   first.classList.remove("w-[1.5rem]");
   second.classList.remove("w-[1.5rem]");
   first.classList.add("w-[2rem]");
   second.classList.add("w-[1.6rem]");
   // 0 rotate
   first.classList.remove("rotate-[45deg]");
   second.classList.remove("-rotate-[45deg]");
}

function HamBtnCloseAndOpen(){
   const first = hamBtn.querySelectorAll("div")[0];
   const second = hamBtn.querySelectorAll("div")[1];
   //remove space
   first.classList.toggle("translate-y-[0.25rem]");
   second.classList.toggle("-translate-y-[0.25rem]");
   // to 1.5 width
   first.classList.toggle("w-[2rem]");
   first.classList.toggle("w-[1.5rem]")
   second.classList.toggle("w-[1.6rem]");
   second.classList.toggle("w-[1.5rem]");
   //make it to closeBtn
   first.classList.toggle("rotate-[45deg]");
   second.classList.toggle("-rotate-[45deg]");
}

hamBtn.addEventListener("click", HamNavShowAndHide);

//image format
function screenLength(screen){
   if(screen >= 1024){
      return "lg";
   }
   else if(screen >= 640){
      return "sm";
   }
   else if(screen >= 0){
      return "start"
   }
}

function createImageCols(cols,images,time){
   const imageLength = images.length;
   for(let a = 0; a < time; a++){
      const imagesCol = document.createElement("div");
      imagesCol.classList.add("images-col");
      for(let index = a; index < imageLength; index += time){
         imagesCol.append(images[index]);
      }
      cols.append(imagesCol);
   }
}
//discount image format
let screen = window.screen.width;
path = window.location.pathname;
const discountImages = document.querySelector("#discount-images");
const discountImage = document.querySelectorAll("#discount-images > figure");
let cloneDiscountImages = [];
discountImage.forEach((image)=>{
   const cloneImage = image.cloneNode();
   const childen = image.querySelectorAll("*");
   const img = childen[0];
   if(path == "/admin"){
      const button = childen[1];
      const svg = childen[2];
      const path1 = childen[3];
      const path2 = childen[4];
      //icon
         svg.appendChild(path2);
         svg.appendChild(path1);
      //button 
         button.appendChild(svg);
      //include
      cloneImage.appendChild(button);
   }
   cloneImage.appendChild(img);
   cloneDiscountImages.push(cloneImage);
   discountImages.removeChild(image);
})

if(path == "/gutscheine" || path == "/admin"){
   if (screenLength(screen) == "start") {
      createImageCols(discountImages, cloneDiscountImages, 1);
   }
   else if (screenLength(screen) == "sm") {
      createImageCols(discountImages, cloneDiscountImages, 2);
   }
   else if (screenLength(screen) == "lg") {
      createImageCols(discountImages, cloneDiscountImages, 3);
   }   
}

const galleryImagesPack = document.querySelector("#gallery-images");
const galleryImages = document.querySelectorAll("#gallery-image");

const cloneGalleryImages = [];

galleryImages.forEach((image)=>{
   const cloneGalleryImage = image.cloneNode();
   if(path == "/admin"){
      const imageChilden = image.querySelectorAll("*");
      const img = imageChilden[0].cloneNode();
      const deleteBtn = imageChilden[1].cloneNode();
      const svg = imageChilden[2].cloneNode();
      const path1 = imageChilden[3].cloneNode();
      const path2 = imageChilden[4].cloneNode();
      //svg 
         svg.append(path1);
         svg.append(path2); 
      //delete btn
         deleteBtn.append(svg);
      //full
         cloneGalleryImage.append(deleteBtn);
         cloneGalleryImage.append(img);
      }
   cloneGalleryImages.push(cloneGalleryImage);
   galleryImagesPack.removeChild(image);
})

if(path == "/galerie" || path == "/admin"){
   if (screenLength(screen) == "start") {
      createImageCols(galleryImagesPack, cloneGalleryImages, 1);
   }
   else if (screenLength(screen) == "sm") {
      createImageCols(galleryImagesPack, cloneGalleryImages, 2);
   }
   else if (screenLength(screen) == "lg") {
      createImageCols(galleryImagesPack, cloneGalleryImages, 3);
   }   
}