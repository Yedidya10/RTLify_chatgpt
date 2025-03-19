import messages from "../messages";

const whatsNewTitle = messages["whatsNewTitle"];
const whatsNewMessage = messages["whatsNewMessage"];
const improvementsTitle = messages["improvementsTitle"];
const improvement1 = messages["improvement1"];
const improvement2 = messages["improvement2"];
const improvement3 = messages["improvement3"];
const comingSoonTitle = messages["comingSoonTitle"];
const comingSoonFeature1 = messages["comingSoonFeature1"];
const feedbackTitle = messages["feedbackTitle"];
const feedbackMessage = messages["feedbackMessage"];
const feedbackButtonText = messages["feedbackButtonText"];

document.getElementById("title")!.textContent = whatsNewTitle;
document.getElementById("heading")!.textContent = whatsNewTitle;
document.getElementById("whatsNewMessage")!.textContent = whatsNewMessage;
document.getElementById("improvementsTitle")!.textContent = improvementsTitle;
document.getElementById("improvement1")!.textContent = improvement1;
document.getElementById("improvement2")!.textContent = improvement2;
document.getElementById("improvement3")!.textContent = improvement3;
document.getElementById("comingSoonTitle")!.textContent = comingSoonTitle;
document.getElementById("comingSoonFeature1")!.textContent = comingSoonFeature1;
document.getElementById("feedbackTitle")!.textContent = feedbackTitle;
document.getElementById("feedbackMessage")!.textContent = feedbackMessage;

const feedbackButton = document.getElementById("feedbackButton")!;
feedbackButton.textContent = feedbackButtonText;

feedbackButton.addEventListener("click", () => {
  chrome.tabs.create({
    url: "https://chromewebstore.google.com/detail/clhjaenclpjlpjickcmhebbhghjffhah/support",
  });
});
