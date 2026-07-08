/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — ADVISOR HUB ACCOUNTS
   Firebase Authentication wrapper for hub-login.html / hub-portal.html.

   ⚡ TO SWITCH ACCOUNTS LIVE: create a free Firebase project
   (console.firebase.google.com → Add project → Build → Authentication
   → enable "Email/Password" → Project settings → Add web app), then
   paste the config values below. Until then, the pages show an
   elegant "accounts opening soon" notice instead of broken forms.
   ═══════════════════════════════════════════════════════════════ */

window.MM_AUTH_CONFIG = {
  // EDIT HERE — paste your Firebase web-app config:
  apiKey: "",
  authDomain: "",
  projectId: "",
  appId: ""
};

window.MM_AUTH = (function () {
  "use strict";

  var cfg = window.MM_AUTH_CONFIG;
  var configured = !!(cfg && cfg.apiKey && cfg.authDomain && cfg.projectId);
  var app = null;

  if (configured && typeof firebase !== "undefined") {
    app = firebase.initializeApp(cfg);
  } else {
    configured = false;
  }

  /* friendly error messages for the most common auth failures */
  var ERRORS = {
    "auth/email-already-in-use": "An account with this email already exists — try logging in instead.",
    "auth/invalid-email": "That email address doesn't look right — please check it.",
    "auth/weak-password": "Please choose a password of at least 8 characters.",
    "auth/user-not-found": "We couldn't find an account with that email. Create one in a few seconds.",
    "auth/wrong-password": "That password doesn't match. Try again, or reset it below.",
    "auth/invalid-credential": "Email or password doesn't match our records. Try again, or reset your password.",
    "auth/too-many-requests": "Too many attempts — please wait a minute and try again.",
    "auth/network-request-failed": "Network problem — please check your connection and try again."
  };

  function errorText(err) {
    return (err && ERRORS[err.code]) ||
      "Something went wrong — please try again, or message us on WhatsApp and we'll set you up personally.";
  }

  return {
    configured: configured,

    signUp: function (name, email, password, program) {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then(function (cred) {
        try { localStorage.setItem("mm-program-" + cred.user.uid, program || ""); } catch (e) {}
        return cred.user.updateProfile({ displayName: name }).then(function () { return cred.user; });
      });
    },

    signIn: function (email, password) {
      return firebase.auth().signInWithEmailAndPassword(email, password).then(function (cred) { return cred.user; });
    },

    resetPassword: function (email) {
      return firebase.auth().sendPasswordResetEmail(email);
    },

    signOut: function () {
      return firebase.auth().signOut();
    },

    onUser: function (cb) {
      if (!configured) { cb(null); return; }
      firebase.auth().onAuthStateChanged(cb);
    },

    programOf: function (user) {
      try { return localStorage.getItem("mm-program-" + user.uid) || ""; } catch (e) { return ""; }
    },

    errorText: errorText
  };
})();
