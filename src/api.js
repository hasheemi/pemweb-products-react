const BASE_URL = '/api';

async function request(url, options = {}) {
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    if (!res.ok) {
        let message = `Request gagal (${res.status})`;
        try {
            const body = await res.json();
            if (body?.message) message = body.message;
        } catch {
            // ignore json parse error
        }
        throw new Error(message);
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return null;
    return res.json();
}

export async function getProducts() {
    return request(`${BASE_URL}/products`);
}

export async function getProductById(id) {
    return request(`${BASE_URL}/products/${id}`);
}

export async function createProduct({ name, price }) {
    return request(`${BASE_URL}/products`, {
        method: 'POST',
        body: JSON.stringify({ name, price }),
    });
}

export async function updateProduct(id, { name, price }) {
    return request(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, price }),
    });
}

export async function deleteProduct(id) {
    return request(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });
}
