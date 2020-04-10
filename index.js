// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    let obj = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

function createEmployeeRecords(arrOfArr) {
    let newArr = [];
    arrOfArr.map(([firstName, familyName, title, payPerHour]) => {
        newArr.push(createEmployeeRecord([firstName, familyName, title, payPerHour]))
    })
    return newArr
}

function createTimeInEvent(obj, date) {
    let [day, time] = date.split(' ')
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: day
    }
    obj.timeInEvents.push(timeInObj)
    return obj
}

function createTimeOutEvent(obj, date) {
    let [day, time] = date.split(' ')
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: day
    }
    obj.timeOutEvents.push(timeOutObj)
    return obj
}

function hoursWorkedOnDate(obj, date) {
    let inTime = obj.timeInEvents.find(e => {
        return e.date === date
    })

    let outTime = obj.timeOutEvents.find(e => {
        return e.date === date
    })
    // console.log(inTime)
    // console.log(outTime)

    return (outTime.hour - inTime.hour) /100
}

function wagesEarnedOnDate(obj, date) {
    return (hoursWorkedOnDate(obj, date) * obj.payPerHour)
}

function allWagesFor(obj) {
    let total = 0
    obj.timeInEvents.forEach(tIn => {
        total += hoursWorkedOnDate(obj, tIn.date) * obj.payPerHour
    })
    return total
}

function findEmployeeByFirstName(arr, firstName) {
    return arr.find(el => {
        return el.firstName === firstName
    })
}

function calculatePayroll(arrOfRec) {
    let total = 0
    arrOfRec.forEach(rec => {
        total += allWagesFor(rec)
    })
    return total
}