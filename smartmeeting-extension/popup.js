document.getElementById("summarizeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getTranscript" },
      (response) => {
        if (response && response.transcript) {
          fetch("http://18.144.90.65:8000/summarize", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: response.transcript }),
          })
            .then((res) => res.json())
            .then((data) => {
              document.getElementById("output").innerText =
                data.summary || "Error getting summary";
            })
            .catch((err) => {
              document.getElementById("output").innerText = "Error: " + err;
            });
        }
      }
    );
  });
});
