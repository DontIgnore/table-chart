'use client';

import { useState, useEffect, useReducer } from 'react';

export default function ChartElement(props) {
	const [data, setData] = [props.data, props.setData];
	const [chartPage, setChartPage] = [props.chartPage, props.setChartPage];
	const [chartElements, setChartElements] = useState([]);
	const [chartMax, setChartMax] = useState(0);
	const [selectedItem, setSelectedItem] = [props.selectedItem, props.setSelectedItem];
	const isLoading = props.isLoading;

	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

	useEffect(() => {
		const offset = chartPage * 10;
		let chartList = [];
		let max = Math.max(...data.map((o) => o.sum));
		for (let i = offset; i < offset + 10; i++) {
			const chart = !!data[i] ? data[i] : null;
			if (chart != null) {
				chartList.push({ id: i, price: chart.sum, height: parseInt(chart.sum / (max / 100)), selected: selectedItem.id === chart.id });
			}
		}
		setChartElements(chartList);
		setChartMax(max);
	}, [chartPage, data, selectedItem]);

	const select = (id, decl) => {
		const selected = data;
		[...selected].map((i) => {
			if (id == i[decl]) {
				i.selected = true;
			} else {
				i.selected = false;
			}
			return i;
		});
		setData(selected);
		forceUpdate();
	};

	if (isLoading) return <p>Loading...</p>;
	if (!data) return <p>No data</p>;

	const chartSlide = (direction) => {
		if (direction == 0) {
			chartPage > 0 ? setChartPage(chartPage - 1) : null;
		} else if (direction == 1) {
			chartPage < data.length / 10 - 1 ? setChartPage(chartPage + 1) : null;
		}
	};

	return (
		<>
			<div className='chart'>
				<div className='viewport'>
					<div className='layout'>
						<div className='limit'>
							<div style={{ bottom: 1000 / (chartMax / 100) + '%' }} className='wrapper'>
								<div className='limit_line'></div>
								<div className='limit_caption'>1000$</div>
							</div>
						</div>
						<div className='range'>
							<div className='max'>{chartMax}$</div>
							<div className='avg'>{chartMax / 2}$</div>
							<div className='min'>0$</div>
						</div>
					</div>
					<div className='chart_list'>
						{chartElements.map((el) => {
							// if (el == null) {
							// 	return <div key={el.id} className='chart_element'></div>;
							// }
							return (
								<div key={el.id} onClick={() => setSelectedItem(data[el.id])} className='chart_element'>
									<div style={{ height: `${el.height}%` }} className={`chart_fill ${el.selected ? 'selected' : ''} ${el.price <= 1000 ? '' : 'limited'}`}>{`${el.price}$`}</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className='controls'>
					<input className='button' onClick={() => chartSlide(0)} type='button' value='<' />
					<span className='iterator'>{chartPage + 1}</span>
					<input className='button' onClick={() => chartSlide(1)} type='button' value='>' />
				</div>
			</div>
		</>
	);
}
