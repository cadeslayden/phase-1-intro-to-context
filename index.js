function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(employeeArrayData){
    return employeeArrayData.map(function(array){
        return createEmployeeRecord(array)
    })
}
function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}
function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}
function hoursWorkedOnDate(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}
function wagesEarnedOnDate(employee, soughtDate){
    let calculatedWage = hoursWorkedOnDate(employee, soughtDate)
    * employee.payPerHour
    return parseFloat(calculatedWage.toString())
}
function allWagesFor(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}
function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}
function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
