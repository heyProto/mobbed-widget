setTimeout(function(){
  $('.animate-number').each(function () {
    $(this).prop('Counter',0).animate({
      Counter: $(this).text()
    },{
      duration: 2000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
  }); 
},1000)

function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status == 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };
  xhr.send();
};

getJSON('http://protograph.indianexpress.com/49a045aea2b71456f5d04f4a/index.json', function (err, data){
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    let start_date_split = (new Date (data[data.length - 1].date)).toDateString().split(" "),
        end_date_split = (new Date (data[0].date)).toDateString().split(" "),
        start_date = start_date_split[2] + " " + start_date_split[1] + " '" + start_date_split[3].slice(-2),
        end_date = end_date_split[2] + " " + end_date_split[1] + " '" + end_date_split[3].slice(-2);
        
      document.getElementById('animate-number').innerHTML = data.length;
      document.getElementById('start-date').innerHTML = start_date;
      document.getElementById('end-date').innerHTML = end_date;
  }
})

function getScreenSize() {
  let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;

  return {
    width: width,
    height: height
  };
}