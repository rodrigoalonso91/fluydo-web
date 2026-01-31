import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const GET: APIRoute = async ({ params }) => {
  const backofficeUrl = getSecret('DIRECTUS_BO_URL');
  const path = params.path;

  if (!backofficeUrl || !path || !UUID_REGEX.test(path)) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const imageUrl = `${backofficeUrl}/assets/${path}`;
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return new Response('Image not found', { status: 404 });
    }

    const blob = await response.blob();
    
    return new Response(blob, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new Response('Error fetching image', { status: 500 });
  }
};
