//Change image section
function changeImage(btn,image){
   btn.addEventListener("mouseover",()=>{
      btn.classList.remove("bg-gray-100")
      btn.classList.add("border");
      btn.classList.add("border-[0.25rem]");
      btn.classList.add("border-white");
      image.classList.add("duration-[0.1s]");
      image.classList.add("opacity-[0.6]");
   });
   btn.addEventListener("mouseout",()=>{
      btn.classList.add("bg-gray-100")
      btn.classList.remove("border");
      btn.classList.add("border-[0.25rem");
      btn.classList.remove("border-white");
      image.classList.remove("duration-[0.1s]");
      image.classList.remove("opacity-[0.6]");
   });
}


// input form section
function formEdit(form, type) {
   const editBtn = form.querySelector("#edit-btn");
   const inputs = form.querySelectorAll(type);
   const saveBtn = form.querySelector("#save-btn");
   editBtn.addEventListener("click", () => {
      inputs.forEach((input) => {
         input.removeAttribute("disabled");
         input.classList.remove("opacity-[30%]");
      })
      saveBtn.classList.remove("hidden");
      editBtn.classList.add("hidden");
   })
}

//header
const contactSaveForms = document.querySelectorAll("#contact-save-form");
const daySaveForms = document.querySelectorAll("#day-save-form");
const changeBackgroundBtn = document.querySelector("#change-background-btn");
// const headerBackground = document.querySelector("#header-background");

changeImage(changeBackgroundBtn,headerBackground);
contactSaveForms.forEach((contactSaveForm)=>{
   formEdit(contactSaveForm,"input");
})
daySaveForms.forEach((daySaveForm)=>{
   formEdit(daySaveForm,"input");
})

//welcome
const changeWelcomeImgBtn = document.querySelector("#change-welcome-img-btn");
const welcomeImg = document.querySelector("#welcome-img");
const welcomeTextSaveForm = document.querySelector("#welcome-text-save-form");

changeImage(changeWelcomeImgBtn,welcomeImg);
formEdit(welcomeTextSaveForm, "textarea");

//massage
const massages = document.querySelectorAll("#massage");
massages.forEach((massage)=>{
   //change image btn
   const changeMassageImgBtn = massage.querySelector("#change-massage-img-btn");
   const massageImg = massage.querySelector("#massage-img");
   changeImage(changeMassageImgBtn,massageImg);
   //all opacity 30%
   const changeSection = massage.querySelector("#change-massage-image-section");
   const editBtn = massage.querySelector("#edit-btn");
   const priceAndTimes = massage.querySelector("#price-time");
   const massageImgInput = massage.querySelector("#massage-img-input");
   changeSection.classList.add("opacity-[30%]");
   priceAndTimes.classList.add("opacity-[30%]");
   editBtn.addEventListener("click",()=>{
      changeSection.classList.remove("opacity-[30%]")
      priceAndTimes.classList.remove("opacity-[30%]");
   })
   // preview image
   massageImgInput.addEventListener("change",()=>{
      const image = massageImgInput.files[0];
      const reader = new FileReader();
      reader.onload = (event)=>{
         massageImg.src = event.target.result;
      }
      reader.readAsDataURL(image);
   });
   // package add
   const addPackageBtn = massage.querySelector("#add-package-btn");
   const packages = priceAndTimes.querySelectorAll("li");
   const package = packages[0].querySelectorAll("*");
   // console.log(package);
   addPackageBtn.addEventListener("click",()=>{
      const clonePackage = packages[0].cloneNode();
      const deleteBtn = package[0].cloneNode();
      const svg = package[1].cloneNode();
      const path1 = package[2].cloneNode();
      const path2 = package[3].cloneNode();
      const inputMin = package[4].cloneNode();
      const inputPrice = package[5].cloneNode();
      //icon
         svg.append(path1);
         svg.append(path2);
         //btn
         deleteBtn.append(svg);
         //reset input value
         inputMin.value = "--" ;
         inputPrice.value = "--";
         //full   
         clonePackage.append(deleteBtn);
         clonePackage.append(inputMin);
         clonePackage.append(inputPrice);
         //append
         priceAndTimes.append(clonePackage);
         deleteBtn.addEventListener("click",()=>{
            priceAndTimes.removeChild(clonePackage);
         })
   })
   // package delete
   packages.forEach((package)=>{
      const deletePackageBtn = package.querySelector("#delete-package-btn");
      deletePackageBtn.addEventListener("click",()=>{
         priceAndTimes.removeChild(package);
      })
   })
   //btn enable
   //const editBtn = massage.querySelector("#edit-btn");
   const deletePackageBtn = massage.querySelectorAll("#delete-package-btn");
   editBtn.addEventListener("click", ()=>{
      addPackageBtn.classList.remove("hidden");
      deletePackageBtn.forEach((btn)=>{
         btn.classList.remove("hidden");
      })
   })
   formEdit(massage,"input",["#add-package-btn","#delete-package-btn"]);
   formEdit(massage,"textarea");
})

//discount
const discountForms = document.querySelectorAll("#discount-form");
discountForms.forEach((form)=>{
   formEdit(form,"input")
   formEdit(form,"textarea")
})
