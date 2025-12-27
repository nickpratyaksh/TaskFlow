# TaskFlow

A website where users can manage tasks, track time spent using a real-time timer, and view daily productivity summaries. The project is fully made in Sveltekit, and most of the website is rendered server side (SSR) which allows for highly performant user experience.

## Tech Stack used:

- Sveltekit
- Drizzle ORM
- Lucia Auth
- Postgresql

## Live Preview

Link - https://taskflow-five-flame.vercel.app/

Test credentials:

email: nicktestaccount@gmail.com
password: Test@123

## Local Deployment Steps

- Install NodeJS and Postgresql
- Clone the repo
- npm install
- create environment variables DATABASE_URL and GEMINI_API_KEY
- npm run db:generate && npm run db:migrate
- npm run dev

## Checklist

- ✅ Live demo Link
- ✅ Working auth
- ✅ Test credentials
- ✅ AI Integration

## Things left

- UI polishing and UX improvements
- View all time logs
- Total spent time on each task

## Note

I built this project in two days while trying out new libraries. Drizzle and Lucia Auth took a long time to setup with Sveltekit and Postgresql, mostly because of their sub-optimal documentaion (I later found out Lucia Auth was deprecated 5 months ago).
UI was made with some help from Claude, other than that AIs are not helpful at all as they dont even know Svelte 5 exists, and runes is a feature.

I spent a whole day reading documentation and demo project provided by Lucia Auth. Later I found out another auth library to use for future projects - Better Auth (I found it through the it's creator on reddit.)

Overall it was a pretty fun experience working with Sveltekit, how it handles states and most of the work can be done on the server (SSR).
There are still a few things left to complete the website which I will be working on the upcoming days.
