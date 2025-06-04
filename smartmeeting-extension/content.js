// capures captions and buffers them
let transcriptBuffer = [];

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.getAttribute("aria-live") === "polite") {
        const text = node.innerText.trim();
        if (text && !transcriptBuffer.includes(text)) {
          transcriptBuffer.push(text);
          console.log("Captured:", text);
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Listen for popup request
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getTranscript") {
    sendResponse({ transcript: transcriptBuffer.join(" ") });
  }
});
