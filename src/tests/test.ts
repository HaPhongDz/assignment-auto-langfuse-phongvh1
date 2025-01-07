function getCurrentAndPreviousTime(): string {
    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const now: Date = new Date();
    const fiveMinutesAgo: Date = new Date(now.getTime() - 5 * 60 * 1000);
    
    function formatDateTime(date: Date): string {
        const month: string = months[date.getMonth()];
        const day: string = date.getDate().toString().padStart(2, '0');
        const year: string = date.getFullYear().toString().slice(-2);
        const hours: string = date.getHours().toString().padStart(2, '0');
        const minutes: string = date.getMinutes().toString().padStart(2, '0');
        const seconds: string = date.getSeconds().toString().padStart(2, '0');
        
        return `${month} ${day}, ${year} : ${hours}:${minutes}:${seconds}`;
    }
    
    const currentTime: string = formatDateTime(now);
    const previousTime: string = formatDateTime(fiveMinutesAgo);
    
    return `${previousTime} - ${currentTime}`;
}

console.log(getCurrentAndPreviousTime());