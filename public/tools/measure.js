var IS24 = IS24 || {};

IS24.measureTime = {
	startTime: 0,
	start: function () {
		this.startTime = (new Date()).getTime();
	},
	stopAndRender: function (containerId) {
		var now, timeSpan;

		now = (new Date()).getTime();
		timeSpan = (now - this.startTime);

		$("#" + containerId).append("window loaded in " + timeSpan + "ms");
	}
};
IS24.measureTime.start();

$(window).load(function () {
	IS24.measureTime.stopAndRender("pageload");
});