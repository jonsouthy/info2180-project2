"use strict";

(function ready(){

  window.addEventListener("load", pageload); //When the page is loaded execute pageload function

  var empty_row = 3; 
  var empty_col = 3;
  var size = 100;
  var rxc = 4;



    function pageload(){   
        createPuzzle(); 
    }

    function createPuzzle(){  //Function to create the puzzle
          var puzzleArea = document.getElementById("puzzlearea"); //Defines the puzzle area
          var child = puzzleArea.children; //Defines the tiles in the puzzle area
          document.getElementById("shufflebutton").onclick = shufflePuzzle; //Shuflles the puzzle when the shuffle button is clicked
          var i = 0; //counter 
          var y=0;
          var x=0;
          for(y = 0; y < rxc; y++){ //For loop that executes until the number of rows and columns have been visited
            for(x =0; x < rxc; x++){
              child[i].classList.add("puzzlepiece");//Adds the puzzlepiece class to each tile
              child[i].style.left = size * x + "px";//Sets the position of the tiles starting with the first tile(top left) 
              child[i].style.top = size * y + "px";//Sets the position of the tiles starting with the first tile(top left) 
              child[i].setAttribute("id", "xy(" + x + "," + y + ")");//Sets the id attribute
              child[i].style.backgroundPosition = (0 - size * x) + "px" + " " + (0 - size * y) + "px";//Positions the background
              child[i].onclick = arrange;//Function call to move the tiles when clicked
              $(child[i]).on("mouseover", function(){ //Function to highlight tile when mouse is hovered over it
                if(possattempt(this)){ $(this).addClass("movablepiece"); }
              });
              i++;         
            }
          }
      }
      
    function arrange(){//Helper function to move tiles when clicked
        movechild(this);
        attempt++;
      }      

    function possattempt(child){//Function to see if the tiles are movable
        var extras = getextras();
        if(extras.indexOf(child.getAttribute("id")) != -1){
          return true;
        }else{
          return false;
        }
    }
    
    function getextras(){
        var up = "xy(" + empty_row + "," + (empty_col-1) + ")";
        var down = "xy(" + empty_row + "," + (empty_col+1) + ")";
        var right = "xy(" + (empty_row-1) + "," + empty_col + ")";
        var left = "xy(" + (empty_row+1) + "," + empty_col + ")";

        var extras = [up, down, left, right];
        var pmc= [];

        for(var i = 0; i < extras.length; i++){
          if(document.getElementById(extras[i]) != null){
            pmc.push(extras[i]);
          }
        }
        return pmc;
      }


    function movechild(child){//Function to move tiles 
          var holderA = empty_col;
          var holderB = empty_row;
          if(possattempt(child)){
            empty_row = parseInt(child.style.left)/size;
            empty_col = parseInt(child.style.top)/size;
     
            child.style.left = (holderB * size) + "px";
            child.style.top = (holderA * size) + "px";
            child.setAttribute("id", "xy(" + holderB + "," + holderA + ")");

          }
          
    }

    function shufflePuzzle(){//Function to shuffle tiles
        for (var i = 0; i < 1500; i++) { 
          var extras = getextras();
          var generator = parseInt(Math.random() * extras.length); //Generates a random number
          var child = document.getElementById(extras[generator]);
          movechild(child);
        }
    }


})();