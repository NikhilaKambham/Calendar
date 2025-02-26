import React, { useState } from 'react'
import './App.css'

const date1 = new Date()

export default function App() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const[currDate, setCurrDate] = useState(date1)

  const currentDay  = days[currDate.getDay()];
  const currentDate = currDate.getDate()
  const currentMonth = months[currDate.getMonth()]
  const currentYear = currDate.getFullYear()

  const tableColumns = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const noOfDays = [31,28,31,30,31,30,31,31,30,31,30,31]
  
  const beginning = new Date(currDate.getFullYear(), currDate.getMonth(), 1)
  const firstDay = beginning.getDay()
  const totalNoOfDays = noOfDays[currDate.getMonth()]

  const tableRows = []
  const firsRow = []

  let index = 0
  let counter = 1;

  while(index < 7) {
    if(index < firstDay) {
      firsRow.push("")
    }
    else {
      firsRow.push(Math.abs(firstDay - index) + 1)
      counter = counter + 1;
    } 
    index = index + 1
  }

  tableRows.push(firsRow)

  while(counter <= totalNoOfDays) {
    let week = 1;
    let row = []
    while(week <= 7 && counter <= totalNoOfDays) {
      row.push(counter)
      counter = counter + 1
      week = week + 1
    }
    tableRows.push(row)
  } 

  function changeToPreviousMonth() {
    setCurrDate(new Date(currDate.setMonth(currDate.getMonth() - 1)))
  }

  function changeToNextMonth() {
    setCurrDate(new Date(currDate.setMonth(currDate.getMonth() + 1)))
  }

    return (
      <div className='display'>
      <div className='mainDay'>
        <label className='mainDay-Day'>{currentDay}</label>
        <label className='mainDay-Date'>{currentDate}</label>
      </div>
      <div className='month'>
        <div className='header'>
          <button className='previousButton' onClick={changeToPreviousMonth}>{"<"}</button>
          <label className='currentMonth'>{currentMonth}</label>
          <label className='currentYear'>{currentYear}</label>
          <button className='nextButton' onClick={changeToNextMonth}>{">"}</button>
        </div>
        <table>
          <thead>
            <tr>
            { tableColumns.map( (item, i) => <th key={i}>{item}</th>)}
            </tr>          
          </thead>
          <tbody>  
            { tableRows.map((row, rowIndex) =>  
            <tr key={rowIndex}>
            { row.map( (item, i) => <td key={i} className= {item === currentDate ? 'highlight' : ''}> {item}</td> )}
            </tr>
            )}
          </tbody>
          </table>
      </div>
      </div>
    )
}
