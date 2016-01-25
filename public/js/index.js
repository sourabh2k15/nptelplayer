var csubject="";toggle=0;fullscreen=0;
var totaltime=0;
$(document).ready(function(){
    console.log("app ready to use!");
    getsubjects();
    $('#top').slideUp();
    $('#videocont').fadeIn();
    toggle =1;
    
    $('#player').on('play',function(e){
        //console.log(e.currentTarget.currentTime);
    });
    _('time').value=0;
});

$(document).keypress(function(e){
    console.log(String.fromCharCode(e.keyCode)+" --> "+e.keyCode);
    if(e.keyCode==100){
        if(toggle==1){
            pause();
            $('#videocont').fadeOut();
            $('#top').slideDown();
            toggle=0;
        }else{
          $('#top').slideUp();
          $('#videocont').show();
          toggle = 1;
        }
    }
});

setInterval(function(){
    var time = _('player').currentTime;
    var minutes = Math.floor(time/60);
    var seconds = Math.floor(time - Math.floor(time/60))%60;
    _('time-verbose').innerHTML = minutes+" : "+jugaad(seconds);
    _('time').value = (_('player').currentTime/_('player').duration)*100;
},1000);

function jugaad(sec){
    if(sec.toString().length==1) return '0'+sec;
    else return sec;
}

function play(){
    if(_('player').paused) _('player').play();
    $('#play').hide();
    $('#pause').show();
}

function pause(){
    if(!_('player').paused) _('player').pause();
    $('#pause').hide();
    $('#play').show();    
}

function speedup(val){
    _('player').playbackRate = (val/100)*3;
}

function setvideo(val){
    _('player').currentTime = (val/100)*(_('player').duration);
}

function screen(){
    if(fullscreen==0) goFullscreen();
    else exitFullscreen();
}
function goFullscreen(){
    var elem = document.getElementsByTagName("div")[0];
    if (elem.requestFullscreen) {
     elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
    fullscreen=1;
}

function exitFullscreen() {
  _('container').style.marginTop = 0+'%';  
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  fullscreen = 0;
}

function getsubjects(){
    console.log('requesting subjects from server');
    $.ajax({
        type:'get',
        url:'/subjects',
        success:function(data){
            var subjects = [];
            subjects = JSON.parse(data);
            console.log(subjects);
            var html='<option>Select your subject</option>';
            for(var i=0;i<subjects.length;i++){
                html+='<option id="option"+'+i+'>'+subjects[i]+'</option>';
            }
            _('subjects').innerHTML = html;
        },
        error: function(){
            console.log("some error occurred!");
        }
    });
}

function getvideos(subject){
    csubject = subject;
    console.log(subject);
    $.ajax({
        type:'get',
        url:'/videos',
        data:{subject:subject},
        success:function(data){
            var videos = [];
            videos = JSON.parse(data);
            var html='<option>Select a video</option>';
            
            for(var i=0;i<videos.length;i++){
                html+='<option id="video"+'+i+'>'+videos[i]+'</option>';
            }
            _('videos').innerHTML = html;
        },
        error:function(){
            console.log('some error occurred!!');
        }
    });
}

function firevideo(video){
    toggle=1;
    console.log("user watching "+"videos/"+csubject+"/videos/nptel/"+video);
    $('#top').slideUp();
    $('#videocont').fadeIn();
    _('player').src = "videos/"+csubject+"/videos/nptel/"+video;
    _('player').play();
}

function relax(){
    console.log("user wants to relax!!");
}

function _(el){
    return document.getElementById(el);
}