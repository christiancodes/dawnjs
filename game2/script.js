enchant();

	var game;
	var window_focus = true;

	var audio; var arrowdraw; var arrowflurry;
	var arrowhit; var arrowmiss; var granolayum;
	var jump; var swordhit1; var swordhit2;
	var swordmiss; var swordyank; var UrsaVocal1;
	var UrsaVocal2; var UrsaVocal3; var UrsaVocal4;
	var UrsaVocal5; var UrsaVocal6; var UrsaVocal7; var UrsaVocal8;

	//.aac doesn't play nice with Opera
	if (navigator.userAgent.indexOf('OPR') > -1)
	{
		audio = new Audio("game2/UrsaLoopFINAL.ogg");
		arrowdraw = new Audio("game2/Ursa Soundpack/arrowdraw.ogg");
		arrowflurry = new Audio("game2/Ursa Soundpack/arrowflurry.ogg");
		arrowhit = new Audio("game2/Ursa Soundpack/arrowhit.ogg");
		arrowmiss = new Audio("game2/Ursa Soundpack/arrowmiss.ogg");
		granolayum = new Audio("game2/Ursa Soundpack/granolayum.ogg");
		jump = new Audio("game2/Ursa Soundpack/jump.ogg");
		swordhit1 = new Audio("game2/Ursa Soundpack/swordhit1.ogg");
		swordhit2 = new Audio("game2/Ursa Soundpack/swordhit2.ogg");
		swordmiss = new Audio("game2/Ursa Soundpack/swordmiss.ogg");
		swordyank = new Audio("game2/Ursa Soundpack/swordyank.ogg");
		UrsaVocal1 = new Audio("game2/Ursa Soundpack/Ursavocal1.ogg");
		UrsaVocal2 = new Audio("game2/Ursa Soundpack/Ursavocal2.ogg");
		UrsaVocal3 = new Audio("game2/Ursa Soundpack/Ursavocal3.ogg");
		UrsaVocal4 = new Audio("game2/Ursa Soundpack/Ursavocal4.ogg");
		UrsaVocal5 = new Audio("game2/Ursa Soundpack/Ursavocal5.ogg");
		UrsaVocal6 = new Audio("game2/Ursa Soundpack/Ursavocal6.ogg");
		UrsaVocal7 = new Audio("game2/Ursa Soundpack/Ursavocal7.ogg");
		UrsaVocal8 = new Audio("game2/Ursa Soundpack/Ursavocal8.ogg");
	}
	else
	{
		audio = new Audio("game2/UrsaLoopFINAL.m4a");
		arrowdraw = new Audio("game2/Ursa Soundpack AAC/arrowdraw.m4a");
		arrowflurry = new Audio("game2/Ursa Soundpack AAC/arrowflurry.m4a");
		arrowhit = new Audio("game2/Ursa Soundpack AAC/arrowhit.m4a");
		arrowmiss = new Audio("game2/Ursa Soundpack AAC/arrowmiss.m4a");
		granolayum = new Audio("game2/Ursa Soundpack AAC/granolayum.m4a");
		jump = new Audio("game2/Ursa Soundpack AAC/jump.m4a");
		swordhit1 = new Audio("game2/Ursa Soundpack AAC/swordhit1.m4a");
		swordhit2 = new Audio("game2/Ursa Soundpack AAC/swordhit2.m4a");
		swordmiss = new Audio("game2/Ursa Soundpack AAC/swordmiss.m4a");
		swordyank = new Audio("game2/Ursa Soundpack AAC/swordyank.m4a");
		UrsaVocal1 = new Audio("game2/Ursa Soundpack AAC/Ursavocal1.m4a");
		UrsaVocal2 = new Audio("game2/Ursa Soundpack AAC/Ursavocal2.m4a");
		UrsaVocal3 = new Audio("game2/Ursa Soundpack AAC/Ursavocal3.m4a");
		UrsaVocal4 = new Audio("game2/Ursa Soundpack AAC/Ursavocal4.m4a");
		UrsaVocal5 = new Audio("game2/Ursa Soundpack AAC/Ursavocal5.m4a");
		UrsaVocal6 = new Audio("game2/Ursa Soundpack AAC/Ursavocal6.m4a");
		UrsaVocal7 = new Audio("game2/Ursa Soundpack AAC/Ursavocal7.m4a");
		UrsaVocal8 = new Audio("game2/Ursa Soundpack AAC/Ursavocal8.m4a");
	}
	audio.loop = true;
	audio.volume = 0.5;

function startBearGame() {
	game = new Core(500, 500);
	game.fps = 36;
	game.scale = 1;
	game.preload("game2/images/placeholderBG.png", "game2/images/monsterbox.png", "game2/images/optionbox.png",
	"game2/images/partybox.png", "game2/images/cursor.png", "game2/images/transitionSheet.png", "game2/images/clawattacksheet.png",
	"game2/images/dialogueBox.png", "game2/images/ursa.png", "game2/images/arrowattacksheet.png", "game2/images/scytheattacksheet.png",
	"game2/images/healingsheet.png", "game2/images/DurielSprites.png", "game2/images/BG.png", "game2/images/swordattacksheet.png",
	"game2/images/DurielSheetRev3.png", "game2/images/AnnaSheetRef3.png", "game2/images/threatBar.png", "game2/images/threatGuage.png",
	"game2/images/comboattacksheet.png", "game2/images/mute.png", "game2/images/pageTurn.png", "game2/images/testbutton.png");

	var thisGame = window.document.getElementById("enchant-stage");

	game.keybind(88, "a");
	game.keybind(90, "b");
	game.keybind(27, "a");
	game.keybind(32, "b");
	game.keybind(87, "up");
	game.keybind(83, "down");
	game.keybind(65, "left");
	game.keybind(68, "right");

	game.fonts = "14px 'Open Sans', serif";

	game.aPressed = false; //checks if the A button was pressed during the last frame
	game.bPressed = false;
	game.upPressed = false;
	game.downPressed = false;

	game.characterActing = false;

	//cursor position variables that need to be available in other js files
	game.cursorPosX;
	game.cursorPosY;

	game.itemCursorPosX;
	game.itemCursorPosY;
	game.chosenItem;

	game.sceneStarted = false;
	//0 = options 1 = attack 2 = lose 3 = win
	var currentPhase = -1;
	//opening dialogue switch
	var dialogueShown = false;
	var currentDialogue = 0;
	//"Options" variables
	var currentHero = 0;
	//"Actions" variables
	var actionPresented = false;
	//arrays to sort characters by their speed before actions take place
	var characters = [];
	var gameOver = false;
	var winPhaseOver = false;
	//counter to determine when 5 full turns have passed
	var turnCounter = 0;
	var comboTurn = false;
	var comboStarted = false;

	var MainScene = Class.create(Scene, {
		initialize: function(){
			Scene.apply(this);

			audio.play();
			this.backgroundColor = "#000000";

		var reset = function(){
			//this will contain to to re-sort the character array after each turn
			currentHero = 0;
		}

			//positions in the battlescreen where characters can be placed
			var heroPosesX = [40, 435]; //40, 435
			var heroPosesY = [275, 275]; // 275, 275
			var heroCursorPosesX = [20, 415];
			var monsterPosesX = [200];
			var monsterPosesY = [280];

			//constants on the battle screen. menus etc
			var background = new Sprite(500, 500);
			background.x = 0;
			background.y = 0;
			//background.opacity = 0;
			background.backgroundColor = "#000000";
			background.image = game.assets["game2/images/BG.png"];
			this.addChild(background);

			var transitionSheet = new Sprite(500, 500);
			transitionSheet.x = 0;
			transitionSheet.y = 0;
			transitionSheet.image = game.assets["game2/images/transitionSheet.png"];
			this.addChild(transitionSheet);

			var threatBar = new Sprite(146, 11);
			threatBar.x = game.width / 2 - threatBar.width / 2;
			threatBar.y = 335;
			threatBar.image = game.assets["game2/images/threatBar.png"];
			threatBar.opacity = 0;
			this.addChild(threatBar);

			var threatGuage = new Sprite(5, 11);
			threatGuage.x = Math.floor(game.width / 2 - threatGuage.width / 2);
			threatGuage.y = 335;
			threatGuage.image = game.assets["game2/images/threatGuage.png"];
			threatGuage.opacity = 0;
			this.addChild(threatGuage);

			var monsterBox = new Sprite(200, 150);
			monsterBox.x = 0;
			monsterBox.y = 350;
			monsterBox.opacity = 0;
			monsterBox.image = game.assets["game2/images/monsterbox.png"];
			this.addChild(monsterBox);

			//eventually you'll want this in some sort of array that
			//re-sorts itself when a monster dies. For now, you'll only
			//need the one label, so remember to flesh this out later on
			var monsterNamePosX = monsterBox.x + 25;
			var monsterNamePosY = monsterBox.y + 25;

			var monsterName = new Label("URSA DRACONIS");
			monsterName.x = monsterNamePosX;
			monsterName.y = monsterNamePosY;
			monsterName.opacity = 0;
			monsterName.font = "bold " + game.fonts;
			monsterName.color = "#FFFFFF";
			this.addChild(monsterName);

			var partyBox = new Sprite(300, 150);
			partyBox.x = 200;
			partyBox.y = 350;
			partyBox.opacity = 0;
			partyBox.image = game.assets["game2/images/partybox.png"];
			this.addChild(partyBox);

			//partybox's poses for placing the assorted labels
			partyPosesX = [partyBox.x + 25, partyBox.x + 125, partyBox.x + 155, partyBox.x + 225];
			partyPosesY = [partyBox.y + 25, partyBox.y + 50];

			//the optionbox, options, and cursor should be grouped to manage opacity
			var optionBox = new Sprite(125, 150);
			optionBox.x = 75;
			optionBox.y = 350;
			optionBox.image = game.assets["game2/images/optionbox.png"];
			optionBox.opacity = 0.0;
			this.addChild(optionBox);

			var optionLabels = new Array();
			optionLabels.push(new Label("FIGHT"));
			optionLabels.push(new Label("SKILL"));
			optionLabels.push(new Label("ITEM"));
			optionLabels.push(new Label("RUN"));

			var optionLabelPosX = optionBox.x + 45;
			var optionLabelPosY = optionBox.y + 25;

			game.cursorPosX = optionLabelPosX - 28;
			//store cursor poses while the labels are added
			game.cursorPosY = new Array();

			for (n = 0; n < optionLabels.length; n++)
			{
				optionLabels[n].x = optionLabelPosX;
				optionLabels[n].y = optionLabelPosY;
				optionLabels[n].font = "bold " + game.fonts;
				optionLabels[n].color = "#FFFFFF";
				optionLabels[n].opacity = 0.0;
				this.addChild(optionLabels[n]);
				if (window.mozInnerScreenX != null)
					game.cursorPosY.push(optionLabelPosY - 3);
				else
					game.cursorPosY.push(optionLabelPosY + 1);
				optionLabelPosY += 30;
			}

			var dialogueBox = new Sprite(500, 100);
			dialogueBox.x = 0;
			dialogueBox.y = 0;
			dialogueBox.image = game.assets["game2/images/dialogueBox.png"];
			dialogueBox.frame = 0;
			dialogueBox.opacity = 0;
			this.addChild(dialogueBox);

			var dialogueLabel = new Label("");
			createLabel(dialogueLabel, 0, 40);
			dialogueLabel.opacity = 0;
			dialogueLabel.set = function(text){
				dialogueLabel.text = text;
				dialogueLabel.x = 30;
				dialogueLabel.width = 400;
			};
			this.addChild(dialogueLabel);

			var itemBox = new Sprite(300, 150);
			itemBox.x = 200;
			itemBox.y = 350;
			itemBox.opacity = 0;
			itemBox.image = game.assets["game2/images/partybox.png"];
			this.addChild(itemBox);

			var itemBoxSelected = false;
			//variables you'll need to set up the item labels
			var itemPosesX = [itemBox.x + 50, itemBox.x + 225];
			var itemPosesY = [itemBox.y + 25, itemBox.y + 50, itemBox.y + 75, itemBox.y + 100];

			game.itemCursorPosX = itemPosesX[0] - 28;
			game.itemCursorPosY = [];

			for (n = 0; n < itemPosesY.length; n++)
			if (window.mozInnerScreenX != null)
					game.itemCursorPosY.push(itemPosesY[n] - 3);
				else
					game.itemCursorPosY.push(itemPosesY[n] + 1);

			var itemNameLabels = [];
			var itemQuantityLabels = [];

			for (n = 0; n < 4; n++){
				itemNameLabels.push(new Label(""));
				createLabel(itemNameLabels[n], itemPosesX[0], itemPosesY[n]);
				this.addChild(itemNameLabels[n]);
				itemQuantityLabels.push(new Label(""));
				createLabel(itemQuantityLabels[n], itemPosesX[1], itemPosesY[n]);
				this.addChild(itemQuantityLabels[n]);
			}

			//current version will assume 4 or fewer item types.
			//needless to say you'll want to expand this later.
			var rearrangeItems = function(){
				for (n = 0; n < itemNameLabels.length; n++){
					itemNameLabels[n].text = "";
					itemQuantityLabels[n].text = "";
				}
				for (n = 0; n < items.length; n++){
					itemNameLabels[n].text = items[n][0].name;
					itemQuantityLabels[n].text = items[n][1];
				}
			}

			var monster = new Monster("Ursa Draconis", 500);
			this.addChild(monster);

			//object declarations
			var heroes = new Array();

			heroes.push(new Hero("Anna", heroPosesX[0], heroPosesY[0], 23, 50));
			heroes.push(new Hero("Duriel", heroPosesX[1], heroPosesY[0], 35, 60));
			for (n = 0; n < heroes.length; n++)
				this.addChild(heroes[n]);

			game.heals = new Array();
			game.heals.push(new Heal(heroPosesX[0], heroPosesY[0]));
			game.heals.push(new Heal(heroPosesX[1], heroPosesY[1]));
			for (n = 0; n < game.heals.length; n++)
				this.addChild(game.heals[n]);

			game.clawAttacks = new Array();
			game.clawAttacks.push(new ClawAttack(heroPosesX[0], heroPosesY[0]));
			game.clawAttacks.push(new ClawAttack(heroPosesX[1], heroPosesY[1]));
			for (n = 0; n < game.clawAttacks.length; n++)
				this.addChild(game.clawAttacks[n]);

			game.arrowAttack = new ArrowAttack();
			this.addChild(game.arrowAttack);
			game.scytheAttack = new ScytheAttack();
			this.addChild(game.scytheAttack);
			game.swordAttack = new SwordAttack();
			this.addChild(game.swordAttack);
			game.comboAttack = new ComboAttack();
			this.addChild(game.comboAttack);

			var isMobile = false;
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				isMobile = true;
			}

			var aClicked = false;
			var bClicked = false;

			if (isMobile){
				var aButton = new Sprite(50, 50);
				aButton.x = 430;
				aButton.y = 430;
				aButton.image = game.assets["game2/images/testbutton.png"];
				this.addChild(aButton);
				aButton.addEventListener("touchend", function(){
				if (this.opacity == 1.0){
					aClicked = true;
				}
				});

				var bButton = new Sprite(50, 50);
				bButton.x = 350;
				bButton.y = 430;
				bButton.image = game.assets["game2/images/testbutton.png"];
				this.addChild(bButton);
				bButton.addEventListener("touchend", function(){
				if (this.opacity == 1.0)
					bClicked = true;
				});

				var pad = new Pad();
				pad.x = 0;
				pad.y = 400;
				this.addChild(pad);
			}

			var muteButton = new Sprite(30, 29);
			muteButton.x = 450;
			muteButton.y = 20;
			muteButton.image = game.assets["game2/images/mute.png"];
			muteButton.frame = 0;
			muteButton.opacity = 0;
			this.addChild(muteButton);
			game.isMuted = false;
			muteButton.addEventListener("touchend", function(){
				if (!audio.paused){
					audio.pause();
					this.frame = 1;
					game.isMuted = true;
				} else {
					audio.play();
					this.frame = 0;
					game.isMuted = false;
				}
			});

			var pageTurn = new Sprite(20, 20);
			pageTurn.x = 450;
			pageTurn.y = 450;
			pageTurn.image = game.assets["game2/images/pageTurn.png"];
			pageTurn.frame = 0;
			pageTurn.opacity = 0;
			this.addChild(pageTurn);
			pageTurn.addEventListener("enterframe", function(){
				if (game.currentScene.age % 9 == 0)
					pageTurn.frame++;
			});
			pageTurn.addEventListener("touchend", function(){
				if (winPhaseOver)
					window.location.assign("http://playerprophet.com/thosewithoutshadows/i.01.10.html");
			});

			var nameLabels = new Array();
			var hpLabels = new Array();
			var maxhpLabels = new Array();
			var mpLabels = new Array();

			for (n = 0; n < heroes.length; n++)
			{
				characters.push(heroes[n]); //used for determining action order
				nameLabels.push(new heroLabel(heroes[n].name, partyPosesX[0], partyPosesY[n]));
				this.addChild(nameLabels[n]);
				hpLabels.push(new hpLabel(heroes[n].hp, partyPosesX[1], partyPosesY[n]));
				this.addChild(hpLabels[n]);
				maxhpLabels.push(new maxLabel(heroes[n].maxHP, partyPosesX[2], partyPosesY[n]));
				this.addChild(maxhpLabels[n]);
				mpLabels.push(new mpLabel(heroes[n].mp, partyPosesX[3], partyPosesY[n]));
				this.addChild(mpLabels[n]);
			}

			var cursor = new Cursor("options", 0);
			this.addChild(cursor);

			var heroCursors = [];
			for (n = 0; n < heroes.length; n++){
				heroCursors.push(new Cursor("hero", heroCursorPosesX[n]));
				this.addChild(heroCursors[n]);
			}

			var itemCursor = new Cursor("item", 0);
			this.addChild(itemCursor);

			characters.push(monster);

			//shuffle(characters); <-- May need later, but for now, better to go based on speed for this setup

			//tl sequence for scene opening
			//background.tl.delay(20).fadeIn(35);
			function sceneStart(){
				for (n = 0; n < heroes.length; n++)
					heroes[n].tl.delay(20).fadeIn(35);
				monster.tl.delay(20).fadeIn(35).delay(10).then(function(){
				game.sceneStarted = true;
				threatBar.opacity = 1;
				threatGuage.opacity = 1;
				monsterBox.opacity = 1;
				monsterName.opacity = 1;
				partyBox.opacity = 1;
				muteButton.opacity = 1;
				for (n = 0; n < nameLabels.length; n++){
					nameLabels[n].opacity = 1;
					hpLabels[n].opacity = 1;
					maxhpLabels[n].opacity = 1;
					mpLabels[n].opacity = 1;
				}
			});
			}

			function sceneEnd(){
				for (n = 0; n < heroes.length; n++)
					heroes[n].tl.fadeOut(30);
				dialogueLabel.opacity = 0;
				dialogueBox.opacity = 0;
				threatBar.tl.fadeOut(30);
				threatGuage.tl.fadeOut(30);
				monsterBox.tl.fadeOut(30);
				monsterName.tl.fadeOut(30);
				partyBox.tl.fadeOut(30);
				for (n = 0; n < nameLabels.length; n++){
					nameLabels[n].tl.fadeOut(30);
					hpLabels[n].tl.fadeOut(30);
					maxhpLabels[n].tl.fadeOut(30);
					mpLabels[n].tl.fadeOut(30);
				}
				if (isMobile){
					aButton.opacity = 0;
					aButton.x = 5;
					bButton.opacity = 0;
					bButton.x = 5;
					pad.opacity = 0;
				}
				background.tl.fadeOut(30).then(function(){
					pageTurn.opacity = 1;
				});
			}

			transitionSheet.tl.repeat(function(){transitionSheet.frame++}, 14);
			sceneStart();



			function showOptions()
			{
				//automate this better later, it won't scale easily to future battles
				if (characters[currentHero].name == "Anna"){
					optionLabels[1].color = "#BBBBBB";
					optionLabels[1].text = "SKILL";
					optionLabels[3].text = "RUN"
				} else if (characters[currentHero].name == "Duriel"){
					optionLabels[1].color = "#FFFFFF";
					optionLabels[1].text = "JUMP";
					optionLabels[3].text = "WAIT";
				}
				optionBox.opacity = 1.0;
				for (n = 0; n < optionLabels.length; n++)
					optionLabels[n].opacity = 1.0;
				cursor.opacity = 1.0;
			}

		function hideOptions()
		{
			optionBox.tl.hide();
			for (n = 0; n < optionLabels.length; n++)
				optionLabels[n].tl.hide();
			cursor.tl.hide();
			cursor.currentPos = 0;
			cursor.y = game.cursorPosY[cursor.currentPos];
		}

		function showItems(){
			for (n = 0; n < nameLabels.length; n++){
				nameLabels[n].opacity = 0;
				hpLabels[n].opacity = 0;
				maxhpLabels[n].opacity = 0;
				mpLabels[n].opacity = 0;
			}
			cursor.tl.hide();
			//itemBox.opacity = 1.0;
			for (n = 0; n < itemNameLabels.length; n++){
				if (items[n] != undefined && items[n][1] > 0){
					itemNameLabels[n].opacity = 1.0;
					itemQuantityLabels[n].opacity = 1.0;
				}
			}
			itemCursor.opacity = 1;
		}

		function hideItems(){
			//itemBox.opacity = 0.0;
			for (n = 0; n < nameLabels.length; n++){
				nameLabels[n].opacity = 1;
				hpLabels[n].opacity = 1;
				maxhpLabels[n].opacity = 1;
				mpLabels[n].opacity = 1;
			}
			cursor.opacity = 1.0;
			for (n = 0; n < itemNameLabels.length; n++){
					itemNameLabels[n].opacity = 0.0;
					itemQuantityLabels[n].opacity = 0.0;
			}
			itemCursor.opacity = 0;
			itemCursor.currentItemPos = 0;
			itemCursor.y = game.itemCursorPosY[itemCursor.currentItemPos];
		}

		function calculateDamage(attackerATK, targetDFS){
			var randomizer = Math.floor((Math.random() * 50) + 100) / 100;
			var damage = Math.round(attackerATK * randomizer - targetDFS);
			if (damage <= 0)
				damage = 1;
			return damage;
		}

		function attackHits(attackerACC, targetEVD){
			var baseline = 168;
			var hitChance = baseline * (attackerACC / 100);
			var newbase = Math.min(baseline + hitChance, 255);
			var evadeChance = baseline * (targetEVD / 100);
			var finalAttack = newbase - evadeChance;

			var randomizer = Math.floor((Math.random() * 200) + 1);
			if (randomizer == 0)
				return true;
			if (randomizer == 200)
				return false;
			if (randomizer <= finalAttack)
				return true;
			return false;
		}

		function adjustDamage(character, damage){
			if (character.type == "hero"){
				var newhp;
				for (n = 0; n < heroes.length; n++){
					if (heroes[n].name == character.name)
					{
						newhp = Math.max(heroes[n].hp - damage, 0);
						heroes[n].hp = newhp;
						hpLabels[n].text = newhp + "  /";
					}
				}
				//will ignore dead heroes
				if (heroes[0].hp <= 0 && heroes[1].hp > 0)
					monster.frame = 3;
				if (heroes[1].hp <= 0 && heroes[0].hp > 0)
					monster.frame = 2;
			} else if (character.type == "monster"){
					monster.hp = Math.max(monster.hp - damage, 0);
			}
		}

		function adjustItem(hero, itemnumber){
			for (n = 0; n < heroes.length; n++){
				if (heroes[n].name == hero.name)
					hpLabels[n].text = heroes[n].hp + "  /";
			}
		}

		//need to set this to decrease during the option phase, but can't have the element spliced before it's
		//used or it screws things up. Set it to hide the labels at this stage (and not let other players use
		//hidden labels) then go back later and remove the element if the corresponding label is hidden.
		function decreaseItem(itemnumber)
		{
			items[itemnumber][1]--;
			itemQuantityLabels[itemnumber].text = items[itemnumber][1];
			if (items[itemnumber][1] <= 0){
				itemNameLabels[itemnumber].opacity = 0;
				itemQuantityLabels[itemnumber].opacity = 0;
			}
		}

		function clearItems()
		{
			for (n = 0; n < items.length; n++){
				if (items[n][1] <= 0)
					items.splice(n, 1);
			}
		}

		function adjustMonsterFocus(character, damage){
			if (heroes[0].hp > 0 && heroes[1].hp > 0){
				for (n = 0; n < heroes.length; n++){
					if (character.name == "Anna"){
						monster.focus -= damage;
						threatGuage.tl.moveTo(Math.max(threatGuage.x - damage, threatBar.x), threatGuage.y, 20);
					}else if (character.name == "Duriel"){
						monster.focus += damage;
						threatGuage.tl.moveTo(Math.min(threatGuage.x + damage, threatBar.x + threatBar.width - threatGuage.width), threatGuage.y, 20);
					}
					if (monster.focus <= 0)
						monster.frame = monster.leftFrame;
					else if (monster.focus > 0)
						monster.frame = monster.rightFrame;
				}
			}
		}

			var currentAge = 0;
			var delayStarted = false;
			function delayer()
			{
				if (delayStarted == true){
					if (game.currentScene.age >= currentAge + 15)
						delayStarted = false;
					}
			}

			function resetHighlights(){
				for (n = 0; n < heroes.length; n++){
					nameLabels[n].color = "#FFFFFF";
					hpLabels[n].color = "#FFFFFF";
					maxhpLabels[n].color = "#FFFFFF";
					mpLabels[n].color = "#FFFFFF";
					heroCursors[n].opacity = 0.0;
				}
			}

			function highlightPlayer(player){
				for (n = 0; n < heroes.length; n++){
					if (heroes[n].name == player.name){
						nameLabels[n].color = "#FFFF00";
						hpLabels[n].color = "#FFFF00";
						maxhpLabels[n].color = "#FFFF00";
						mpLabels[n].color = "#FFFF00";
						heroCursors[n].opacity = 1.0;
					}
				}
			}

			function endTurn(){
				hideOptions();
				resetHighlights();
				currentAge = game.currentScene.age;
				delayStarted = true;
				currentPhase++;
			}

			this.addEventListener("enterframe", function(e){

                        if (!document.getElementById("enchant-stage")) {
                          audio.pause();
                        }

			if (game.sceneStarted){
			//run to check if a delay should be in place
			delayer();
			if (currentPhase == -1){
				if (!dialogueShown){
					dialogueShown = true;
					var text = openingLines[currentDialogue]
					dialogueLabel.set(text);
					dialogueLabel.opacity = 1;
					dialogueBox.opacity = 1;
				}
				if ((game.input.b || bClicked) && !game.bPressed){
					if (currentDialogue < openingLines.length - 1){
						currentDialogue++;
						dialogueShown = false;
					} else{
						currentPhase++;
						dialogueLabel.opacity = 0;
						dialogueBox.opacity = 0;
					}
				}
			}
			//Options Phase
			else if (currentPhase == 0 && !itemBoxSelected){
				//skip dead characters
				if (comboTurn){
					if (comboStarted)
						comboAnimate();
					currentPhase++;
				} else if (characters[currentHero].hp <= 0){
					currentHero++;
				}else if (isMonster(characters[currentHero])){ //check if it's the monster and don't give options if so
					characters[currentHero].action = "fight";
					var target = (monster.frame == monster.leftFrame ? 0 : 1);
					if (attackHits(monster.accuracy, heroes[target].evade)){
						monster.attackHit = true;
						monster.lastTarget = target;
						var damage = calculateDamage(monster.attack, heroes[target].defense);
						monster.damageDone = damage;
					} else
						monster.attackHit = false;
					characters[currentHero].attackAnim(heroes[target], target);
					currentPhase++;
				}else{
				if (optionBox.opacity == 0.0 && !delayStarted){
					showOptions();
					highlightPlayer(characters[currentHero]);
				}
				if ((game.input.b || bClicked) && !game.bPressed){
					if (cursor.currentPos == 0){
						if (attackHits(characters[currentHero].accuracy, monster.evade)){
								characters[currentHero].lastDamage = calculateDamage(characters[currentHero].attack, monster.defense);
								characters[currentHero].attackHit = true;
						} else
							characters[currentHero].attackHit = false;
						characters[currentHero].action = "fight";
						characters[currentHero].fightAction();
						endTurn();
					}
					if (cursor.currentPos == 1 && optionLabels[1].color == "#FFFFFF"){
						characters[currentHero].action = "skill";
						characters[currentHero].act(characters[2]);
						characters[currentHero].skillAction(characters[2]);
						endTurn();
					}
					if (cursor.currentPos == 2){
						rearrangeItems();
						showItems();
						itemBoxSelected = true;
					}
					if (cursor.currentPos == 3){
						characters[currentHero].action = "run";
						endTurn();
					}
				}
				}
			}
			//item box selected
			else if (currentPhase == 0 && itemBoxSelected){
				if ((game.input.b || bClicked) && !game.bPressed){
					if (items[itemCursor.currentItemPos] != undefined && itemNameLabels[itemCursor.currentItemPos].opacity == 1.0){
						game.chosenItem = itemCursor.currentItemPos;
						characters[currentHero].action = "item";
						decreaseItem(itemCursor.currentItemPos);
						hideItems();
						itemBoxSelected = false;
						characters[currentHero].itemAction();
						endTurn();
					}
				}
				if ((game.input.a || aClicked) && !game.aPressed){
					hideItems();
					itemBoxSelected = false;
				}
			}
			//Actions Phase
			else if (currentPhase == 1 && !game.characterActing){
				if (!actionPresented && !delayStarted){
					actionPresented = true;

					if (comboTurn){
						if (turnCounter == 5){
							dialogueLabel.set("The villagers have arrived!");
							turnCounter++;
							comboStarted = true;
						}else{
							adjustDamage(monster, 40);
							dialogueLabel.set("Villagers hit " + monster.name + " for 40 hp.");
							comboTurn = false;
						}
						dialogueLabel.opacity = 1.0;
						dialogueBox.opacity = 1.0;
						currentHero--;
					} else if (characters[currentHero].hp > 0){
					if (characters[currentHero].action == "fight"){
						dialogueBox.opacity = 1.0;
						if (characters[currentHero].type == "hero"){
							if (characters[currentHero].attackHit){
								var text = characters[currentHero].name + " hit " + monster.name + " for " + characters[currentHero].lastDamage + " hp damage";
								adjustDamage(monster, characters[currentHero].lastDamage);
								adjustMonsterFocus(characters[currentHero], characters[currentHero].lastDamage);
							} else
								var text = characters[currentHero].name + " missed!";
						} else if (characters[currentHero].type == "monster"){
							if (monster.attackHit){
								adjustDamage(heroes[monster.lastTarget], monster.damageDone);
								checkForDeath(heroes[monster.lastTarget]);
								checkForWeak(heroes[monster.lastTarget]);
								var text = monster.name + " hit " + heroes[monster.lastTarget].name + " for " + monster.damageDone + " hp damage";
							} else
								var text = monster.name + " missed!";
							turnCounter++;
							if (turnCounter >= 5)
								comboTurn = true;
						}

						damage = 0;
					}
					if (characters[currentHero].action == "skill"){
						dialogueBox.opacity = 1.0;
						var text = characters[currentHero].actionText;
					}
					if (characters[currentHero].action == "item"){
						dialogueBox.opacity = 1.0;
						for (n = 0; n < heroes.length; n++){
							if (characters[currentHero] == heroes[n]){
								items[game.chosenItem][0].UseItem(heroes[n]);
								var text = items[game.chosenItem][0].text;
								adjustItem(characters[currentHero], game.chosenItem);
							}
						}

					}
					if (characters[currentHero].action == "run"){
						dialogueBox.opacity = 1.0;
						if (characters[currentHero].name == "Anna")
							var text = characters[currentHero].name + " couldn't run!";
						else if (characters[currentHero].name == "Duriel")
							var text = characters[currentHero].name + " is waiting.";
					}
						if (characters[currentHero].type == "hero")
							checkForWeak(characters[currentHero]);
						dialogueLabel.set(text);
						dialogueLabel.opacity = 1.0;
					} else{
						currentHero++;
						actionPresented = false;
						currentPhase--;
						if (currentHero >= characters.length){
						reset();
						clearItems();
					}
					}
				}
				else if ((game.input.b || bClicked) && !game.bPressed){
					dialogueBox.opacity = 0;
					dialogueLabel.opacity = 0;
					actionPresented = false;
					currentHero++
					currentPhase--;
					if (currentHero >= characters.length){
						reset();
						clearItems();
					}
					currentAge = game.currentScene.age;
					delayStarted = true;
					if (heroes[0].hp <= 0 && heroes[1].hp <= 0)
						currentPhase = 2;
					if (monster.hp <= 0){
						monster.die();
						currentPhase = 3;
					}
				}
			}
			//you lose!
			else if (currentPhase == 2){
				if (!gameOver && !delayStarted){
					gameOver = true;
					dialogueBox.opacity = 1.0;
					var text = "You Lose!!!";
					dialogueLabel.set(text);
					dialogueLabel.opacity = 1.0;
				}
			}
			//you win!
			else if (currentPhase == 3 && !game.characterActing){
				if (!gameOver && !delayStarted)
					gameOver = true;
					dialogueBox.opacity = 1.0;
					var text = "You Win!!!";
					dialogueLabel.set(text);
					dialogueLabel.opacity = 1.0;
					dialogueLabel.tl.delay(45).then(function(){
						currentPhase++;
					});
			}
			else if (currentPhase == 4){
				if (!winPhaseOver){
					winPhaseOver = true;
					sceneEnd();
				}
			}

			game.aPressed = game.input.a;
			game.bPressed = game.input.b;
			game.upPressed = game.input.up;
			game.downPressed = game.input.down;
			aClicked = false;
			bClicked = false;
			}
			});
		}
	});

	game.onload = function(){
		var mainScene = new MainScene();
		game.pushScene(mainScene);
	};

	game.start();
};

window.onblur = function()
{
	//prevent user input from being locked by browser wonkiness
	game.input.left = false;
	game.input.right = false;
	game.input.up = false;
	game.input.down = false;
	game.input.a = false;
	game.input.b = false;
	audio.pause();
}

window.onfocus = function()
{
	if (!game.isMuted)
		audio.play();
}
