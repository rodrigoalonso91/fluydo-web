import { NextRequest, NextResponse } from 'next/server';

const backofficeUrl = process.env.DIRECTUS_BO_URL;

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	if (!backofficeUrl) {
		return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
	}

	const response = await fetch(`${backofficeUrl}/assets/${id}`);

	if (!response.ok) {
		return NextResponse.json({ error: 'Asset not found' }, { status: response.status });
	}

	const contentType = response.headers.get('content-type') ?? 'application/octet-stream';
	const buffer = await response.arrayBuffer();

	return new NextResponse(buffer, {
		headers: {
			'Content-Type': contentType,
			'Cache-Control': 'public, max-age=31536000, immutable'
		}
	});
}
