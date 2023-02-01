'use client';
import { useState, useEffect } from 'react';

import SortTable from './sortTable';
import ChartElement from './chartElement';

export default function Home() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetch('/api/hello')
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			});
	}, []);

	if (isLoading) return <p>Loading...</p>;
	if (!data) return <p>No data</p>;
	return (
		<main className='main'>
			<ChartElement data={data} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setData={setData} isLoading={isLoading}></ChartElement>
			<SortTable data={data} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setData={setData} isLoading={isLoading}></SortTable>
		</main>
	);
}
