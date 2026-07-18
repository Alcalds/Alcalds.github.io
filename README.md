# Joselito R. Alcalde — Professional Portfolio v3

This version replaces laptop-dependent `mailto:` buttons with a cross-device contact system.

## Contact improvements

- Working contact form for laptops and mobile devices
- Form categories for:
  - Job opportunity
  - Request detailed CV
  - Project collaboration
  - General inquiry
- “Request detailed CV” automatically preselects and prepares the form
- Copy-email button
- Optional “Open Gmail” shortcut
- CAPTCHA-based spam protection
- Custom thank-you page
- Public résumé remains downloadable

## Important first-time activation

The contact form uses FormSubmit, which does not require an account.

After deploying this version:

1. Open the live portfolio.
2. Submit one test message through the contact form.
3. Check `joselitoalcalde@gmail.com`.
4. Open the FormSubmit activation email.
5. Confirm/activate the form.

The first test message is used for activation. After confirmation, later submissions
will be forwarded to your Gmail inbox.

## Deploy to GitHub Pages

Copy all files and folders from this package into the root of your local
`Alcalds.github.io` repository, replacing the older versions.

Then run:

```bash
git add .
git commit -m "Add cross-device portfolio contact form"
git push origin main
```

New or updated files include:

- `index.html`
- `styles.css`
- `script.js`
- `thanks.html`
- `README.md`

After GitHub Pages finishes deploying, refresh with `Ctrl + Shift + R`.

## Privacy

The public website includes your professional Gmail address. It does not include
your private résumé, mobile number, or complete residential address.
