enchant();

    //enchant.ENV.USE_WEBAUDIO = true;

	var game;
	var window_focus = true;

	var audio;
	var click1;
	var click2;

	//.aac doesn't play nice with Opera
	if (navigator.userAgent.indexOf('OPR') > -1)
	{
		audio = new Audio("game1/In the After.ogg");
		click1 = new Audio("game1/click1.ogg");
		click2 = new Audio("game1/click2.ogg");
	}
	else
	{
		audio = new Audio("game1/After.m4a");
		click1 = new Audio("game1/click1.m4a");
		click2 = new Audio("game1/click2.m4a");
	}
	audio.loop = true;
	audio.volume = 0.5;

function getTheGameUp() {

    game = new Core(500, 500);
    game.fps = 45;
    game.scale = 1;
    game.preload("game1/images/map4c.png", "game1/images/dialogueBox.png", "game1/images/transparentBush.png",
	"game1/images/Spritesheet.png", "game1/images/wavesheet.png", "game1/images/menuLeft.png", "game1/images/menuBottom.png",
	"game1/images/menuRight.png", "game1/images/annaprofile.png", "game1/images/profileSheet2.png", "game1/images/cursor.png",
	"game1/images/items.png", "game1/images/pageTurn.png", "game1/images/mute.png", "game1/images/testbutton.png");

	var thisGame = window.document.getElementById("enchant-stage");

	game.keybind(88, "a");
	game.keybind(90, "b");
	game.keybind(32, "a");
	game.keybind(27, "b");
	game.keybind(87, "up");
	game.keybind(83, "down");
	game.keybind(65, "left");
	game.keybind(68, "right");

	game.isMuted = false;

	var fonts = "14px 'Open Sans', serif";

	var gameFinished = false;

    var walkCycle = [1, 2, 1, 0];
    var currentWalk = 0;

	var aPressed = true; //checks if the A button was pressed during the last frame
	var bPressed = true;

	var menuPopped = false; //triggers the mapScene to start back up after exiting out of the menu

	//declared globally so the menu scene has access to item properties
	var items = new Array();

	var muteButton;

	var isMobile = false;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		isMobile = true;
		game.isMuted = true;
	}

	//pageTurn animation will be global so it can appear on all scenes
	var pageTurn = Class.create(Sprite, {
		initialize: function(){
			Sprite.call(this, 20, 20);
			this.x = 450;
			this.y = 450;
			this.image = game.assets["game1/images/pageTurn.png"];
			this.frame = 0;
		},
		onenterframe: function(){
			if (game.currentScene.age % 20 == 0){
				if (this.frame < 3)
					this.frame++;
				else
					this.frame = 0;
			}
		}
	})

	var MenuScene = Class.create(Scene, {
		initialize: function() {
			Scene.apply(this);

			this.backgroundColor = "#000000";

			var upPressed;
			var downPressed;

			var stages = ["main", "item", "skills", "equip", "status", "lore"];
			var loreStages = ["none", "people", "places", "concepts", "items"];
			var currentStage = 0;
			var currentLoreStage = 0;
			var lorePicked = false;

			var menuLeft = new Sprite(148, 298);
			menuLeft.x = 1;
			menuLeft.y = 1;
			menuLeft.image = game.assets["game1/images/menuLeft.png"];
			menuLeft.backgroundColor = "#000000";
			menuLeft.opacity = 0.0;
			this.addChild(menuLeft);

			var menuRight = new Sprite(348, 498);
			menuRight.x = 151;
			menuRight.y = 1;
			menuRight.image = game.assets["game1/images/menuRight.png"];
			menuRight.backgroundColor = "#000000";
			menuRight.opacity = 0.0;
			this.addChild(menuRight);

			var menuBottom = new Sprite(500, 150);
			menuBottom.x = 151;
			menuBottom.y = 350;
			menuBottom.image = game.assets["game1/images/menuBottom.png"];
			menuBottom.opacity = 0.0;
			this.addChild(menuBottom);

			var descriptionLabel = new Label();
			descriptionLabel.width = 325;
			descriptionLabel.x = 170;
			descriptionLabel.y = 370;
			descriptionLabel.font = fonts;
			descriptionLabel.color = "#FFFFFF";
			this.addChild(descriptionLabel);

			var cursor = new Sprite(16, 16);
			cursor.image = game.assets["game1/images/cursor.png"];
			cursor.frame = 0;
			cursor.opacity = 0.0;
			cursor.leftYposes = new Array(37, 72, 107, 142, 177, 212, 247);
			cursor.itemPoses = new Array(39, 69, 99, 129, 159);
			cursor.lorePoses = new Array(39, 69, 99, 129);
			//accounts for firefox's y-spacing issue until you can fix for good
			if (window.mozInnerScreenX != null)
			{
				cursor.leftYposes = new Array(33, 68, 103, 138, 173, 208, 243);
				cursor.itemPoses = new Array(35, 65, 95, 125, 155);
				cursor.lorePoses = new Array(35, 65, 95, 125);
			}
			cursor.x = 15;
			cursor.y = cursor.leftYposes[0];
			cursor.leftX = 15;
			cursor.rightX = 155;
			cursor.currentPose = 0;
			this.addEventListener("enterframe", function(){
				if (game.currentScene.age % 6 == 0){
						if (cursor.frame < 6)
							cursor.frame++;
						else
							cursor.frame = 0;
					}
			});
			this.addChild(cursor);

			//main screen labels & images
			var annaProfile = new Sprite(100, 100);
			annaProfile.x = menuRight.x + 25;
			annaProfile.y = menuRight.y + 25;
			annaProfile.image = game.assets["game1/images/annaprofile.png"];
			annaProfile.opacity = 0.0;
			this.addChild(annaProfile);

			annaLabel = new Label("Anna              Lv 80");
			annaLabel.x = annaProfile.x + 125;
			annaLabel.y = annaProfile.y + 10;
			annaLabel.font = "bold " + fonts;
			annaLabel.color = "#FFFFFF";
			annaLabel.opacity = 0.0;
			this.addChild(annaLabel);

			var menuLabels = new Array();
			menuLabels.push(new Label("Items"));
			menuLabels.push(new Label("Skills"));
			menuLabels.push(new Label("Equip"));
			menuLabels.push(new Label("Status"));
			menuLabels.push(new Label("Lore"));
			menuLabels.push(new Label("Config"));
			menuLabels.push(new Label("Save"));

			varX = 40;
			varY = 35;

			for (n = 0; n < menuLabels.length; n++)
			{
				labelSetup(menuLabels[n], varX, varY);
				varY += 35;
				//greying a few options out for now
				if (menuLabels[n].text == "Config" || menuLabels[n].text == "Save")
					menuLabels[n].color = "#C8C8C8";
				this.addChild(menuLabels[n]);
			}

			//item screen labels
			var itemLabels = new Array();
			itemLabels.push(new Label("Prologue"));
			itemLabels.push(new Label("Small Glass Bottle"));
			itemLabels.push(new Label("The Eye of David"));
			itemLabels.push(new Label("The Adventures of Southwise Saanvi"));
			itemLabels.push(new Label("A Fish"));

			varX = 185;
			varY = 37;

			for (n = 0; n < itemLabels.length; n++)
			{
				labelSetup(itemLabels[n], varX, varY);

				varY +=30;
				this.addChild(itemLabels[n]);
			}

			//status screen labels
			var statusLabels = new Array();
			statusLabels.push(new Label("HP: 8700/8700"));
			statusLabels.push(new Label("MP: 6040/6040"));
			statusLabels.push(new Label("STR: 79"));
			statusLabels.push(new Label("DEF: 45"));
			statusLabels.push(new Label("MAG: 80"));
			statusLabels.push(new Label("MDEF: 39"));
			statusLabels.push(new Label("DEX: 50"));
			statusLabels.push(new Label("SPD: 50"));

			varX = 185;
			varY = 150;
			for (n = 0; n < statusLabels.length; n+=2)
			{
				labelSetup(statusLabels[n], varX, varY);
				labelSetup(statusLabels[n+1], varX + 165, varY);

				varY +=30;
				this.addChild(statusLabels[n]);
				this.addChild(statusLabels[n+1]);
			}

			//Equip Screen Labels
			var equipLabels = new Array();
			equipLabels.push(new Label("WEPN: None"));
			equipLabels.push(new Label("HEAD: Ribbon"));
			equipLabels.push(new Label("CHST: Genji Tank"));
			equipLabels.push(new Label("LEG: Genji Sarong"));
			equipLabels.push(new Label("ACC: Comfy Sandals"));
			equipLabels.push(new Label("ACC: Rever-ring"));

			varX = 175;
			varY = 150;

			for (n = 0; n < equipLabels.length; n+=2)
			{
				labelSetup(equipLabels[n], varX, varY);
				labelSetup(equipLabels[n+1], varX + 165, varY);

				varY +=30;
				this.addChild(equipLabels[n]);
				this.addChild(equipLabels[n+1]);
			}

			//Skill Screen Labels
			var skillLabels = new Array();
			skillLabels.push(new Label("Psych Up"));
			skillLabels.push(new Label("Heal"));
			skillLabels.push(new Label("Sucker Punch"));
			skillLabels.push(new Label("Whirlwind"));
			skillLabels.push(new Label("Decapitate"));
			skillLabels.push(new Label("Confuse"));
			skillLabels.push(new Label("Prayer"));
			skillLabels.push(new Label("Glass Cannon"));
			skillLabels.push(new Label("Transform"));
			skillLabels.push(new Label("Justice"));

			varX = 180;
			varY = 150;

			for (n = 0; n < skillLabels.length; n+=2)
			{
				labelSetup(skillLabels[n], varX, varY);
				labelSetup(skillLabels[n+1], varX + 165, varY);

				varY +=30;

				//check if the text should be red. Clean this up later
				if (n == 5 || n == 6 || n == 8 || n == 9)
					skillLabels[n].color = "#FF1919";
				if (n == 4 || n == 5 || n == 7 || n == 8)
					skillLabels[n + 1].color = "#FF1919";

				this.addChild(skillLabels[n]);
				this.addChild(skillLabels[n+1]);
			}

			var loreLabels = new Array();
			loreLabels.push(new Label("People"));
			loreLabels.push(new Label("Places"));
			loreLabels.push(new Label("Concepts"));
			loreLabels.push(new Label("Key Items"));

			varX = 185;
			varY = 37;

			for (n = 0; n < loreLabels.length; n++)
			{
				labelSetup(loreLabels[n], varX, varY);

				//concepts is still empty, so let's grey it out
				if (loreLabels[n].text == "Concepts")
					loreLabels[n].color = "#C8C8C8";

				varY += 30;
				this.addChild(loreLabels[n]);
			}

			//four sub-stages of "Lore"
			var personLoreLabels = new Array();
			for (n = 0; n < peopleNames.length; n++)
				personLoreLabels.push(new Label(peopleNames[n]));

			var cursorMargin = 2;
				if (window.mozInnerScreenX != null)
			cursorMargin = - 2;

			varY = 37;
			cursor.peopleLorePoses = [];

			for (n = 0; n < personLoreLabels.length; n++)
			{
				labelSetup(personLoreLabels[n], varX, varY);
				cursor.peopleLorePoses.push(varY + cursorMargin);
				varY += 30;
				this.addChild(personLoreLabels[n]);
			}

			var placesLoreLabels = new Array();
			for (n = 0; n < placeNames.length; n++)
				placesLoreLabels.push(new Label(placeNames[n]));

			varY = 37;
			cursor.placesLorePoses = [];

			for (n = 0; n < placesLoreLabels.length; n++)
			{
				labelSetup(placesLoreLabels[n], varX, varY);
				cursor.placesLorePoses.push(varY + cursorMargin);
				varY += 30;
				this.addChild(placesLoreLabels[n]);
			}

			var itemsLoreLabels = new Array()
			for (n = 0; n < itemNames.length; n++)
				itemsLoreLabels.push(new Label(itemNames[n]));

			varY = 37;
			cursor.itemsLorePoses = [];

			for (n = 0; n < itemsLoreLabels.length; n++)
			{
				labelSetup(itemsLoreLabels[n], varX, varY);
				cursor.itemsLorePoses.push(varY + cursorMargin);
				varY += 30;
				this.addChild(itemsLoreLabels[n]);
			}

			var loreDialogue = new Label();
			loreDialogue.width = 325;
			loreDialogue.x = 175;
			loreDialogue.y = 37;
			loreDialogue.font = fonts;
			loreDialogue.color = "#FFFFFF";
			loreDialogue.opacity = 0.0;
			this.addChild(loreDialogue);

			menuLeft.tl.fadeIn(5);
			menuRight.tl.fadeIn(5).then(function(){
				for (n = 0; n < menuLabels.length; n++)
					menuLabels[n].opacity = 1.0;
				annaProfile.opacity = 1.0;
				annaLabel.opacity = 1.0;
				cursor.opacity = 1.0;
			});

			if (gameFinished){
				var pageturn = new pageTurn();
				this.addChild(pageturn);
			}

			var muteButton2 = new Sprite(30, 29);
			muteButton2.x = 450;
			muteButton2.y = 20;
			muteButton2.image = game.assets["game1/images/mute.png"];
			muteButton2.frame = (game.isMuted == false ? 0 : 1);
			//muteButton.opacity = 0;
			this.addChild(muteButton2);
			//game.isMuted = false;
			muteButton2.addEventListener("touchend", function(){
				if (!audio.paused){
					audio.pause();
					this.frame = 1;
					game.isMuted = true;
				} else {
					audio.play();
					this.frame = 0;
					game.isMuted = false;
				}
				muteButton.frame = (game.isMuted == false ? 0 : 1);
			});

			var aClicked = false;
			var bClicked = false;

			if (isMobile){
			var pad = new Pad();
			pad.x = 0;
			pad.y = 400;
			this.addChild(pad);

			var aButton = new Sprite(50, 50);
			aButton.x = 430;
			aButton.y = 430;
			aButton.image = game.assets["game1/images/testbutton.png"];
			this.addChild(aButton);
			aButton.addEventListener("touchend", function(){
				if (this.opacity == 1.0){
					aClicked = true;
				}
			});

			var bButton = new Sprite(50, 50);
			bButton.x = 350;
			bButton.y = 430;
			bButton.image = game.assets["game1/images/testbutton.png"];
			this.addChild(bButton);
			bButton.addEventListener("touchend", function(){
				if (this.opacity == 1.0)
					bClicked = true;
			});
			}

			this.addEventListener("touchend", function(event){
				if (gameFinished){
				var iconX = 450 + thisGame.offsetLeft - thisGame.clientLeft;
				var iconY = 430 + thisGame.offsetTop - thisGame.clientTop;
					if (event.x >= iconX && event.x <= iconX + 20 &&
						event.y >= iconY && event.y <= iconY + 20){
							window.location.assign("http://www.playerprophet.com/thosewithoutshadows/i.00.005.html");
						}
				}
			});

			this.addEventListener("enterframe", function(){
			if (stages[currentStage] == "main")
			{
				cursorMove(menuLabels, cursor.leftYposes);

				if ((game.input.b || bClicked) && !bPressed && menuLeft.opacity == 1.0)
				{
					click2.play();
					for (n = 0; n < menuLabels.length; n++)
						menuLabels[n].opacity = 0.0;
					annaProfile.opacity = 0.0;
					annaLabel.opacity = 0.0;
					cursor.opacity = 0.0;
					menuLeft.tl.fadeOut(5);
					menuRight.tl.fadeOut(5).then(function(){
						game.popScene(this);
						menuPopped = true;
					});
				}

				if ((game.input.a || aClicked) && !aPressed && menuLeft.opacity == 1.0)
				{
					click1.play();
					if (cursor.currentPose == 0){
						annaProfile.opacity = 0.0;
						annaLabel.opacity = 0.0;
						menuBottom.opacity = 1.0;
						cursor.x = cursor.rightX;
						cursor.y = cursor.itemPoses[0];
						currentStage = 1;
					}
					if (cursor.currentPose == 1)
						currentStage = 2;
					if (cursor.currentPose == 2)
						currentStage = 3;
					if (cursor.currentPose == 3)
						currentStage = 4;
					if (cursor.currentPose == 4){
						annaProfile.opacity = 0.0;
						annaLabel.opacity = 0.0;
						cursor.x = cursor.rightX;
						cursor.y = cursor.lorePoses[0];
						cursor.currentPose = 0;
						currentStage = 5;
					}
				}
			}
			else if (stages[currentStage] == "item")
			{
				for (n = 0; n < itemLabels.length; n++)
				{
					if (items[n].taken) //only show if item is taken
						itemLabels[n].opacity = 1.0;
				}

				if (items[cursor.currentPose].taken)
					descriptionLabel.text = itemLines[cursor.currentPose];
				else
					descriptionLabel.text = "";

				cursorMove(itemLabels, cursor.itemPoses);

				if ((game.input.b || bClicked) && !bPressed)
				{
					click2.play();
					for (n = 0; n < itemLabels.length; n++)
						itemLabels[n].opacity = 0.0;
					annaProfile.opacity = 1.0;
					annaLabel.opacity = 1.0;
					menuBottom.opacity = 0.0;
					descriptionLabel.text = "";
					cursor.x = cursor.leftX;
					cursor.y = cursor.leftYposes[0];
					cursor.currentPose = 0;
					currentStage = 0;
				}
			}
			else if (stages[currentStage] == "skills")
			{
				cursor.opacity = 0.0;
				for (n = 0; n < skillLabels.length; n++)
					skillLabels[n].opacity = 1.0;

				if ((game.input.b || bClicked) && !bPressed)
				{
					click2.play();
					cursor.opacity = 1.0;
					for (n = 0; n < skillLabels.length; n++)
						skillLabels[n].opacity = 0.0;
					currentStage = 0;
				}
			}
			else if (stages[currentStage] == "status")
			{
				cursor.opacity = 0.0;
				for (n = 0; n < statusLabels.length; n++)
					statusLabels[n].opacity = 1.0;

				if ((game.input.b || bClicked) && !bPressed)
				{
					click2.play();
					cursor.opacity = 1.0;
					for (n = 0; n < statusLabels.length; n++)
						statusLabels[n].opacity = 0.0;
					currentStage = 0;
				}
			}
			else if (stages[currentStage] == "equip")
			{
				cursor.opacity = 0.0;
				for (n = 0; n < equipLabels.length; n++)
					equipLabels[n].opacity = 1.0;

				if ((game.input.b || bClicked) && !bPressed)
				{
					click2.play();
					cursor.opacity = 1.0;
					for (n = 0; n < equipLabels.length; n++)
						equipLabels[n].opacity = 0.0;
					currentStage = 0;
				}
			}
			else if (stages[currentStage] == "lore")
			{
				if (loreStages[currentLoreStage] == "none")
				{
					for (n = 0; n < loreLabels.length; n++)
						loreLabels[n].opacity = 1.0;

					cursorMove(loreLabels, cursor.lorePoses);

					if ((game.input.b || bClicked) && !bPressed)
					{
						click2.play();
						for (n = 0; n < loreLabels.length; n++)
							loreLabels[n].opacity = 0.0;
						annaProfile.opacity = 1.0;
						annaLabel.opacity = 1.0;
						cursor.x = cursor.leftX;
						cursor.y = cursor.leftYposes[0];
						cursor.currentPose = 0;
						currentStage = 0;
					}

					if ((game.input.a || aClicked) && !aPressed)
					{
						click1.play();
						if (cursor.currentPose == 0)
							currentLoreStage = 1;
						else if (cursor.currentPose == 1)
							currentLoreStage = 2;
						/*else if (cursor.currentPose == 2)
							currentLoreStage = 3;*/
						else if (cursor.currentPose == 3)
							currentLoreStage = 4;
						if (cursor.currentPose != 2)
						{
							for (n = 0; n < loreLabels.length; n++)
								loreLabels[n].opacity = 0.0;
							cursor.y = cursor.placesLorePoses[0]
							cursor.currentPose = 0;
						}
					}
				}
				else if (loreStages[currentLoreStage] == "people" && !lorePicked)
				{
					for (n = 0; n < personLoreLabels.length; n++)
						personLoreLabels[n].opacity = 1.0;

					cursorMove(personLoreLabels, cursor.peopleLorePoses);

					if ((game.input.b || bClicked) && !bPressed){
						click2.play();
						loreScreenReturn(personLoreLabels);
					}

					if ((game.input.a || aClicked) && !aPressed){
						click1.play();
						for (n = 0; n < personLoreLabels.length; n++)
							personLoreLabels[n].opacity = 0.0;
						createLoreDialogue(personLoreLabels[cursor.currentPose],
							peopleNames, peopleDescriptions);
					}

				}
				else if (loreStages[currentLoreStage] == "places" && !lorePicked)
				{
					for (n = 0; n < placesLoreLabels.length; n++)
						placesLoreLabels[n].opacity = 1.0;
					cursorMove(placesLoreLabels, cursor.placesLorePoses);

					if ((game.input.b || bClicked) && !bPressed){
						click2.play();
						loreScreenReturn(placesLoreLabels);
					}

					if ((game.input.a || aClicked) && !aPressed){
						click1.play();
						for (n = 0; n < placesLoreLabels.length; n++)
							placesLoreLabels[n].opacity = 0.0;
						createLoreDialogue(placesLoreLabels[cursor.currentPose],
							placeNames, placeDescriptions);
					}
				}
				else if (loreStages[currentLoreStage] == "items" && !lorePicked)
				{
					for (n = 0; n < itemsLoreLabels.length; n++)
						itemsLoreLabels[n].opacity = 1.0;
					cursorMove(itemsLoreLabels, cursor.itemsLorePoses);

					if ((game.input.b || bClicked) && !bPressed){
						click2.play();
						loreScreenReturn(itemsLoreLabels);
					}

					if ((game.input.a || aClicked) && !aPressed){
						click1.play();
						for (n = 0; n < itemsLoreLabels.length; n++)
							itemsLoreLabels[n].opacity = 0.0;
						createLoreDialogue(itemsLoreLabels[cursor.currentPose],
							itemNames, itemDescriptions);
					}
				}
				else if (lorePicked)
				{
					if ((game.input.b || bClicked) && !bPressed){
						click2.play();
						loreDialogue.opacity = 0.0;
						cursor.opacity = 1.0;
						lorePicked = false;
					}
				}
			}

			upPressed = game.input.up;
			downPressed = game.input.down;
			aPressed = game.input.a;
			bPressed = game.input.b;
			aClicked = false;
			bClicked = false;
			});

			function createLoreDialogue(currentChoice, nameArray, descArray){
				for (n = 0; n < nameArray.length; n++)
				{
					if (currentChoice.text == nameArray[n]){
						loreDialogue.text = descArray[n];
						loreDialogue.opacity = 1.0;
						break;
					}
				}
					cursor.opacity = 0.0;
					lorePicked = true;
			}

			function labelSetup(label, varX, varY){
				label.x = varX;
				label.y = varY;
				label.font = "bold " + fonts;
				label.color = "#FFFFFF";
				label.opacity = 0.0;
			}

			function loreScreenReturn(labels){
				for (n = 0; n < labels.length; n++)
							labels[n].opacity = 0.0;
						cursor.y = cursor.lorePoses[0];
						cursor.currentPose = 0;
						currentLoreStage = 0;
			}

			function cursorMove(labelArray, poses){
				if (game.input.down && !downPressed)
					{
						if (cursor.currentPose < labelArray.length - 1)
							cursor.currentPose++;
						else
							cursor.currentPose = 0;

						cursor.y = poses[cursor.currentPose];
					}

					if (game.input.up && !upPressed)
					{
						if (cursor.currentPose > 0)
							cursor.currentPose--;
						else
							cursor.currentPose = poses.length - 1;

						cursor.y = poses[cursor.currentPose];
					}
			}

		}
	});

    var MapScene = Class.create(Scene, {
        initialize: function () {
            Scene.apply(this);

			var group = new Group();

			//dialogue variables
			var dialogue = false; //checks if a dialogue box is currently open
			var tempClose = false; //used to identify when the user wants to close a dialogue box
			var currentDialogueArray;
			var currentProfileArray;
			var currentDialogue = 0; //keep track of where in the dialogue we are
			var currentNpcProfile = 0;
			var dialogueLength; //stores the array size of the npc being talked to
			var itemGrab = false; //prevents profile pic if user is getting an item

			//used for mid-dialogue line-break prompts
			var tempBreak = false;

			//event variable to keep track of user progres
			//will have to change with new scenes
			var tiberiasTalked = false;
			var daiteTalkedOnce = false;
			var daiteTalkedTwice = false;
			var daiteTalkedTiberias = false;
			var denTalked = false;
			var denTalkedTiberias = false;
			var daiteFinal = false;
			var denFinal = false;


			this.backgroundColor = "#000000";

			function isGameFinished(){
				if (!tiberiasTalked || !daiteTalkedOnce || !daiteTalkedTwice ||
					!daiteTalkedTiberias || !denTalked || !denTalkedTiberias ||
					!daiteFinal || !denFinal)
				return false;

				return true;
			}

			var mapTiles = new Array();
			//var collisionTiles = new Array();
            var iterator = 0;
            for (var n = 0; n < 59; n++) {
                mapTiles[n] = [];
				//collisionTiles[n] = [];
                for (var m = 0; m < 59; m++) {
                    mapTiles[n][m] = iterator;
					//collisionTiles[n][m] = 0;
                    iterator++;
                }
            }

			//sprite images divided from the SpriteSheet by character
			var spriteImage = new Surface(96, 128);
			spriteImage.draw(game.assets["game1/images/Spritesheet.png"], 0, 0);
			var daiteImage = new Surface(96, 128);
			daiteImage.draw(game.assets["game1/images/Spritesheet.png"], -192, 0);
			var denImage = new Surface(96, 128);
			denImage.draw(game.assets["game1/images/Spritesheet.png"], -288, 0);
			var tiberiasImage = new Surface(96, 128);
			tiberiasImage.draw(game.assets["game1/images/Spritesheet.png"], -96, -128);

			var foregroundMap = new Map(32, 32);
			foregroundMap.image = game.assets["game1/images/transparentBush.png"];
			foregroundMap.loadData(foregroundTiles);

			var map = new Map(32, 32);
            map.image = game.assets["game1/images/map4c.png"];
            map.loadData(mapTiles);

			map.collisionData = collisionTiles;

            var dialogueBox = Class.create(Sprite, {
				initialize: function() {
					Sprite.call(this, 500, 150);
					this.x = 0;
					this.y = 0;
					this.frame = 5;
					this.image = game.assets["game1/images/dialogueBox.png"];
					this.dialogueLeftX = 0;
					this.dialogueRightX = 0;
					this.profileRightX = 0;
				},

				updatePosition: function() {
				//base position on whether the player would be hidden by the box
					this.x = -map._offsetX;
					this.y = -map._offsetY;
					tempLabel.x = -map._offsetX + 135;
					this.dialogueRightX = -map._offsetX + 135;
					this.profileRightX = -map._offsetX + 375;
					tempLabel.y = -map._offsetY + 20;
					dialogueProfile.x = -map._offsetX + 25;
					this.dialogueLeftX = -map._offsetX + 25;
					dialogueProfile.y = -map._offsetY + 25;

					if (player._offsetY < 200)
					{
						this.y = -map._offsetY + 350;
						tempLabel.y = -map._offsetY + 370;
						dialogueProfile.y = -map._offsetY + 375;
					}
				}
			});

			var dialogueProfile = new Sprite(100, 100);
			dialogueProfile.x = 25;
			dialogueProfile.y = 25;
			dialogueProfile.image = game.assets["game1/images/profileSheet2.png"];
			dialogueProfile.frame = 0;

			var dialogueLabel = new Label();
			dialogueLabel.width = 400;
			dialogueLabel.font = fonts;
			dialogueLabel.color = "#FFFFFF";

			var tempLabel = new Label();
			tempLabel.width = 400;
			tempLabel.font = fonts;
			tempLabel.color = "#FFFFFF";

			var tempPosition = 1;

            var playerBounds = new Entity();
            game.currentScene.addChild(playerBounds);

            var Player = Class.create(Sprite, {
                initialize: function (x, y) {
                    Sprite.call(this, 32, 32);
                    this.x = x * 32;
                    this.y = y * 32;
                    this.image = spriteImage;
                    this.frame = 1;
                    this.direction = 0;
                    this.isMoving = false;
                    this.walk = 1;
                },

                onenterframe: function () {

					if (dialogue == false && this.opacity == 1.0)
					{
                    this.frame = this.direction * 3 + this.walk;

                    if (this.isMoving) {
                        this.moveBy(this.vx, this.vy);

                        if ((game.currentScene.age % 10 == 0)) {
                            currentWalk++
                            if (currentWalk == 4)
                                currentWalk = 0;
                            this.walk = walkCycle[currentWalk];
                        }

                        if (checkCollision(this, map) || npcCollide() ||
                        (!checkKeys(this) && ((this.vx && this.x % 32 == 0) || (this.vy && this.y % 32 == 0)))) {
                            this.isMoving = false;
                            this.walk = 1;
                            this.currentWalk = 0;
                        }
                    } else {
                        this.vx = this.vy = 0;
                        if (game.input.left) {
                            this.direction = 1;
                            this.vx = -2;
                        } else if (game.input.right) {
                            this.direction = 2;
                            this.vx = 2;
                        } else if (game.input.up) {
                            this.direction = 3;
                            this.vy = -2;
                        } else if (game.input.down) {
                            this.direction = 0;
                            this.vy = 2;
                        }

                        if (this.vx != 0 || this.vy != 0) {
                            var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 32 : 0);
                            var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 32 : 0);
                            if (!map.hitTest(x, y) && 0 <= x && x < map.width && 0 <= y && y < map.height && !npcCollide()) {
                                this.isMoving = true;
                            }
                        }
                    }
                } //dialogue checker
				} //enterframe
            });

			var Item = Class.create(Sprite, {
				initialize: function(x, y, frame, name){
					Sprite.call(this, 32, 32);
					this.x = x * 32;
					this.y = y * 32;
					this.image = game.assets["game1/images/items.png"];
					this.frame = frame;
					this.name = name;
					this.taken = false;
				}
			});

			var NPC = Class.create(Sprite, {
                initialize: function (x, y, profile, image, startFrame, words, dialogueProfiles) {
                    Sprite.call(this, 32, 32);
                    this.x = x * 32;
                    this.y = y * 32;
                    this.tileX = x;
                    this.tileY = y;
                    this.image = image;
                    this.frame = startFrame;
					this.dialogue = words;
					this.dialogueProfiles = dialogueProfiles;
					this.talked = false;
					this.profile = profile;
                },

				changeDirection: function() {
					if (player.direction == 0)
						this.frame = 10;
					else if (player.direction == 1)
						this.frame = 7;
					else if (player.direction == 2)
						this.frame = 4;
					else if (player.direction == 3)
						this.frame = 1;
				}
            });

			var Wave = Class.create(Sprite, {
				initialize: function (x, y) {
					Sprite.call(this, 487, 28);
					this.x = x * 32;
					this.y = y * 32;
					this.image = game.assets["game1/images/wavesheet.png"];
					this.frame = 0;
					this.backgroundColor = "#000000";
				},

				onenterframe: function(){
					if (game.currentScene.age % 21 == 0){
						if (this.frame < 3)
							this.frame++;
						else
							this.frame = 0;
					}
				}
			});

			if (!isMobile)
				audio.play();

			//Object declaration time!
			var player = new Player(48, 12);
			var npcs = new Array();
			npcs.push(new NPC(49, 50, 5, tiberiasImage, 1,
			tiberiasDialogue1, tiberiasProfiles1));
			npcs.push(new NPC(16, 2, 3, denImage, 10,
			denDialogue1, denProfiles1));
			npcs.push(new NPC(6, 38, 2, daiteImage, 1,
			daiteDialogue1, daiteProfiles1));

			items.push(new Item(48, 13, 0, "Prologue"));
			items.push(new Item(7, 43, 1, "Small Glass Bottle"));
			items.push(new Item(13, 53, 2, "The Eye of David"));
			items.push(new Item(9, 8, 3, "The Adventures of Southwise Saanvi"));
			items.push(new Item(35, 55, 4, "A Fish"));

			var waves = new Array();
			var waveX = 0;

			for (n = 0; n < 5; n++)
			{
				waves.push(new Wave(waveX, 56));
				waveX += 15;
			}

			var pageturn = new pageTurn();
			pageturn.opacity = 0.0;

			group.addChild(map);
			group.addChild(player);
			for (n = 0; n < items.length; n++)
				group.addChild(items[n]);
			for (n = 0; n < npcs.length; n++)
				group.addChild(npcs[n]);
			for (n = 0; n < waves.length; n++)
				group.addChild(waves[n]);
			group.addChild(foregroundMap);
            this.addChild(group);

			this.addChild(pageturn);

			muteButton = new Sprite(30, 29);
			muteButton.x = 450;
			muteButton.y = 20;
			muteButton.image = game.assets["game1/images/mute.png"];
			muteButton.frame = (game.isMuted == false ? 0 : 1);
			muteButton.opacity = 0;
			this.addChild(muteButton);
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

			var aClicked = false;
			var bClicked = false;

			if (isMobile){
			var pad = new Pad();
			pad.x = 0;
			pad.y = 400;
			this.addChild(pad);

			var aButton = new Sprite(50, 50);
			aButton.x = 430;
			aButton.y = 430;
			aButton.image = game.assets["game1/images/testbutton.png"];
			this.addChild(aButton);
			aButton.addEventListener("touchend", function(){
				if (this.opacity == 1.0){
					aClicked = true;
				}
			});

			var bButton = new Sprite(50, 50);
			bButton.x = 350;
			bButton.y = 430;
			bButton.image = game.assets["game1/images/testbutton.png"];
			this.addChild(bButton);
			bButton.addEventListener("touchend", function(){
				if (this.opacity == 1.0)
					bClicked = true;
			});
			}

			var dialoguebox = new dialogueBox();

			group.x = (game.width - 32) / 2 - player.x;
			group.y = (game.height - 32) / 2 - player.y;

			map.opacity = 0.0;
			player.opacity = 0.0;
			for (n = 0; n < items.length; n++)
				items[n].opacity = 0.0;
			for (n = 0; n < npcs.length; n++)
				npcs[n].opacity = 0.0;
			for (n = 0; n < waves.length; n++)
				waves[n].opacity = 0.0;
			foregroundMap.opacity = 0.0;

			player.tl.delay(20).fadeIn(35);
			for (n=0; n < items.length; n++)
				items[n].tl.delay(20).fadeIn(35);
			for (n=0; n < npcs.length; n++)
				npcs[n].tl.delay(20).fadeIn(35);
			for (n=0; n < waves.length; n++)
				waves[n].tl.delay(20).fadeIn(35);
			map.tl.delay(20).fadeIn(35).then(function(){
				foregroundMap.opacity = 1.0;
				muteButton.opacity = 1.0;
			});

            group.addEventListener('enterframe', function (e) {

                  if (!document.getElementById("enchant-stage")) {
                    audio.pause();
                  }

                var x = Math.min((game.width - 32) / 2 - player.x, 0);
                var y = Math.min((game.height - 32) / 2 - player.y, 0);
                x = Math.max(game.width, x + map.width) - map.width;
                y = Math.max(game.height, y + map.height) - map.height;
                this.x = x;
                this.y = y;

				muteButton.frame = (game.isMuted == false ? 0 : 1);

				if ((game.input.a || aClicked) && !aPressed && dialogue == false && dialoguebox.frame == 5
				&& map.opacity == 1.0)
				{
					for (n = 0; n < npcs.length; n++)
					{
						if (talkDistance(npcs[n]))
						{
							dialoguebox.updatePosition();
							dialogue = true;
							break;
						}
					}
					for (n = 0; n < items.length; n++)
					{
						if (itemDistance(items[n]))
						{
							dialoguebox.updatePosition();
							dialogue = true;
							break;
						}
					}
				}
				else if ((game.input.a || aClicked) && !aPressed && dialogue == true && dialoguebox.frame == 0
				&& map.opacity == 1.0 && tempPosition == dialogueLabel.text.length &&
				currentDialogue == dialogueLength - 1)
				{
					this.removeChild(dialogueLabel);//when temp thing works, remove this
					this.removeChild(tempLabel);
					tempLabel.text = 0;
					tempClose = true;
				}

				if (dialogue == true && tempClose == false)
					openMenu();
				else if (tempClose == true)
				{
					closeMenu();
					updateDialogue();
				}

				if ((game.input.b || bClicked) && !bPressed && map.opacity == 1.0 && !dialogue)
				{
					foregroundMap.opacity = 0.0;
					player.tl.fadeOut(5);
					for (n=0; n < items.length; n++)
						items[n].tl.fadeOut(5);
					for (n=0; n < npcs.length; n++)
						npcs[n].tl.fadeOut(5);
					for (n=0; n < waves.length; n++)
						waves[n].tl.fadeOut(5);
					map.tl.fadeOut(5).delay(5).then(function(){
						var menuScene = new MenuScene();
						game.pushScene(menuScene);
					});
				}

				if (menuPopped)
				{
					menuPopped = false;
					player.tl.delay(5).fadeIn(5);
					for (n=0; n < items.length; n++)
					{
					if (!items[n].taken)
						items[n].tl.delay(5).fadeIn(5);
					}
					for (n=0; n < npcs.length; n++)
						npcs[n].tl.delay(5).fadeIn(5);
					for (n=0; n < waves.length; n++)
						waves[n].tl.delay(5).fadeIn(5);
					map.tl.delay(5).fadeIn(5).then(function(){
						foregroundMap.opacity = 1.0;
					});
				}

				//sets up the pageTurn animation for when the game is done
				if (isGameFinished() && !gameFinished){
					pageturn.tl.delay(200).then(function(){
					gameFinished = true;
					if (isMobile){
					aButton.opacity = 0.0;
					bButton.opacity = 0.0;
					aButton.x = 5;
					bButton.x = 5;
					}
					this.opacity = 1.0;
					});
				}

				if (gameFinished){
					if (!dialogue)
						pageturn.opacity = 1.0;
					else
					{
						pageturn.opacity = 0.0;
					}
				}

				aPressed = game.input.a;
				bPressed = game.input.b;
				aClicked = false;
				bClicked = false;
            });

			this.addEventListener("touchend", function(event){
				if (gameFinished){
				var iconX = 450 + thisGame.offsetLeft - thisGame.clientLeft;
				var iconY = 430 + thisGame.offsetTop - thisGame.clientTop;
					if (event.x >= iconX && event.x <= iconX + 20 &&
						event.y >= iconY && event.y <= iconY + 20){
							window.location.assign("http://www.playerprophet.com/thosewithoutshadows/i.00.05.html");
						}
				}
			});

			function openMenu() {
				if (dialoguebox.frame == 5)
				{
					group.addChild(dialoguebox);
					dialoguebox.frame--;
				}
				else if (dialoguebox.frame != 0) //starts the dialogue once the box is fully expanded
				{
						dialoguebox.frame--;
						if (dialoguebox.frame == 0)
						{
							//this is where you'll change how dialogue text is displayed
							group.addChild(tempLabel);
							//check who the first profile pic should be of
							if (!itemGrab)
							{
								//check which side the profile/text should go on
								if (currentProfileArray[currentDialogue] == 0)
								{
									dialogueProfile.frame = 0;
									dialogueProfile.x = dialoguebox.dialogueLeftX;
									tempLabel.x = dialoguebox.dialogueRightX;
								}
								else
								{
									dialogueProfile.frame = currentNpcProfile;
									dialogueProfile.x = dialoguebox.profileRightX;
									tempLabel.x = dialoguebox.dialogueLeftX;
								}
								group.addChild(dialogueProfile);
							}
						}
				}
				else   //start adding the physical text
				{
					if (!tempBreak){
						if ((game.input.a || aClicked) && !aPressed && tempPosition < dialogueLabel.text.length)
						{
							if (!foretellBreak()){
							tempPosition = dialogueLabel.text.length;
							tempLabel.text = dialogueLabel.text.substring(0, tempPosition);
							}
						}
						else if ((game.input.a || aClicked) && !aPressed && tempPosition == dialogueLabel.text.length)
						{
							tempPosition = 0;
							currentDialogue++;
							tempLabel.text = "";
							dialogueLabel.text = currentDialogueArray[currentDialogue];
							//check which side the profile/text should go on
							if (currentProfileArray[currentDialogue] == 0)
							{
								dialogueProfile.frame = 0;
								dialogueProfile.x = dialoguebox.dialogueLeftX;
								tempLabel.x = dialoguebox.dialogueRightX;
							}
							else
							{
								dialogueProfile.frame = currentNpcProfile;
								dialogueProfile.x = dialoguebox.profileRightX;
								tempLabel.x = dialoguebox.dialogueLeftX;
							}
						}
						else if (tempPosition < dialogueLabel.text.length)
						{
							checkForTags();
							if (!checkForBreak()){
							tempLabel.text = dialogueLabel.text.substring(0, tempPosition);
							tempPosition++;
							} else {
								tempBreak = true;
							}
						}
					} else {
						if ((game.input.a || aClicked) && !aPressed){
							tempLabel.text[tempPosition] = " ";
							tempPosition++;
							tempBreak = false;
						}
					}
				}
			}

			function closeMenu() {
				if (dialoguebox.frame == 0 && !itemGrab)
					group.removeChild(dialogueProfile);
				if (dialoguebox.frame != 5)
					dialoguebox.frame++;
				else
				{
					group.removeChild(dialoguebox);
					tempPosition = 1;
					itemGrab = false;
					tempLabel.text = "";
					currentDialogue = 0;
					dialogueLength = 0;
					tempClose = false;
					dialogue = false;
				}
			}

			//searches for square brackets for prevent them from appearing in the code
			function checkForTags()
			{
				if (dialogueLabel.text[tempPosition] == "<")
				{
					while (dialogueLabel.text[tempPosition] != ">")
						tempPosition++;
					if (dialogueLabel.text[tempPosition] == ">")
						tempPosition++;
				}
			}

			//^ character is used to prompt user to continue
			//this function also changes the current char to a " "
			//so the ^ won't show up in actual text
			function checkForBreak()
			{
				if (dialogueLabel.text[tempPosition] == "^"){
					dialogueLabel.text = dialogueLabel.text.replaceAt(tempPosition, " ");
					return true;
				}
				return false;
			}

			//check from current position to the end of the string for a "^"
			//if you find one, move to one position prior to it
			function foretellBreak()
			{
				for (n = tempPosition; n < dialogueLabel.text.length; n++){
					if (dialogueLabel.text[n] == "^"){
						tempPosition = n;
						tempLabel.text = dialogueLabel.text.substring(0, tempPosition);
						return true;
					}
				}
				return false;
			}

            function npcCollide() {
                playerBounds.x = player.x + player.vx;
                playerBounds.y = player.y + player.vy;
                playerBounds.width = player.width + player.vx;
                playerBounds.height = player.height + player.vy;
                playerBounds._offsetX = player._offsetX + player.vx;
                playerBounds._offsetY = player._offsetY + player.vy;
                playerBounds._dirty = false;

				for (n = 0; n < npcs.length; n++)
				{
					if (playerBounds.within(npcs[n], 32))
						return true;
				}
				for (n = 0; n < items.length; n++)
				{
					if (playerBounds.within(items[n], 32) && items[n].opacity == 1.0)
						return true;
				}

                return false;
            }

			function createPlayerBounds(){
				if (player.direction == 1 || player.direction == 2)
				{
					playerBounds.width = player.width + 20;
					playerBounds.height = player.height;
					playerBounds._offsetX = player._offsetX - 10;
					playerBounds._offsetY = player._offsetY;
					playerBounds._dirty = false;
				}
				if (player.direction == 0 || player.direction == 3)
				{
					playerBounds.width = player.width;
					playerBounds.height = player.height + 20;
					playerBounds._offsetX = player._offsetX;
					playerBounds._offsetY = player._offsetY - 10;
					playerBounds._dirty = false;
				}
			}

			function talkDistance(npc) {
				createPlayerBounds();

				if (playerBounds.intersect(npc))
				{
					//sets up properties for a new conversation
					dialogueLength = npc.dialogue.length;
					currentDialogueArray = npc.dialogue;
					currentProfileArray = npc.dialogueProfiles;
					dialogueLabel.text = currentDialogueArray[currentDialogue];
					currentNpcProfile = npc.profile;
					npc.talked = true;
					npc.changeDirection();
					return true;
				}

				return false;
			}

			function itemDistance(item){
				createPlayerBounds();

				if (playerBounds.intersect(item) && item.opacity == 1.0)
				{
					item.opacity = 0.0;
					dialogueLabel.text = "Acquired '" + item.name + "' ";
					dialogueLength = 1
					itemGrab = true;
					item.taken = true;
					return true;
				}

				return false;
			}

			function updateDialogue(){
				//current version of this method will need heavy updates w/ new scenes
				//think of a way to streamline for future reference
				if (npcs[0].talked){
					tiberiasTalked = true;
					npcs[0].dialogue = tiberiasDialogue2;
					npcs[0].dialogueProfiles = tiberiasProfiles2;
				}

				if (npcs[1].talked && !denTalked)
				{
					denTalked = true;
				}

				if (npcs[1].talked && denTalked && tiberiasTalked && !denTalkedTiberias)
				{
					npcs[1].dialogue = denDialogue2;
					npcs[1].dialogueProfiles = denProfiles2;
					denTalkedTiberias = true;
					npcs[1].talked = false;
				}

				if (npcs[1].talked && (denTalkedTiberias ||
				denTalked && !tiberiasTalked)){
					npcs[1].dialogue = denDialogue3;
					npcs[1].dialogueProfiles = denProfiles3;
				}

				if (npcs[1].talked && npcs[1].dialogue == denDialogue3 &&
					tiberiasTalked)
					denFinal = true;

				if (npcs[2].talked && npcs[2].dialogue == daiteDialogue1){
					daiteTalkedOnce = true;
					npcs[2].dialogue = daiteDialogue2;
					npcs[2].dialogueProfiles = daiteProfiles2;
					npcs[2].talked = false;
				}
				if (npcs[2].talked && daiteTalkedOnce){
					daiteTalkedTwice = true;
				}
				if (npcs[2].talked && daiteTalkedTwice && tiberiasTalked &&
				!daiteTalkedTiberias){
					npcs[2].dialogue = daiteDialogue3;
					npcs[2].dialogueProfiles = daiteProfiles3;
					npcs[2].talked = false;
					daiteTalkedTiberias = true;
				}
				if (npcs[2].talked && (daiteTalkedTiberias ||
				daiteTalkedTwice && !tiberiasTalked)){
					npcs[2].dialogue = daiteDialogue4;
					npcs[2].dialogueProfiles = daiteProfiles4;
				}

				if (npcs[2].talked && npcs[2].dialogue == daiteDialogue4 &&
					tiberiasTalked)
					daiteFinal = true;
			}
        }
    });

    game.onload = function () {
        var mapScene = new MapScene();
        game.pushScene(mapScene);
    };

    game.start();

    function checkKeys(player) {
        if (!game.input.left && player.direction == 1)
            return false;
        else if (!game.input.right && player.direction == 2)
            return false;
        else if (!game.input.up && player.direction == 3)
            return false;
        else if (!game.input.down && player.direction == 0)
            return false;

        return true;
    }

    function checkCollision(player, map) {
        if (map.hitTest(player.x + player.vx, player.y + player.vy) || map.hitTest(player.x + player.vx + 30, player.y + player.vy + 30))
            return true;
        if (0 >= player.x + player.vx || player.x + player.vx + 30 > map.width || 0 >= player.y + player.vy || player.y + player.vy + 30 > map.height)
            return true;

        return false;
    }
};

window.onblur = function()
{
	window_focus = false;
	//prevent user input from being locked by browser wonkiness
	game.input.left = false;
	game.input.right = false;
	game.input.up = false;
	game.input.down = false;
	audio.pause();
}

window.onfocus = function()
{
	window_focus = true;
	if (!game.isMuted)
		audio.play();
}

//borrowed from the internets from Cem Kalyoncu
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
