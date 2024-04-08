const linkHeaderNav = document.querySelector("#header-nav").querySelectorAll("a");
const linkFixedNav = document.querySelector("#fixed-nav").querySelectorAll("a");
const linkHamNav = document.querySelector("#ham-nav").querySelectorAll("a");

function Href(link){
   if(link.innerHTML.toLowerCase().split(" ")[0] !== "willkommen"){
      return "/" + link.innerHTML.toLowerCase().split(" ")[0];  
   }else if(link.innerHTML.toLowerCase().split(" ")[0] == "willkommen"){
      return "/";
   }
}

const path = window.location.pathname;

function AddHref(links){
   links.forEach((link)=>{
      if(Href(link) !== path){
         link.href = Href(link);
         link.classList.add("hover:text-rose-400");
      }
   })
}

function AddUnderLine(links){
   links.forEach((link)=>{
      if(link.getAttribute("href") !== ""){
         if(links !== linkHamNav){
            link.classList.add("stand");
         }
         else if(links === linkHamNav){
            link.classList.add("ham-stand");
         }
      }
   })
}

AddHref(linkHeaderNav);
AddHref(linkFixedNav);
AddUnderLine(linkHeaderNav);
AddHref(linkHamNav);
AddUnderLine(linkHamNav);

//contact link href
const contactLinks = document.querySelectorAll("#contact-link");
const href = window.location.href

contactLinks.forEach((link)=>{
   if(link.href == href){
      link.classList.remove("underline");
      link.removeAttribute("href");
   };
})