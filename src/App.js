
import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
export default function App() {

  const[dice, setDice] = React.useState(allNewDice())
  const[tenzies , setTenzies] = React.useState(false)
  React.useEffect(() => {
    const allHeld = dice.every(prevDice => prevDice.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(prevDice => prevDice.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
  }, [dice])

   function generateNewDie(){
    return {
      value: Math.ceil(Math.random()*6),
        isHeld:false,
        id:nanoid()
    }
   }

    function allNewDice(){
      const newDice =[]
      for(let i=0;i<10;i++){
       newDice.push(generateNewDie())
      }
      return newDice
    }
    function rollDice(){
      if(!tenzies) {
        setDice(oldDice => oldDice.map(prevDice => {
            return prevDice.isHeld ? 
                prevDice :
                generateNewDie()
        }))
    } else {
        setTenzies(false)
        setDice(allNewDice())
    }
   }
    const diceElement = dice.map(prevDice => <Die 
      key={prevDice.id}
      value={prevDice.value}
      isHeld={prevDice.isHeld}
      holdDice={() => holdDice(prevDice.id)}
      />)

    function holdDice(id){
      setDice(oldDice => oldDice.map(prevDice => {
         return prevDice.id === id ?
        {...prevDice, isHeld : !prevDice.isHeld} :
        prevDice
      }))
    }
return(
    <main>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElement}
        </div>
        <button className='roll-dice'onClick={rollDice} > 
        {tenzies ? "New Game" : "Roll"}
</button>
    </main>
  );
}


