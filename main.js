







/* globals require */
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
console.log(Airtable);

// use the airtable library to get a variable that represents one of our bases
var base = new Airtable({ apiKey: "keyifRwUVRaDhOFrF" }).base("appJfbq6NLTEmiN2B");

//get the "rocks" table from the base, select ALL the records, and specify the functions that will receive the data
base("impressionist").select({}).eachPage(gotPageOfpaintings, gotAllpaintings);

// an empty array to hold our book data
const impressionist = [];


// callback function that receives our data
function gotPageOfpaintings(records, fetchNextPage) {
  console.log("gotPageOfpaintings()");
  // add the records from this page to our rocks array
  Paintings.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllpaintings(err) {
  console.log("gotAllpaintings()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading paintings");
    console.error(err);
    return;
  }

  // call function to show the rocks
  showPaintings();
}

/////////////////////////////////////////////////////////////////////////////////

// create the book-spines on the shelf
function showRocks() {
  console.log("showPaintings()");

  // find the shelf element
  const shelf = document.getElementById("shelf");

  // loop through the books loaded from the Airtable API
  Paintings.forEach((impressionist) => {
    // create the div, set its text and class
    const div = document.createElement("div");
    div.innerText = impressionistartwork .fields.year;
    div.classList.add("Paintings-spine");
    // when the user clicks this book spine, call showBook and send the book data and this spine element
    div.addEventListener("click", () => {
      showRock(Paintings, div);
    });
    // put the newly created book spine on the shelf
    shelf.appendChild(div);
  });
}

// show the detail info for a book, and highlight the active book-spine
function showPaintings(impressionistartwork, div) {
  console.log("showPaintings()", impressionistartwork);

  // find the book detail element
  const PaintingsDetail = document.getElementById("Paintings-detail");

  // populate the template with the data in the provided book
  rockDetail.getElementsByClassName("year")[0].innerText = rock.fields.year; //
  rockDetail.getElementsByClassName("artist")[0].innerText = rock.fields.artist;
  rockDetail.getElementsByClassName("pic")[0].src = rock.fields.pic;

  // remove the .active class from any book spines that have it...
  const shelf = document.getElementById("shelf");
  const PaintingsSpines =  shelf.getElementsByClassName("active");
  for (const PaintingsSpine of PaintingsSpines) {
   PaintingsSpine.classList.remove("active");
  }
  // ...and set it on the one just clicked
  div.classList.add("active");

  // reveal the detail element, we only really need this the first time
  // but its not hurting to do it more than once
  PaintingsDetail.classList.remove("hidden");
}