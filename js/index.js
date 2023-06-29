import Game from "./game.js";
import GameBuilder from "./gameBuilder.js";
import Hero from "./entities/hero/hero.js";
import Coordinates from "./coordinates.js";
import Road from "./entities/road/road.js";


function touchHandler(event)
{
	var touches = event.changedTouches,
		first = touches[0],
		type = "";
	switch(event.type)
	{
		case "touchstart": type = "mousedown"; break;
		case "touchmove":  type = "mousemove"; break;
		case "touchend":   type = "mouseup";   break;
		default:           return;
	}

	// initMouseEvent(type, canBubble, cancelable, view, clickCount,
	//                screenX, screenY, clientX, clientY, ctrlKey,
	//                altKey, shiftKey, metaKey, button, relatedTarget);

	var simulatedEvent = document.createEvent("MouseEvent");
	simulatedEvent.initMouseEvent(type, true, true, window, 1,
		first.screenX, first.screenY,
		first.clientX, first.clientY, false,
		false, false, false, 0/*left*/, null);

	first.target.dispatchEvent(simulatedEvent);
	event.preventDefault();
}

function initTouchEventsMapper()
{
	document.addEventListener("touchstart", touchHandler, {passive:false});
	document.addEventListener("touchmove", touchHandler, {passive:false});
	document.addEventListener("touchend", touchHandler, {passive:false});
	document.addEventListener("touchcancel", touchHandler, {passive:false});
}


function createGame(rawEntities) {
	const tileSize = 64;
	let builder = new GameBuilder(tileSize);
	let entities = builder.createEntities(rawEntities);
	let hero = builder.createHero(new Coordinates(10, 6));
	let camera = builder.createCamera(hero.coordinates, hero, 10, 10);
	let score = builder.createScoreboard();
	let menu = builder.createMenu();
	return new Game(tileSize, entities, hero, builder, camera, score, menu);
}


function registerGameRestartListener() {
	let menuRestartButton = document.getElementById("button_play_again");
	menuRestartButton.addEventListener('click', e => {
		location.reload();
	})
}

function loadAll(entities) {
	const game = createGame(entities);
	const canvas = document.getElementById('game');
	const ctx = canvas.getContext('2d');


	window.addEventListener('keydown', (event) => {
		game.handleInput(game, event);
	})
	window.addEventListener('keyup', (event) => {
		game.handleInput(game, event);
	})

	initTouchEventsMapper();

	document.addEventListener('mouseup', (event) => {
		game.handleInput(game, event);
	})
	window.addEventListener('mousedown', (event) => {
		game.handleInput(game, event);
	})
	window.addEventListener('mousemove', (event) => {
		game.handleInput(game, event);
	})
	registerGameRestartListener();
	game.run(ctx, 40);
}

function  main() {

	return fetch("./entities.json")
		.then((res) => res.text())
		.then((text) => {
			let entities = JSON.parse(text);
			return loadAll(entities)
		})
		.catch((e) => console.error(e));
}

main()
