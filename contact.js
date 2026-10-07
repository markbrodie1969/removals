/* Irish Van Man — enquiry form (EmailJS)
   ============================================================
   SETUP — replace the three placeholders below.

   1. Create a free account at https://www.emailjs.com
   2. Add an Email Service (Gmail, Outlook, etc.)  -> SERVICE ID
   3. Create an Email Template                      -> TEMPLATE ID
   4. Account -> General -> Public Key              -> PUBLIC KEY

   Your EmailJS template can use any of these variables:
     {{from_name}}  {{from_email}}  {{phone}}
     {{move_from}}  {{move_to}}     {{move_date}}
     {{property}}   {{stairs_note}} {{services}}
     {{message}}    {{reply_to}}    {{submitted_at}}

   Suggested template "To email": derek@irishvanman.ie
   Suggested template "Reply To": {{reply_to}}
   ============================================================ */

var EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
var EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

(function () {
  'use strict';

  var PLACEHOLDERS = ['YOUR_PUBLIC_KEY', 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID'];

  function isConfigured() {
    return PLACEHOLDERS.indexOf(EMAILJS_PUBLIC_KEY) === -1 &&
           PLACEHOLDERS.indexOf(EMAILJS_SERVICE_ID) === -1 &&
           PLACEHOLDERS.indexOf(EMAILJS_TEMPLATE_ID) === -1;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('enquiry-form');
    if (!form) return;

    var status = document.getElementById('form-status');
    var submit = document.getElementById('form-submit');

    function say(kind, text) {
      status.className = 'form-status show ' + kind;
      status.textContent = text;
      status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Initialise EmailJS if the SDK loaded and keys are filled in.
    var ready = false;
    if (isConfigured() && window.emailjs) {
      try {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        ready = true;
      } catch (err) {
        console.error('EmailJS init failed:', err);
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot — bots fill hidden fields, people don't.
      if (form.company_website && form.company_website.value) return;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!ready) {
        say('info',
          'The enquiry form is not connected to EmailJS yet. ' +
          'Add your EmailJS keys in contact.js, or call Derek on 087 123 4567 in the meantime.');
        return;
      }

      // Collect the ticked service checkboxes into one readable string.
      var picked = Array.prototype.slice
        .call(form.querySelectorAll('input[name="services"]:checked'))
        .map(function (c) { return c.value; });

      var params = {
        from_name:    form.from_name.value.trim(),
        from_email:   form.from_email.value.trim(),
        reply_to:     form.from_email.value.trim(),
        phone:        form.phone.value.trim(),
        move_from:    form.move_from.value.trim(),
        move_to:      form.move_to.value.trim(),
        move_date:    form.move_date.value || 'Not sure yet',
        property:     form.property.value || 'Not specified',
        stairs_note:  form.stairs_note.value.trim() || 'None mentioned',
        services:     picked.length ? picked.join(', ') : 'Not specified',
        message:      form.message.value.trim(),
        submitted_at: new Date().toLocaleString('en-IE')
      };

      submit.disabled = true;
      var original = submit.textContent;
      submit.textContent = 'Sending…';
      say('info', 'Sending your enquiry…');

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
        .then(function () {
          form.reset();
          say('ok', 'Thanks ' + params.from_name.split(' ')[0] +
            ' — your enquiry is with Derek. He normally comes back the same day.');
        })
        .catch(function (err) {
          console.error('EmailJS send failed:', err);
          say('err',
            'Sorry, that did not send. Please call Derek on 087 123 4567 ' +
            'or email derek@irishvanman.ie and he will sort you out.');
        })
        .finally(function () {
          submit.disabled = false;
          submit.textContent = original;
        });
    });
  });
})();
