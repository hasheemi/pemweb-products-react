export const formatPrice = price => {
    const num = Number(price);
    if (Number.isNaN(num)) return 'Rp0';
    return `Rp${num.toLocaleString('id-ID')}`;
};
