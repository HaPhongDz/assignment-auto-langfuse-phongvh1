export class lib {
    // Convert 24-hour format to 12-hour format
    static convertTo12HourFormat(hours: number): string {
        const period = hours >= 12 ? 'PM' : 'AM';
        const hour = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        return `${hour} ${period}`;
    }

    // Format date time
    static formatDateTime(date: Date, formatType: 'MMDDYYYY:HH:MM' | 'MMDDYYYY' | 'MMYYYY' | 'MMDDYY:HH:MM' = 'MMDDYYYY:HH:MM', fullMonth: boolean = false): string {
        const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = fullMonth ? monthsFull[date.getMonth()] : monthsShort[date.getMonth()];
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        const shortYear = year.toString().slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        switch (formatType) {
            case 'MMDDYYYY:HH:MM':
                return `${month} ${day}, ${year} : ${hours}:${minutes}`;
            case 'MMDDYYYY':
                return `${month} ${day}, ${year}`;
            case 'MMYYYY':
                return `${month} ${year}`;
            case 'MMDDYY:HH:MM':
                return `${month} ${day}, ${shortYear} : ${hours}:${minutes}`;
            default:
                return `${month} ${day}, ${year} : ${hours}:${minutes}`;
        }
    }
}