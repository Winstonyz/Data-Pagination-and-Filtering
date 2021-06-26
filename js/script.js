/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering RESUBMISSION
*/
//how to access the student information using the data variable
// console.log(data);

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


//defining a function that will display a page of nine students. We will name this function showPage
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
//list: represent the array of student data we are working with
//page: the page number that we want to display.

function showpage (list, page){
   //console.log(list);
   // console.log(page);

   //display a page of nine students
   let itemsPerPage=9;
   let startIndex = (page *itemsPerPage)-itemsPerPage;
   let endIndex = page * itemsPerPage;
   
   // console.log(itemsPerPage);
   // console.log(startIndex);

   //// select the element with a class of `student-list` and assign it to a variable
   //This is the element we will be adding our student data to.
   const studentList = document.querySelector(".student-list");

   // set the innerHTML property of the variable you just created to an empty string
   studentList.innerHTML = "";

   // loop over the length of the `list` parameter
   for (let i=0; i<list.length;i++){ 
    // inside the loop create a conditional to display the proper students
    if(i>=startIndex && i<endIndex){
      //console.log(i);
      //  console.log(list[i].name);
      //  console.log(list[i].registered);
       studentList.insertAdjacentHTML( 'beforeend', `
       <li class="student-item cf">
       <div class="student-details">
         <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
         <h3>${list[i].name.first+" "+list[i].name.last}</h3>
         <span class="email">${list[i].email}</span>
       </div>
       <div class="joined-details">
         <span class="date">Joined ${list[i].registered.date}</span>
       </div>
     </li>
       `);
    
      // inside the conditional:
        // create the elements needed to display the student information
        // insert the above elements
   }

}
}
//testing
//showpage(data,1);



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   // console.log("Starting");
   let paginationNumber = Math.ceil(list.length / 9);
   //console.log(paginationNumber);
   //console.log(list.length / 9);
   //This will remove any pagination buttons that might have previously been displayed.
   const linkList = document.querySelector(".link-list");
   linkList.innerHTML = "";
   // loop over the number of pages needed
   for (let i=1; i<=paginationNumber;i++){
      // create the elements needed to display the pagination button
      // insert the above elements
      linkList.innerHTML+=`
      <li>
      <button type="button">${i}</button>
      </li>
      `;
   }
   //Select the first pagination button and give it a class name of active.
   linkList.querySelector("button").classList.add("active");
   // console.log("breakpoint");
   // console.log(linkList);

   //Now create an event listener on linkList that will be called when there is a click event.
   linkList.addEventListener( 'click', (e) => {
      // console.log("Eventlistener");
      //a conditional that checks if the tagName of the event target (i.e. the element clicked) is a BUTTON element.
      // console.log("Hello!");


      if(e.target.tagName === 'BUTTON'){
         // console.log(e.target);
         //use querySelector to select the first element with a class of active and then set the className property to an empty string.
         linkList.querySelector(".active").className="";
         //We can use querySelector here rather than looping over all of the buttons because there should only ever be one button with the active class.
         //Still inside of the conditional, lets next add the active class to the button that was clicked (i.e. the click target).
         e.target.className="active";
         // console.log(e.target.textContent);
         showpage(list, e.target.textContent);
      }
   });
   
}


// Call functions
// showpage(data,1);
// addPagination(data);

//******************EXTRA CREDIT***************************** */

//Dynamically create and add a search bar. 
const searchPortion = document.querySelector('HEADER');

searchPortion.insertAdjacentHTML( 'beforeend', `
   <label for="search" class="student-search">
      <input id="search" type="text" placeholder="Search by name...">
      <button id="submit" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`);
//console.log(searchPortion);

//console.log("console");
const searchInput = document.getElementById('search');
//console.log(searchInput);
//console.log(document.querySelector('#search'));


//search function
function search(list){
   //console.log("console");
   //search by ID
   const searchInput = document.querySelector('#search');
   const searchButton = document.querySelector('#submit');
   const studentList = document.querySelector(".student-list");


   //event listener
   //consider adding a keyup event listener to the search input so that the list filters in real-time as the user types. 
   searchInput.addEventListener( 'keyup', (e) => {
      evenListenerCode(list, searchInput, studentList);
   });
   //The pagination buttons should change based on the number of matches to the search
   searchButton.addEventListener( 'click', (e) => {
      evenListenerCode(list, searchInput, studentList);
   })

}

//write a helper function to avoid repeating the code
function evenListenerCode(list, searchInput, studentList){
   var finalList=[];
   const input = searchInput.value.toLocaleLowerCase();
   //for loop to make every name lowercase
   for (let i=0; i<list.length; i++){
      const firstName = list[i].name.first.toLocaleLowerCase();
      const lasttName = list[i].name.last.toLocaleLowerCase();
      //The search should be case insensitive and work for partial matches. 
      if (firstName.includes(input) || lasttName.includes(input)){
         finalList.push(list[i]);
      }
   }

   //Clicking on a pagination button should display the corresponding matching students for that page.
   if(finalList.length>0){
      showpage(finalList,1);
      addPagination(finalList);
   }
   //If no matches are found for a search, display a “No results found” type message on the page.
   else{
      studentList.innerHTML="";
      studentList.innerHTML="<h1>No results were found</h1>";
      addPagination(finalList);
   }
}

showpage(data,1);
addPagination(data);
search(data);