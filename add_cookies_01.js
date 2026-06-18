function addCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}


addCookie("snorfblat", "maybe");
addCookie("kerfuffle", "why_not");
// addCookie("noodlebonk", "sure_thing");
// addCookie("wigglesnort", "okey_dokey");
// addCookie("bumfuzzle", "no_doubt");

console.log("test cookies added by add_cookies_01.js");
