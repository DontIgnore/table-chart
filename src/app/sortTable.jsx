'use client';

import { useState, useReducer, useEffect } from 'react';
import ItemEditor from './itemEditor';

export default function SortTable(props) {
	const [data, setData] = [props.data, props.setData];
	const isLoading = props.isLoading;
	const [selectedItem, setSelectedItem] = [props.selectedItem, props.setSelectedItem];

	const [order, setOrder] = useState('AZ');
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

	const sort = (col) => {
		if (col == 'username' || col == 'declarationId' || col == 'passport') {
			if (order == 'AZ') {
				const sorted = [...data].sort((a, b) => (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1));
				setData(sorted);
				setOrder('ZA');
			} else if (order == 'ZA') {
				const sorted = [...data].sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1));
				setData(sorted);
				setOrder('AZ');
			}
		} else {
			if (order == 'AZ') {
				const sorted = [...data].sort((a, b) => (parseInt(a[col]) > parseInt(b[col]) ? 1 : -1));
				setData(sorted);
				setOrder('ZA');
			} else if (order == 'ZA') {
				const sorted = [...data].sort((a, b) => (parseInt(a[col]) < parseInt(b[col]) ? 1 : -1));
				setData(sorted);
				setOrder('AZ');
			}
		}
	};

	useEffect(() => {
		const selected = data;
		const id = selectedItem.declarationId;
		[...selected].map((i) => {
			if (id == i['declarationId']) {
				i.selected = true;
			} else {
				i.selected = false;
			}
			return i;
		});
		setData(selected);
		forceUpdate();
	}, [data, selectedItem, setData]);

	if (isLoading) return <p>Loading...</p>;
	if (!data) return <p>No data</p>;

	return (
		<>
			<div className='table'>
				<div className='header tr'>
					<div className='th' onClick={() => sort('id')}>
						№
					</div>
					<div className='th' onClick={() => sort('declarationId')}>
						ID
					</div>
					<div className='th' onClick={() => sort('username')}>
						Name
					</div>
					<div className='th' onClick={() => sort('passport')}>
						Passport
					</div>
					<div className='th' onClick={() => sort('quantity')}>
						Quantity
					</div>
					<div className='th' onClick={() => sort('brutto')}>
						Brutto
					</div>
					<div className='th' onClick={() => sort('sum')}>
						Price
					</div>
				</div>
				{data.map((decl, i) => {
					return (
						<div
							onClick={() => {
								setSelectedItem(decl);
							}}
							className={`tr ${decl.selected ? 'selected' : ''}`}
							key={decl.userId}>
							<div className='td'>{+decl.id + 1}</div>
							<div className='td'>{decl.declarationId}</div>
							<div className='td'>{decl.username}</div>
							<div className='td'>{decl.passport}</div>
							<div className='td'>{decl.quantity}</div>
							<div className='td'>{decl.brutto}kg</div>
							<div className='td'>{decl.sum}$</div>
						</div>
					);
				})}
			</div>
			<ItemEditor setSelectedItem={setSelectedItem} item={selectedItem}></ItemEditor>
		</>
	);
}
