// Wikipedia API Crawler
// by Simon Tiger Houben
// Search Query: https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search={query}

// DOM Elements
let input;
let step2;
let submit;

// Each node is stored here
let node;
let nodes = [];

function setup() {
	createCanvas(800, 600);

	// Access the DOM Elements
	input = select("#query");
	step2 = select("#step2");
	submit = select("#submit");

	// Attach Events
	input.changed(askMediaWiki);
	submit.mousePressed(askMediaWiki);
}

function draw() {
	background(255, 255, 0);

	for (let i = nodes.length-1; i >= 0; i--) {
		nodes[i].draw();
		if (nodes[i].reveal && nodes[i].hovered() && mouseIsPressed) {
			nodeClicked(nodes[i]);
		}
	}
}

// Asks the Wikipedia API
function askMediaWiki() {
	if (node) {
		nodes = [];
		node.children = [];
	}

	step2.html("Now click on the article to reveal its related articles.");

	let url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + input.value();
	loadJSON(url, searchRecived, "jsonp");
}

// This Event is for When a Node is Clicked
function nodeClicked(n) {
	for (let i = 0; i < n.children.length; i++) {
		n.children[i].reveal = true;

		let url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + n.children[i].name;
		loadJSON(url, localSearchRecived, "jsonp");

		function localSearchRecived(data) {
			let titles = data[1];

			let spacing = width / titles.length;
			for (let j = 1; j < titles.length; j++) {
				let x = n.children[i].x + j*spacing - width/2;
				let y = n.children[i].y + 120;
				let name = titles[j];
				let n2 = new Node(x, y, name, n.children[i]);
				if (!n.children[i].contains(n2)) {
					nodes.push(n2);
					n.children[i].addChild(n2);
				}
			}
		}
	}
}

// This Function is Called when the Data is Recived
function searchRecived(data) {
	let titles = data[1];

	if (!node) {
		node = new Node(width/2, 60, input.value()); // Initialize the first node
		// Reveal it
		node.reveal = true;
	}
	node.name = titles[0];
	nodes.push(node);

	let spacing = width / titles.length;
	for (let i = 1; i < titles.length; i++) {
		let x = node.x + i*spacing - width/2;
		let y = node.y + 120;
		let name = titles[i];
		let n = new Node(x, y, name, node);
		nodes.push(n);
		node.addChild(n);
	}
}
