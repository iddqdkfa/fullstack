
const dummy = (blogs) => {
   return 1;   
  }

  const summation = (blogs) => {

    let sum = 0;
   for(let i = 0; i < blogs.length; i++){
       sum = sum + blogs[i].likes;
   }

   return sum;

  }

  const maximum = (blogs) => {
    let max = blogs[0];

    if(blogs.length == 0){
       return null
    } 
    
   for(let i = 0; i < blogs.length; i++){

    if(blogs[i].likes > max.likes)
       max = blogs[i];
   }

   return max;

  }


  const mostBlogs = (blogs) => {

    if(blogs.length == 0){
      return null
   } 

   let myObj = {};
   
  for(let i = 0; i < blogs.length; i++){
    let temp = myObj[blogs[i].author]
    if(myObj[blogs[i].author]){
      myObj[blogs[i].author] = myObj[blogs[i].author] +1;
    }
    else {
      myObj[blogs[i].author] = 1;
    }
  }


  
let max = 0;

for ( let key in myObj){
  if(myObj[key] > max){
    max = myObj[key]
  }
} 


for ( let key in myObj){
  if(myObj[key] == max){
   return {"author": key,  "blogs": max};
  }
} 


  }



  const mostLikes = (blogs) => {

    if(blogs.length == 0){
      return null
   } 

   let myObj = {};
   
  for(let i = 0; i < blogs.length; i++){
    let temp = myObj[blogs[i].author]
    if(myObj[blogs[i].author]){
      myObj[blogs[i].author] = myObj[blogs[i].author] +blogs[i].likes;
    }
    else {
      myObj[blogs[i].author] = blogs[i].likes;
    }
  }


  console.log("my obj is", myObj)
let max = 0;
console.log("Max is", max);

for ( let key in myObj){
  console.log("Key is", key);
  if(myObj[key] > max){
    max = myObj[key]
  }
} 


for ( let key in myObj){
  if(myObj[key] == max){
   return {"author": key,  "likes": max};
  }
} 


  }
  
  module.exports = {
    dummy,
    summation,
    maximum,
    mostBlogs,
    mostLikes
  }