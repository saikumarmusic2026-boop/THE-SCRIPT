# THE SCRIPT: what changed in update 2 (phone version, project files), and why

## Phone layout
- **Top bar on a phone:** logo, menu button and Save on one line, the script title under it. Everything else (Storyboard, Linktree, Story to Script, Title page, New, theme, language, Telugu switch) opens from the menu button. Why: the full bar needed about half of a phone screen.
- **Text view** is the default on phones: the script reflows to the screen at a readable size, with the usual screenplay indents kept as percentages. Why: the old way shrank an 8.5-inch page to about 40%, which is too small to read. *Page view* in the menu brings the scaled paper page back.
- Bigger tap targets (40px) in the top bar and element bar. Desktop layout is unchanged.

## Project files and sharing
- Saved projects are now **.thescript** files (old `.script.json` files still open). Why: a unique ending is what lets a computer or phone know which app opens it.
- **Computer:** the installer registers the file type. Double-click a project and the app opens it (it asks before replacing your current script, and waits for you to log in if the app is locked).
- **Android app:** tapping a `.thescript` file offers THE SCRIPT. Save and share use the Android share list.
- **Installed web app:** Android share list ("share to THE SCRIPT") and Chrome/Edge double-click.
- Everything uses the same project file, so one saved on the phone opens on the computer and the other way round.

## Getting the phone apps
- `web.yml` publishes the app on GitHub Pages (installable, works offline through `app/sw.js`).
- `android.yml` builds an `.apk` with Capacitor and `mobile/`.
- `mobile/patch_android.py` adds the file-opening rule and the app icon.

## Telugu typing on phones
Phone keyboards finish the word and add the space after the app's first check, so a second check now converts the word just before the cursor. Auto-correct and spell-check squiggles are switched off while Telugu typing is on.

## Tested, and not tested
- Tested here: script syntax, the three GitHub workflow files, the file-opening and sharing code against a fake page, the Android manifest patch on a sample, the Telugu phone-keyboard path, and the earlier layout and typing tests.
- **Not tested:** a real phone, a real Android build, and double-clicking a file in Windows (no phone, Android build tools or Windows in my workspace). The first GitHub run of `android.yml` may need a fix; send me the error lines if it fails. The Android "tap a file" step is the least certain part.
- iPhone: only the web app (no store app).

# THE SCRIPT: what changed in this update, and why

## 1. Top bar
- **Sato Sans everywhere in the interface** (from your sato_sans.zip), not only in the top bar. Why: you said the earlier font did not look good and the bar should feel like part of the app. Using one font for the bar, the side panels and the dialogs does that.
- **Natural size.** The big app name, the tiny tagline, the pill buttons, the gradient, the shadow and the rounded bottom edge are gone. The bar now uses the same 13px text as the rest of the app, sits on the same surface colour as the panels, and is divided by thin lines. Why: you said it looked stuck on and artificial.
- **App name** is in Narezka at a small size (19px) next to the logo. Tell me if you want the name in Sato too.
- Sato has only one weight (Medium) and only Latin letters. The app never fakes a bold, and Telugu, Hindi, Tamil and Malayalam text falls back to the Noto fonts.

## 2. Themes (natural light)
The nine colourful themes (Ocean, Forest, Sunset, Lavender, Mocha, Chai and so on) are replaced by six built on real light, plus "Match system":

| Theme | Light |
|---|---|
| Daylight (default) | soft warm grey and off-white paper |
| Paper | cream, like old paper |
| Overcast | cool grey, even light |
| Golden hour | warm late-afternoon light |
| Candlelight | dark and warm, easy at night |
| Moonlight | dark and cool |

The paper is slightly off-white and the script text is a soft black, which is easier on the eyes than pure white and pure black. Accent colours are muted. In the dark themes, text on accent buttons is dark so it stays readable. A theme you saved before falls back to Daylight.

## 3. Telugu typing
- **Dictionary grew from about 1,300 to about 2,040 words:** family, body, food, nature, animals, things at home, cities, jobs, feelings, days, months, festivals, many more names, and 30+ more verbs with their forms.
- **Word + ending.** `ravitho` becomes రవితో, `ammaki` అమ్మకి, `pustakaalu` పుస్తకాలు, `ekkadiki` ఎక్కడికి, `kaalejiki` కాలేజీకి. Why: Telugu words take endings, and listing every form was never going to cover them. Some irregular forms (for example ఊరు → ఊరికి) may still need a swap.
- **English words and cities** that are spelled differently from how they sound (hyderabad హైదరాబాద్, cut కట్, thanks థాంక్స్, about 80 of them).
- **Anusvara fix:** `simham` సింహం, `kareemnagar` కరీంనగర్.
- **Ctrl+Space right after a word** swaps it for the next spelling in place, with no box. The app remembers the spelling you settle on, so the same word comes out your way next time. Why: you did not want the hints box, but some words still need a way to be corrected.
- The `EN | తెలుగు` switch, the backtick for English words, and Ctrl+Z (back to English letters) work as before.

## 4. Debugging and speed
- Your sentence `namaskaram naa peru tharun nenu chadavadam maanesaanu` still comes out exactly right.
- Every dictionary word was typed back in a natural English spelling and found: 0 misses (two were missed before this update and fixed).
- 30,000 random inputs through the Telugu engine: no errors, about 50 microseconds per word.
- Page layout: 67,000 script lines checked, no overlaps and no overfull pages. A 6,000-line script lays out in about 3 ms.
- Every id used by the code exists in the page once, and every colour variable used is defined.
- **Not tested:** a real window. There is no browser in my workspace, so look at the preview link and tell me what looks off.

## 5. Plugins
None added. I considered extra packages (spell-check, font loaders) and left them out so the app stays small and works offline. The only outside things are the PDF engine (downloaded when you install) and Google Fonts for the Telugu font list.

## 6. Files changed
`app/index.html` (top bar, fonts, themes), `app/telugu.js` (typing engine), `app/fonts/` (Sato added, Sekuya removed), `main.js` (start-up colour), `README.md`, `CHANGES.md` (this file).
