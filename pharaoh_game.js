// Copy rights reserved for Mohamed Abulnasr
// before re use this code email me on objectiveerp@gmail.com.
$(document).ready(function(){
			$(window).resize(design);
			$(window).load(design);
			$("#xus,#ous").click(function(e){
				inTurn(this.id);
				choosePlayers(e);
			});

			$("#img_man,#img_pc").click(function(e) {
				if(this.id=='img_man') {
					$(this).css('border-bottom' ,'2px solid yellow');
					$("#img_pc").css('border-bottom' ,'2px solid goldenrod');
				} else {
					$(this).css('border-bottom' ,'2px solid yellow');
					$("#img_man").css('border-bottom' ,'2px solid goldenrod');
				}

				chooseOpposite(e);
			});

			$("#gtb").click(function(e){
				iPlay(e);
			});
			inTurn('xus');
			$("#img_pc").click();

		});
		var pNames=['Player1','Computer'];
		var players={
			 'turn':'xus' 
			,'next':'ous'
			,'oppo':'ous'
			,initV:'[]'
			, init: function(){
				var initV=[];
				for(var p in this){
					if(this.hasOwnProperty && p !='initV' && p !='init' && p !='reset'){
						initV[p]=this[p];
					};
				};
				this.initV=initV;	
			}
			, reset: function(){
				for(var p in this.initV){
					this[p]=this.initV[p];
				};
			}
		};

		var winPos=[
			 '11-21-31' ,'12-22-32', '13-23-33'
			,'11-12-13' ,'21-22-23', '31-32-33'
			,'11-22-33' ,'13-22-31'];

		var arDidx=[];
		var arDido=[];
		var finished=false;
		function design() {
			var w1=Math.round((parseInt($(window).width())-parseInt($("#otd").width()))/2);
//			$(".beside").width(w1);
			$("#gtb").html("");
			for(var i =1;i<=3;i++){
				$("#gtb").append("<tr>"
					+"<td id='"+i+"1' class='brick'></td>"
					+"<td id='"+i+"2' class='brick'></td>"
					+"<td id='"+i+"3' class='brick'></td>"
					+"</tr>");
			}
			var wh=''+Math.round(parseInt($(window).height())*.57);
			$("#gtb").height(wh);
			var wh=''+Math.round(wh/3)+'px';
			$(".brick").css({
				'width': wh,
				'height': wh

			});
			$(".brick").css('border-left-width','0');
			// limit images sizes.
//			$("h3").html(navigator.userAgent);
//			$("h3").append(' : '+$(window).width());
			//////////////////////////////////////////
			if(parseInt($(window).width())<800){
				var onR=Math.round((1+((800-parseInt($(window).width()))*0.005))*100)/100;

				$("#lev").css({'font-size':(100-onR*12) +'%'
					, "margin" : "0", "padding" : "0"
				});

				$("#img_man").css({"height" : parseInt($(window).height())*0.125
					, "margin" : "0", "padding" : "0"
				});

				$("#img_pc").css({"height" : parseInt($(window).height())*0.1
					, "margin" : "0", "padding" : "0"
				});
				$(".us,#sign,h3,footer").css({'font-size':(100-onR*22) +'%'
					, "margin" : "0", "padding" : "0"
				});

				$("#xusi,#ousi").css({"height" : parseInt($(window).height())*0.125
				});
				onR=0.05;
				$("#forimg").css({"width" : parseInt($(window).width())*onR
				});
			} else {
				$("#img_man,#img_pc").css({"max-width" : '' , "max-height" : ''});
			}
      players.init();
		}

		function swapPlayer(){
				var tmp=players.turn;
				players.turn=players.next;
				players.next=tmp;
				inTurn(players.turn);
		}

		function inTurn(e){
				if(e=='xus') {
					$("#"+e).css('border-bottom' ,'5px solid yellow');
					$("#ous").css('border-bottom' ,'');
				} else {
					$("#"+e).css('border-bottom' ,'5px solid yellow');
					$("#xus").css('border-bottom' ,'');
				}
		}

		function choosePlayers(e){
			iReset();

			if(e.currentTarget.id=='xus'){
				players.turn=e.currentTarget.id;
				$("#xusn").text(pNames[0]);
				players.next='ous';
				$("#ousn").text(pNames[1]);
				players.oppo=players.next;
			} else if (e.currentTarget.id=='ous') {
				players.turn=e.currentTarget.id;
				$("#ousn").text(pNames[0]);
				players.next='xus';
				$("#xusn").text(pNames[1]);
				players.oppo=players.next;
			}
		}

		function chooseOpposite(e){
			iReset();
			if(e.currentTarget.id=='img_man'){
				pNames[1]='Player2';
			} else if (e.currentTarget.id=='img_pc') {
				pNames[1]='Computer';
			};
			$("#"+players.oppo+"n").text(pNames[1]);
		}

		function iReset(){
			$(".brick").html("");
			arDidx=[];
			arDido=[];
			finished=false;
		}

		function iPlay(e){
			if(finished){
				iReset();
				swapPlayer();
			}

			if(e.toElement.className=='brick' && $("#"+e.toElement.id).html()==''){
				$("#"+e.toElement.id).html($("#"+players.turn+"i").clone());
				if(players.turn.slice(0,1)=='x')
					arDidx.push(e.toElement.id);
				else {
					arDido.push(e.toElement.id);
				}
				swapPlayer();
				var what=winChecker(e.toElement.id, players.next);
				if(pNames[1]=='Computer' && what=='')
					var et=setTimeout(cPlay, 500);
			}
		}

		function cChoose() {
			var arBricks=['11','12','13', '21','22','23', '31','32','33'];
			var cBricks=[];
			var cBrick='';
			var arAva=[];
			// 1- get availables bricks 
			arAva=arBricks.filter(function(e) {
				return (arDidx.indexOf(e)==-1 && arDido.indexOf(e)==-1);
			});

			var wina=0;
			var human1=(players.oppo.slice(0,1)=='x'?'o':'x');
			var idea1=[];
			var idea2=[];
			for(var i=0; i<winPos.length; i++){
				var d=winPos[i].split('-');
				var avav=[];
				wina=0;
				cBrick='';
				for(var ii=0; ii<d.length; ii++){
					if(eval('arDid'+human1).indexOf(d[ii])!=-1){
						wina=0;
						break;
					}
					if(eval('arDid'+players.oppo.slice(0,1)).indexOf(d[ii])!=-1){
						wina++;
					}
				}
				if(wina==2) {
					avav=d.filter(function(e) {
						return arAva.indexOf(e)!=-1;
					});
				}
				else if(wina==1) {
					avav=d.filter(function(e) {
						return arAva.indexOf(e)!=-1;
					});
				}
				if(avav.length>0){
					cBrick=avav[0];
					return cBrick;
				}
			}

			if(cBrick==''){
				if(avav.length>0){
					var r=Math.ceil(Math.random()*(avav.length-1));
					cBrick=avav[r];
				}
				else {
					var r=Math.ceil(Math.random()*(arAva.length-1));
					cBrick=arAva[r];
				}
			}			
			return cBrick;
		}

		function cPlay(){
			if(finished){
				iReset();
				swapPlayer();
			}
			cBrick=cChoose();

			if($("#"+cBrick).html()=='') {
				$("#"+cBrick).html($("#"+players.turn+"i").clone());
				if(players.turn.slice(0,1)=='x')
					arDidx.push(cBrick);
				else {
					arDido.push(cBrick);
				}
				var what = winChecker('', players.next);
				if(what=='')
					swapPlayer();
			}	
		}

		function winChecker(id, player){
			var wina=0;
			for(var i=0; i<winPos.length; i++){
				var d=winPos[i].split('-');
				wina=0;
				for(var ii=0; ii<d.length; ii++){
					if(arDidx.indexOf(d[ii])!=-1){
						wina++;
						if(wina==3)	 {
							winCeleb('xus');
							finished=true;
							return 'xus';
						}
					};
				};

				wina=0;
				for(var ii=0; ii<d.length; ii++){
					if(arDido.indexOf(d[ii])!=-1){
						wina++;
						if(wina==3)	 {
							winCeleb('ous');
							finished=true;
							return 'ous';
						}
					};
				};
			};
			return '';
		}

		function winCeleb(id){
			$("#winner").click(function(event) {
				$(this).css('display','none').html('');
				if(finished){
					iReset();
					swapPlayer();
				}
			});
			var wText='<div class="wImg">&nbsp;</div><div class="wText">The Winner is :) <span style="color:yellow">'+	$("#"+id+"n").text()	+'</span></div>';
			$("#winner").css('display','block');			
			$("#winner").append(wText);
			$("#"+id+"i").clone().appendTo($("#winner .wImg"));
			$("#winner .wImg").css({
				 'top':parseInt($(window).height())/2-parseInt($("#winner .wImg").height())/2-parseInt($("#winner .wText").height())
				,'left':parseInt($(window).width())/2 - parseInt($("#winner .wImg").width())/2
			});
			$("#winner .wText").css({
				 'top':parseInt($("#winner .wImg").css('top'))+parseInt($("#winner .wImg").height())+parseInt($("#winner .wText").height())/3
				,'left':parseInt($(window).width())/2 - parseInt($("#winner .wText").width())/2
			});
		}
