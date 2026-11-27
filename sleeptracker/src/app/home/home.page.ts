import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline, listOutline } from 'ionicons/icons';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  host: {
    '[class.overnight-theme]': "activeLog === 'overnight' || (activeLog === 'sleepiness' && sleepinessPreview >= 4)",
    '[attr.data-sleepiness-level]': "activeLog === 'sleepiness' ? sleepinessPreview : null",
  },
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonIcon],
})
export class HomePage {
  constructor(public sleepService:SleepService) {
		addIcons({ moonOutline, sunnyOutline, listOutline });
	}

	// Adding save logic
	overnightMessage = '';
	overnightStatus: 'error' | 'success' | '' = '';
	async saveOvernight(bedtime: string, wakeTime: string) {
		if (!bedtime || !wakeTime) {
			this.overnightMessage = 'Enter both a bedtime and a wake-up time.';
			this.overnightStatus = 'error';
			return;
		}

		const start = new Date(bedtime);
		const end = new Date(wakeTime);

		if (end <= start) {
			this.overnightMessage = 'Wake-up time must be after bedtime. Check both dates.';
			this.overnightStatus = 'error';
			return;
		}

		try {
			await this.sleepService.saveOvernightEntry(start, end);
			this.overnightMessage = 'Overnight sleep saved to your history.';
			this.overnightStatus = 'success';
		} catch {
			this.overnightMessage = 'Could not save overnight sleep. Please try again.';
			this.overnightStatus = 'error';
		}
	}

	sleepinessLevels = StanfordSleepinessData.ScaleValues;
	sleepinessMessage = '';
	sleepinessStatus: 'error' | 'success' | '' = '';
	// Preview only: keep the selected theme in memory until the page refreshes.
	sleepinessPreview = 0;

	previewSleepiness(value: string) {
		const rating = Number(value);
		this.sleepinessPreview = Number.isInteger(rating) && rating >= 1 && rating <= 7 ? rating : 0;
	}

	async saveSleepiness(value: string) {
		const rating = Number(value);

		if (!Number.isInteger(rating) || rating < 1 || rating > 7) {
			this.sleepinessMessage = 'Choose a sleepiness rating from 1 to 7.';
			this.sleepinessStatus = 'error';
			return;
		}

		try {
			await this.sleepService.saveSleepinessCheckIn(rating);
			this.sleepinessMessage = 'Sleepiness saved to your history.';
			this.sleepinessStatus = 'success';
		} catch {
			this.sleepinessMessage = 'Could not save this check-in. Please try again.';
			this.sleepinessStatus = 'error';
		}
	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	getRecordType(entry: SleepData): string {
		if (entry instanceof OvernightSleepData) return 'Overnight';
		if (entry instanceof StanfordSleepinessData) return 'Daytime';
		return 'Sleep record';
	}

	getOvernightEntry(entry: SleepData): OvernightSleepData | null {
		return entry instanceof OvernightSleepData ? entry : null;
	}

	// Two views
	activeLog: 'overnight' | 'sleepiness' | 'history' = 'overnight';

	// Preview the duration before saving the time (edge case)
	durationPreview = '';
	durationPreviewInvalid = false;

	updateDurationPreview(bedtime: string, wakeTime: string) {
	this.durationPreview = '';
	this.durationPreviewInvalid = false;
	if (!bedtime || !wakeTime) return;

	const minutes = (new Date(wakeTime).getTime() - new Date(bedtime).getTime()) / 60000;

	if (minutes <= 0) {
		this.durationPreview = 'Wake-up time must be after bedtime.';
		this.durationPreviewInvalid = true;
		return;
	}

	const hours = Math.floor(minutes / 60);
	this.durationPreview = `Sleep duration: ${hours}h ${minutes % 60}m`;
	}



}
