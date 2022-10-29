/*
async function start() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    console.log(data);
}

start()
*/

//the purpose of above function is to get data
//await means to hold everything until said action is done before proceeding w/ code. 
//now let's tweak above to call our second function "createBreedList"

/*
async function start() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
}

start()

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select>
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function(breed) {
            return `<option>${breed}</option>`
        })}.join('')}
    </select>
`
}
*/

// now there's a drop menu showing all breeds from the url (creates select element)
// next, we want our JS to respond to the event/value being changed in the drop bar
// since the options are breeds, we want to get images for said breed from a new url

/*
async function start() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
}

start()

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function(breed) {
            return `<option>${breed}</option>`
        })}.join('')}
    </select>
`
}

async function loadByBreed(breed) {
    if(breed != "Choose a dog breed") {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`); 
      const data = await response.json();
      console.log(data);
    }
}
*/

// the above function is responsible for loading the pics. 
// Now let's make the slideshow and set the transitions

/*
async function start() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
}

start()

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function(breed) {
            return `<option>${breed}</option>`
        })}.join('')}
    </select>
`
}

async function loadByBreed(breed) {
    if(breed != "Choose a dog breed") {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`); 
      const data = await response.json();
      createSlideshow(data.message);
    }
}

function createSlideshow(images) {
    let currentPosition = 0;
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    currentPosition += 2;
    setInterval(nextSlide, 3000);

    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)    
        setTimeout(function() {
            document.querySelector(".slide").remove();
        }, 1000)
        if(currentPosition + 1 >= images.length) {
            currentPosition = 0;
        } else {
            currentPosition++;
        }
    }
}
*/


//Now that we have all that, we gotta tell the code to stop the timer when switching dogs
// Mainly, we got to set new variables

/*
let timer;
let deleteFirstPhotoDelay;


async function start() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
}

start()

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function(breed) {
            return `<option>${breed}</option>`
        })}.join('')}
    </select>
`
}

async function loadByBreed(breed) {
    if(breed != "Choose a dog breed") {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`); 
      const data = await response.json();
      createSlideshow(data.message);
    }
}

function createSlideshow(images) {
    let currentPosition = 0;
    // then insert those variables here using the built-in clearInterval function
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    currentPosition += 2;
    // next, you gotta set the timer variable equal to the interval variable since it's defined already
    timer = setInterval(nextSlide, 3000);

    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)    
        // the same for the variable delteFirstPhotoDelay - set this equal to the setTimeout variable since it's defined already
        deleteFirstPhotoDelay = setTimeout(function() {
            document.querySelector(".slide").remove();
        }, 1000)
        if(currentPosition + 1 >= images.length) {
            currentPosition = 0;
        } else {
            currentPosition++;
        }
    }
}
*/

// we're almost there...but what if a breed only has 1-2 pics?
// we must address this by tweaking the createSlideshow function - specifically from the document.getElementById("slideshow") to th setInterval block
// we replace this with an if/else statement

let timer;
let deleteFirstPhotoDelay;

async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        createBreedList(data.message);
    } catch(e) {
        console.log("There was a problem fetching the breed list.");
    }
}

start()

function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function(breed) {
            return `<option>${breed}</option>`
        })}.join('')}
    </select>
`
}

async function loadByBreed(breed) {
    if(breed != "Choose a dog breed") {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`); 
      const data = await response.json();
      createSlideshow(data.message);
    }
}

function createSlideshow(images) {
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);

    if(images.length > 1) {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `
        currentPosition += 2;
        if(images.length == 2) currentPosition = 0;
        timer = setInterval(nextSlide, 3000);
    } else {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>
        `
    }

    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)    
        deleteFirstPhotoDelay = setTimeout(function() {
            document.querySelector(".slide").remove();
        }, 1000);
        if(currentPosition + 1 >= images.length) {
            currentPosition = 0;
        } else {
            currentPosition++;
        }
    }
}

//the else statement above tells the code not to run the interval if a breed only has 1 pic
// we also added an if statement under line 231 in case a breed only has 2 pics
// lastly, we added a try/catch method to the async function start ()