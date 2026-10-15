# Best Friend Birthday Surprise 🌷

A responsive birthday surprise website built with React, Vite, Framer Motion, and CSS.

## Run it locally

1. Install Node.js (LTS) from https://nodejs.org/
2. Extract this ZIP.
3. Open the extracted `best-friend-birthday` folder in VS Code.
4. Open the terminal in VS Code and run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL Vite prints in the terminal (usually http://localhost:5173).

## Personalize it

Open `src/BirthdayApp.jsx` and edit the `CONFIG` object near the top:
- `friendName`: your friend's name
- `yourName`: your name
- `birthdayMessage`: the paragraphs shown in the card
- `photos`: the image URLs and captions

### Use your own photos
Create `public/photos/` and copy your images there. Then set photo paths like:

```js
src: "/photos/friend-1.jpg"
```

Keep each photo inside `public/photos/`. You can replace all six example image URLs with your own.

The project currently uses remote Unsplash placeholder photos, so an internet connection is needed to load those images. No backend or database is required.
