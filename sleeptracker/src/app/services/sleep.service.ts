import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];
	private storageReady: Promise<void>;

	constructor(private storage: Storage) {
		if (SleepService.LoadDefaultData) {
			this.addDefaultData();
			SleepService.LoadDefaultData = false;
		}

		this.storageReady = this.loadSavedCheckIns();
	}

	private addDefaultData() {
		var goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(1, 3, 0); //1:03am
		var wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000); //Sleep for exactly eight hours, waking up at 9:03am
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp)); // add that person was asleep 1am-9am yesterday
		var sleepinessDate = new Date();
		sleepinessDate.setDate(sleepinessDate.getDate() - 1); //set to yesterday
		sleepinessDate.setHours(14, 38, 0); //2:38pm
		this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate)); // add sleepiness at 2pm
		goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(23, 11, 0); //11:11pm
		wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 9 * 60 * 60 * 1000); //Sleep for exactly nine hours
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp));
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
	}

	private async loadSavedCheckIns(): Promise<void> {
		await this.storage.create();

		await this.storage.forEach((record, key) => {
			if (key.startsWith('sleepiness:')) {
				const entry = new StanfordSleepinessData(
					record.rating,
					new Date(record.loggedAt)
				);
				entry.id = key.slice('sleepiness:'.length);
				this.logSleepinessData(entry);
			}
			else if (key.startsWith('overnight:')) {
				const entry = new OvernightSleepData(
					new Date(record.start),
					new Date(record.end)
				);
				entry.id = key.slice('overnight:'.length);
				this.logOvernightData(entry);
			}
		});
	}

	public async saveSleepinessCheckIn(rating: number): Promise<void> {
		const entry = new StanfordSleepinessData(rating);
		await this.storageReady;

		await this.storage.set(`sleepiness:${entry.id}`, {
			rating,
			loggedAt: entry.loggedAt.toISOString()
		});

		this.logSleepinessData(entry);
	}

	public async saveOvernightEntry(start: Date, end: Date): Promise<void> {
		const entry = new OvernightSleepData(start, end);
		await this.storageReady;

		await this.storage.set(`overnight:${entry.id}`, {
			start: start.toISOString(),
			end: end.toISOString()
		});

		this.logOvernightData(entry);
	}

}
