// custom js file

(function(){

    var app = new Vue({
		  el: '#app',
		  data: {
			  weather: false,
			  date: ['Jul 27', 'Jul 28', 'Jul 29', 'Jul 30', 'Jul 31', 'Aug 1', 'Aug 2', 'Aug 3'],
			  daysOfTheWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
			  dates:'',
              icons: false
		  },
		  created: function () {
			this.createDates();
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
              // getIcons: function () {
				//   for (var i = 0; i < array.length; i++) {
			  //     array[i]
				}
		});


    var today = new Date();
    var date = document.getElementById('dayOneDate').textContent;

	function makeApiCallWeatherData () {

        function getTemp(response) {
            document.getElementById('temp').innerHTML = response.data.daily[0].temp.day.toFixed(0) + '°C';
            console.log(response.data.daily[0].temp.day);

            document.getElementById('dayOneTemp').innerHTML = response.data.daily[1].temp.day.toFixed(0) + '°C';
            console.log(response.data.daily[1].temp.day);

            document.getElementById('dayTwoTemp').innerHTML = response.data.daily[2].temp.day.toFixed(0) + '°C';
            console.log(response.data.daily[2].temp.day);

            document.getElementById('dayThreeTemp').innerHTML = response.data.daily[3].temp.day.toFixed(0) + '°C';
            console.log(response.data.daily[3].temp.day);

            document.getElementById('dayFourTemp').innerHTML = response.data.daily[4].temp.day.toFixed(0) + '°C';
            console.log(response.data.daily[4].temp.day);

            document.getElementById('dayFiveTemp').innerHTML = response.data.daily[5].temp.day.toFixed(0) + '°C';
            console.log(response.data.daily[5].temp.day);

            document.getElementById('daySixTemp').innerHTML = response.data.daily[6].temp.day.toFixed(0) + '°C';
            console.log(response.data.daily[6].temp.day);

            document.getElementById('daySevenTemp').innerHTML = response.data.daily[7].temp.day.toFixed(0) + '°C';
            console.log(response.data.daily[7].temp.day);
        }

        function getCondition(response) {
            document.getElementById('condition').innerHTML = response.data.daily[0].weather[0].description;
            console.log(response.data.daily[0].weather[0].description);

            document.getElementById('dayOneCon').innerHTML = response.data.daily[1].weather[0].description;
            console.log(response.data.daily[1].weather[0].description);

            document.getElementById('dayTwoCon').innerHTML = response.data.daily[2].weather[0].description;
            console.log(response.data.daily[2].weather[0].description);

            document.getElementById('dayThreeCon').innerHTML = response.data.daily[3].weather[0].description;
            console.log(response.data.daily[3].weather[0].description);

            document.getElementById('dayFourCon').innerHTML = response.data.daily[4].weather[0].description;
            console.log(response.data.daily[4].weather[0].description);

            document.getElementById('dayFiveCon').innerHTML = response.data.daily[5].weather[0].description;
            console.log(response.data.daily[5].weather[0].description);

            document.getElementById('daySixCon').innerHTML = response.data.daily[6].weather[0].description;
            console.log(response.data.daily[6].weather[0].description);

            document.getElementById('daySevenCon').innerHTML = response.data.daily[7].weather[0].description;
            console.log(response.data.daily[7].weather[0].description);
        }

        function getDay(response) {
            var tomorrow = new Date(today);
            var nextDay = new Date(today);
            var nextDay2 = new Date(today);
            var nextDay3 = new Date(today);
            var nextDay4 = new Date(today);
            var nextDay5 = new Date(today);
            var nextDay6 = new Date(today);
            var nextDay7 = new Date(today);

            var options = { weekday: 'long' };

            tomorrow.setDate(tomorrow.getDate() + 1);
            nextDay.setDate(nextDay.getDate() + 2);
            nextDay2.setDate(nextDay2.getDate() + 3);
            nextDay3.setDate(nextDay3.getDate() + 4);
            nextDay4.setDate(nextDay4.getDate() + 5);
            nextDay5.setDate(nextDay5.getDate() + 6);
            nextDay6.setDate(nextDay6.getDate() + 7);

            document.getElementById('dayOneDay').innerHTML = tomorrow.toLocaleDateString('en-US', options);
            console.log(tomorrow);

            document.getElementById('dayTwoDay').innerHTML = nextDay.toLocaleDateString('en-US', options);
            console.log(nextDay);

            document.getElementById('dayThreeDay').innerHTML = nextDay2.toLocaleDateString('en-US', options);
            console.log(nextDay2);

            document.getElementById('dayFourDay').innerHTML = nextDay3.toLocaleDateString('en-US', options);
            console.log(nextDay3);

            document.getElementById('dayFiveDay').innerHTML = nextDay4.toLocaleDateString('en-US', options);
            console.log(nextDay4);

            document.getElementById('daySixDay').innerHTML = nextDay5.toLocaleDateString('en-US', options);
            console.log(nextDay5);

            document.getElementById('daySevenDay').innerHTML = nextDay6.toLocaleDateString('en-US', options);
            console.log(nextDay6);
        }

        function getIcons(response) {

          for (var i = 0; i < 8; i++) {
            console.log(i);
            var iconCode = response.data.daily[i].weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

            $("#icon" + i).html("<img src='" + iconUrl  + "'>");
            console.log(iconUrl);
          }

        }



		// GET request for remote image in node.js
		axios({
		  method: 'get',
		  // url: 'https://api.nasa.gov/planetary/apod?api_key=0a2OMkeeTLcnN7bPTfoDNdRcGHHTesp4JH88fl13&date=2020-02-02'
			url: '	https://api.openweathermap.org/data/2.5/onecall?lat=-41.2866655&lon=174.772996908&exclude=hourly,minutely&appid=8fcad2014369cbf658df9f5f95718a98&units=metric'
		})
		.then(function (response) {
		  console.log(response);

          getTemp(response);
          getCondition(response);
          // getDate(response);
          getDay(response);
          getIcons(response);

		});
	} // function ENDS

    makeApiCallWeatherData();

})(); // iffe ENDS
