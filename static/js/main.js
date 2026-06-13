$(document).ready(function () {
    let txSpecificContainer = document.getElementById('txSpecific');
    if (txSpecificContainer) {
	txSpecificContainer.innerHTML = syntaxHighlight(txSpecific);
    }
})

function syntaxHighlight(json) {
  json = JSON.stringify(json, undefined, 2);
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  if (json.length > 1000000) {
    return `<span class="key">${json}</span>`;
  }
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}
