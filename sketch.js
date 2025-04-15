let dialogText;
let charSpeakingText;
//screen
let width = 800;
let height = 400;
//buttons
let buttons;
let playButton, infoButton, backButton, submitButton, pageButton, doneButton;
let buttonWidth = 80;
let buttonHeight = 30;
// button texts
let playButtonText = "Play";
let infoButtonText = "Info";
let backButtonText = "Back";
let submitButtonText = "Submit";
// status variables
let screen = 0;
let nameAquired = false;
let playerName;
let selected = null;
// characters 
let drScience;
// dialog
let dialogBox, dialogNextButton, dialogStats;
let dialogHasEnded = false;
let dialogIntialized = false;
// quiz paper
let quizPaper;
let pageUpPos = {x: width/2, y:height/2};
let pageDownPos = {x: width/2, y:height/2 - 250};
let currentPage = null;
let electoNegAnswer, formulaAnswer;
// lab equipment
let therm, water, sioSold, scale, stovePot, findingsList;
let equipChosen = false;
let equipIntialize = false;
let gettingMeltingPoint = false;
let gettingBoilingPoint = false;
let gettingSolInWater = false;
let viewingList = false;
let temperatureOfPot;
let secondsPasted = 0;
let toDoArray = {
	"melting point": "not done",
	"boiling point" : "not done", 
	"density" : "not done",
	"solubility in water": "not done"
}
let makeRedder;
let Intervalset = false;
let notMetled = true;
// decorative
let titleImg, labBackground, buttonImg, buttonHoverImg, dialogBoxImg, quizPaperImg, woodBackground;
let lewisCorrectImg, lewisCorrectHoverImg, lewisWrongImg, lewisWrongHoverImg, textboxImg, textboxHoverImg, pageUpButtonImg, pageDownButtonImg;
let labMinigameBackgroundImg, scaleImg, bunsenImg, sioSoldImg, waterImg, thermImg, waterWsioImg;
let busenUsedWsioImg, busenUsedMetledImg, BusenUsedBoilingImg, bunsenUsedImg;
let toDoListImg, toDoListUntoggleImg, toDoListtoggleImg;
let textSprite;
let noAnswers = false;
let lastSelected = null;
let passed;
let showSolMessage = false;
let findingsListBlock;
let findingsBackgroundImg;
let bloomsLabImg, computerLabImg, constructionImg;
let bloom, lin, dale;
let bloomSprite, linSprite, daleSprite;
let nameImg;
let infoBackground;
const Dialog = {
    introScreenDialog: [
        "Hello student, welcome to my compound class!", 
        "My name is Dr. Quartz. I will be your\nprofessor for the semster.",
		`Your name is.. ${playerName}.. right?`,
		"Its nice to meet you!",
        "In this class you will be studying\nand researching a specific compound.",
		"Let's see.. you were assigned...",
		"Silicon Dioxide!",
		"That's one of my favourite compounds,\nit has so many uses.",
		"Unfortunately, in order to take this class\nyou must pass an entrance exam.",
		"You will be required to answer\nquestions pertaining to Silicon Dioxide.",
		"You must get 2 or more questions correct to pass.",
		"I hope you studied!\nGood luck..."
    ],
	beforeLabCorrectDialog: [
		`Beautifully done ${playerName}!`,
		"You passed the test!",
		"Now that you've proven yourself,\nlets start some real research!",
		"Why don't you start with a lab?",
		"Let's see if you can find the\nboiling point, melting point..",
		"..Solubility in Water, density and\nsome other physical and chemical properties!",
		"In your lab you'll have a scale,\nthermonator, mixing container, Silicon Dioxide, and a bunsen burner.",
		"If you ever forget what you have to find,\n there is a To Do list at the top of your screen",
		`Good luck ${playerName}, and if you need extra help,\nCheck out the player guide in the Google Drive.`
	],
	beforeLabWrongDialog: [
		"Aw Shucks!",
		"Sorry my student, you failed the test.",
		"Maybe try again next year?"
	],
	beforeFieldResearchDialog: [
		"Wow, you are talented!",
		"Great job in the lab my dear student.",
		"There is one last assignment you must go on\nbefore completing the class..",
		"You must conduct field research!",
		"First stop is Quartz Quarry,\nwhere you'll meet Dusty Dale.",
		"Dale is a top-of-the-line geologist,\nwith a crazy obession over quartz.",
		"(The stone.. not me...)",
		"He'll be a big help in your research.\nGood luck!"
	],
	QuartzQuarryDialog: [
		"Welcome to Quartz Quarry, researcher! You see all that shiny stuff?\n That’s quartz. Pure Silicon Dioxide, or SiO₂ if you’re into the chemistry",
		"Believe it or not, this stuff makes up most of the Earth’s crust.\n And the best part? It’s eco-friendly to extract.",
		"Compared to rare metals, it’s like picking apples off a tree.",
		"Silicon Dioxide ends up in glass, cement, bricks... even cars.",
		"It’s tough, stable, and super abundant.",
		"That’s why China, the U.S., and a bunch of\n other countries dig this stuff up like it’s gold.\nIt fuels construction, industry, and soon... your research!",
		"Word is, the global market's headed for 9 billion dollars by 2026.\n Not bad for glorified sand, eh?”"
	],
	AfterQuarryDialog: [
		"Did you get any good info?",
		"I hope so!",
		"Have you heard of Silicon Valley, my student?",
		"It's only the global center of technological innovation..",
		"It's named after Silicon, or Silicon Dioxide, because...",
		"Well, you'll see...",
		"...because we are going to Silicon Valley!",
		"You'll meet with Dr. Lin, one of my bestest friends.\nShe is an amazing engineer who will be a great help to your research.",
		"Just warning you... shes got a lot on her plate.\nShe might be a little.. off.",
		"Anyway, What are you waiting for? Let's go!"
	],
	siliconValleyDialog: [
		"Oh... a field researcher. Great. Another person\nwho wants to know why Silicon Dioxide is so important.",
		"Sure, pull up a chair. Or a box.\nJust don’t sit on the prototype again.",
		"Look, SiO₂ is in everything. You take quartz, you purify it into silicon, and boom..\nmicrochips, transistors, insulators.",
		"It’s the only reason your phone turns on, your laptop boots,\nor your smart fridge judges your snack choices.",
		"You see this? (holds up a tiny silicon wafer)\nThis is my life now.",
		"Wafer after wafer after wafer. Sometimes I dream in code...",
		"It’s not just useful, it’s stable.\nDoesn’t freak out when it gets hot, doesn’t dissolve in acid,",
		"doesn’t complain when it has to talk to other people... Unlike me.",
		"Silicon Valley didn’t get its name because someone thought it sounded cool.",
		"This place was built on Silicon Dioxide.\nAnd so was my sleep deprivation...",
		"..I used to want to be a painter :("
	],
	afterValleyDialog: [
		"Very interesting stuff! Boy.. I hope Dr. Lin will be okay..",
		"Anywho, lets move on.",
		"One last stop, then it's your graduation!",
		"Last top, Bloom's food and cosmetics lab.",
		"Dr. Bloom is an enthusiastic chemist who is always ready for\nan experiemnt.",
		"Let's go!"
	],
	bloomsLabDialog: [
		"A-ha! A visitor! And not just any visitor, a field scientist!",
		"Let me tell you about my one true love: Silicon Dioxide.",
		"In this lab, we don’t build computers or bridges\nwe make sure your protein powder doesn’t turn into a brick!",
		"SiO₂ is a food additive, keeps powders from clumping.",
		"it’s in flour, spices, baking powder, powdered sugar, supplement capsules..",
		"basically, if it can clump, we slap some silica on it!",
		"Now, in cosmetics? Oh, it’s divine.",
		"It soaks up moisture like a thirsty sponge\nand thickens formulas to just the right texture...",
		"Lipstick, lotions, highlighters? SiO₂ is working its magic.",
		"Is it safe? Of course! In small amounts, it’s totally fine.",
		"Though some people might get a little gurgly or sneezy.",
		"And that’s why we never snort the glitter powder...",
		"Just... don’t confuse this stuff with crystalline silica.",
		"That one’s the villain, real nasty if you breathe it in over time.",
		"That’s the kind they dig out of the Earth.",
		"Ours? Lab-made. Beautiful... Fluffy... Perfect...",
		"Both are Silicon Dioxide, yet work different because of the\nway their extract.",
		"Neat, isn't it?"
	],
	afterBloomDialog: [
		"And thats about it!",
		"I hope you learned lot.",
		"You were one of my best students too,\nI loved teaching you.",
		"If you would like to learn more about this compound\ncheck out the Google drive for all of the research.",
		"Thanks again, my dear student, I'll see you next time!"
	]

}


function preload() {
	titleImg = loadImage("assests/Untitled7_20250320160225.png");
	woodBackground = loadImage("assests/wood.png")
	labBackground = loadImage("assests/lab_background.jpg");
	buttonImg = loadImage("assests/normal button.png");
	buttonHoverImg = loadImage("assests/HOVER_BUTTON.png");
	quizPaperImg = loadImage("assests/quizgame.png");
	drScienceResting = loadImage("assests/Untitled_Artwork.png");
	dialogBoxImg = loadImage("assests/dialogbox.png");
	lewisCorrectImg = loadImage("assests/lewisCorrect.png");
	lewisCorrectHoverImg = loadImage("assests/lewisCorrectHover.png");
	lewisWrongImg = loadImage("assests/lewisWrong.png");
	lewisWrongHoverImg = loadImage("assests/lewisWrongHover.png");
	textboxImg = loadImage("assests/textbox.png");
	textboxHoverImg = loadImage("assests/textboxHover.png");
	pageDownButtonImg = loadImage("assests/pageDownButton.png");
	pageUpButtonImg = loadImage("assests/pageUpButton.png");
	labMinigameBackgroundImg = loadImage("assests/labBackground.png");
	scaleImg = loadImage("assests/scale.png");
	bunsenImg = loadImage("assests/bunsenOnShelf.png");
	waterImg = loadImage("assests/water.png");
	sioSoldImg = loadImage("assests/siliconDioxide.png");
	thermImg = loadImage("assests/therm.png");
	bunsenUsedImg = loadImage("assests/bunsenUsed.png");
	busenUsedWsioImg = loadImage("assests/bunsenUsedWsio.png");
	busenUsedMetledImg = loadImage("assests/bunsenUsedMelted.png")
	BusenUsedBoilingImg = loadImage("assests/bunsenUsedBoiled.png");
	waterWsioImg = loadImage("assests/waterWsio.png");
	toDoListImg = loadImage("assests/Untitled_Artwork (3).png");
	toDoListUntoggleImg = loadImage("assests/toDoUntoggle.png");
	toDoListtoggleImg = loadImage("assests/toDoToggle.png");
	findingsBackgroundImg = loadImage("assests/Untitled_Artwork (4).png");
	computerLabImg = loadImage("assests/computerLab.jpg");
	constructionImg = loadImage("assests/construction site.PNG");
	bloomsLabImg = loadImage("assests/bloomsLab.jpg");
	bloom = loadImage("assests/Untitled_Artwork (7).png");
	lin = loadImage("assests/Untitled_Artwork (6).png");
	dale = loadImage("assests/Untitled_Artwork (5).png");
	nameImg = loadImage("assests/name.png");
	infoBackground = loadImage("assests/info.png");
}

function setup() {
	// setup canvas
	new Canvas(width, height);

	// buttons group
	buttons = new Group();
	buttons.w = buttonWidth;
	buttons.h = buttonHeight;
	buttons.collider = 'static';

	//intialize characters
	drScience = charConstruct('pink');

	// contruct buttons
	// buttonConstruct(color, text, textColor)
	playButton = buttonConstruct('black', playButtonText);
	infoButton = buttonConstruct('black', infoButtonText);
	backButton = buttonConstruct('black', backButtonText);
	submitButton = buttonConstruct('white', submitButtonText);
	doneButton = buttonConstruct('black', "Next");
	nameTB = new textBox(buttonWidth, buttonHeight);

	pageButton = buttonConstruct('red', '\/', 'white');
	pageButton.w = 40;
	pageButton.scale = 0.5;
	//intialize items
	quizPaper = new Sprite(width/2, height/2, 400, 800);
	quizPaper.image = quizPaperImg;
	quizPaper.scale = 0.5;
	
	quizPaper.collider = 's';
	moveOffScreen([quizPaper]);

	scale = charConstruct("red");
	scale.image = scaleImg;
	scale.scale = 0.5;
	therm = charConstruct("black");
	therm.image = thermImg;
	water = charConstruct("blue");
	water.image = waterImg;
	sioSold = charConstruct("white");
	sioSold.image = sioSoldImg;
	stovePot = charConstruct("grey");
	stovePot.image = bunsenImg;
	temperatureOfPot = charConstruct("white");
	findingsList = charConstruct("green");
	findingsListBlock = charConstruct("white");
	findingsListBlock.image = toDoListImg;


	// intialize dialog
	dialogBox = buttonConstruct('black', "", 'white');
	dialogNextButton = buttonConstruct('white', "next", 'white');

	// quiz textboxs
	inputElectroNeg = new textBox(buttonWidth, buttonHeight);
	inputFormula = new textBox(buttonWidth, buttonHeight);
	inputPolarity = new textBox(buttonWidth, buttonHeight);
	lewisStructWrong = new Sprite();
	lewisStructWrong.w = lewisWrongImg.width * 0.4;
	lewisStructWrong.h = lewisWrongImg.height * 0.4;
	lewisStructWrong.collider = 's';
	lewisStructWrong.image = lewisWrongImg;
	lewisStructWrong.scale = 0.4;
	lewisStructRight = new Sprite();
	lewisStructRight.w = lewisCorrectImg.width * 0.4;
	lewisStructRight.h = lewisCorrectImg.height * 0.4;
	lewisStructRight.image = lewisCorrectImg;
	lewisStructRight.scale = 0.4;
	lewisStructRight.collider = 's';

	textSprite = new Sprite();
  	textSprite.pos = { x: width / 2, y: height / 2 };
  	textSprite.text = playerName;
	textSprite.collider = 'none';
	textSprite.stroke = 'none';
	textSprite.color = 'transparent';
	textSprite.width = 0;
  	textSprite.height = 0;

	dialogText = new Sprite();
	dialogText.collider = 'none';
	dialogText.stroke = 'none';
	dialogText.color = 'transparent';
	dialogText.width = 0;
	dialogText.height = 0;

	charSpeakingText = new Sprite();
	charSpeakingText.collider = 'none';
	charSpeakingText.stroke = 'none';
	charSpeakingText.color = 'transparent';
	charSpeakingText.width = 0;
	charSpeakingText.height = 0;
	findingsList.image = toDoListUntoggleImg;

	daleSprite = charConstruct("white");
	daleSprite.image = dale;
	daleSprite.scale = 0.5;
	linSprite = charConstruct("white");
	linSprite.image = lin;
	linSprite.scale = 0.5;
	bloomSprite = charConstruct("white");
	bloomSprite.image = bloom;
	bloomSprite.scale = 0.5;
	moveOffScreen([dialogText, textSprite, inputElectroNeg, inputFormula, inputPolarity, lewisStructRight, lewisStructWrong]);

}



function draw() {
	background('skyblue');
	if (screen === 0) {
		mainMenu();
	} else if (screen === 2) {
		infoScreen();
	} else if (screen === 1) {
		introScreen();
	} else if (screen === 3) {
		quizScreen();
	} else if (screen === 4) {
		beforeLabScreen();
	} else if (screen === 5) {
		labScreen();
	} else if (screen === 6) {
		findingsScreen();
	} else if (screen === 100) {
		gameOver();
	} else if (screen === 7) {
		beforeFieldResearch();
	} else if (screen === 8) {
		quartzQuarryScreen();
	} else if (screen === 9) {
		afterQuarryScreen();
	} else if (screen === 10) {
		siliconValleyScreen();
	} else if (screen === 11) {
		afterValleyScreen();
	} else if (screen === 12) {
		bloomsLabScreen();
	} else if (screen === 13) {
		thankYouScreen();
	}
}

function beforeFieldResearch() {
	background(labBackground);
	moveOffScreen([doneButton]);
	handleDialog(Dialog.beforeFieldResearchDialog, 8, "Dr. Quartz");
	drScience.pos = {x: width/2 + 50, y: height/2};
	drScience.image = drScienceResting;
	drScience.scale = 0.6;
}

function quartzQuarryScreen() {
	daleSprite.layer = 5;
	background(constructionImg);
	moveOffScreen([drScience]);
	daleSprite.pos = {x: width/2 + 50, y: height/2};
	handleDialog(Dialog.QuartzQuarryDialog, 9, "Dusty Dale");
}

function afterQuarryScreen() {
	background(labBackground);
	moveOffScreen([daleSprite]);
	handleDialog(Dialog.AfterQuarryDialog, 10, "Dr. Quartz");
	drScience.pos = {x: width/2 + 50, y: height/2};
	drScience.image = drScienceResting;
	drScience.scale = 0.6;
}

function siliconValleyScreen() {
	background(computerLabImg);
	linSprite.layer = 5;
	linSprite.pos = {x: width/2 + 50, y: height/2};
	moveOffScreen([drScience]);
	handleDialog(Dialog.siliconValleyDialog, 11, "Dr. Lin");
}

function afterValleyScreen() {
	background(labBackground);
	moveOffScreen([linSprite]);
	handleDialog(Dialog.afterValleyDialog, 12, "Dr. Quartz");
	drScience.pos = {x: width/2 + 50, y: height/2};
	drScience.image = drScienceResting;
	drScience.scale = 0.6;
}

function bloomsLabScreen() {
	background(bloomsLabImg);
	bloomSprite.layer = 5;
	bloomSprite.pos = {x: width/2 + 50, y: height/2};
	moveOffScreen([drScience]);
	handleDialog(Dialog.bloomsLabDialog, 13, "Dr. Bloom");
}

function thankYouScreen() {
	background(labBackground);
	moveOffScreen([bloomSprite]);
	handleDialog(Dialog.afterBloomDialog, 0, "Dr. Quartz");
	drScience.pos = {x: width/2 + 50, y: height/2};
	drScience.image = drScienceResting;
	drScience.scale = 0.6;
}


function gameOver() {
	moveOffScreen([drScience]);
	textSize(30);
	text("Game Over!\nPlease close and relaunch the game to try again", width/2 - 300, height/2);
}

function mainMenu() {
	moveOffScreen([drScience]);
	background(labBackground);
	image(titleImg, width/2 -390, height/2 - 190);

	playButton.pos = {x: width/2 - 300, y:height/2 + 20};
	infoButton.pos = {x: width/2 - 300, y:height/2 + 80};
	moveOffScreen([backButton]);
	buttonHover(playButton);
	buttonHover(infoButton);

	if (playButton.mouse.presses()) {
		print("play button pressed");
		screen = 1;
	}
	if (infoButton.mouse.presses()) {
		print("info button pressed");
		screen = 2;
	}
}

function introScreen() {
	moveOffScreen([playButton, infoButton, titleImg]);
	if (!nameAquired) {
		background(nameImg);

		nameTB.TB.pos = {x: width/2, y: height/2};
		submitButton.pos = {x: width/2 + 90, y: height/2};
		nameTB.type();

		if (submitButton.mouse.presses()) {
			playerName = nameTB.TB.text;
			nameAquired = true;
		}

	} else {
		background(labBackground);
		moveOffScreen([submitButton, nameTB.TB]);
		Dialog.introScreenDialog[2] = `Your name is.. ${playerName}.. right?`;
		handleDialog(Dialog.introScreenDialog, 3, "Dr. Quartz");

		drScience.pos = {x: width/2 + 50, y: height/2};
		drScience.image = drScienceResting;
		drScience.scale = 0.6;
		print(dialogText.text);

	}
}

function infoScreen() {
	background(infoBackground);
	moveOffScreen([playButton, infoButton, drScience]);
	backButton.pos = {x: width/2 - 320, y:height/2 + 170};
	buttonHover(backButton);

	if (backButton.mouse.presses()) {
		screen = 0;
	}
}

function quizScreen() {
	background(woodBackground);
	moveOffScreen([drScience]);

	if (currentPage === 'up') {
		textSprite.pos = {x: width/2 + 60, y: height/2 - 120};
		textSprite.text = playerName;

		inputElectroNeg.TB.pos = {x: width/2, y: height/2 -30};
		inputElectroNeg.type();
		inputElectroNeg.hover();

		inputFormula.TB.pos = {x: width/2, y: height/2 + 60};
		inputFormula.type();
		inputFormula.hover();
		lewisStructRight.pos = {x: width/2 + 60, y: height/2 + 180};
		lewisStructWrong.pos = {x: width/2 - 50, y: height/2 + 180};
		if (pageButton.mouse.presses()) {
			pageDown();
		}
	} else if (currentPage === 'down') {
		lewisStructRight.pos = {x: width/2 + 60, y: height/2 - 75};
		lewisStructWrong.pos = {x: width/2 - 50, y: height/2 -75};

		moveOffScreen([inputElectroNeg.TB, inputFormula.TB, textSprite]);

		if (pageButton.mouse.presses()) {
			pageUp();
		}
	} 

	submitButton.pos = {x: width/2 + 345, y:height/2 + 170};
	submitButton.scale = 0.5;
	buttonHoverNotFancy(submitButton);
	pageButton.pos = {x: width/2 + 260, y:height/2 + 170};
	selection(lewisStructRight, lewisStructWrong);
	

	if (currentPage === null) {
		pageUp();
	}
	if (submitButton.mouse.presses()) {
		if (!inputElectroNeg.TB.text || !inputFormula.TB.text || !selected) {
			noAnswers = true;
		} else {
			noAnswers = false;
			electoNegAnswer = inputElectroNeg.TB.text;
			formulaAnswer = inputFormula.TB.text;
			passed = checkAnswers();
			screen = 4;
		}
	}

	if (noAnswers) {
		text("No answers cannot submit!\nDon't give up!", width/2 + 250, height/2 + 130);
	}
	
}

function checkAnswers() {
	let correct = 0;
	if (inputElectroNeg.TB.text == '1.5') {
		correct += 1;
	} 
	if (inputFormula == 'sio2') {
		correct += 1;
	}
	if (selected == lewisStructRight) {
		correct += 1;
	}
	if (correct >= 2) {
		return true; //you passed
	} else {
		return false; //you failed
	}
}

function selection(o1, o2) {
	if (o1.mouse.presses()) {
		selected = o1;
	} 
	if (o2.mouse.presses()) {
		selected = o2;
	}

	if (selected !== lastSelected) {
		if (selected === o1) {
			o1.image = lewisCorrectHoverImg;
			o2.image = lewisWrongImg;
		} else if (selected === o2) {
			o1.image = lewisCorrectImg;
			o2.image = lewisWrongHoverImg;
		}
		lastSelected = selected;
	}
}

function pageUp() {
	currentPage = 'up';
	quizPaper.pos = pageUpPos;
	pageButton.image = pageDownButtonImg;

}

function pageDown() {
	currentPage = 'down';
	quizPaper.pos = pageDownPos;
	pageButton.image = pageUpButtonImg;
}

function beforeLabScreen() {
	background(labBackground);
	moveOffScreen([textSprite, submitButton, pageButton, quizPaper, inputElectroNeg.TB, inputFormula.TB, lewisStructRight, lewisStructWrong]);
	drScience.pos = {x: width/2 + 50, y: height/2};
	drScience.image = drScienceResting;
	drScience.scale = 0.6;
	if (passed) {
		Dialog.beforeLabCorrectDialog[0] = `Beautifully done ${playerName}!`;
		Dialog.beforeLabCorrectDialog[8] = `Good luck ${playerName}, and if you need extra help,\nCheck on the player guide in the Google Drive.`;
		handleDialog(Dialog.beforeLabCorrectDialog, 5, "Dr. Quartz");
	} else {
		handleDialog(Dialog.beforeLabWrongDialog, 100, "Dr. Quartz");
	}

}

function labScreen() {
	background(labMinigameBackgroundImg);
	moveOffScreen([drScience]);

	drag(therm, {x: width/2 - 150, y: height/2 + 150});
	drag(sioSold, {x: width/2 + 100, y: height/2 + 150});
	
	if (!equipIntialize) {
		scale.pos = {x: width/2 -330, y: height/2 + 50};
		stovePot.pos = {x: width/2 +330, y: height/2 + 20};
		water.pos = {x: width/2 +330, y: height/2 -120};
		equipIntialize = true;
	} else {
		if (!equipChosen) {
			if (scale.mouse.presses()) {
				scale.pos = {x: width/2, y: height/2 + 80};
				equipChosen = true;
			} else if (stovePot.mouse.presses()) {
				stovePot.pos = {x: width/2, y: height/2 + 20};
				stovePot.image = bunsenUsedImg;
				equipChosen = true;
			} else if (water.mouse.presses()) {
				water.pos = {x: width/2, y: height/2 + 70};
				equipChosen = true;
			}
		} else {
			if (scale.mouse.presses()) {
				scale.pos = {x: width/2 -330, y: height/2 + 50};
				equipChosen = false;
			} else if (stovePot.mouse.presses()) {
				stovePot.pos = {x: width/2 +330, y: height/2 + 20};
				stovePot.image = bunsenImg;
				equipChosen = false;
			} else if (water.mouse.presses()) {
				water.pos = {x: width/2 +330, y: height/2 -120};
				water.image = waterImg;
				equipChosen = false;
			}
		} 
	}

	reactions();
	findings();

	let doneOrNo = 0;

	for (let key in toDoArray) {
		if (toDoArray[key] === "done") {
			doneOrNo += 1;
		}
	}
	if (doneOrNo === 4) {
		doneButton.pos = {x: width/2, y: height/2};
		buttonHoverNotFancy(doneButton);
	}
	if (doneButton.mouse.presses()) {
		screen = 6;
	}
}

function drag(item , pos) {
	if (item.mouse.dragging()) {
		item.x = mouse.x;
		item.y = mouse.y;
	} else {
		item.pos = pos;
	}
}

let showMeltingText = false;
let showCheckTempText = false;
let showBoilingText = false;

function reactions() {
	if (water.collides(sioSold) && equipChosen && toDoArray["solubility in water"] === "not done") {
		water.image = waterWsioImg;
		showSolMessage = true;
		toDoArray["solubility in water"] = "done";
		print("collides");
	  
		setTimeout(() => {
		  showSolMessage = false;
		}, 2000); // 1 second
	}

	if (showSolMessage) {
		text("Silicon Dioxide is insoluble in water!", width / 2, height / 2);
	}
	
	if (stovePot.collides(sioSold) && equipChosen) {
		if (toDoArray["melting point"] === "not done") {
			gettingMeltingPoint = true;
		}
		print("collides");
	}

	if (scale.collides(sioSold) && equipChosen) {
		if (toDoArray["density"] === "not done") {
			toDoArray["density"] = "done";
			print("change image to image with compound + mass");
		}
	}

	if (showCheckTempText) {
		text("Check the temperature\nusing the thermomator", width/2, height/2);
	}


	if (gettingMeltingPoint) {
		// change image of pot
		if (notMetled) {
			print("pot changes to pot with compound");
			stovePot.image = busenUsedWsioImg;
		}
		// every second make a square become progessively more red
		if (!Intervalset) {
			makeRedder = setInterval(changeTemp, 2000);
			Intervalset = true;
		} else if (secondsPasted >= 5) {
			clearInterval(makeRedder);
			notMetled = false;
		}
		
		// change sprite to melted compound
		if (!notMetled) {
			print("change sprite to melted compound");
			stovePot.image = busenUsedMetledImg;
			showCheckTempText = true;
			setTimeout(() => {
				showCheckTempText = false;
			  }, 2000); // 1 second
		}

		if (therm.collides(stovePot)) {
			// check find melting point off to do list 
			toDoArray["melting point"] = "done";
			// message saying wait a bit longer to get boiling point
			notMetled = true;
			Intervalset = false;
			secondsPasted = 0;
			if (toDoArray["boiling point"] === "not done") {
				gettingBoilingPoint = true;
				print("getting boiling point");
			}
			gettingMeltingPoint = false;
		}
	}

	if (showMeltingText) {
		textSize(18);
		fill(0);
		text("The compound is melting... please wait...", width / 2, height / 2);
	}
	if (showBoilingText) {
		textSize(18);
		fill(0);
		text("The compound is boiling... please wait...", width / 2, height / 2);
	}

	if (gettingBoilingPoint) {
		if (notMetled) {
			print("not boiling yet");
		}
		// after 2 seconds change image sprite to boiling compound
		if (!Intervalset) {
			makeRedder = setInterval(changeTemp, 6000);
			print("starting to boil");
			Intervalset = true;
		} else if (secondsPasted >= 2) {
			// check find boiling point off to do list
			clearInterval(makeRedder);
			notMetled = false;
		}

		if (!notMetled) {
			print("its boiling!")
			stovePot.image = BusenUsedBoilingImg;
			showCheckTempText = true;
			setTimeout(() => {
				showCheckTempText = false;
			  }, 2000); 
			if (therm.collides(stovePot)) {
				print("temp says it boiling dawg");
				toDoArray["boiling point"] = "done";
				gettingBoilingPoint = false;
			}
		}

	}
}

function findings() {
	findingsListBlock.collider = "s";
	findingsList.collider = "s";
	if (findingsList.mouse.presses()) {
		if (!viewingList) {
			findingsList.image = toDoListtoggleImg;
			print("we are looking at the list");
			findingsListBlock.pos = {x: width/2, y: height/2 - 128};
			viewingList = true;
			textSize(20);
			text("looking at the list", width/2, height/2);
			findingsList.pos = {x: width/2, y: height/2 - 30};
		} else {
			print("we just closed the list");
			moveOffScreen([findingsListBlock]);
			findingsList.image = toDoListUntoggleImg;
			moveOffScreen([textSprite]);
			viewingList = false;
		}
	}
	if (viewingList) {
		let listString = "";
		for (let key in toDoArray) {
			if (toDoArray[key] === "not done") {
				listString += key + "\n";
			} else {
				listString += strikethrough(key) + "\n";
			}

		}
		textSize(20);
		textSprite.pos = {x: width/2, y: height/2 - 128};
		textSprite.text = listString;
	} else {
		findingsList.pos = {x: width/2, y: height/2 - 175};
	}
}

function strikethrough(text) {
	return text.split('').map(char => char + '\u0336').join('');
}

function changeTemp() {
	print("becoming redder");
	secondsPasted += 1;
	print(secondsPasted);
	
	if (gettingMeltingPoint) {
		showMeltingText = true;
		setTimeout(() => {
			showMeltingText = false;
		}, 4000); // show text for 2 seconds
	}
	if (gettingBoilingPoint) {
		showBoilingText = true;
		setTimeout(() => {
			showBoilingText = false;
		}, 4000); // show text for 2 seconds
	}	
}

function findingsScreen() {
	background(findingsBackgroundImg);
	moveOffScreen([water, sioSold, scale, stovePot, therm, scale, findingsList, doneButton]);
	doneButton.pos = {x: width/2 + 340, y: height/2 + 180};
	doneButton.scale = 0.5;
	buttonHoverNotFancy(doneButton);
	if (doneButton.mouse.presses()) {
		screen = 7;
	}
}
function changeDialog(stats) {
	if (stats.currentDialog !== stats.maxDialog - 1 || dialogHasEnded === true) {
		stats.currentDialog += 1;
		dialogText.text = stats.dialog[stats.currentDialog];
	} else {
		dialogHasEnded = true;
	}
}

function setUpDialog(dialogArray) {
	let maxDialog = dialogArray.length;
	let currentDialog = 0;
	dialogText.text = dialogArray[currentDialog];
	return {
		maxDialog: maxDialog, 
		currentDialog: currentDialog, 
		dialog: dialogArray
	};
}

function resetDialog() {
	dialogHasEnded = false;
	dialogIntialized = false;
	dialogStats = null;
	moveOffScreen([dialogBox, dialogNextButton, dialogText, charSpeakingText]);
}

function handleDialog(dialogArray, nextScreen, charSpeaking) {
	if (!dialogIntialized) {
		dialogStats = setUpDialog(dialogArray);
		dialogIntialized = true;
	}

	// place dialog in positions
	dialogBox.pos = {x: width/2 - 100, y: height/2 + 20};
	dialogBox.postDraw;
	dialogBox.image = dialogBoxImg;
	dialogText.pos = {x: width/2 - 175, y: height/2 + 130};
	dialogBox.scale = 0.5;
	dialogNextButton.pos = {x: width/2 - 180, y: height/2 + 180};

	charSpeakingText.text = charSpeaking;
	charSpeakingText.pos = {x: width/2 - 320, y: height/2 + 76}
		
	if (dialogNextButton.mouse.presses()) {
		changeDialog(dialogStats);
	}
	if (dialogHasEnded === true) {
		screen = nextScreen;
		resetDialog();
	}
}


function buttonConstruct(color, text) {
	let button = new buttons.Sprite();
	button.color = color;
	button.text = text;
	button.textColor = 'black';
	moveOffScreen([button]);
	return button;
}

function charConstruct(image) {
	let char = new Sprite();
	char.scale = 0.5;
	char.color = image;
	char.rotationLock = true;
	char.collider = 'dynamic';
	moveOffScreen([char]);
	return char;
}


class textBox {
	constructor(w, h) {
		this.TB = new Sprite();
		this.TB.scale = 0.5;
		this.TB.w = w ;
		this.TB.h = h ;
		this.TB.pos = {x: 0, y: 0};
		this.TB.text = "";
		this.TB.rotationLock = true;
		this.active = false;
		this.TB.collider = 'static';
		this.TB.image = textboxImg;
		moveOffScreen([this.TB]);
	}

	type() {
		if (this.TB.mouse.presses()) {
			this.active = true;
		} else if (
				mouse.presses() &&
				(mouseX < this.TB.x || mouseX > this.TB.x + this.TB.w ||
				 mouseY < this.TB.y || mouseY > this.TB.y + this.TB.h)
			) {
				this.active = false;
			}
		if (this.active) {

			let keys = "abcdefghijklmnopqrstuvwxyz0123456789. ";
			
			for (let k of keys) {
				if (kb.presses(k)) {
					this.TB.text += k; 
				}
			}

			if (kb.presses("Backspace")) {
				this.TB.text = this.TB.text.slice(0, -1); 
			}
		}
	}

	hover() {
		if (this.TB.mouse.hovering()) {
			this.TB.image = textboxHoverImg;
		} else {
			this.TB.image = textboxImg;
		}
	}
}


function moveOffScreen(sprites) {
	for (let sprite of sprites) {
		sprite.pos = {x: -800, y: -400};
	}
}

function buttonHover(button) {
	if (button.mouse.hovering()) {
		button.image = buttonHoverImg;
	} else {
		button.image = buttonImg;
	}
}

function buttonHoverNotFancy(button) {
	if (button.mouse.hovering()) {
		button.image = textboxHoverImg;
	} else {
		button.image = textboxImg;
	}
}

// to get mpv:
// create dialog construct (DONE)
// finish logic for reactions (DONE)
// only have todo list (DONE)
// clean up and skin quiz (DONE)
	// Create text box images (DONE)
	// create diagrams (DONE)
	// create arrow button (DONE)
// say if got wrong or right (DONE)
// skin lab (DONE)
// create findings screen (DONE)
// skin findings screen (DONE)
// create sprites for field research
// create dialog (DONE)
// skin for field research (DONE)
// create info screen (NOT HAPPENING)
// create players guide

// extras:
// add music and sound effects
// organize functions in files (NOT HAPPENING)
// add a dialog file (NOT HAPPENING)
// all info button that saves even when game closes
// mouse icon changes to a pencil when doing quiz