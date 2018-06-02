let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds)
{
    clearInterval(countdown);

    const now = Date.now();
    then = now +  seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(() =>
    {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // Check if we should stop the timer
        if(secondsLeft < 0)
        {
            clearInterval(countdown);
            return;
        }

        // Display the timer
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds)
{
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp)
{
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${(hour-12) < 10 ? '0' : ''}${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer()
{
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e)
{
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});