// custom js file

(function(){

    var app = new Vue({
		  el: '#app',
		  data: {
			  weather: false,
			  date: ['Jul 27', 'Jul 28', 'Jul 29', 'Jul 30', 'Jul 31', 'Aug 1', 'Aug 2', 'Aug 3'],
			  daysOfTheWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
			  dates:'',
              iconsRef: false
		  },
		  created: function () {
			this.createDates();
            this.getDayOfTheWeek();
		  },
		  methods: {
			  createDates: function () {
				  var now = moment();
				  var datesCreated = [];
				  var daysRequired = 7
				  for (var i = 0; i <= daysRequired; i++) {
				    datesCreated.push( moment().add(i, 'days').format('Do MMMM YYYY') )
				  }
				  this.dates = datesCreated;
			     },
             getDayOfTheWeek: function (indexAddition) {
                 // Ref to the date object
                 var date = new Date();
                 // Got an array of days which are strings
                 var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                 // The current day reference which returns a number 0 - 6
                 // var currentDay = date.getDay();
                 var currentDay = date.getDay();
                 // console.log(currentDay)

                 // Updated algorithm for infinite loop.
                 function loop(n) {
                     var foundDay;
                   for (var i=0; i<n; i++) {
                     var pointer = (i + currentDay) % days.length;
                     foundDay = days[pointer]
                     // console.log(foundDay)
                   }
                   // returns result
                   return foundDay
                 }
                 // Returns the day result
                 return loop(indexAddition)
             // Function ENDS
              },
			}
		});


	function makeApiCallWeatherData () {

//************ geo location code STARTS***********
        function makeAjaxRequest (lat, lng) {
           // getUrl will either be a **1. live geolocation based request or...
           // a **2. predetermined hardcoded position
           var getUrl;
           // If the arguments/parameters above are true or false...
           if (lat === false) {
             // **1. if no longitude or latitude....go to Bali
             getUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=-8.366033&lon=114.997182&units=metric&exclude=hourly,minute&appid=66ce6f7e945db003aaa343f0bc010dc8';
           } else {
             // **2. add to api url string
             getUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lng + '&units=metric&exclude=hourly,minute&appid=66ce6f7e945db003aaa343f0bc010dc8';
           }

           axios({
             method: 'get',
             url: getUrl
           }).then(function (response) {
             // Here we assign the the data response to the app/vue weather property.
             // We do not need to use 'data.weather' because vue always provides data
             // as a property by default.
             app.weather = response

             function getIcons(response) {
               var icons = [];
               for (var i = 0; i < 8; i++) {
                 var iconCode = response.data.daily[i].weather[0].icon;
                 var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                 icons.push(iconUrl)
               }
               app.iconsRef = icons;
             } // getIcons ENDS


             // Call and assign Icons
             getIcons(response)
           });
         } // makeAjaxRequest ENDS

         // A function that runs after the ajax response
         function checkGeoLocation () {
           // Check for browser geolocation functionality
           if (navigator.geolocation) {
             // If true call next function as part of the geolocation api method
             navigator.geolocation.getCurrentPosition(showPosition);
           } else {
             makeAjaxRequest(false, false);
             console.log("Geolocation is not supported by this browser.");
           }

           function showPosition(position) {
             // Get longitude and latitude then pass to the makeAjaxRequest method
             var lat = position.coords.latitude;
             var lng = position.coords.longitude;
             // console.log(position.coords.latitude)
             // console.log(position.coords.longitude)
             // We have a function pre-written that makes an ajax request
             makeAjaxRequest(lat, lng);
           }

         } // checkGeoLocation ENDS

         checkGeoLocation();


	} // function ENDS

    makeApiCallWeatherData();

})(); // iffe ENDS
