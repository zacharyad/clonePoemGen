//this will be the text area field captured value
//let data1 = document.getElementById("Corpus");

let data1 = "It started before I was born. \"My\" biological mother was a young, unwed college graduate student, and she decided to put me up for adoption. She felt very strongly that I should be adopted by college graduates, so everything was all set for me to be adopted at birth by a lawyer and his wife. Except that when I popped out they decided at the last minute that they really wanted a girl. So my parents, who were on a waiting list, got a call in the middle of the night asking: \“We have an unexpected baby boy; do you want him?” They said: “Of course.” My biological mother later found out that my mother had never graduated from college and that my father had never graduated from high school. She refused to sign the final adoption papers. She only relented a few months later when my parents promised that I would someday go to college. And 17 years later I did go to college. But I naively chose a college that was almost as expensive as Stanford, and all of my working-class parents’ savings were being spent on my college tuition. After six months, I couldn’t see the value in it. I had no idea what I wanted to do with my life and no idea how college was going to help me figure it out. And here I was spending all of the money my parents had saved their entire life. So I decided to drop out and trust that it would all work out OK. It was pretty scary at the time, but looking back it was one of the best decisions I ever made. The minute I dropped out I could stop taking the required classes that didn’t interest me, and begin dropping in on the ones that looked interesting. It wasn’t all romantic. I didn’t have a dorm room, so I slept on the floor in friends’ rooms, I returned Coke bottles for the 5¢ deposits to buy food with, and I would walk the 7 miles across town every Sunday night to get one good meal a week at the Hare Krishna temple. I loved it. And much of what I stumbled into by following my curiosity and intuition turned out to be priceless later on. Let me give you one example: Reed College at that time offered perhaps the best calligraphy instruction in the country. Throughout the campus every poster, every label on every drawer, was beautifully hand calligraphed. Because I had dropped out and didn’t have to take the normal classes, I decided to take a calligraphy class to learn how to do this. I learned about serif and sans serif typefaces, about varying the amount of space between different letter combinations, about what makes great typography great. It was beautiful, historical, artistically subtle in a way that science can’t capture, and I found it fascinating.";

console.log(poemBuilder(data1, 6));

function poemBuilder(str, lines){
    //check for length,  less than 250 chars meaning the length doesnt have enough diversity for an interesting poem
    if (str.length < 250) {
        console.log("sorry the text is not varied enough")
    }
 
    let objFromStr = strToObj(str); 
    //Initialized as the first word, will be changed to actual previous word inside the loop
    let poemArr = [];

    // Loops to generate each line
    for (let i = 0; i < lines; i++){
        let wordsPerLine = 6;
        let prevWord = randomWordFromArr(objFromStr[randomKeyInObj(objFromStr)]);
        //let randomIndex = Math.floor(Math.random() * objFromStr[prevWord].length)
        let nextWord = randomWordFromArr(objFromStr[prevWord]); 

        //Builds each line.
        for (let j = 0; j < wordsPerLine; j++){
            if(prevWord.length < 4 && j === wordsPerLine - 1){
                continue;
            } else if (prevWord === undefined){
                poemArr.push(randomWordFromArr(objFromStr[randomKeyInObj(objFromStr)]));
                nextWord = randomWordFromArr(objFromStr[prevWord]);
                prevWord = nextWord; 
            } else {
                poemArr.push(prevWord);
                nextWord = randomWordFromArr(objFromStr[prevWord]);
                prevWord = nextWord; 
            }
        }
        poemArr.push(",\n");
    }
    poemArr.splice(-1, 1, ".")
    return poemArr.join(" ");
}

//___________________________________________________
//Helper Functions Below
//___________________________________________________


//finds the array with the most words following it, returns string
function randomKeyInObj(obj){
    let objArr = Object.keys(obj);
    let randomIndex = Math.floor(Math.random() * objArr.length);

    return objArr[randomIndex];
}

//console.log(randomKeyInObj(test))

function randomWordFromArr(keyArray){
    let randomNumBelowlength = Math.floor(Math.random() * keyArray.length);
    //console.log(randomNumBelowlength);
    return keyArray[randomNumBelowlength]
}

//console.log(randomWordFromArr(test.big))

//returns an Markov Chain of the string in an object
function strToObj(str){
    str.toLowerCase();
    let arrayOfWords = removePuncs(str).split(" ");
    let corpusObj = {};

    for(let i = 0; i < arrayOfWords.length; i++){
        let singleLetterWords = "aAiI"
        if (arrayOfWords[i] === " " || arrayOfWords[i] === "-"  || (arrayOfWords[i].length === 1 && singleLetterWords.indexOf() !== -1)){
            arrayOfWords.splice(i, 1);
        } else {
            //continue until the last word, stop because last word has nothing following
            if(i !== arrayOfWords.length - 1){
                if (corpusObj.hasOwnProperty(arrayOfWords[i])){
                    corpusObj[arrayOfWords[i]].push(arrayOfWords[i + 1]);
                } else {
                    corpusObj[arrayOfWords[i]] = [arrayOfWords[i + 1]];
                }
            }
        }
    }
    return corpusObj;
}

//console.log(strToObj(data1))

//removes puncutaion, used in creating obj from string.
function removePuncs(str){
    let returnStr = "";
    let puncuation = ".,?/<>\!@#$%^&*-;()"
    for(let i = 0; i < str.length; i++){
        if(puncuation.indexOf(str[i]) === -1 && str[i] !== "   "){
            returnStr += str[i];
        }
    }
    return returnStr.toLowerCase();
}

//console.log(removeComma("this,,,,,,, Sh.,?/<>\!@#$%^&*()dn't have a, comma"))

function firstWord(word){
    let newStr = '';

    for(let i = 0; i < word.length; i++){
        if(i === 0){
            newStr += word[i].toUpperCase();
        } else {
            newStr += word[i];
        }
    }
}
