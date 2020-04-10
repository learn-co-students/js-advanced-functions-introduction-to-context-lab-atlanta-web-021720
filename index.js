function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(record, dateTime) {
    let timeArr = dateTime.split(" ")
    record.timeInEvents.push({type: "TimeIn", hour: parseInt(timeArr[1], 10), date: timeArr[0] })
    // console.log(`createTimeInEvent output: ${record}`)
    return record
}

function createTimeOutEvent(record, dateTime) {
    let timeArr = dateTime.split(" ")
    record.timeOutEvents.push({type: "TimeOut", hour: parseInt(timeArr[1], 10), date: timeArr[0] })
    // console.log(`createTimeOutEvent output: ${record}`)
    return record
}

function hoursWorkedOnDate(record, date) {
    let timeInHour;
    for (let i = 0; i < record.timeInEvents.length; i++) {
        if (record.timeInEvents[i].date === date) {
            timeInHour = record.timeInEvents[i].hour
        }
    }
    let timeOutHour;
    for (let i = 0; i < record.timeOutEvents.length; i++) {
        if (record.timeOutEvents[i].date === date) {
            timeOutHour = record.timeOutEvents[i].hour
        }
    }
    return (timeOutHour - timeInHour)/100
}

function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date);
    // console.log(`wagesEarnedOnDate output: hours ${hours} and record.payPerHour ${record.payPerHour}`)
    return (hours * record.payPerHour)
}

function allWagesFor(record) {
    let totalWage = 0;
    record.timeInEvents.forEach(eventObj => {
        let wage = wagesEarnedOnDate(record, eventObj.date)
        totalWage += wage
    })
    // console.log(`allWagesFor output: ${totalWage}`)
    return totalWage
}

function findEmployeeByFirstName(arr, fName) {
    arr.forEach(record => {
        if (record.firstName === fName) {
            // console.log(`findEmployeeByFirstName output: ${record}`)
            return record
        }
    })
}

function calculatePayroll(employeeArr) {
    let payroll = 0
    // console.log(employeeArr)
    employeeArr.forEach(record => {
        payroll += allWagesFor(record);
    })
    return payroll
}

