const daysElement = document.querySelector(".days");
const hoursElement = document.querySelector(".hours");
const minutesElement = document.querySelector(".minutes");
const secondsElement = document.querySelector(".seconds");
const heading = document.querySelector("h1");
const counterTimer = document.querySelector(".counterTimer");

const second = 1000,
    minute = 60 * second,
    hour = 60 * minute,
    day = 24 * hour;

const getValidInput = (value,min,max)=>{
    let input;
    do{
        input = prompt(`Enter ${value}`);
        if(!input || isNaN(input) || input<min || input>max){
            alert(`Invalid ${value}, Please Enter a valid ${value} between ${min} and ${max}`);
        }
    }while(!input || isNaN(input) || input<min || input>max);
    return String(input).padStart(2,"0");
}

const timerFunction = () => {
    let now = new Date(),
    dd = String(now.getDate()).padStart(2,"0"),
    mm = String(now.getMonth()+1).padStart(2,"0"),
    yyyy = now.getFullYear();
    
    const enteredDay = getValidInput("Date",1,31);
    const enteredMonth = getValidInput("Month",1,12);

    now = `${mm}/${dd}/${yyyy}`;
    let targetDate = `${enteredMonth}/${enteredDay}/${yyyy}`;

    if(now > targetDate){
        targetDate = `${enteredMonth}/${enteredDay}/${yyyy+1}`;
    }
    const intervalId = setInterval(() => {
        const timer = new Date(targetDate).getTime();
        const today = new Date().getTime();
        const difference = timer - today;
        const leftDay = Math.floor(difference / day);
        const leftHour = Math.floor((difference % day) / hour);
        const leftMinute = Math.floor((difference % hour) / minute);
        const leftSecond = Math.floor((difference % minute) / second);
        daysElement.innerText = leftDay;
        hoursElement.innerText = leftHour;
        minutesElement.innerText = leftMinute;
        secondsElement.innerText = leftSecond;

        if(difference<0){
            counterTimer.style.display = "none";
            heading.innerText = "and the wait is over !!";
            clearInterval(intervalId);
        }
    },0);

};
timerFunction();