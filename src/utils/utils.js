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

// Utility function to convert "September 2024" to "2024-09 format"
export function convertToYearMonth (dateString) {
    const date = new Date(dateString + "01") // add a day to make it a full day
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Ensures two digits
    return `${year}-${month}`;
};

export const excelDateToJSDate = (serial) => {
    const utc_days = Math.floor(serial - 25569);
    const date_info = utc_days * 86400; 
    const date = new Date(date_info * 1000);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};