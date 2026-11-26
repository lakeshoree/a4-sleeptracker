import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor(public sleepService:SleepService) {

	}

	// Adding save logic
	overnightMessage = '';
	saveOvernight(bedtime: string, wakeTime: string) {
		if (!bedtime || !wakeTime) {
			this.overnightMessage = 'Enter both a bedtime and a wake-up time.';
			return;
		}

		const start = new Date(bedtime);
		const end = new Date(wakeTime);

		if (end <= start) {
			this.overnightMessage = 'Wake-up time must be after bedtime. Check both dates.';
			return;
		}

		const entry = new OvernightSleepData(start, end);
		this.sleepService.logOvernightData(entry);
		this.overnightMessage = 'Overnight sleep added to your history.';
	}

	sleepinessLevels = StanfordSleepinessData.ScaleValues;
	sleepinessMessage = '';

	saveSleepiness(value: string) {
		const rating = Number(value);

		if (!Number.isInteger(rating) || rating < 1 || rating > 7) {
			this.sleepinessMessage = 'Choose a sleepiness rating from 1 to 7.';
			return;
		}

		const entry = new StanfordSleepinessData(rating);
		this.sleepService.logSleepinessData(entry);
		this.sleepinessMessage = 'Sleepiness added to your history.';
	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}
}
