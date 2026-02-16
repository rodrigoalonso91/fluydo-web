import { Each } from 'syntax-sugar';

const options = [
	{ value: 'price-asc', label: 'Precio: menor a mayor' },
	{ value: 'price-desc', label: 'Precio: mayor a menor' },
	{ value: 'name-asc', label: 'Alfabético: A-Z' },
	{ value: 'name-desc', label: 'Alfabético: Z-A' },
	{ value: 'sku-asc', label: 'SKU: menor a mayor' },
	{ value: 'sku-desc', label: 'SKU: mayor a menor' }
];

export function OrderBySelect() {
	return (
		<div className="flex flex-wrap items-center gap-3 text-sm text-white-600">
			<span className="font-medium">Ordenar por:</span>
			<select
				id="order-by"
				className="rounded border border-gray-300 bg-white text-gray-600 px-2.5 py-1 text-sm shadow-sm focus:border-gray-400 focus:outline-none"
			>
				<Each
					of={options}
					setAsKey={option => option.value}
					renderAs={option => <option value={option.value}>{option.label}</option>}
				/>
			</select>
		</div>
	);
}
