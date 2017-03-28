$(function(){
var searchfield=$('.search-field');
var icon=$('.btn btn-default');
$(searchfield).on('focus',function()
{
$(this).animate(
{	width:'100%'
}
,400);
$(icon).animate(
{
right:'10px'
}
,400);
}
);
$(searchfield).on('blur',function()
{
	if(searchfield.val()==''){
$(this).animate(
{	width:'45%'
},400,function() 
{
}
);
$(icon).animate(
{
right:'360px'
}
,400,function() {
});
}
});
$('#search-form').submit(function(e){
e.preventDefault();
});

})

function search(){
	$("#results").html('');
	$("#buttons").html('');
query=$('.search-field').val();
$.get(
"https://www.googleapis.com/youtube/v3/search",
{
part:'snippet ,id',
q:query,
type:'video',
maxResults:8,
key:null
},
function(data) {
	var nextPage=data.nextPageToken;
	var prevPage=data.prevPageToken;
console.log(data);
$.each(data.items,function(i,item) {
	// body...

var res=getOutput(item);
$('#results').append(res);
});
var buttons=getButton(prevPage,nextPage);
$('#buttons').append(buttons);
}
	);
	}
function prevPage() {
	var token=$("#prev-button").data('token');
	$("#results").html('');
	$("#buttons").html('');
	query=$('.search-field').val();
$.get(
"https://www.googleapis.com/youtube/v3/search",
{
part:'snippet ,id',
q:query,
type:'video',
maxResults:5,
pageToken:token,
key:'AIzaSyAqjOq3Is2J0m4W7d4Uf2NaI3weViZte-M'
},
function(data) {
	var nextPage=data.nextPageToken;
	var prevPage=data.prevPageToken;
console.log(data);
$.each(data.items,function(i,item) {
var res=getOutput(item);
$('#results').append(res);
});
var buttons=getButton(prevPage,nextPage);
$('#buttons').append(buttons);
}
	);

}


function nextPage() {
	var token=$("#next-button").data('token');
	$("#results").html('');
	$("#buttons").html('');
	query=$('.search-field').val();
$.get(
"https://www.googleapis.com/youtube/v3/search",
{
part:'snippet ,id',
q:query,
type:'video',
maxResults:8,
pageToken:token,
key:'AIzaSyAqjOq3Is2J0m4W7d4Uf2NaI3weViZte-M'
},
function(data) {
	var nextPage=data.nextPageToken;
	var prevPage=data.prevPageToken;
console.log(data);
$.each(data.items,function(i,item) {
var res=getOutput(item);
$('#results').append(res);
});
var buttons=getButton(prevPage,nextPage);
$('#buttons').append(buttons);
}
	);

}


function getOutput(item) {
	var videoId=item.id.videoId;
	var title=item.snippet.title;
	var description=item.snippet.description;
	var videoDate=item.snippet.publishedAt;
	var thumbnails=item.snippet.thumbnails.high.url;
	var channelTitle=item.snippet.channelTitle;
var output='<li ">'+
'<div class="list-left">'+
'<iframe id="video" src="https://www.youtube.com/embed/'+videoId+'" allowfullscreen></iframe>'+
'</div>'+
'<div  class="list-right"'+
'<h3 id="title"><a  href="https://www.youtube.com/embed/'+videoId+'" target="blank">'+title+'</a><h3>'+
'<small style="color:blue"> By '+'<span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>'+
'</div>'+
'</li>'+
'<div class="clearfix"></div>'+"";
return output;
}
function getButton(prevPageToken,nextPageToken){
	if(!prevPageToken)
	{
		var btnoutput='<div class="button-container"> <button id="next-button" class="btn btn-primary " data-token="'+nextPageToken+'" data-query="'+query+'" onClick="nextPage();">Next Page</button>';

	}
	else{
var btnoutput='<div class="button-container"> <button id="prev-button" class="btn btn-primary" data-token="'+prevPageToken+'" data-query="'+query+'"onClick="prevPage();">Prev Page</button>'+
'<button id="next-button" class="btn btn-primary" data-token="'+nextPageToken+'" data-query="'+query+'" onClick="nextPage();">Next Page</button></div>';

	}
	return btnoutput;

}