const root = am5.Root.new("chartdiv");
const dataInput = document.querySelectorAll('input[type="date"]')
const textInput = document.querySelectorAll('input[type="text"]')

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


const render = () => {
	dataInput[0].addEventListener('input', () => {

	const dat = new Date(dataInput[0].value)
	let input = dat.toLocaleDateString()
	console.log(input);
	
	const dataSet = [];

	data.filter(item => {
		
		if (item.category.match(input)) {
			dataSet.push(item);
		}
			
	})
	console.log(dataSet);
	})
}

render()

root.setThemes([
	am5themes_Animated.new(root)
]);

const selectLabs = document.createElement("select");
selectLabs.id = 'selectLabs';
document.querySelector('h2').appendChild(selectLabs);

for (let i = 0; i < Object.keys(data).length; i++) {
    const option = document.createElement("option");
    option.value = data[i].category;
    option.text = data[i].category;
    selectLabs.appendChild(option);
}

const chart = root.container.children.push(am5xy.XYChart.new(root, {
	panX: false,
	panY: false
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

xAxis.data.setAll(data);
series.data.setAll(data);
stepSeries.data.setAll(data);

series.appear(1000);
chart.appear(1000, 100);