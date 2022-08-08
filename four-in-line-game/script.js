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
    
    turn = 0; 
}

function checkWinner(){ 
    let counter = 0; 
    let lastLeftIndex; 
    let id; 
    //horizontally
    //bacw
    const winLine = [-1, 1]; 

    for (let i = 0; i < winLine.length; i++) {
        counter = 0; 
        
        for(let j=0; j<4; j++){
            id = curr_index+counter; 
            if(board.childNodes.item(id).textContent==symbol){ 
                counter+= winLine[i];
            }
        } 
        
    }
        
    


    
    
    return false;
}


