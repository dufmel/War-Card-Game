let deckId = ''

fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
   
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    deckId = data.deck_id
    
  })
  .catch(err => {
    console.log(`error ${err}`)
  });

document.querySelector('#deal').addEventListener('click', drawTwo)

    let player1Score = 0
    let player2Score = 0

    
    function drawTwo(){
      const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
      fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.getElementById("player1").src=data.cards[0].image
        document.getElementById("player2").src=data.cards[1].image
        
        let player1Val = symbolToNumber( data.cards[0].value )
        let player2Val = symbolToNumber( data.cards[1].value )
        
        let remainingCards = data.remaining
    
    if((remainingCards === 0) && (player1Score > player2Score)){
      alert("Player 1 Wins!")
    }else if((remainingCards === 0) && (player1Score < player2Score)){
      alert("Player 2 Wins!")
    } else if(player1Val > player2Val){
      document.querySelector("h3").innerText="Player 1 Wins!";
      player1Score += 2
      document.getElementById("score1").textContent = `Score: ${player1Score}`
    }else if(player1Val < player2Val){
      document.querySelector("h3").innerText="Player 2 Wins!"
      player2Score += 2
      document.getElementById("score2").textContent = `Score: ${player2Score}`
    }else{
      document.querySelector("#deal").style.display = "none"
      document.querySelector("#war").style.display = "inline"
    }
  })
  .catch(err => {
    console.log(`error ${err}`)
  });
}


function symbolToNumber(val){
  if(val === "JACK"){
  return 11}
  else if( val === "QUEEN"){
    return 12
  }else if(val === "KING"){
    return 13
  }else if(val === "ACE"){
    return 14
  }else{
    return Number(val)
  }
}

document.getElementById("war").addEventListener("click", declareWar)

function declareWar(){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  
  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    document.getElementById("player1").src=data.cards[0].image
    document.getElementById("player2").src=data.cards[1].image

    let player1Val = data.cards[0].value
    let player2Val = data.cards[1].value

    
    if(player1Val > player2Val){
      document.querySelector("h3").innerText="Player 1 Wins!";
      player1Score += player2Score
      player2Score = 0
      document.getElementById("score1").textContent = `Score: ${player1Score}`
      document.getElementById("score2").textContent = `Score: ${player2Score}`
      document.getElementById("deal").style.display = "inline"
      document.getElementById("war").style.display ="none"
    }else if(player1Val < player2Val){
      document.querySelector("h3").innerText="Player 2 Wins!"
      player2Score += player1Score
      player1Score = 0
      document.querySelector("h3").style.display = "none"
      document.getElementById("score1").textContent = `Score: ${player1Score}`
      document.getElementById("score2").textContent = `Score: ${player2Score}`
      document.getElementById("deal").style.display = "inline"
      document.getElementById("war").style.display ="none"
    }else{
      document.querySelector("h3").innerText = "Declare War Again!"
    }
  })
  .catch(err => {
    console.log(`error ${err}`)
  });
}

