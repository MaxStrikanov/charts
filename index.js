const root = am5.Root.new("chartdiv");

const data = [{
	category: "01.02.2022",
	value: 28,
	open: 0,
	stepValue: 28,
	columnConfig: {
		fill: '#4f81bd',
	},
	displayValue: 28
}, {
	category: "02.02.2022",
	value: 28 - 10,
	open: 28,
	stepValue: 28 - 10,
	columnConfig: {
		fill: '#c0504d',
	},
	displayValue: 10
}, {
	category: "03.02.2022",
	value: 28 - 10 - 5,
	open: 28 - 10,
	stepValue: 28 - 10 - 5,
	columnConfig: {
		fill: '#9bbb59',
	},
	displayValue: 5
}, {
	category: "04.02.2022",
	value: 28 - 10 - 5 - 6,
	open: 28 - 10 - 5,
	stepValue: 28 - 10 - 5 - 6,
	columnConfig: {
		fill: '#8064a2',
	},
	displayValue: 6
}, {
	category: "05.02.2022",
	value: 28 - 10 - 5 - 6 - 7,
	open: 28 - 10 - 5 - 6,
	stepValue: 28 - 10 - 5 - 6 - 7,
	columnConfig: {
		fill: '#4bacc6',
	},
	displayValue: 7
}];

root.setThemes([
	am5themes_Animated.new(root)
]);

const selectData = document.querySelectorAll("select");

for (let i = 0; i < Object.keys(data).length; i++) {
    const option = document.createElement("option");
    option.value = data[i].category;
    option.text = data[i].category;
    selectData[0].appendChild(option);
}

for (let i = 0; i < Object.keys(data).length; i++) {
    const option = document.createElement("option");
    option.value = data[i].category;
    option.text = data[i].category;
    selectData[1].appendChild(option);
}

const chart = root.container.children.push(am5xy.XYChart.new(root, {
	panX: false,
	panY: false,
	wheelX: "panX",
  	wheelY: "zoomX",
  	layout: root.verticalLayout
}));

const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });

const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
	maxDeviation: 0,
	categoryField: "category",
	renderer: xRenderer,
	tooltip: am5.Tooltip.new(root, {})
}));

const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
	maxDeviation: 0,
	min: 0,
	renderer: am5xy.AxisRendererY.new(root, {}),
	tooltip: am5.Tooltip.new(root, {})
}));

const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
	xAxis:xAxis,
	yAxis:yAxis
}));

const series = chart.series.push(am5xy.ColumnSeries.new(root, {
	xAxis: xAxis,
	yAxis: yAxis,
	valueYField: "value",
	openValueYField: "open",
	categoryXField: "category"
}));

series.columns.template.setAll({
	templateField: "columnConfig",
	strokeOpacity: 0
})

series.bullets.push(function() {
	return am5.Bullet.new(root, {
		sprite: am5.Label.new(root, {
		text: "{displayValue}",
		centerY: am5.p50,
		centerX: am5.p50,
		populateText: true
		})
	});
});

const stepSeries = chart.series.push(am5xy.StepLineSeries.new(root, {
	xAxis: xAxis,
	yAxis: yAxis,
	valueYField: "stepValue",
	categoryXField: "category",
	noRisers: true,
	locationX: 0.65,
	stroke: root.interfaceColors.get("alternativeBackground")
}));

stepSeries.strokes.template.setAll({
	strokeDasharray: [3, 3]
})

const colorSet = am5.ColorSet.new(root, {});
const dataSet = [];

document.querySelector('button').addEventListener('click', () => {
	
	data.filter(item => {
		
		if (item.category >= selectData[0].value && item.category <= selectData[1].value) {
			dataSet.push(item);
		}	
	})

	xAxis.data.setAll(dataSet);
	series.data.setAll(dataSet);
	stepSeries.data.setAll(dataSet);
	dataSet.length = 0
})

series.appear(1000);
chart.appear(1000, 100);
