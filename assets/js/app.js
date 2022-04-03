const data = d3.csv('data/LearnWithLeon stream statistics - ClassData.csv').then((data) => {
	data.forEach((x) => {
		//change strings to numbers
		x.Class = +x.Class
		x['Average concurrent viewers'] = +x['Average concurrent viewers']
		x['Peak viewers'] = +x['Peak viewers']

		//remove percent sign and change to a number
		function removePercentSign(str, property) {
			return str[property] = Number(str[property].slice(0, str[property].length - 1))
		}
		removePercentSign(x, 'Percent change in average concurrent viewers ')
		removePercentSign(x, 'Percent change in average concurrent viewers from first class')
		removePercentSign(x, 'Percent left on average concurrent viewers from first class')

		//parse date
		x.date = new Date(String(x.date));

		//convert hh:mm:ss to seconds
		x.durationInSeconds = x.Duration.split(':').reduce((sum, newValue, i) => {
			if (i === 0) {
				return sum + 3600 * +newValue;
			}
			if (i === 1) {
				return sum + 60 * +newValue;
			}
			return sum + +newValue;
		}, 0);
		return x;
	});

	const minDate = d3.min(data, data => data.date)
	const maxDate = d3.max(data, data => data.date)
	const maxACV = d3.max(data, data => data['Average concurrent viewers'])

	// const width = 600
	// const height = 400

	// const x = d3.scaleTime()
	// 	.domain([minDate, maxDate])
	// 	.range([0, width])
	// const y = d3.scaleLinear()
	// 	.domain([o, maxACV])
	// 	.range([height, 0])

	// const xAxis = d3.axisBottom(x)
	// const yAxis = d3.axisLeft(y)
	return data;
});


// d3
// 	.select('.averageConcurrentViewers')
// 	.selectAll('p')
// 	.data(data)
// 	.enter()
// 	.append('p');