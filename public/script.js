var btnSaveMp3Playlist = document.getElementById('saveMp3Playlist');
var btnSaveMp3File = document.getElementById('saveMp3File');
var btnSetFormatToMp4 = document.getElementById('setFormatToMp4')
var btnSetFormatToMp3 = document.getElementById('setFormatToMp3')
var fileNameInput = document.getElementById('fileName')
var URLinput = document.querySelector('.URL-input');
var server = 'http://localhost:4000';

var format = 'mp3'
btnSetFormatToMp4.addEventListener('click', () => {
	format = 'mp4'
})
btnSetFormatToMp3.addEventListener('click', () => {
	format = 'mp3'
})
btnSaveMp3File.addEventListener('click', () => {
	console.log(`URL: ${URLinput.value}`);	
	save({
		url: URLinput.value,
		format: format,
		playlist: false,
		fileName: fileNameInput.value
	})
});
btnSaveMp3Playlist.addEventListener('click', () => {
	console.log(`URL: ${URLinput.value}`);	
	save({
		url: URLinput.value,
		format: format,
		playlist: true,
		fileName: fileNameInput.value
	})
});
function save(data) {
	$.ajax({
		type: "POST",
		url: "http://localhost:4000/save",
		data:  JSON.stringify(data),
		success: function(){},
		dataType: "json",
		contentType : "application/json"
	  });
}