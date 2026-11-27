--Readme document for LOKESH SHARMA, lokeshs1@uci.edu, 84079406--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?

This assignment took me two entire days of work, splititng up the functional design portion and the aesthetic portions.

3. What online resources did you consult when completing this assignment? (list specific URLs)

I refered to a few online resources for understanding Ionic Storage to help with the data logging and also basic ionic theming.

Links:
https://ionicframework.com/docs/theming/basics
https://ionicframework.com/docs/angular/storage

For the desing inspiration I took a look at Apples documentation to see how they format their menus, and liked the liquid class look of the menus and wanted to apply that as an ombre effect inside to bubbles.

https://developer.apple.com/design/human-interface-guidelines/menus

I also took inspiration from this color palette for the purples of evoking a sleep. This palette made sense because online research showed me that these low-glare palettes reduce nighttime eye strain. 

https://www.color-hex.com/color-palette/109835

I used AI for edge case testing and brainstorming of what some small adjustments I could make to polish the app.


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

N/A

5. Is there anything special we need to know in order to run your code?

cd into sleeptracker
npm install
ionic serve

--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?

There was no one specific user in mind, but the idea was that there it was a no gimicks, "limited brain power required" to use app. Few words, even fewer buttons, you simply tap or type (for time) and hit save.

7. Did you design your app specifically for iOS or Android, or both?

Both, but I was primarily inspired by Apple design principles.

8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?

I chose a simple manually typing version of the date and time, and the person can also click the calendar icon to select date and time using browser's built-in

9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?

Rather than the original single select menu, I with long text, I opted to create 7 buttons that change the background to associated colors of sleepiness (1) being
light blue and awake of daylight and (7) being complelty dark like overnight.

10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?

At the bottom I created a history tab like the tabs for overnight and daytime. With the duration bolded for easier viewing.

11. Which feature choose--using a native device resource, backing up logged data, or both?

I chose to back up the logged data using Ionic Storage to save both the overnight sleep entries and daytime sleepiness locally. I made sure that the entires appeared in the history even after refreshing the page and reopening the app.

12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?

N/A I chose the data backup option and used Ionic Storage for saving locally

13. If you backed up logged data, where does it back up to?

The app saves the logged data from overnight and daytime sleepiness ratings locally in the browser using Ionic Storage. As long as its opened on the same browser and device it loads the data.

14. How does your app implement or follow principles of good mobile design?

The main ways that my app follows principles of good mobile design is through ease of use and visual simplicity. Something like a sleep tracker, used inherently when the user is tired or not operating at full efficiency. Therefore all design elements are simple and easy to read. Such as a simple button row for numbers/levels of sleepiness and calendar for selecting dates.
