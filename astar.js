let rows = 25
let cols = 25
let grid = new Array(cols);
let w;
let h;
let path = [];
let current;

let openSet = [];
let closedSet = [];
let start;
let end;

// function to remove an element from an array
function removeNode(arr, ele){
    for(var i= arr.length - 1; i >=0 ; i--){
        if (arr[i] == ele){
            arr.splice(i,1);
        }    
    }
}


// h(n) - heuristic function
function heuristic(a, b){
    //var d = dist(a.i, a.j, b.i, b.j);
    var d = abs(a.i - b.i) + abs (a.j - b.j); // manhattan distance
    return d;
}

class node {
    constructor() {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.i = 0;
        this.j = 0;
        this.nbrs = [];
        this.previous = undefined;
    }

    //give location to the node
    loc(i,j){
        this.i = i;
        this.j = j;
    }
    
    //show the node
    show(clr){
        fill(clr);
        noStroke();
        rect(this.i * w, this.j * h, w-1, h-1);
    }

    addNbrs(grid){
        let i = this.i;
        let j = this.j;
        
        if(j<rows-1){
            this.nbrs.push(grid[i][j+1]);
        }
        if(j > 0){
            this.nbrs.push(grid[i][j-1]);
        }
        if(i > 0){
            this.nbrs.push(grid[i-1][j]);
        }
        
        if(i<cols-1){
            this.nbrs.push(grid[i+1][j]);
        }    
               
    }
}

function setup(){
    createCanvas(400,400);

    w = width / cols;
    h = height / rows;

    // Making a 2d array
    for(let i=0; i<cols; i++){
        grid[i] = new Array(rows);
    }
     
    // Each index in the grid is a node
    for(let i=0; i<cols; i++){
        for (var j=0; j<rows; j++){
            grid[i][j] = new node(); 
            grid[i][j].loc(i,j);
        }
    }

    // Defining the neighborhood of each node (4 nodes)
    for(let i=0; i<cols; i++){
        for (var j=0; j<rows; j++){
            grid[i][j].addNbrs(grid);
        }
    }

    // Start and end points
    start = grid[0][0];
    end = grid[cols-1][rows-1];
    openSet.push(start);
    
}

function draw(){
    background(220);

    
    if (openSet.length > 0){
        
        let lowestIndex = 0;
        for(let i=0; i<openSet.length;i++){
            if(openSet[i].f < openSet[lowestIndex]){
                lowestIndex = i;
            }
        }

        let current = openSet[lowestIndex];
        if (current === end){
            path = [];
            let temp = current;
            path.push(temp); 
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous;
            }  

            console.log("Done!");
            noLoop();
        }
        
        // Calculating path at each iteration
        path = [];
        let temp = current;
        path.push(temp); 
        while(temp.previous){
            path.push(temp.previous);
            temp = temp.previous;
        } 
          
        //openSet.remove(current);
        removeNode(openSet, current);
        closedSet.push(current);        
        
        // Defining values for neighbours of the current node
        let currNbrs = current.nbrs;
        for(let i=0;i <currNbrs.length;i++){
            let nbr = currNbrs[i];

            if(!closedSet.includes(nbr)){
                
                let tempG = current.g + 1;
                if(openSet.includes(nbr)){
                    if(tempG < nbr.g){
                        nbr.g = tempG;
                    }
                }
                else{
                    nbr.g = tempG;
                    openSet.push(nbr);
                }

                nbr.h = heuristic(nbr, end);
                nbr.f = nbr.h + nbr.g;
                nbr.previous =  current;
            }
        }        
    }
    else {  
        // stop A star
    } 

    // Initialize grid
    for(let i=0; i<cols; i++){
        for (var j=0; j<rows; j++){
            grid[i][j].show(color(255)); 
        }
    } 

    // Iterate and color open and closed set
    for (let i=0; i<closedSet.length;i++){
        closedSet[i].show(color(255,0,0));
    }
    for (let i=0; i<openSet.length;i++){
        openSet[i].show(color(0,255,0));
    }    
    for (let i=0; i<path.length;i++){
        path[i].show(color(0,0,255));
    }
   
 
} 