app={
    main:$('.main'),
    game:$('#game'),
    W:1024,
    H:768,
    frame:1,
    sound:1,
    paused:1,
    star:0,
    fuel:11,
    timer:-1,
    fontsize:20,
    p:1,
    dir:0,
}
// hàm tạo số random
function randomY(){
    return parseInt(Math.floor(Math.random()*549 +2));
}
function randomX(){
    return parseInt(Math.floor(Math.random()*1139 +2));
}
// hàm tạo chim
function createBird(){
    if(app.paused==0){
        var item=$('<div>',{class:'bird'});
        item.css({left:app.W, top:randomY,
            left:app.W, top:randomY, animation: 'bird-fly 1s infinite',
            width: '90px',
            height: '62px',
            left: '1000px',
            zIndex:9,
            backgroundImage: "url(images/Bird/bird1.png)",    
        });
        app.game.append(item);
    }
    if(app.timer>=30){
        setTimeout(createBird,1500);
    }else
    setTimeout(createBird,3000);
}
function createBird2(){
    if(app.paused==0){
        var item=$('<div>',{class:'bird2'});
        item.css({
                    left:app.W, top:randomY, animation: 'bird2 1s infinite',
                    width: '90px',
                    height: '62px',
                    left: '1300px',
                    zIndex:9,
                    backgroundImage: "url(images/Bird1/bird1.png)",
                });
        app.game.append(item);
    }
    if(app.timer>=30){
        setTimeout(createBird2,2300);
    }else
    setTimeout(createBird2,5000);
}
function createBird3(){
    if(app.paused==0){
        var item=$('<div>',{class:'bird3'});
        item.css({left:app.W, top:randomY,
            left:app.W, top:randomY, animation: 'bird3 1s infinite',
            width: '90px',
            height: '62px',
            left: '1200px',
            zIndex:9,
            backgroundImage: "url(images/Bird2/bird1.png)",
        });
        app.game.append(item);
    }
    if(app.timer>=30){
        setTimeout(createBird3,3500);
    }else
    setTimeout(createBird3,6500);
}
// hàm tạo mây
function createcloud(){
    if(app.paused==0){
        var item=$('<div>',{class:'cloud'});
        var url="",
            e=Math.floor(Math.random()*4+1);
        if(e==1) url="cloud/cloud_1.png";
        if(e==2) url="cloud/cloud_2.png";
        if(e==3) url="cloud/cloud_3.png";
        if(e==4) url="cloud/cloud_4.png";
        item.css({left:app.W, top:randomY, backgroundImage:"url(images/"+url+")",
                width: '110px',
                height: '50px',
                zIindex: 1,
                animation: 'scale 1s alternate ease-in-out infinite',
            });
        app.game.append(item);
    }
    setTimeout(createcloud,1500);
}
// hàm tạo icon xăng
function createFuel(){
    if(app.paused==0){
        var item=$('<div>',{class:'fuel'});
        item.css({left:randomX, top:0, backgroundImage:"url(images/parachute.png)",
                width: '50px',
                height: '80px',
                zIndex: 2,
                animation: 'scale 1s alternate ease-in-out infinite',
        });
        app.game.append(item);
        var e= randomX();
    }
    if(app.timer>=30){
        setTimeout(createFuel,6000);
    }else
    setTimeout(createFuel,9000);
}
// hàm tạo ngôi sao 
function createStar(){
    if(app.paused==0){
        var item=$('<div>',{class:'star'});
        var url="",
            e=Math.floor(Math.random()*3+1);
        if(e==1) url="star1.png";
        if(e==2) url="star2.png";
        if(e==3) url="star.png";
        item.css({left:randomX, top:0, backgroundImage:"url(images/"+url+")",
                width: '50px',
                height: '50px',
                Zindex: 2,
                animation: 'rotate 1.25s infinite ease-in',
        });
        app.game.append(item);
    }
    if(app.timer>=30){
        setTimeout(createStar,900);
    }else
    setTimeout(createStar,1200);
}
// hàm kiểm tra va chạm
function checkOver(obj){
    var x1=app.main.position().left,
        y1=app.main.position().top,
        h1=app.main.height(),
        w1=app.main.width(),
        x2=obj.position().left,
        y2=obj.position().top,
        h2=obj.height(),
        w2=obj.width();
    if(x1+w1>x2 && y1+h1>y2 && x2+w2>x1 && y2+h2>y1) return true;
    return false;
}   
function updateGame(){
    
    if(app.paused==0){
        // cài đặt hướng di chuyển cho các đối tượng
        $('.bird,.bird2,.bird3,.cloud').each(function(){
            var e=$(this);
            var s=app.timer;
            if(e.position().left<-50){
                e.remove();
            };
            if(s<10) e.css({left: '-=4'});
            else e.css({left: '-=5'});
            if(s>30) e.css({left: '-=5.5'});
        })
        
        $('.fuel, .star').each(function(){
            var e=$(this);
            if(e.position().left <1000){
                if(e.position().top > app.H){
                    e.remove();
                }
                else e.css({top: '+=3.5'});
            } else e.remove();
        })
        // kiểm tra va chạm các đối tượng với máy bay
        $('.bird,.bird2,.bird3,.cloud,.star,.fuel').each(function(){
            var e=$(this);
            if(checkOver(e)){
                if(e.attr('class')=='bird'){
                    e.remove();
                    PlaySound('hit');
                    GameOver();
                }
                if(e.attr('class')=='bird2'){
                    e.remove();
                    PlaySound('hit');
                    GameOver();
                }
                if(e.attr('class')=='bird3'){
                    e.remove();
                    PlaySound('hit');
                    GameOver();
                }
                if(e.attr('class')=='star'){
                    e.remove();
                    PlaySound('des');
                    app.star+=1;
                }
                if(e.attr('class')=='fuel'){
                    e.remove();
                    app.fuel+=10;
                }
            }          
        })
        const date=new Date(app.timer*1000).toString();
        const time=date.split(" ")[4].substring(3,8);
        $('#time-count').text(time);
        $('#star-count').text(app.star);
        $('#fuel-count').text(app.fuel);
        $('#meter').val(app.fuel);
        if(app.fuel>=30) app.fuel=30;
        if(app.fuel<=0) { app.fuel=0 ; GameOver();}
    }
    Control();
    app.frame=requestAnimationFrame(updateGame);
}

function StartGames(){
    app.p=0;
    app.paused=0;
    app.sound=0;
    PlaySound('bg');
    createStar();
    createBird();
    createBird2();
    createBird3();
    createFuel();
    createcloud();
    updateGame();
    StartTimer();
}
// hàm bật âm thanh
function PlaySound(name){
    if(app.sound==1) return;
    document.getElementById(name).play();
}
// hàm tắt âm thanh
function StopSound(name){
    document.getElementById(name).pause();
}
// hàm bắt đầu game
function PlayGame(){
    $('.main,.bird,.bird2,.bird3,.planets,.planets2,.cloud,.star,.fuel,.bullet,.bullet-bird').removeClass('stop');
    PlaySound('bg');
}
// hàm dừng game
function StopGame(){
    $('.main,.bird,.bird2,.bird3,.planets,.planets2,.cloud,.star,.fuel,.bullet,.bullet-bird').addClass('stop');
    StopSound('bg');
}
// hàm bắt đầu tính thời gian
function StartTimer(){
    if(app.paused==0){
        app.timer++;
        app.fuel--;
    }
setTimeout(StartTimer,1000);
}
// hàm cho game kết thúc trò chơi 
function GameOver(){
    app.p=1;
    app.paused=1;
    StopGame();
    $('#gameover').dialog('open');
    $('#wrapper').css({opacity:0.5});
    PlaySound("finis");
}
// hàm kiểm tra nhập tên để vào bảng xếp hạng
$('#name').keyup(function(){
    var name=$(this).val();
    $('#continue').prop("disabled",!name);
    if(name){
        $('#continue').css({opacity:1});
        $('#continue').addClass('ripple');
    }else{
        $('#continue').css({opacity:0.5});
        $('#continue').removeClass('ripple');
    }
})
// hàm điều khiển máy bay
function Control(){
    if(app.paused==1) return;
    var x=app.main.position().left,
        y=app.main.position().top;
    if(app.dir==1) x-=10;
    if(app.dir==2) y-=10;
    if(app.dir==3) x+=10;
    if(app.dir==4) y+=10;
    if(x<0) x=0;
    if(x>app.W -app.main.width()) x=app.W -app.main.width();
    if(y<0) y=0;
    if(y>app.H-app.main.height()) y=app.H-app.main.height();
    app.main.css({left:x, top:y});
}
// định dạng dialog, hiện thông tin hướng dẫn game trước khi chơi
$(document).ready(function(){
    $('.dialog').dialog({
        autoOpen:false,
        closeOnEscape:false,
        modal:true,
        width:700,
        show:{
            effect:'show',
            duration:1000
        }
    });

    $('#start').dialog('open');
    $('#start button').click(function(){
        $('#start').dialog('close');
        $('.main,.bird,.bird2,.cloud,.star,.fuel').removeClass('stop');
        StartGames();
        $('#wrapper').css({opacity:1});
    })

     $('#left').mouseenter(function(){
         app.dir=1;
     })
     $('#up').mouseenter(function(){
        app.dir=2;
    })
    $('#right').mouseenter(function(){
        app.dir=3;
    })
    $('#down').mouseenter(function(){
        app.dir=4;
    })
    $('#left,#right,#down,#up').mouseleave(function(){
        app.dir=0;
    })
})
// cài đặt nhấn nút trên bàn phím để dừng và tiếp tục game
$(window).keydown(function(e){
    if(app.p==1) return;
    if(app.paused==0){
        if(e.which==80){
            app.paused=1;
            $('#paused').css({backgroundImage:"url(images/btn-play.png)"});
            StopGame();
        }
    }else if(e.which==80){
        app.paused=0;
        $('#paused').css({backgroundImage:"url(images/btn-paused.png)"});
        PlayGame();
    }

    if(app.paused==0){
        if(e.which==32){
            app.paused=1;
            $('#paused').css({backgroundImage:"url(images/btn-play.png)"});
            StopGame();
        }
    }else if(e.which==32){
        app.paused=0;
        $('#paused').css({backgroundImage:"url(images/btn-paused.png)"});
        PlayGame();
    }
})
//thiết lập nhấn chuột vào icon để bật tắt âm thanh
$('#sound').click(function(){
    if(app.paused==1) return;
    app.sound=1-app.sound;
    if(app.sound==1){
        $(this).css({backgroundImage:"url(images/btn-sound.png)"});
        StopSound('bg');
    }else{
        $(this).css({backgroundImage:"url(images/btn-soundoff.png)"});
        PlaySound('bg');
    }
})
// thiết lập nhấn chuột vào icon để dùng hoặc tiếp tục game
$('#paused').click(function(){
    app.paused=1-app.paused;
    if(app.paused==1){
        $(this).css({backgroundImage:"url(images/btn-play.png)"});
        StopGame();
    }else{
        $(this).css({backgroundImage:"url(images/btn-paused.png)"});
       PlayGame();
    }
})
// thiết lập nhấn chuột tăng kích cỡ chữ
$('#fontup').click(function(){
    app.fontsize+=2;
    if(app.fontsize>=40) app.fontsize=40;
    $('#time-count,#star-count,#fuel-count, #bxh').css({fontSize: app.fontsize});
})
// thiết lập nhấn chuột giảm kích cỡ chữ
$('#fontdown').click(function(){
    app.fontsize-=2;
    if(app.fontsize<=13) app.fontsize=13;
    $('#time-count,#star-count,#fuel-count, #bxh').css({fontSize: app.fontsize});
})
// thiết lập bảng xếp hạng.....
$('#continue').click(function(){
    var name=$('#name').val(),
        data=JSON.parse(localStorage.getItem('bxh'));
    data=(data)?data:[];
    data.push({name:name, time:app.timer, Stars:app.star});
    localStorage.setItem('bxh', JSON.stringify(data));
    var rar=JSON.parse(localStorage.bxh);

    rar.sort(function(a,b){
        a.time=parseInt(a.time);
        b.time=parseInt(b.time);
        a.Stars=parseInt(a.Stars);
        b.Stars=parseInt(b.Stars);

        if(a.Stars<b.Stars) return 1;
        else if(a.time>b.Stars) return -1;
            else return (a.time - b.time);
    })
    var rank=1, step=0, last=0;
    rar.forEach(it=>{
            if(step !==0 && !(last.Stars==it.Stars && last.time==it.time)){
                rank+=step;
                step=1;
            }else{
                step++;
            }
            it.rank=rank;
            last=it;
    })
    rar.forEach(rank=>{
        const date=new Date(rank.time*1000).toString();
        const tg=date.split(" ")[4].substring(3,8);
        const row=$(`<tr>
            <td>${rank.rank}</td>
            <td>${rank.name}</td>
            <td>${tg}</td>
            <td>${rank.Stars}</td>
        </tr>`)
        $('#ranking table').append(row);
    })
    $('#gameover').dialog('close');
    $('#wrapper').css({
        opacity:0.15
    });
    $('#ranking').dialog('open');
    $('#ranking button').click(function(){
        location.reload();
        $('#wrapper').css({
            opacity:0.15
        });
    })
})