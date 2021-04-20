/* globals require */
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
console.log(Airtable);

// use the airtable library to get a variable that represents one of our bases
var base = new Airtable({ apiKey: "keyifRwUVRaDhOFrF" }).base("appJfbq6NLTEmiN2B");




//get the "rocks" table from the base, select ALL the records, and specify the functions that will receive the data
base("impressionist").select({ view: "by_year" }).eachPage(gotPageOfpaintings, gotAllpaintings);

// an empty array to hold our book data
const paintings = [];


// callback function that receives our data
function gotPageOfpaintings(records, fetchNextPage) {
    console.log("gotPageOfpaintings()");
    // add the records from this page to our rocks array
    paintings.push(...records);
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

function showPaintings() {













    console.log("paintings", paintings);



    const buttons = paintings.map((painting, index) => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.append(painting.fields.year);

        button.addEventListener('click', () => {
            // transition out other slides, then remove them
            document.querySelectorAll('.slide').forEach((s) => {
                s.classList.remove('show');
                s.addEventListener('transitionend', (event) => {
                    event.target.remove();
                });
            });
            const slide = document.createElement('div');
            slide.classList.add('slide');
            // create rocksContainer, petname, rocksTrait, and imgRocks. you've already done this




            var paintingContainer = document.createElement("div");
            paintingContainer.classList.add("painting-container");

            document.querySelector(".container").append(paintingContainer);


            var Artist = document.createElement("h2")

            Artist.classList.add("artist");

            Artist.innerText = painting.fields.artist;





            var PaintingName = document.createElement("h2")

            PaintingName.classList.add("name");

            PaintingName.innerText = painting.fields.name;






            var YearPainting = document.createElement("b")

            YearPainting.classList.add("year");

            YearPainting.innerText = painting.fields.year;








            var imgPainting = document.createElement("img")

            imgPainting.classList.add("pic");

            imgPainting.src = painting.fields.pic[0].url;



            var imglocation = document.createElement("h2")

            imglocation.classList.add("location");

            imglocation.innerText = painting.fields.location;



            // append everything
            paintingContainer.append(Artist, PaintingName, imglocation, imgPainting);
            slide.append(paintingContainer);
            const viewer = document.querySelector('.viewer');
            viewer.insertBefore(slide, viewer.firstChild).focus();
            slide.classList.add('show');




            paintingContainer.addEventListener("click", function() {


                YearPainting.classList.toggle("active")

                imgPainting.classList.toggle("active")



            });
        });




        return button;






    });


    document.querySelector('nav').append(...buttons);







}





























// console.log("showPaintings()");
// paintings.forEach(painting => {

//     console.log("painting:", painting);


//     var paintingContainer = document.createElement("div");
//     paintingContainer.classList.add("painting-container");

//     document.querySelector(".container").append(paintingContainer);


//     var Artist = document.createElement("h2")

//     Artist.classList.add("artist");

//     Artist.innerText = painting.fields.artist;

//     paintingContainer.append(Artist);



//     var PaintingName = document.createElement("h2")

//     PaintingName.classList.add("name");

//     PaintingName.innerText = painting.fields.name;

//     paintingContainer.append(PaintingName);




//     var YearPainting = document.createElement("b")

//     YearPainting.classList.add("year");

//     YearPainting.innerText = painting.fields.year;


//     paintingContainer.append(YearPainting);





//     var imgPainting = document.createElement("img")

//     imgPainting.classList.add("pic");

//     imgPainting.src = painting.fields.pic[0].url;


//     paintingContainer.append(imgPainting);






// //     paintingContainer.addEventListener("click", function() {


// //         YearPainting.classList.toggle("active")

// //         imgPainting.classList.toggle("active")

// //         PaintingName.classList.toggle("active")

//     });



//     //    var colortheme = painting.fields.color; 
//     //    colortheme.forEach(function(){


//     //      paintingContainer.classList.add(color)

//     //    }
//     //    )




//     //     var filterBlue = document.querySelector('.blue');
//     // filterBlue.addEventListener("click", function(){


//     //   if(paintingContainer.classList.contains("blue", "light sky blue", "dark blue")){
//     //   paintingContainer.style.background = "blue"; 
//     //   }
//     //   else{
//     //     paintingContainer.style.background = "white"; 
//     //   }

//     // });







// })





function humanize(num) {
    var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
        'seventeen', 'eighteen', 'nineteen'
    ];
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
        'ninety'
    ];

    var numString = num.toString();

    if (num < 0) throw new Error('Negative numbers are not supported.');

    if (num === 0) return 'zero';

    //the case of 1 - 20
    if (num < 20) {
        return ones[num];
    }

    if (numString.length === 2) {
        return tens[numString[0]] + ' ' + ones[numString[1]];
    }

    //100 and more
    if (numString.length == 3) {
        if (numString[1] === '0' && numString[2] === '0')
            return ones[numString[0]] + ' hundred';
        else
            return ones[numString[0]] + ' hundred and ' + convert(+(numString[1] + numString[2]));
    }

    if (numString.length === 4) {
        var end = +(numString[1] + numString[2] + numString[3]);
        if (end === 0) return ones[numString[0]] + ' thousand';
        if (end < 100) return ones[numString[0]] + ' thousand and ' + convert(end);
        return ones[numString[0]] + ' thousand ' + convert(end);
    }
}