import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	override summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		// Showing the formatted bedtime and wake-up time in history 
		const hours = Math.floor(difference_ms / (1000 * 60 * 60));
		const minutes = Math.floor(difference_ms / (1000 * 60)) % 60;

		return `Bedtime: ${this.sleepStart.toLocaleString()} · ` +
			   `Wake-up: ${this.sleepEnd.toLocaleString()} · ` +
			   `Duration: ${hours}h ${minutes}m`;
	}

	override dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	durationString(): string {
		const minutes = Math.floor((this.sleepEnd.getTime() - this.sleepStart.getTime()) / 60000);
		return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
	}

	bedtimeString(): string {
		return this.sleepStart.toLocaleString([], {
			year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
		});
	}

	wakeTimeString(): string {
		return this.sleepEnd.toLocaleString([], {
			year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
		});
	}
}
