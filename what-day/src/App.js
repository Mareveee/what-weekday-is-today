import React, { Component } from 'react'
import './App.css'

class Day { //class of Day.
  constructor(date, month,year) { //constructor.
    this.date = date; //set date = date
    this.month = month; //set month = month
    this.year = year; //set year = year
  }
  getday(){
    let k = this.date //k is the day of the month.
    let m = this.month-2 //m is the month number. (March is 1, April is 2, and so on to February)
    let y = this.year //y is the year number.
    if(m<=0) {  // m=January or m=Febuary
      y=y-1 // January and February are always counted as the 11th and 12th months of the previous year
      if(m===0){
        m = 12 //m=Febuary.
      }
      else{
        m=11 //# m=January.
      }
    }
    let D = Number(String(y).slice(2,4)) //D is the last two digits of the year.
    let C = Number(String(y).slice(0,2)) //it's the first two digits of the year.
    let f = k+Math.floor(((13*m-1)/5))+D+Math.floor((D/4))+Math.floor((C/4))-2*C //Zeller's Rule formula
    if(f > 0){ //if f is positive number
      f = f%7
    }
    else{ //condition f is negative number
      f = Math.ceil(Math.abs(f)/7)*7 - Math.abs(f)
    }
    return f //return result
  }
  checkleapyear(){ //function check leap year.
    let year
    if(this.year%4 === 0){ //If The year can be evenly divided by 4
      if(this.year%100 === 0){ //If the year can be evenly divided by 100
        if(this.year%400 === 0){ //If The year is also evenly divisible by 400. Then it is a leap year.
          year = 'Leap year'
        }
        else{ //If the year can't be evenly divided by 400, it's a NOT leap year
          year = 'NOT a Leap year'
        }
      }
      else{ //If the year can't be evenly divided by 100, it's a leap year
        year = 'Leap year'
      }
    }
    else{ //The year can't be evenly divided by 4 it's a NOT leap year
      year = 'NOT a Leap year'
    }
    return year //return result
  }
}

class App extends Component {

  constructor() {
    super();

    this.state = {
      showResult: false,
      list_day:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      list_month:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
    };

    this.ShowResult = this.ShowResult.bind(this);
  }

  ShowResult(){
    this.setState({showResult:true})
  } 

  render() {
    let result = null
    if(this.state.showResult){ //onclick button show
      var date = Number(document.getElementById("date").value); //getelementbyid id = "date" and convert to number
      var month = Number(document.getElementById("month").value); //getelementbyid id = "month" convert to number
      var year = document.getElementById("year").value; //getelementbyid id = "year" convert to number
      if(date > 0 && date < 32 && month > 0 && month < 13 && year.length === 4){ //รือฟสรก input (date or month or year)  
        if(date === 31 && (month === 4 || month === 6 || month === 9 || month === 11) ){ //invalid input (month=4,6,9,12 have 30 days)
          result = alert('invalid input')
        }
        else{ 
          const day = new Day(date,month,year) //create object Day
          if(month === 2 && (date > 28)){
            if(date >= 30){
              result = alert('invalid input') //invalid input (Fabuary,no 30th day , 31th day)
            }
            else{
              if(day.checkleapyear() === 'Leap year'){ //not a leap year (February, have 29th day)
                result =  <div className="Card"><p>{date} / {this.state.list_month[month-1]} / {year} is a {this.state.list_day[day.getday()]} {/*find day*/} <br/> {day.checkleapyear()}</p></div> //display result
              }
              else if(day.checkleapyear() === 'NOT a Leap year'){ //not a leap year (February, no 29th day)
                result =  alert('February, no 29th day')
              }
            }
          }
          else{
            result = <div className="Card"><p>{date} / {this.state.list_month[month-1]} / {year} is a {this.state.list_day[day.getday()]} {/*find day*/} <br/> {day.checkleapyear()}</p></div> //display result
          }
          
        }
      }
      else{ //input date or month or year invalid
        result = alert('invalid input')
      }
      
    }
    return (
        <div className="App-header">
        <h3>What Day Is It?</h3>
        <div className="Date">
          <p>Date : </p>
          <input className="Search" type="text" placeholder="dd" id="date" onChange={()=>this.setState({showResult:false})}></input>
          <p>Month : </p>
          <input className="Search" type="text" placeholder="mm" id="month" onChange={()=>this.setState({showResult:false})}></input>
          <p>Year : </p>
          <input className="Search" type="text" placeholder="yyyy" id="year" onChange={()=>this.setState({showResult:false})}></input>
          <button className="butt" onClick={this.ShowResult}>show</button>
        </div>
      {result}
    </div>
    )
  }
}

export default App
