export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-au', {
        style: "currency",
        currency: "AUD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}