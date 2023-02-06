'use client';

import { useState, useReducer, useEffect } from 'react';

export default function ItemEditor(props) {
	const [inShow, setInShow] = useState(false);
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

	let data = props.item;

	useEffect(() => setInShow(true), [data]);

	return inShow && data ? (
		<div className='itemExplorer'>
			<div className='clientInfo'>
				<div className='header'>
					Declaration Info
					<div className='wrap'>
						<span
							className='editBtn'
							onClick={() => {
								console.log('WOW');
							}}>
							edit
						</span>
						<span
							className='closeBtn'
							onClick={() => {
								setInShow(false);
								props.setSelectedItem(false);
							}}>
							X
						</span>
					</div>
				</div>
				<div className='body'>
					<div className='body_info'>ID: {data.declarationId}</div>
					<div className='body_info'>Name: {data.username}</div>
					<div className='body_info'>Passport: {data.passport}</div>
					<div className='body_info'>Quantity: {data.quantity}</div>
					<div className='body_info'>Brutto: {data.brutto}</div>
					<div className='body_info'>Total price: {data.sum}</div>
				</div>
				<div className='img'></div>
			</div>

			<div className='table items'>
				<div className='header tr'>
					<div className='th'>№</div>
					<div className='th'>Name</div>
					<div className='th'>Price</div>
					<div className='th'>Netto</div>
					<div className='th'>Quantity</div>
				</div>
				{data.items.map((item, i) => {
					return (
						<div className={`tr ${item.selected ? 'selected' : ''}`} key={i}>
							<div className='td'>{i + 1}</div>
							<div className='td'>{item.name}</div>
							<div className='td'>{item.price}$</div>
							<div className='td'>{item.netto}kg</div>
							<div className='td'>{item.quantity}</div>
						</div>
					);
				})}
			</div>
		</div>
	) : (
		<></>
	);
}
