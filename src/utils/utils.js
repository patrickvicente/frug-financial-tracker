export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-au', {
        style: "currency",
        currency: "AUD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function getThisMonth() {
    const date = new Date();
    return date.toISOString().split('T')[0].slice(0, 7);
};

export function getNextMonth(dateString) {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + 1)
    return date.toISOString().split('T')[0].slice(0, 7);
}

export function getPreviousMonth(dateString) {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() - 1)
    return date.toISOString().split('T')[0].slice(0, 7);
}

export function formatMonthYear(dateString) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [year, month] = dateString.split("-");
    return `${months[parseInt(month, 10) - 1]} ${year}`;
}