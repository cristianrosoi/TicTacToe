var app = {};

	app.player1_name = "Player 1";
	app.player2_name = "Player 2";
	app.player1_turn = true;
	app.player2_turn = false;
	app.playerOption = " ";
	app.turns = 0;
	app.response = document.getElementById('response');
	app.score = document.getElementById('score');
	app.player1_score = 0;
	app.player2_score = 0;
	app.total_score = 0;
	app.err = document.getElementById('err');
	app.isPlaying = false;
	app.soundIcon = document.getElementById('soundIcon');
	app.isP1inputValid = false;
	app.isP2inputValid = false;

	app.soundON = function() {
		app.music = document.getElementById('GameMusic');
		app.music.play();
		app.music.loop = true;

	}

	app.soundToggle = function() {
		if(app.isPlaying == true) {
			app.music.pause();
			app.isPlaying = false;
			app.soundIcon.className = "glyphicon glyphicon-volume-off";
		} else {
			app.soundON();
			app.isPlaying = true;
			app.soundIcon.className = "glyphicon glyphicon-volume-up";
		}

	}
	

	app.playerNames = function() {
		var p1 = document.getElementById('p1Name').value;
		var p2 = document.getElementById('p2Name').value;
		if (p1 != "" && p2 != "" && app.isP1inputValid == true && app.isP2inputValid == true) {
			app.player1_name = document.getElementById('p1Name').value;
			app.player2_name = document.getElementById('p2Name').value;
		} else {
			app.player1_name = "Player 1";
			app.playet2_name = "Player 2";
		}
		document.getElementById('score').innerHTML = app.player1_name + ": " + " ( 0 ) | " + app.player2_name + ": ( 0 )";
	}
	

	/*
	* =============== 
	* Data validation
	* ===============
	*/

	document.getElementById('p1Name').addEventListener('input', function() {	
	
	var p1NameInput = document.getElementById('p1Name');
	
	if(!/^[A-Za-z ]+$/.test(p1NameInput.value)) {
		document.getElementById('err').innerHTML = "Error: Please use only letters";
		p1NameInput.style.borderBottom = '2px solid red';
		app.isP1inputValid = false;
		document.getElementById('continueBtn').classList.add('disabled');	

	} else {		
		p1NameInput.style.borderBottom = '2px solid rgba(255, 255, 255, 1)';
		document.getElementById('err').innerHTML = "";
		app.isP1inputValid = true;
		
		if(app.isP1inputValid == true && app.isP2inputValid == true) {
			document.getElementById('continueBtn').classList.remove('disabled');
			document.getElementById('continueBtn').setAttribute('href', "#startGame");	
		}
		
	}
	
	});

	document.getElementById('p2Name').addEventListener('input', function() {	
	
	var p2NameInput = document.getElementById('p2Name');
	
	if(!/^[A-Za-z ]+$/.test(p2NameInput.value)) {
		document.getElementById('err').innerHTML = "Error: Please use only letters";
		p2NameInput.style.borderBottom = '2px solid red';
		app.isP2inputValid = false;
		document.getElementById('continueBtn').classList.add('disabled');	

	} else {		
		p2NameInput.style.borderBottom = '2px solid rgba(255, 255, 255, 1)';
		document.getElementById('err').innerHTML = "";
		app.isP2inputValid = true;

		if(app.isP1inputValid == true && app.isP2inputValid == true) {
			document.getElementById('continueBtn').classList.remove('disabled');	
			document.getElementById('continueBtn').setAttribute('href', "#startGame");
		}
	}
	
	});
	


	app.play = function (button) {						
		var btnID = button.id;

		// vs Human app logic

		if(app.turns == 9) {
			setTimeout(function(){app.response.innerHTML = "Game Over!"; }, 100);
		} else {

			if(app.turns == 0 || app.turns % 2 == 0) {			
				app.player1_turn = true;
				app.playerOption = "X";
				app.player2_turn = false;
				app.response.innerHTML = app.player2_name + "'s" + " turn";			
			} else {			
				app.player2_turn = true;
				app.playerOption = "0";
				app.player1_turn = false;	
				app.response.innerHTML = app.player1_name + "'s" + " turn";		
			}
			
			var box = document.getElementById(btnID);
			
			if(box.value == "") {
				box.value = app.playerOption;
				app.turns++;
			} else if (box.value == "X") {
				box.value = "X";
			} else {
				box.value = "0";
			}
			
			
			console.log("Turn: " + app.turns);	

		}

		/**
		* Tic Tac Toe Matrix: 
 		*
		* ROW_T	[TL, TM, TR]
		* ROW_M	[ML, MM, MR]
		* ROW_B	[BL, BM, BR]
		*
		* COL_L	[TL, ML, BL]
		* COL_M [TM, MM, BM]
		* COL_R	[TR, MR, BR]
		*
		* DIAG_L [TL, MM, BR]
		* DIAG_R [TR, MM, BL]
		*
		*/

		app.TL = document.getElementById('btnTopLeft');
		app.TM = document.getElementById('btnTopMiddle');
		app.TR = document.getElementById('btnTopRight');

		app.ML = document.getElementById('btnMiddleLeft');
		app.MM = document.getElementById('btnMiddleMiddle');
		app.MR = document.getElementById('btnMiddleRight');

		app.BL = document.getElementById('btnBottomLeft');
		app.BM = document.getElementById('btnBottomMiddle');
		app.BR = document.getElementById('btnBottomRight');

		app.ROW_T = [app.TL.value, app.TM.value, app.TR.value];
		app.ROW_M = [app.ML.value, app.MM.value, app.MR.value];
		app.ROW_B = [app.BL.value, app.BM.value, app.BR.value];

		app.COL_L = [app.TL.value, app.ML.value, app.BL.value];
		app.COL_M = [app.TM.value, app.MM.value, app.BM.value];
		app.COL_R = [app.TR.value, app.MR.value, app.BR.value];

		app.DIAG_L = [app.TL.value, app.MM.value, app.BR.value];
		app.DIAG_R = [app.TR.value, app.MM.value, app.BL.value];

		app.win = function (row) {
			if(row[0] != "" && row[1] != "" && row[2] !="" ) {
				if(row[0] == row[1] && row[0] == row[2]) {
					var win_value = document.getElementById(btnID).value; //here should be the value of the last input

					if(win_value == "X") {
						setTimeout(function(){app.response.innerHTML = app.player1_name + " Wins!"; }, 100);
						document.getElementById(btnID).className += " btn-transparent-success";						
						return "winning array";
					} else if(win_value == "0") {
						setTimeout(function(){app.response.innerHTML = app.player2_name + " Wins!"; }, 100);
						document.getElementById(btnID).className += " btn-transparent-success";		
						return "winning array";
					} 				
				}// end inner if
			}// end outter if
		}

		// winning cases
		app.win(app.ROW_T);
		app.win(app.ROW_M);
		app.win(app.ROW_B);
		
		app.win(app.COL_L);
		app.win(app.COL_M);
		app.win(app.COL_R);

		app.win(app.DIAG_L);
		app.win(app.DIAG_R);

		app.checkWin = function(array, elem1, elem2, elem3) {
			var win_value = document.getElementById(btnID).value;
			if(app.win(array) == "winning array") {
				elem1.className += " btn-transparent-success";
				elem2.className += " btn-transparent-success";
				elem3.className += " btn-transparent-success";
				if(win_value == "X") {
					app.player1_score++;
					app.score.innerHTML = app.player1_name + ": ( " + app.player1_score + ") | " + app.player2_name + ": ( " + app.player2_score + " )";
				} else {
					app.player2_score++;
					app.score.innerHTML = app.player1_name + ": ( " + app.player1_score + " ) | " + app.player2_name + ": ( " + app.player2_score + " )";
				}
				var inputs = document.getElementsByName('box');
				for(x in inputs) {
					inputs[x].disabled = "true";
				}
			}
		}

		app.checkWin(app.ROW_T, app.TL, app.TM, app.TR);
		app.checkWin(app.ROW_M, app.ML, app.MM, app.MR);
		app.checkWin(app.ROW_B, app.BL, app.BM, app.BR);
		
		app.checkWin(app.COL_L, app.TL, app.ML, app.BL);
		app.checkWin(app.COL_M, app.TM, app.MM, app.BM);
		app.checkWin(app.COL_R, app.TR, app.MR, app.BR);

		app.checkWin(app.DIAG_L, app.TL, app.MM, app.BR);
		app.checkWin(app.DIAG_R, app.TR, app.MM, app.BL);

	}// play vs human;

	app.playAgain = function() {
		var inputs = document.getElementsByName('box');
		var length = inputs.length;
		for(i=0; i<length; i++) {
			inputs[i].removeAttribute("disabled");
			inputs[i].value = "";
			inputs[i].className = "btn btnGame btn-transparent";
			
		}

		app.turns = 0;
		app.response.innerHTML = app.player1_name + "'s" + " turn";

	}

	app.topBtn = document.getElementById("top");
	app.logo = document.getElementById("logo");

	var myScrollFunc = function() {
  		
  		var y = window.scrollY;
 	 	
 	 	if (y === 0) {
    		app.topBtn.className = "btn btn-transparent hide";
    		app.logo.className = "btn btn-transparent hide";
    		app.score = "hide";
  		} else if (y > 500 && y < 700) {
    		app.topBtn.className = "btn btn-transparent show";
    		app.logo.className = "btn btn-transparent show";
    		app.score.className = "hide";
    		
  		} else if (y > 850) {
  			app.score.className = "show";
  		}
	};

	window.addEventListener("scroll", myScrollFunc);

	