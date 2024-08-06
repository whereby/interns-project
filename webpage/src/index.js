const WEBSERVER_URL = "__WHEREBY_INTERNS_WEBSERVER_URL__";

function addMessage(msg) {
  const message = document.getElementById("messages");
  const p = document.createElement("p");
  p.innerHTML = msg;
  message.appendChild(p);
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

async function startApp() {
  // Check if the webpage is served over HTTP or HTTPS
  const protocol = window.location.protocol;
  if (protocol === "http:") {
    addMessage(
      "This webpage is served over HTTP. This is ok for local development, but not recommended for production."
    );
  } else if (protocol === "https:") {
    addMessage(
      "This webpage is served over HTTPS. Which is great for production, as it provides encryption and security."
    );
  } else {
    addMessage("This webpage is served over an unknown protocol.");
  }

  // Try to determine webserver url
  let webserverUrl;
  try {
    webserverUrl = new URL(WEBSERVER_URL);
    addMessage(`Using webserver url: ${webserverUrl}`);
  } catch (error) {
    addMessage(
      "Did not find a valid webserver url, did you remember to build the webpage with WHEREBY_INTERNS_WEBSERVER_URL environment variable?"
    );
    console.error("Invalid WEBSERVER_URL:", WEBSERVER_URL);
  }

  // Generate a random sessionId
  let sessionId = sessionStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem("sessionId", sessionId);
  }

  // Get response from webserver
  if (webserverUrl) {
    webserverUrl.searchParams.set("sessionId", sessionId);

    const res = await fetch(webserverUrl);
    const resJson = await res.json();
    addMessage(`Response from webserver: ${resJson.message}`);
  } else {
    addMessage("No webserver url found, nothing more to do.");
  }
}
