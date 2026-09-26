
let fullName = document.getElementById("fn");

let phoneName = document.getElementById("phN");

let emailAddress =document.getElementById("em");

let address =document.getElementById("ad");

let group =document.getElementById("gr");

let favorite =document.getElementById("favorite");

let emergency =document.getElementById("emergency");

let changePhoto =document.getElementById("photoInput");

let noContact =document.getElementById("noContact");

let addFavorite =document.getElementById("sRegullar");

let removeFavorite =document.getElementById("sSolid");

let addfIcone =document.getElementById("fIcon");

let addemIcon =document.getElementById("emIcon");

let total =document.getElementById("totalContact");

let lightContainer = document.getElementById("light-container");

var searchInput = document.getElementById("search");


let currentIndex = null ;

let contactList = [
    

]


contactList = JSON.parse(localStorage.getItem("contactContainer")) || []

displayData();





function addContact(){

  currentIndex = null ;

  clear();
 
lightContainer.classList.remove("d-none");



}



function closeWindow(){

    lightContainer.classList.add("d-none");

}


function saveContact(){

   


  if(validationName() == false){

    document.getElementById("light-worening").classList.remove("d-none")
     return;
  }
  
   let contact = {
    fullname: fullName.value ,
    number: phoneName.value ,
    email: emailAddress.value ,
    address: address.value ,
    group: group.value ,
    isFavorite: favorite.checked ,
    isEmergency: emergency.checked ,
    changePhoto: `images/${changePhoto.files[0]?.name}`

   }

  

   
   if(currentIndex !== null){
    contactList[currentIndex] = contact ;
    currentIndex = null;
   
   }else{
    contactList.push(contact);
   }
   

   
   localStorage.setItem("contactContainer" , JSON.stringify(contactList))

   displayData()
   

   clear() 
   
    lightContainer.classList.add("d-none");


    document.getElementById("light-added").classList.remove("d-none");


setTimeout(function () {
  document.getElementById("light-added").classList.add("d-none");
}, 1500);


}


function clear(){
 
    fullName.value = null ,
    phoneName.value = null ,
    emailAddress.value = null  ,
    address.value = null  ,
    group.value = null 
    favorite.checked =false ,
    emergency.checked =false

}


function cancelContact(){

     lightContainer.classList.add("d-none");
     clear()

}


function displayData(){


  console.log();

    if(contactList.length > 0){
    noContact.classList.add("d-none");
   }else{
    noContact.classList.remove("d-none")
   }
  
    let cartona ="";

    for(let i = 0 ; i < contactList.length ; i++){

        cartona += `
        
         <div class="outer p-2 col-lg-6 col-sm-12">
                        <div class="inner p-3 rounded-4 bg-white h-100">

                          <div class="head d-flex position-relative">
                          <div class="icon me-3">A</div><span id="fIcon" class="favorit-icon position-absolute  bg-warning text-white rounded-circle p-1 ${contactList[i].isFavorite ? 'd-inline' : 'd-none'} "><i class="fa-solid fa-star  "></i></span>
                           <span id="emIcon" class="emargincy-icon position-absolute bg-danger text-white rounded-circle p-1 ${contactList[i].isEmergency ? 'd-inline' : 'd-none'} "><i class="fa-solid fa-heart-pulse  "></i></span> <br>
                           <div class="text">
                            <h6 class="fw-bolder">${contactList[i].fullname}</h6>
                            <span class="num p-2 rounded-3 bg-primary-subtle mt-2b "><i class="fa-solid fa-phone text-primary"></i></span>
                            <span class="number text-muted fw-medium">${contactList[i].number}</span>
                           </div>
                        </div>

                         <div class="email-contact ${contactList[i].email ? '' : 'd-none'}">
                          <div class=" mt-3">
                            <span class="eicon p-2 rounded-3 me-2"><i class="fa-solid fa-envelope "></i></span>
                            <span class="text-muted">${contactList[i].email}</span>
                          </div>
                         </div>

                         <div class="location-contact ${contactList[i].address ? '' : 'd-none'}">
                          <div id="addressContact" class=" mt-3">
                            <span onclick="dNone()" class="loicon p-2 rounded-3 me-2"><i class="fa-solid fa-location-dot "></i></span>
                            <span class="text-muted">${contactList[i].address}</span>
                          </div>
                         </div>

                         <span id="signEmrgin" class="emagincy-incontact d-inline text-danger bg-danger-subtle p-1 rounded-3 mt-3 d-inline-block ${contactList[i].isEmergency ? 'd-inline' : 'd-none'}">
                          <i class="fa-solid fa-heart-pulse  "></i> Emergency
                         </span> <br>

                         <div class="footer p-2 mt-2 d-flex justify-content-between">
                          <div class="left-icon"><span class="phone p-2 rounded-3 d-inline-block "><i class="fa-solid fa-phone"></i></span>
                          <span class="email  p-2 rounded-3 d-inline-block"><i class="fa-solid fa-envelope"></i></span>
                          </div>
                          <div class="right-icon">
                          <span onclick="removeofFavorite(${i})"id="sSolid" class="${contactList[i].isFavorite ? 'd-inline' : 'd-none'}"  class="rounded-3"><i  class="fa-solid fa-star"></i></span>
                          <span onclick="addtoFavorite(${i})"  class=" ${contactList[i].isFavorite ? 'd-none'  : 'd-inline'  }" id="sRegullar" ><i class="fa-regular fa-star"></i></span>
                          <span onclick="removeEmargincy(${i})" id="hsolid" class="rounded-3 ${contactList[i].isEmergency ? 'd-inline' : 'd-none'}"><i class="fa-solid fa-heart-pulse"></i></span>
                          <span onclick="addEmargincy(${i})" class="${contactList[i].isEmergency ? 'd-none' : 'd-inline'}" id="hRegular" ><i class="fa-regular fa-heart"></i></span>
                          <span onclick="editContact(${i})" class="edit rounded-3"><i class="fa-solid fa-pen"></i></span>
                          <span onclick="dinline()" class="delete rounded-3"><i class="fa-solid fa-trash"></i></span>
                          </div>
                         </div>

                        </div>
                      </div>
        
        
        `

    }

    

    document.getElementById("rowContact").innerHTML = cartona ;

    totalNumofContact();
    
    countFavoritesAndEmergency();

}


function addtoFavorite(index){

contactList[index].isFavorite = true;
displayData();


}


function removeofFavorite(index){

    contactList[index].isFavorite = false;
displayData();

}


function addEmargincy(index){
   
    contactList[index].isEmergency =true;
     document.getElementById("signEmrgin").classList.remove("d-none");
    displayData();
}

function removeEmargincy(index){
   
    
    contactList[index].isEmergency =false;
    document.getElementById("signEmrgin").classList.add("d-none");
    displayData();

}


function totalNumofContact(){
    total.innerHTML = contactList.length;
}



function countFavoritesAndEmergency() {
  let favCount = 0;
  let emergCount = 0;
  let favCartona = "";
  let emergCartona = "";

  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].isFavorite == true) {
      favCount++;
      favCartona += `
        <div class="contactFavorite pb-2">
          <div class="head d-flex position-relative ms-3 me-3 mt-1 p-2 rounded-2 justify-content-between">
            <div class="icon-right me-2">A</div>
            <br>
            <div class="text-infvorite">
              <h6 class="fw-bolder">${contactList[i].fullname}</h6>
              <span class="number text-muted fw-medium d-inline-block me-3">${contactList[i].number}</span>
            </div>
            <div class="numb p-2 rounded-3 text-success bg-success-subtle mt-2b ms-2"><i class="fa-solid fa-phone"></i></div>
          </div>
        </div>
      `;
    }

    if (contactList[i].isEmergency == true) {
      emergCount++;
      emergCartona += `
         <div class="contactEmergency pb-2">
                    <div class="head d-flex position-relative ms-3 me-3 mt-1 p-2 rounded-2 justify-content-between">
                          <div class="icon-right me-2">A</div>
                            <br>
                           <div class="text-inEmergrncy">
                            <h6 class="fw-bolder">${contactList[i].fullname}</h6>
                            <span class="number text-muted fw-medium d-inline-block me-3">${contactList[i].number}</span>
                           </div>
                           <div class="numb p-2 rounded-3 text-danger bg-danger-subtle mt-2b ms-2"><i class="fa-solid fa-phone "></i></div>
                        </div>
                   </div>
      `;
    }
  }

  
  document.getElementById("numFavorite").innerHTML = favCount;
  document.getElementById("numEmergen").innerHTML = emergCount;

  
  if (favCount > 0) {
    document.getElementById("noFav").classList.add("d-none");
    document.getElementById("noFav").classList.remove("d-flex");
    document.getElementById("favoritesList").innerHTML = favCartona;
  } else {
    document.getElementById("noFav").classList.remove("d-none");
    document.getElementById("noFav").classList.add("d-flex");
    document.getElementById("favoritesList").innerHTML = "";
  }

  
  if (emergCount > 0) {
    document.getElementById("noEmar").classList.add("d-none");
    document.getElementById("noEmar").classList.remove("d-flex");
    document.getElementById("emergencyList").innerHTML = emergCartona;
  } else {
    document.getElementById("noEmar").classList.remove("d-none");
    document.getElementById("noEmar").classList.add("d-flex");
    document.getElementById("emergencyList").innerHTML = "";
  }
}



function deleteContact(index) {

 contactList.splice(index , 1);

 displayData()
  
 localStorage.setItem("contactContainer" , JSON.stringify(contactList))

} 



function searchContact() {

 var theInput = searchInput.value ;


  let cartona ="";

    for(let i = 0 ; i < contactList.length ; i++){

      if( contactList[i].fullname.toLowerCase().includes( theInput.toLowerCase() ) == true){

          
          cartona += `
        
         <div class="outer p-2 col-lg-6 col-sm-12">
                        <div class="inner p-3 rounded-4 bg-white h-100">

                          <div class="head d-flex position-relative">
                          <div class="icon me-3">A</div><span id="fIcon" class="favorit-icon position-absolute  bg-warning text-white rounded-circle p-1 ${contactList[i].isFavorite ? 'd-inline' : 'd-none'} "><i class="fa-solid fa-star  "></i></span>
                           <span id="emIcon" class="emargincy-icon position-absolute bg-danger text-white rounded-circle p-1 ${contactList[i].isEmergency ? 'd-inline' : 'd-none'} "><i class="fa-solid fa-heart-pulse  "></i></span> <br>
                           <div class="text">
                            <h6 class="fw-bolder">${contactList[i].fullname}</h6>
                            <span class="num p-2 rounded-3 bg-primary-subtle mt-2b "><i class="fa-solid fa-phone text-primary"></i></span>
                            <span class="number text-muted fw-medium">${contactList[i].number}</span>
                           </div>
                        </div>

                         <div class="email-contact">
                          <div class=" mt-3">
                            <span class="eicon p-2 rounded-3 me-2"><i class="fa-solid fa-envelope "></i></span>
                            <span class="text-muted">${contactList[i].email}</span>
                          </div>
                         </div>

                         <div class="location-contact">
                          <div class=" mt-3">
                            <span class="loicon p-2 rounded-3 me-2"><i class="fa-solid fa-location-dot "></i></span>
                            <span class="text-muted">${contactList[i].address}</span>
                          </div>
                         </div>

                         <span id="signEmrgin" class="emagincy-incontact d-inline text-danger bg-danger-subtle p-1 rounded-3 mt-3 d-inline-block ${contactList[i].isEmergency ? 'd-inline' : 'd-none'}">
                          <i class="fa-solid fa-heart-pulse  "></i> Emergency
                         </span> <br>

                         <div class="footer p-2 mt-2 d-flex justify-content-between">
                          <div class="left-icon"><span class="phone p-2 rounded-3 d-inline-block "><i class="fa-solid fa-phone"></i></span>
                          <span class="email  p-2 rounded-3 d-inline-block"><i class="fa-solid fa-envelope"></i></span>
                          </div>
                          <div class="right-icon">
                          <span onclick="removeofFavorite(${i})"id="sSolid" class="${contactList[i].isFavorite ? 'd-inline' : 'd-none'}"  class="rounded-3"><i  class="fa-solid fa-star"></i></span>
                          <span onclick="addtoFavorite(${i})"  class=" ${contactList[i].isFavorite ? 'd-none'  : 'd-inline'  }" id="sRegullar" ><i class="fa-regular fa-star"></i></span>
                          <span onclick="removeEmargincy(${i})" id="hsolid" class="rounded-3 ${contactList[i].isEmergency ? 'd-inline' : 'd-none'}"><i class="fa-solid fa-heart-pulse"></i></span>
                          <span onclick="addEmargincy(${i})" class="${contactList[i].isEmergency ? 'd-none' : 'd-inline'}" id="hRegular" ><i class="fa-regular fa-heart"></i></span>
                          <span class="edit rounded-3"><i class="fa-solid fa-pen"></i></span>
                          <span onclick="deleteContact(${i})" class="delete rounded-3"><i class="fa-solid fa-trash"></i></span>
                          </div>
                         </div>

                        </div>
                      </div>
        
        
        `


      }



}


document.getElementById("rowContact").innerHTML = cartona ;


}


function chosePhoto() {

 document.getElementById("photoInput").click();
 

}




function editContact(index) {

 //console.log(contactList[index]);

 currentIndex = index ;

 fullName.value = contactList[index].fullname

 phoneName.value = contactList[index].number

 emailAddress.value = contactList[index].email

 address.value = contactList[index].address

 lightContainer.classList.remove("d-none");

 localStorage.setItem("contactContainer" , JSON.stringify(contactList)) 


}


function validationName(){

 var regex = /^[a-zA-Z ]{2,50}$/; 
  
 var text = fullName.value ;

 if(regex.test( text )){
  fullName.classList.add("is-valid")
  fullName.classList.remove("is-invalid")
 document.getElementById("denger").classList.add("d-none");
 return true;
 }else{
   fullName.classList.add("is-invalid")
   fullName.classList.remove("is-valid")
   document.getElementById("denger").classList.remove("d-none");
   return false;
 }

 


}


function validationNumber(){

 var regex = /^01[015][0-9]{8}$/; 
  
 var text = phoneName.value ;

 if(regex.test( text )){
  phoneName.classList.add("is-valid")
  phoneName.classList.remove("is-invalid")
 document.getElementById("dnum").classList.add("d-none")
 }else{
   phoneName.classList.add("is-invalid")
   phoneName.classList.remove("is-valid")
   document.getElementById("dnum").classList.remove("d-none")
 }

 return;

}


function closeWrong() {

  document.getElementById("light-worening").classList.add("d-none") 

}


function dNone(){

document.getElementById("light-containerdelet").classList.add("d-none")

}


function dinline(){

document.getElementById("light-containerdelet").classList.remove("d-none")

}




let itemToDeleteIndex;


function openDeleteModal(index) {
  itemToDeleteIndex = index; 
  
 
  document.getElementById("nameDlete").innerText = contactList[index].fullname;
  
 
  document.getElementById("light-containerdelet").classList.remove("d-none");
}


function confirmDelete() {
  contactList.splice(itemToDeleteIndex, 1);
  localStorage.setItem("contactContainer", JSON.stringify(contactList));
  displayData();
  dNone(); 
}










      