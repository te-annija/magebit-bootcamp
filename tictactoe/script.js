
let blocks = document.querySelectorAll('.game__block'); 
let turn = 0; 
let isWon = false;

fetch('tictactoe-api.php?api-name=get-data', { 
        method: "GET", 
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        fillValues(data.data);
    })

function fillValues(data){ 
    turn = data.turns;
    for(let key in data.moves){
        blocks[key].textContent = data.moves[key]['symbol'];
    }
    checkWinner(blocks);
}


for(let i = 0; i< blocks.length; i+=1){
    blocks[i].onclick = function(event){
        isWon = checkWinner(blocks);
        if(blocks[i].textContent == '' && !isWon){

            userTurn(i);
            
            if(turn<9 && isWon==false){
                setTimeout(botTurn, 250)  
            } 
            isWon = checkWinner(blocks);
        }
        if(isWon){ 
            let winner = turn%2==0? 'O' : 'X';
            document.querySelector('.game__result').textContent = "The winner is "+  winner; 
        }           
    } 
}

function userTurn(index){ 
    if(turn%2==0){ 
        blocks[index].textContent = 'X';
        
        const data = {'id': index, 'symbol': 'X', 'turn': turn}; 
        saveMoveToFile(data);
        
        isWon = checkWinner(blocks);
    } 
    turn +=1;
}

function botTurn(){ 
    var isAlmostWon = checkAlmostWinner(blocks); 
    if(isAlmostWon!= -1){ 
        var x = isAlmostWon;
    }
    else{ 
        var x = Math.floor((Math.random() * 9)); 
        var content = blocks[x].textContent;
        while(content!=''){
            x = Math.floor((Math.random() * 9)); 
            content = blocks[x].textContent;
        }
    }
    
    blocks[x].textContent = 'O';
    turn+=1;
    
    const data = {'id': x, 'symbol': 'O', 'turn': turn}; 
    saveMoveToFile(data);

    isWon = checkWinner(blocks);
    if(isWon){ 
        let winner = turn%2==0? 'O' : 'X';
        document.querySelector('.game__result').textContent = "The winner is "+  winner; 
    }
}

function saveMoveToFile(data){ 
    fetch('tictactoe-api.php?api-name=add-data', { 
        method: "POST", 
        body: JSON.stringify(data),
    }).then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
}

document.querySelector('.game__reset_button').onclick = function(event){ 
    for(let i = 0; i< blocks.length; i+=1){
        blocks[i].textContent = ''; 
    }
    turn = 0;
    isWon = false;
    document.querySelector('.game__result').textContent = '';

    fetch('tictactoe-api.php?api-name=reset', { 
        method: "GET", 
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    
    for(let i=0; i<blocks.length; i+=1){ 
        blocks[i].classList.remove('game__winner_block');
    }
}

function checkWinner(arr){ 
    let winningPos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; 
    for(let i=0; i<winningPos.length; i+=1){ 
        if(arr[winningPos[i][0]].textContent==arr[winningPos[i][1]].textContent && arr[winningPos[i][1]].textContent==arr[winningPos[i][2]].textContent && arr[winningPos[i][0]].textContent!='') {
            arr[winningPos[i][0]].classList.add('game__winner_block');
            arr[winningPos[i][1]].classList.add('game__winner_block');
            arr[winningPos[i][2]].classList.add('game__winner_block');
            return true; 
        }
    }
    return false;
}

function checkAlmostWinner(arr){ 
    let winningPos = [
    [0, 1, 2], [1, 2, 0], [0, 2, 1],
    [3, 4, 5], [4, 5, 3], [3, 5, 4],
    [6, 7, 8], [7, 8, 6], [6, 8, 7],
    [0, 3, 6], [3, 6, 0], [0, 6, 3],
     [1, 4, 7], [4, 7, 1], [1, 7, 4], 
     [2, 5, 8], [5, 8, 2],  [2, 8, 5],
     [0, 4, 8], [4, 8, 0], [0, 8, 4],
     [2, 4, 6], [4, 6, 2], [2, 6, 4],]; 
     for(let i=0; i<winningPos.length; i+=1){ 
        if(arr[winningPos[i][0]].textContent==arr[winningPos[i][1]].textContent && arr[winningPos[i][0]].textContent!='' && arr[winningPos[i][2]].textContent == '') {
            return winningPos[i][2]; 
        } 
     }
     return -1;

     
}