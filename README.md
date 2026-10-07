# Irish Van Man — house removals website

Static website for **Irish Van Man**, a Dublin-based house removals business.
Plain HTML, CSS and vanilla JavaScript — no build step, no framework, no server.
Drop the folder on any static host and it works.

Layout and styling follow the same pattern as [tinyteardrops.ie](https://tinyteardrops.ie):
a fixed gradient topbar with a mobile dropdown, a gradient hero with an amber
underline, warm-stone page background with panel sections, and amber call-to-action
buttons.

---

## Files

| File | What it is |
|---|---|
| `index.html` | Home — hero, three promises, service preview, how it works, testimonials |
| `services.html` | Full service list with photos and pricing style |
| `gallery.html` | Photo grid |
| `about.html` | About Derek, how we work, FAQs |
| `contact.html` | Contact cards and the EmailJS enquiry form |
| `ivm.css` | All styling and the colour variables |
| `ivm.js` | Mobile nav, active-page highlight, footer year |
| `contact.js` | EmailJS wiring for the enquiry form |
| `logo.svg` | Logo (van + clover), also used as the favicon |

---

## Before this goes live — things to change

### 1. Phone number and email (placeholders)

The phone number **087 123 4567** is a placeholder and is not a real number.
Replace it everywhere, in both the display text and the `tel:` link:

```
087 123 4567        → Derek's real number (display)
tel:+353871234567   → Derek's real number in international format
derek@irishvanman.ie → the real mailbox
```

They appear in: the topbar, the footer, the contact cards, the floating call
button, the contact page band, and two of the error messages in `contact.js`.
A find-and-replace across the folder catches them all.

### 2. EmailJS keys

Open `contact.js` and replace the three constants at the top:

```js
var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

Until they're filled in, the form still validates but shows a friendly
"not connected yet, call Derek instead" message rather than failing silently.

**Setting up EmailJS (free tier is 200 emails/month):**

1. Sign up at <https://www.emailjs.com>
2. **Email Services** → add a service (Gmail, Outlook, or SMTP) → copy the **Service ID**
3. **Email Templates** → create a template → copy the **Template ID**
4. **Account → General** → copy the **Public Key**

In the template, set:

- **To email:** `derek@irishvanman.ie`
- **Reply To:** `{{reply_to}}`
- **Subject:** `New removals enquiry — {{from_name}}`

Template body — these are the variables the form sends:

```
New enquiry from the Irish Van Man website
Received: {{submitted_at}}

Name:        {{from_name}}
Email:       {{from_email}}
Phone:       {{phone}}

Moving from: {{move_from}}
Moving to:   {{move_to}}
Date wanted: {{move_date}}
Size of job: {{property}}
Awkward bits:{{stairs_note}}
Services:    {{services}}

Message:
{{message}}
```

5. In EmailJS → **Account → Security**, add your live domain to the allowed
   list so nobody else can send through your keys.

> The public key is meant to be visible in client-side code — that's how EmailJS
> works. Domain restriction is what protects it, so don't skip step 5.

### 3. Testimonials

The three reviews on the home page are placeholders and are labelled as such on
the page. Swap them for real ones (or delete the section) before launch.

### 4. Photos

Images are hotlinked from [Unsplash](https://unsplash.com) via
`images.unsplash.com`. The Unsplash licence allows free commercial use with no
attribution required, and hotlinking is explicitly supported.

Replace them with photos of Derek's own van and jobs as soon as there are some —
real photos sell a removals business far better than stock. Each `<img>` has a
descriptive `alt` attribute; update those too when you swap the pictures.

If you'd rather self-host the current images, download each one and change the
`src` to a local path, e.g. `img/loading-van.jpg`.

---

## Running it locally

Just open `index.html` in a browser — everything works from the file system
except the EmailJS send, which needs a real origin. For that, serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Hosting

Any static host will do. All of these are free for a site this size:

- **Netlify** — drag the folder onto <https://app.netlify.com/drop>
- **Cloudflare Pages** — connect this git repo, no build command, output dir `/`
- **GitHub Pages** — push to a repo, Settings → Pages → deploy from branch
- Or plain shared hosting over FTP

Point `irishvanman.ie` at whichever one you pick, and make sure HTTPS is on
(all of the above do it automatically).

---

## Colours

Defined once at the top of `ivm.css` — change them there and the whole site follows:

| Variable | Value | Used for |
|---|---|---|
| `--green` | `#127a52` | brand anchor, headings, footer |
| `--green-deep` | `#0b5138` | dark end of the gradient |
| `--blue` | `#0e4f62` | light end of the gradient |
| `--yellow` | `#f0a33c` | buttons, accents, hero underline |
| `--light` | `#f4f1ea` | page background |
| `--surface` | `#faf7f0` | section panels |
| `--raised` | `#fffdf8` | cards |
| `--dark` | `#1b2b2b` | body text |
