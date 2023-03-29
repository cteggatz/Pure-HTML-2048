
class Tile{
    constructor(address, power){
        this.address = address;
        this.power = power;
        this.annimated = true;
        this.motion = 0;

        const text = document.createElement('p');
        text.append(document.createTextNode(power));
        address.appendChild(text);

        this.update(power);
    }

    colorDict = {
        0 : "#FEFCEC",
        1 : "#F1D8BC",
        2 : "#EAC49A",
        3 : "#E3B178",
        4 : "#DC9D56",
        5 : "#D58A34",
        6 : "#D77F33",
        7 : "#CC7528",
        8 : "#BB6B25",
        9 : "#884E1B",
        10 : "#663A14",
        11 : "#44270D",
        12 : "#110A03",

    }
    update(power){
        this.address.style.backgroundColor = this.colorDict[power];
        this.address.children[0].innerHTML = Math.pow(2,power);
        if(power == 0){
            this.address.children[0].style.color = "#FEFAE0";
        } else {
            this.address.children[0].style.color = "black";
        }
        
        
        if(!this.annimated && this.motion == 0){//spawning animation
            this.address.style.animationName = "spawnAnimation";
            this.address.style.animationDuration = "0.25s";
            this.annimated = true
        } else if(!this.annimated && this.motion == 1){//moving up animation
            this.address.style.animationName = "moveUp";
            this.address.style.animationDuration = "0.175s";

            this.motion = 0;
            this.annimated = true;
        } else {
            this.address.style.animationName = "";
            this.address.style.animationDuration = "0s";
        }

        //movement animation 


        this.power = power;
    }
    spawn(power){
        this.annimated = false;
        this.update(power);
    }
    move(power, dir){
        this.annimated = false;
        this.motion = dir;
        this.update(power);
    }
}


//this array is in collumn - row order
let gameArray = new Array();
for(let j = 1; j<=4; j++){
    let col = new Array();
    const element = document.getElementById("row" + j);
    for(let i = 0; i < 4; i++){
        const tile = document.createElement("div");
        tile.className = "tile";
        
        element.appendChild(tile);

        col.push(new Tile(tile, 0));
    }
    gameArray.push(col);
}

//starts game by spawning two squares
gameArray[Math.floor(Math.random()*4)][Math.floor(Math.random()*4)].spawn(1)

do{
    let x = Math.floor(Math.random()*4);
    let y = Math.floor(Math.random()*4);
    
    if(gameArray[x][y].power == 0){
        gameArray[x][y].spawn(1);
        break;
    }
}while(true);



function playGame(dir){
    switch(dir){
        case 1: //w  | checks from bottem down
            for(let i = 0; i < 4 ; i++){ //goes through all of the rows
                for(let j = 3; j >=0; j--){
                    let tile = gameArray[j][i];
                    if(tile.power == 0 || i == 0){
                        continue;
                    }
                    for(let k = i-1; k >= 0; k--){
                        if(gameArray[j][k].power == gameArray[j][k+1].power){
                            gameArray[j][k].move(gameArray[j][k].power+1,1);
                            gameArray[j][k+1].update(0);
                        } 
                        else if(gameArray[j][k].power != gameArray[j][k+1].power && gameArray[j][k].power != 0){
                            //console.log("placing @ " + j + " " + (k+1))
                            gameArray[j][k+1].move(gameArray[j][k+1].power,1);
                            //gameArray[j][i].update(0);
                            break;
                        } else{
                            //console.log("placing @ " + j + " " + (k))
                            gameArray[j][k].move(gameArray[j][k+1].power,1);
                            
                            gameArray[j][k+1].update(0);
                        } 
                    }
                }
            }
            break;
        case 2:
            for(let i = 3; i >= 0 ; i--){ //goes through all of the rows
                for(let j = 3; j >=0; j--){
                    let tile = gameArray[j][i];
                    if(tile.power == 0){
                        continue;
                    }

                    if(i == 3 ) { continue}
                    //console.log(j + "|" + i)
                    
                    for(let k = i+1; k <4; k++){
                        //console.log("tile in front " + j + " | " + k)
                        if(gameArray[j][k].power == gameArray[j][k-1].power){
                            gameArray[j][k].update(gameArray[j][k].power+1);
                            gameArray[j][k-1].update(0);
                        } 
                        else if(gameArray[j][k].power != gameArray[j][k-1].power && gameArray[j][k].power != 0){
                            //console.log("placing @ " + j + " " + (k+1))
                            gameArray[j][k-1].update(gameArray[j][k-1].power);
                            //gameArray[j][i].update(0);
                            break;
                        } else{
                            //console.log("placing @ " + j + " " + (k))
                            gameArray[j][k].update(gameArray[j][k-1].power);
                            
                            gameArray[j][k-1].update(0);
                        } 
                    }
                }
            }
            break;
        case 3: //a
            for(let i = 0; i < 4; i++){
                for(let j = 0; j < 4; j++){
                    let tile = gameArray[j][i];
                    if(tile.power == 0 || j == 0) continue;
                    
                    for(let k = j-1; k >= 0; k--){
                        if(gameArray[k][i].power == gameArray[k+1][i].power){
                            gameArray[k][i].move(gameArray[k+1][i].power+1);
                            gameArray[k+1][i].update(0);
                        } else if(gameArray[k][i].power != gameArray[k+1][i].power && gameArray[k][i].power != 0){
                            gameArray[k+1][i].update(gameArray[k+1][i].power);
                            break;
                        } else {
                            gameArray[k][i].update(gameArray[k+1][i].power);
                            gameArray[k+1][i].update(0);
                        }
                    }
                }
            }
            break;
        case 4: //d
            for(let i = 0; i < 4; i++){
                for(let j = 3; j >= 0; j--){
                    let tile = gameArray[j][i];
                    if(tile.power == 0 || j == 3) continue;
                    
                    for(let k = j+1; k < 4; k++){
                        if(gameArray[k][i].power == gameArray[k-1][i].power){
                            gameArray[k][i].update(gameArray[k-1][i].power+1);
                            gameArray[k-1][i].update(0);
                        } else if(gameArray[k][i].power != gameArray[k-1][i].power && gameArray[k][i].power != 0){
                            gameArray[k-1][i].update(gameArray[k-1][i].power);
                            break;
                        } else {
                            gameArray[k][i].update(gameArray[k-1][i].power);
                            gameArray[k-1][i].update(0);
                        }
                    }
                }
            }
            break;
    }

    //checks if you lost
    let emptySpaces = 0;
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(gameArray[i][j].power != 0) emptySpaces++;
        }
    }
    if(emptySpaces == 16){
        alert("you lost");
        return;
    }

    //checks if you win
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(gameArray[i][j].power == 12){
                alert("you Win!!!!");
                
            }
        }
    }

    //spawns in a new tile
    do{
        let x = Math.floor(Math.random()*4);
        let y = Math.floor(Math.random()*4);
        
        if(gameArray[x][y].power == 0){
            gameArray[x][y].spawn(1);
            break;
        }
    }while(true);
    
}


document.addEventListener("keydown", (e) => {
    if(e.key == "w")playGame(1);
    if(e.key == "s")playGame(2);
    if(e.key == "a")playGame(3);
    if(e.key == "d")playGame(4);
})
