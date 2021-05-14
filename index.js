function createEmployeeRecord(array){
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents:[],
        timeOutEvents: []
    }
    return employee
}

function  createEmployeeRecords(array){
    return array.map(record => {
        return  createEmployeeRecord(record)
    })
}

function createTimeInEvent(employee,dateStamp){
    let [date,hour] = dateStamp.split(' ')
    let time = parseInt(hour,10)
    employee.timeInEvents.push({
        type:'TimeIn',
        hour: time,
        date: date
    })
    return employee
}

function createTimeOutEvent(employee,dateStamp){
    let [date,hour] = dateStamp.split(' ')
    let time = parseInt(hour,10)
    employee.timeOutEvents.push({
        type:'TimeOut',
        hour: time,
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee,dateStamp){
   const timeIn =  employee.timeInEvents.find(record => {
         return record.date === dateStamp
    })
    const timeOut = employee.timeOutEvents.find(record =>{
        return  record.date === dateStamp
    })
    const clockedIn = timeIn.hour / 100
    const clockedOut = timeOut.hour / 100
    return  clockedOut - clockedIn 
}

function wagesEarnedOnDate(employee,dateStamp){
    const hours = hoursWorkedOnDate(employee,dateStamp)
    return hours * employee.payPerHour
}

function allWagesFor(employee){
    const dates = employee.timeInEvents.map(days =>{
        return days.date
    })
    const wages = dates.reduce((acc,value) => {
       return  acc + wagesEarnedOnDate(employee,value)
    },0)
    return wages
}

function findEmployeeByFirstName(employees,name){
    const employee = employees.find(worker => {
        return worker.firstName === name
    })
    return employee
}

function calculatePayroll(employees){
    const totalPayroll = employees.reduce((acc,value) => {
        return acc + allWagesFor(value)
    },0)
    return totalPayroll
}

