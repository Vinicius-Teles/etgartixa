var teclas = [];
var salto = 0;
var velocidade = 20;

teclas[16] = false;
teclas[32] = false;
teclas[37] = false;
teclas[38] = false;
teclas[39] = false;
teclas[40] = false;

var EtGartixa = function(){
	var etGartixa = this;
	var $etGartixa = $('<div class="move">');
	var interval = null;

	var init = function(){

		//CONFIGURAÇÕES QUE DEVEM IR PARA JS DO LEVEL ESPECÍFICO
		setInterval(function(){
			goFire();
		},1000);

		function goFire(){
			new Fire();
		}
		//------------------- FIM CÓDIGOS LEVEL------------------

		for(var i = 0; i < 5; i++){
			new Life();
		}

		$(document).on("keyup",function(event){
			teclas[event.which] = false;
			if(teclas[16] === false){
				clearInterval(interval);
				interval = setSpeed(100);
			}
		});

		$( document ).on( "keydown", function( event ) {
			if(teclas[event.which] === false){
				teclas[event.which] = true;
				if(teclas[16] === true){
					clearInterval(interval);
					interval = setSpeed(50);
				}
				if(teclas[32] === true){
					jump();
				}
			}
		});

		$etGartixa.position({
			top: 0,
			left: 0
		});

		$('body').append($etGartixa);

		interval = setSpeed(100)

		/*etGartixa.level1.init();*/
	}

	var Life = function(){
		var life = this;
		life.element = $('<div class="life">');
		$('.lifes').append(life.element);
	}

	var kill = function(){
		$etGartixa.animate({
			"width": "-=100"
		},100,function(){
			$etGartixa.animate({
				"top": 1000
			},400,function(){
				location.reload();
			});
		});
		life = 0;
	}

	var keyManager = function(){
		var toggle = false;
		if (teclas[39] === true){
			if(toggle === false){
				$etGartixa.toggleClass( "estado" );
				toggle = true;
			}
			$( ".move" ).animate({ "left": "+="+velocidade }, 10 );
		}

		if (teclas[40] === true){
			if(toggle === false){
				$etGartixa.toggleClass( "estado" );
				toggle = true;
			}
			$( ".move" ).animate({ "top": "+="+velocidade }, 10 );
		}
			
		if (teclas[38] === true){
			if(toggle === false){
				$etGartixa.toggleClass( "estado" );
				toggle = true;
			}
			$( ".move" ).animate({ "top": "-="+velocidade }, 10 );
		}
		if (teclas[37] === true){
			if(toggle === false){
				$etGartixa.toggleClass( "estado" );
				toggle = true;
			}
			$( ".move" ).animate({ "left": "-="+velocidade }, 10 );
		}	
	}

	function jump(){
		if(salto == 0){
			salto = 1;
			$(".move").animate({
				"width": "-=100",
			},200,function(){
				$(".move").animate({
					"width": "200px",
				},200,function(){
					salto = 0;
				});
			});
		}
	}

	var setSpeed = function(time){
		return setInterval(function(){
			keyManager();
		},time);
	}

	//ORGANIZAR
	var Fire = function(){
		var $fire = $('<div class="fire">');
		var fire = this;
		fire.el = $fire;
		$('body').append($fire);
		
		fire.width = $fire.width();
		fire.height = $fire.height();
		fire.coord = [];

		var left = Math.floor((Math.random()*100)+1);
		var top = window.screen.height;
		$fire.css("top",top+"px");
		$fire.css("left",left+"%");

		fire.coord[0] = $fire.offset().left;
		fire.coord[1] = $fire.offset().top;
		fire.coord[2] = 0;
		$fire.animate({
			top: "-50px"
		},{
			duration: 2000,
			progress: function(){
				fire.coord[0] = $fire.offset().left;
				fire.coord[1] = $fire.offset().top;
				fire.coord[2] = 0;
				if($fire.offset().top == -50){
					return;
				}
				return checkColision(fire);
			},
			complete: function(){
				$fire.remove();
			}
		});
		
		fire.destroy = function(){
			$fire.stop();
			$fire.remove();
		};
	};

function toggleBackground(){
	$('body').toggleClass("red");
}

function checkColision(fire){
		var left = $(".move").offset().left;
		var top = $(".move").offset().top;
		var width = $(".move").width();
		var height = $(".move").height();
		var a = {};
		a.x = fire.coord[0];
		a.y = fire.coord[1];
		var b = {};
		b.x = fire.coord[0] + fire.width;
		b.y = fire.coord[1];
		var c = {};
		c.x = fire.coord[0];
		c.y = fire.coord[1] + fire.height
		var d = {};
		d.x = fire.coord[0] + fire.width;
		d.y = fire.coord[1] + fire.height;
		if( 
			(
				( (a.x >= left) && (a.x <= (left + width)) ) && 
				( (a.y >= top) && (a.y <= (top + height)) )
			) || 
			(
				( (b.x >= left) && (b.x <= (left + width)) ) && 
				( (b.y >= top) && (b.y <= (top + height)) )
			) || 
			(
				( (c.x >= left) && (c.x <= (left + width)) ) && 
				( (c.y >= top) && (c.y <= (top + height)) )
			) || 
			(
				( (d.x >= left) && (d.x <= (left + width)) ) && 
				( (d.y >= top) && (d.y <= (top + height)) )
			)
		){
			$(".life").last().remove();
			var lifes = $(".life");
			if (lifes.length == 0) {
				kill();	
			}
			else{
				fire.destroy();
				toggleBackground();
				var id = setInterval(function(){
					toggleBackground();
					clearInterval(id);
				},70);
			}
		}
	}
	
	return{
		init: init,
		setSpeed: setSpeed
	}
}

