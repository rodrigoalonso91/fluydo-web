import { getPurchaseConditions } from '@/utils/server';
import { Each } from 'syntax-sugar';

export async function PurchaseConditions() {
	const purchaseConditions = await getPurchaseConditions();

	return (
		<section className="py-16 bg-primary text-secondary">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">CONDICIONES DE COMPRA</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Each
							of={purchaseConditions}
							setAsKey={condition => condition.id}
							renderAs={condition => (
								<div className="bg-secondary text-primary p-6 rounded-lg shadow-sm">
									<h3 className="text-xl font-semibold mb-4">{condition.title}</h3>
									<p>{condition.description}</p>
								</div>
							)}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
