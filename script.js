function updateDateTime() {

  var now = new Date();

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  var dayNames = days[now.getDay()]
  var time = now.getDate()
  var monthNames = months[now.getMonth()]
  var year = now.getFullYear()
  var datestring = ` ${dayNames} ${time} ${monthNames} ${year} `
  document.getElementById('date').textContent = datestring



  var now = new Date()
  var hours = now.getHours()
  var min = now.getMinutes()
  var sec = now.getSeconds()
  if (hours >= 5 && hours < 12) {
    var timestring = `${hours} : ${min} : ${sec} <br> <span style="color: blue;">Good Morning</span> `

  }
  else if (hours >= 12 && hours < 17) {
    var timestring = `${hours} : ${min} : ${sec} <br> <span style="color: blue;">Good Afternoon</span> `

  }
  else if (hours >= 17 && hours < 21) {
    var timestring = `${hours} : ${min} : ${sec} <br> <span style="color: blue;">Good Evening</span> `

  }
  else {
    timestring = `${hours} : ${min} : ${sec} <br> <span style="color: blue;">Good Night</span> `;

  }
  document.getElementById('time').innerHTML = timestring
}

setInterval(updateDateTime, 1000);

updateDateTime();



function calculateAge() {
  var dob = document.getElementById('dob').value;
  if (!dob) return document.getElementById('ageResult').innerText
  var birthDate = new Date(dob);
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  if (today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    age--;
  }
  document.getElementById('ageResult').innerText = `Your age is: ${age} years.`;
}
calculateAge()




function countdown() {
  const input = document.getElementById('dates').value;

  console.log("Input value:", input);

  if (!input) {
    document.getElementById('come').textContent = "⛔ Please select a valid date!";
    return;
  }

  const targetDate = new Date(input + "T00:00:00");
  const now = new Date();

  const msDiff = targetDate - now;



  if (msDiff <= 0) {
    document.getElementById('come').textContent = "🎉 The selected date has already passed!";
    return;
  }

  const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((msDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((msDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((msDiff % (1000 * 60)) / 1000);

  const formattedDate = targetDate.toDateString();

  document.getElementById('come').textContent = `🕒${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left until ${formattedDate}.`;
  setInterval(countdown, 1000);
}




function weekend() {
  var input = document.getElementById('weekends').value;
  if (!input) return document.getElementById('weekends').textContent = 'Please enter a date.';
  var date = new Date(input);
  var day = date.getDay();
  let formattedDate = date.toDateString();

  if (day == 0 || day == 6) {
    var msg = `✅ ${formattedDate} is a Weekend!`
  }
  else {
    var msg = `📅 ${formattedDate} is not a Weekend!`
  }

  document.getElementById('weekendResult').textContent = msg;
}





function countFriday() {
  var month = parseInt(document.getElementById('month').value);
  var year = parseInt(document.getElementById('year').value);
  if (!year || year < 0) return document.getElementById('fridays').innerText = "Please enter a valid year.";
  let count = 0;
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    var day = new Date(year, month, i);
    if (day.getDay() === 5) count++;
  }
  var monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
  document.getElementById('fridays').innerText = `There are ${count} Fridays in ${monthName} ${year}.`;
}




function leapYear() {
  var year = parseInt(document.getElementById('leap').value);
  if(year % 4 === 0 || year % 400 === 0 ) {
document.getElementById('yes').textContent = `It is a leap year.`
  }
  else{
    document.getElementById('yes').textContent = 'It is not a leap year.'
  }
}



// birthday remiander




var birthdayInputDiv = document.getElementById('birthdayInput');
var birthdayDateInput = document.getElementById('birthdayDate');
var countdownDiv = document.getElementById('countdown');
var messageDiv = document.getElementById('message');

function loadBirthday() {
  var savedBirthday = localStorage.getItem('birthday');
  if (savedBirthday) {
    birthdayInputDiv.style.display = 'none';
    startCountdown(new Date(savedBirthday));
  }
}

function saveBirthday() {
  var birthdayStr = birthdayDateInput.value;
  if (!birthdayStr) {
    alert("Please select your birthday first!");
    return;
  }
  var bday = new Date(birthdayStr);
  var month = bday.getMonth();
  var day = bday.getDate();


  var storedDate = new Date(2000, month, day).toISOString();
  localStorage.setItem('birthday', storedDate);

  birthdayInputDiv.style.display = 'none';
  startCountdown(new Date(storedDate));
}

function getNextBirthdayDate(birthday) {
  const now = new Date();
  let nextBirthday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());

  if (nextBirthday < now) {
    nextBirthday = new Date(now.getFullYear() + 1, birthday.getMonth(), birthday.getDate());
  }
  return nextBirthday;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function startCountdown(birthday) {
  function update() {
    var now = new Date();
    var nextBirthday = getNextBirthdayDate(birthday);
    var diffMs = nextBirthday - now;

    if (diffMs <= 1000) {

      countdownDiv.textContent = '';
      messageDiv.innerHTML = ` <b> 🎂 Happy Birthday! 🎉 <b>`;
      setTimeout(() => {
        messageDiv.textContent = '';
        startCountdown(birthday);
      }, 86400000);
      return;
    }

    var days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    countdownDiv.textContent = `⏳ Time until your birthday: ${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }

  update();
  setInterval(update, 1000);
}


loadBirthday();

function changeBirthday() {

  localStorage.removeItem('birthday');
  localStorage.removeItem('lastWishedYear');


  document.getElementById('message').textContent = '';
  document.getElementById('countdown').textContent = '';


  document.getElementById('birthdayInput').style.display = 'block';
}






