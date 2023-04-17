/*
  Para poder poner este script en tu server tienes que poner tambien un archivo en tu server y saber de que tamaño es para poner la informacion en imageAddr y downloadSize.
*/

var imageAddr = "3MB.jpg" + "?n=" + Math.random();
/*var downloadSize = 45554906; //43.4Mb
*/
var bytesInAKilobyte = 1024;
var roundedDecimals = 2;

function showResults(speedBps) {
  var KBps = (speedBps / bytesInAKilobyte *10).toFixed(roundedDecimals);
  var MBps = (KBps / bytesInAKilobyte).toFixed(roundedDecimals);
  var displaySpeed = MBps > 1 ? {value: MBps, units: "Mbit/s"} : {value: KBps, units: "Kbit/s"};
  var results = "<h2>你的网速测试为<h2><h1>" + displaySpeed.value + " " + displaySpeed.units + "</h1>";
  $('#results').html(results);
}

function updateProgress(evt) {
  if (evt.lengthComputable) {
    var percentage = Math.round(evt.loaded / evt.total * 100);
    $('#progressbar').attr('value', percentage);
    var duration = (new Date().getTime() - startTime) / 1000;
    var speedBps = evt.loaded / duration * 8;
			var displaySpeed = speedBps / (bytesInAKilobyte * bytesInAKilobyte);

			if (displaySpeed > 1) {
			  displaySpeed = displaySpeed.toFixed(roundedDecimals);
			  $('#speed').text(displaySpeed + ' Mbit/s');
			} else {
			  displaySpeed = (speedBps / bytesInAKilobyte).toFixed(roundedDecimals);
			  $('#speed').text(displaySpeed + ' Kbit/s');
			}
  }
}

function startTest() {
  $('#starttest').text('测试下载速度...');
  $('#starttest').attr('disabled', 'disabled');
  $('#progressbar').attr('value', 0);
  $('#speed').text('');
  var xhr = new XMLHttpRequest();
  xhr.onprogress = updateProgress;
  xhr.onload = function () {
    var speedBps = this.response.byteLength / ((new Date().getTime() - startTime) / 1000);
    showResults(speedBps);
    $('#starttest').removeAttr('disabled');
	$('#speed').text('');
    $('#starttest').text('完成');
  };
  xhr.open('GET', imageAddr, true);
  xhr.responseType = 'arraybuffer';
  xhr.send();
}

$('#starttest').on('click', function(){
  startTime = new Date().getTime();
  startTest();
});