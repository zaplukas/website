function TypeWriter(elmt) {
	this.elmt = elmt;
	this.selector = $(elmt);
	this.linesToDisplay = [
		'Hi. ⟡',
		'I make rework♺vintage identity items.',
    'Special one-of-a-kind projects meant',
    'to have more meaning than...',
		'Fast fashion garbage. ☹',
    '  ',
    '⧉',
    '...',
    'These items are *NOT FOR SALE!*',
    'Just for..friends☼',
    '., ',
    'Contact for special requests:',
    '➣ surfblair@gmail.com ☜',
    ' .',
    '@ZAP',
    '…………..$……………………………………..$…………..',
    '…………$$……………………………………..$$…………',
    '…………$$……………………………………..$$…………',
    '…………..$$s………………………………s$$…………..',
    '…………….$$$$……………………….$$$$…………….',
    '………………³$$$$..¶¶¶¶¶¶¶¶..$$$$³………………',
    '………………..³$$$$..¶¶¶¶¶¶..$$$$³………………..',
    '………………¶..$$$$$..¶¶¶¶..$$$$$..¶………………',
    '…………….¶¶¶..$$$..¶¶¶¶¶¶..$$$..¶¶………………',
    '…………….¶¶¶….¶¶¶¶¶¶¶¶¶¶….¶¶¶¶………………',
    '…………….¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶………………',
    '………………..¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶¶………………..',
    '………………..¶¶……..¶¶¶¶……….¶……………………',
    '………………..¶¶……..¶¶¶¶……….¶¶………………….',
    '………………..¶¶¶¶¶¶¶¶..¶¶¶¶¶¶¶¶………………….',
    '………………….¶¶¶¶¶¶……¶¶¶¶¶¶¶………………….',
    '……………………….¶¶¶¶¶¶¶¶¶…………………………',
    '……………………….¶..¶..¶..¶..¶…………………………',
    '…………¶…………..¶…………..¶…………..¶…………..',
    '……….¶¶……………………………………….¶¶…………',
    '……….¶¶……………………………………….¶¶…………',
    '……….¶¶…………..¶¶……….¶¶…………..¶¶…………',
    '……….¶¶..¶¶..¶¶..¶…………..¶..¶¶..¶¶..¶¶…………',
    '……¶..¶¶..¶¶..¶¶..¶…………..¶..¶¶..¶¶..¶¶..¶……..',
    '….¶¶..¶¶..¶¶..¶¶..¶…………..¶..¶¶..¶¶..¶¶..¶¶……',
    '……¶¶¶¶..¶¶..¶¶………………….¶¶..¶¶..¶¶¶¶……..',
    
	];
	this.firstDelay = 800;
	this.typingDelay = 30;
	this.afterLineDelay = 300;
	this.endTimeOut = 2000;
	this.endText = "Loading...";
}

TypeWriter.prototype.typeIt = function(selector, text, n) {
	var that = this;

	if (n < (text.length)) {
		$(that.elmt + ' ' + selector).html(text.substring(0, n + 1));
		n++;
		setTimeout(function() {
			that.typeIt(selector, text, n);
		}, that.typingDelay);
	} else {
		$.event.trigger("TypeWriter:linedisplayed");
	}
};

TypeWriter.prototype.appendTypeWriterItem = function(...args) {
	switch (args.length) {
		case 0:
			this.selector.append(
				"<span class='typewriter-item'>"
			);
			break;
		case 1:
			this.selector.append(
				"<span class='typewriter-item' data-text='" + args[0] + "'>"
			);
			break;
		default:
			break;
	}
};

TypeWriter.prototype.start = function() {
	var that = this;
	var i = 0;

	that.appendTypeWriterItem(that.linesToDisplay[i]);

	setTimeout(function() {
		that.typeIt('span.typewriter-item', that.linesToDisplay[i], 0);
	}, that.firstDelay);

	$(window).on('TypeWriter:linedisplayed', function() {
		i++;

		if (i < that.linesToDisplay.length) {
			that.appendTypeWriterItem(that.linesToDisplay[i]);
			setTimeout(function() {
				that.typeIt('span.typewriter-item:last-child', that.linesToDisplay[i], 0);
			}, that.afterLineDelay);
		} else
			that.appendTypeWriterItem();

		if (i === that.linesToDisplay.length)
			$.event.trigger("TypeWriter:finished");
	});

	$(window).on('TypeWriter:finished', function() {
		$(window).on('tap', function(e) {
			if (e.tap == 0) {
				$(that.elmt).append("<span id='init'>" + that.endText);
				setTimeout(function() {
					$(that.elmt).fadeOut("slow");
				}, that.endTimeOut);
			}
		});
	});
};

var typeWriter = new TypeWriter('#typeWriter');
typeWriter.start();
