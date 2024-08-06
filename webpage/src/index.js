const WEBSERVER_URL = "__WHEREBY_INTERNS_WEBSERVER_URL__";

function addMessage(msg, level) {
  const message = document.getElementById("messages");
  const p = document.createElement("p");
  p.className = level || "info";
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
      "This webpage is served over HTTP. This is ok for local development, but not recommended for production.",
      "warning"
    );
  } else if (protocol === "https:") {
    addMessage(
      "This webpage is served over HTTPS. Which is great for production, as it provides encryption and security.",
      "success"
    );
  } else {
    addMessage("This webpage is served over an unknown protocol.", "error");
  }

  // Try to determine webserver url
  let webserverUrl;
  try {
    webserverUrl = new URL(WEBSERVER_URL);

    if (webserverUrl.protocol === "http:") {
      addMessage(
        `Using webserver url ${webserverUrl}. It is recommended to use HTTPS for production.`,
        "warning"
      );
    } else if (webserverUrl.protocol === "https:") {
      addMessage(`Using webserver url: ${webserverUrl}`, "success");
    } else {
      throw new Error("Invalid webserver url protocol");
    }
  } catch (error) {
    addMessage(
      "Did not find a valid webserver url, did you remember to build the webpage with WHEREBY_INTERNS_WEBSERVER_URL environment variable?",
      "error"
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

    try {
      const res = await fetch(webserverUrl);
      const resJson = await res.json();
      if (resJson.nVisits) {
        addMessage(
          `Response from webserver: ${resJson.message} ${resJson.nVisits} visits`,
          "success"
        );
      } else {
        addMessage(
          "Response from: No visit count in response, the db connection might be missing",
          "warning"
        );
      }
    } catch (error) {
      addMessage(
        "Failed to get response from server, check browser console",
        "error"
      );
    }
  } else {
    addMessage("No webserver url found, nothing more to do.", "error");
  }
}
