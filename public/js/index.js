var csubject="";
$(document).ready(function(){
    console.log("app ready to use!");
    getsubjects();
});

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