const board = document.querySelector('.game__container'); 
const reset_btn = document.querySelector('.game__reset_button');
var isWon = false;

var turn = 0;
var symbol;  
var curr_index; 

for (let index = 0; index < 100; index++) {
    let cell = document.createElement('div');
    cell.classList.add('game__block');
    board.appendChild(cell);
}



board.onclick = function(event){
    if(event.target.nameTag == 'DIV') return;
    if(event.target.textContent != '') return;
    if(isWon) return;

    symbol = turn%2==0 ? 'X' : 'O'; 

    curr_index = Array.from(board.childNodes).indexOf(event.target);
    
    if(!(curr_index > 90 || board.childNodes.item(curr_index+10).textContent!='')) return;
    
    
    event.target.textContent = symbol;
    turn++;

    isWon = checkWinner(); 
    if(isWon){ 
        document.querySelector('.game__result').textContent = "The winner is "+  symbol; 
    }
    
}

reset_btn.onclick = function(event){ 

    board.childNodes.forEach(cell => {
        cell.textContent = '';
    });
    isWon = false;
    turn = 0; 
    document.querySelector('.game__result').textContent = '';
}

function checkWinner(){ 
    let counter = 0; 
    let id; 
    let winningStepCount = 0; 

    const winLine = [[-1, 1], [-11, 11], [-9, 9], [10]];  //horiz, left diagon, right diagon, vertic

    for (let i = 0; i < winLine.length; i++) {
        winningStepCount = 0; 

        for(let k = 0; k< winLine[i].length; k++){ 
            counter = 0; 
            id = curr_index; 

            for(let j=0; j<3; j++){
                id+= winLine[i][k];
                if(id%10==1) break;
                if(getContentById(id) == symbol){ 
                    winningStepCount++;
                }
                else{ 
                    break;
                }
            } 
        }

        if(winningStepCount >=3) return true;
        
    }
    return false;
}

function getContentById(id){ 
    if(id > 100 || id < 1) return ''; 
    return board.childNodes.item(id).textContent; 
}


