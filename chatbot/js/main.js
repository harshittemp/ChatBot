


// Application type(senario)
//1.let user start the conversation
//2. Chatbot starts the conversation
//3.Assistant

// elements
var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');
var ticket=new Date().getTime();
var user = { message: "", counter: 0,meals:[] ,ticket:ticket}; // Fixed typo here, added counter
let option=[
    {},
    {number:1,chocie:"Meal-1",price:250},
    {number:2,chocie:"Meal-2",price:350},
    {number:3,chocie:"Meal-3",price:500}

];
var httpRequest;
chatbotSendMessage("Hi! welcome to RYT Resturant"); 
chatbotSendMessage("Please choose your Meal(Number)"); 
showMenu(); 
//chatbotSendMessage("Choose the option");
//initilizeOptions(); 
var arrayOfPossibleMessage = [
     { "message": "how are you", "response": "I am great" },
     { "message": "hi", "response": "Hi" },
     { "message": "who are you", "response": "I am your assistant" },
     { "message": "what is your name", "response": "I am a chatbox" },
     { "message": "how old are you", "response": "I am ageless" },
     { "message": "do you sleep early", "response": "No I don't!" },
     { "message": "can you dance ?", "response": "Yes, I can do tango" },
     { "message": "do you have car", "response": "No I don't!" },
     { "message": "what is your fav food", "response": "Pizza" },
     { "message": "do you have job", "response": "Yes, I do" }
 ];

// array of objects of asking questions to the client after they reply to one question
var questionsToAsk = [
    { "question": "what's your name", "answer": "" },
    { "question": "how old are you", "answer": "" },
    { "question": "where do  you live", "answer": "" },
    { "question": "how is your job ", "answer": "" },
    { "question": "how is your family", "answer": "" },
    { "question": "what's your job title", "answer": "" },
    { "question": "what's your job title", "answer": "" }

];

//askQuestion();
function getTotalPrice(){
    let p=0;
    for(let i=0;i<user.meals.length;i++){
        p+=user.meals[i].price;
    }
return p;
}

// function of asking questions to the client after they reply to one question
function askQuestion() {
    if(questionsToAsk.length>user.counter){
    setTimeout(function (){
        chatbotSendMessage(questionsToAsk[user.counter].question);
        user.counter++;
    }, 1000);
    console.log(questionsToAsk[user.counter-1]);
}
}
function resturantResponseToUser(messageText){
    let userChoice=parseInt(messageText.trim());
    
    switch(userChoice){
        case 1:
            chatbotSendMessage('Choose Meal-1');
            user.meals.push(option[1]);
             chatbotSendMessage('Something else? if yes choose the number or 50 for the take out');
            break;
            case 2:
                chatbotSendMessage('Choose Meal-2');
                user.meals.push(option[2]);
                chatbotSendMessage('Something else? if yes choose the number or 50 for the take out');
                break;
               case 3:
                chatbotSendMessage('Choose Meal-3');
                user.meals.push(option[3]);
                chatbotSendMessage('Something else? if yes choose the number or 50 for the take out');
                break;
                case 50:
                    alert('Your Checkout');
                    //chatbotSendMessage("Your Order: Meals Number" + user.meals);
                    chatbotSendMessage("Your Total Price"+"-"+getTotalPrice()+" "+"Rupees");
                    chatbotSendMessage("Please click on the link to complete your CheckOut ");
                    chatbotSendMessage("<a href='https://google.com'>CheckOut</a>");
                    break;
                default:
                    consol.log("please Choose a valid number");
    
}
console.log(user);
}

function showMenu(){
    
    var MessageElement = document.createElement('div');
    MessageElement.classList.add('w-50'); //there are multiple classes in the div section of message
    MessageElement.classList.add('float-left');
    MessageElement.classList.add('shadow-sm');
    MessageElement.style.margin = "10px";
    MessageElement.style.padding = "5px";
    for(let i=1;i<option.length;i++){
        MessageElement.innerHTML+="<br>"+ "<span> Chatbot:</span>" +
        "<span style='margin-top: 10px; padding:10px'>" + option[i].number+": "+option[i].chocie+" "+option[i].price+"Rupees"+ "</span>";
    MessageElement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 1000 }); // for delaying message animation
    }
    
    setTimeout(function () {
        chatContainer.appendChild(MessageElement);
    }, 1000); // Moved the append operation inside setTimeout to ensure animation works correctly
     // scroll to last message
    chatContainer.scrollTop=chatContainer.scrollHeight;

}
function initilizeOptions(){

    let option=[
        {number:1,chocie:"Weather"},
        {number:2,chocie:"Sports"},
        {number:3,chocie:"News"}

    ];
    var MessageElement = document.createElement('div');
    MessageElement.classList.add('w-50'); //there are multiple classes in the div section of message
    MessageElement.classList.add('float-left');
    MessageElement.classList.add('shadow-sm');
    MessageElement.style.margin = "10px";
    MessageElement.style.padding = "5px";
    for(let i=0;i<option.length;i++){
        MessageElement.innerHTML+="<br>"+ "<span> Chatbot:</span>" +
        "<span style='margin-top: 10px; padding:10px'>" + option[i].number+": "+option[i].chocie + "</span>";
    MessageElement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 1000 }); // for delaying message animation
    }
    
    setTimeout(function () {
        chatContainer.appendChild(MessageElement);
    }, 1000); // Moved the append operation inside setTimeout to ensure animation works correctly
     // scroll to last message
    chatContainer.scrollTop=chatContainer.scrollHeight;
}
   function handleWeatherResponse(){
    if(httpRequest.readyState===XMLHttpRequest.DONE){
        if(httpRequest.status===200){
           //console.log(httpRequest.responseText);
           let response=JSON.parse(httpRequest.responseText);
           let city=response.location.name;
           let temp=response.current.temprature;
           let hum=response.current.humidity;
           let icon=response.current.weather_icon[0];

           let messageToSend="<br>";
           messageToSend+="<span> <img src='"+ icon +"' ></span>";
           messageToSend+="<br>";
           messageToSend+="City:"+city;
           messageToSend+="<br>";
           messageToSend+="Temprature:"+temp+"C";
           messageToSend+="HUmidity:"+hum;
           chatbotSendMessage(messageToSend);
           initilizeOptions();
           chatbotSendMessage("please choose an option");
           
        }else{
            alert("There was an unexceptable error");
        }
    }
   }
function getWeatherRequest(lat,long){
    httpRequest=new XMLHttpRequest();
    httpRequest.onreadystatechange=handleWeatherResponse
      httpRequest.open('GET',"http://api.weatherstack.com/current?access_key=0d3ad50bafa8fc0d247be50f2f691507&query="+parseInt(lat)+parseInt(long));
      httpRequest.send();

}
function getLocationAndWeather(){
    navigator.geolocation.getCurrentPosition((pos)=>{
        // getting latitude & longitude  
        let lat=pos.coords.latitude;
          let long=pos.coords.longitude;
          getWeatherRequest(lat,long);
    },(err)=>{

    });
}
 function assistantResponse(messageText){
//     // convet the String 1 or 2 option to int and trime for extar space
let userChoice=parseInt(messageText.trim());
chatbotSendMessage('please wait......');
switch(userChoice){
    case 1:
        //get wheather and location
        getLocationAndWeather();
        break;
        case 2:
            // get sports news
            alert("You choose sports");
            window.open('https://www.google.com/search?q=sports');
            break;
           case 3:
            alert("You choose news");
            window.open('https://www.google.com/search?q=news');
            // get genral news
            break;
            default:
                consol.log("please Choose a valid number");


   }

 }



function chatbotSendMessage(messageText) {
    var MessageElement = document.createElement('div');
    MessageElement.classList.add('w-50'); //there are multiple classes in the div section of message
    MessageElement.classList.add('float-left');
    MessageElement.classList.add('shadow-sm');
    MessageElement.style.margin = "10px";
    MessageElement.style.padding = "5px";
    MessageElement.innerHTML = "<span> Chatbot:</span>" +
        "<span style='margin-top: 10px; padding:10px'>" + messageText + "</span>";
    MessageElement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 1000 }); // for delaying message animation
    setTimeout(function () {
        chatContainer.appendChild(MessageElement);
    }, 1000); // Moved the append operation inside setTimeout to ensure animation works correctly
     // scroll to last message
    chatContainer.scrollTop=chatContainer.scrollHeight;
}

function sendMessage(messageText) {
    var MessageElement = document.createElement('div');
    MessageElement.classList.add('w-50'); //there are multiple classes in the div section of message
    MessageElement.classList.add('float-right');
    MessageElement.classList.add('shadow-sm');
    MessageElement.style.margin = "10px";
    MessageElement.style.padding = "5px";
    MessageElement.innerHTML = "<span> You:</span>" +
        "<span style='margin-top: 10px; padding:10px'>" + messageText + "</span>";
    MessageElement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 1000 }); // for delaying message animation
    setTimeout(function () {
        chatContainer.appendChild(MessageElement);
    }, 1000); // Moved the append operation inside setTimeout to ensure animation works correctly
    // scroll to last message
    chatContainer.scrollTop=chatContainer.scrollHeight;
}


// callback function
sendBtn.addEventListener('click', function (e) {
    if (textbox.value == "") {
        alert('Please type in a message');
    } else {
        let messageText = textbox.value;
        user.message = messageText;
        sendMessage(messageText); // calling the sendMessage function inside the callback Function
        textbox.value = "";
        //questionsToAsk[user.counter-1].answer=user.message;
       // askQuestion();
        //processMessage();
        //assistantResponse(messageText);
        resturantResponseToUser(messageText);
    }
});

function processMessage() {
    // array of result
    if (user.message.length > 5) {
        var result = arrayOfPossibleMessage.filter(val => val.message.includes(user.message.toLowerCase()));
        if (result.length > 0) {
            var response = result[0].response;
            setTimeout(function () {
                chatbotSendMessage(response);
            }, 1000);
        } else {
            setTimeout(function () {
                chatbotSendMessage("I don't understand");
            }, 1000);
        }
    } else if (user.message.startsWith("how") || user.message.startsWith("who")) { // Using startsWith instead of comparing whole string
        setTimeout(function () {
            chatbotSendMessage("?");
        }, 1000);

    } else {
        setTimeout(function () {
            chatbotSendMessage("Can you send a complete sentence");
        }, 1000);

    }
}
textbox.addEventListener('keypress',function(e){
    // if keyboard hits enter key which is 13 number on keyboard     
    if(e.which==13){
        if (textbox.value == "") {
            alert('Please type in a message');
        } else {
            let messageText = textbox.value.trim();
            user.message = messageText;
            sendMessage(messageText); // calling the sendMessage function inside the callback Function
            textbox.value = "";
            //questionsToAsk[user.counter-1].answer=user.message;
           // askQuestion();
           // processMessage();
            //assistantResponse(messageText);
            resturantResponseToUser(messageText);
        }
         }
});