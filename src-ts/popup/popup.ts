(async function () {
  const elements = {
    closePopup: "closePopup",
    errorToast: "errorToast",
    errorToastTitle: "errorToastTitle",
    errorToastMessage: "errorToastMessage",
    closeErrorToastButton: "closeErrorToastButton",
    newReleaseToast: "newReleaseToast",
    newReleaseToastTitle: "newReleaseToastTitle",
    newReleaseToastMessage: "newReleaseToastMessage",
    newReleaseToastLink: "newReleaseToastLink",
    closeNewReleaseToastButton: "closeNewReleaseToastButton",
    authorLink: "authorLink",
    buyMeACoffee: "buyMeACoffee",
    version: "version",
    feedbackLink: "feedbackLink",
    rateUsLink: "rateUsLink",
    rateUsLinkText: "rateUsLinkText",
  };

  const newReleaseTitle = chrome.i18n.getMessage("newReleaseTitle");
  const versionNumber = chrome.runtime.getManifest().version;
  const extensionWasUpdated = chrome.i18n.getMessage("extensionWasUpdated", [
    versionNumber,
    `🎉`,
  ]);
  const whatsNewLinkText = chrome.i18n.getMessage("whatsNewLinkText");
  const storageData = await chrome.storage.sync.get([
    "showWhatsNewToast",
    "showErrorToast",
  ]);
  const showWhatsNewToast = storageData.showWhatsNewToast;
  const showErrorToast = storageData.showErrorToast;

  async function setupPopup() {
    setClosePopupButton();
    setEventListeners();
    setFeedbackLink();
    setVersion();
    setRateUsLinkText();
    if (showErrorToast) await setErrorToast();
    if (showWhatsNewToast) await setWhatsNewToast();
  }

  async function setWhatsNewToast() {
    const newReleaseToast = document.getElementById(elements.newReleaseToast)!;
    const closeToastButton = document.getElementById(
      elements.closeNewReleaseToastButton
    )!;
    const newReleaseToastTitle = document.getElementById(
      elements.newReleaseToastTitle
    )!;
    const newReleaseToastMessage = document.getElementById(
      elements.newReleaseToastMessage
    )!;
    const newReleaseToastLink = document.getElementById(
      elements.newReleaseToastLink
    )!;

    newReleaseToastTitle.textContent = newReleaseTitle;
    newReleaseToastMessage.textContent = extensionWasUpdated;
    newReleaseToastLink.textContent = whatsNewLinkText;
    newReleaseToastLink.setAttribute("title", whatsNewLinkText);

    newReleaseToast.classList.add("show");
    newReleaseToastLink.addEventListener("click", () =>
      openTab("whatsNewPage/whatsNew.html")
    );

    closeToastButton.addEventListener("click", async () => {
      newReleaseToast.classList.remove("show");
      await chrome.runtime.sendMessage({
        action: "closeToast",
        type: "whatsNew",
      });
    });
  }

  async function setErrorToast() {
    const errorToast = document.getElementById(elements.errorToast)!;
    const closeToastButton = document.getElementById(elements.closeErrorToastButton)!;
    const errorToastTitle = document.getElementById(elements.errorToastTitle)!;
    const errorToastMessage = document.getElementById(
      elements.errorToastMessage
    )!;
    const storageData = await chrome.storage.sync.get("errorToastMessage");
    const errorToastMessageText = storageData.errorToastMessage;

    errorToastTitle.textContent = chrome.i18n.getMessage("errorToastTitle") || "Error Alert";
    errorToastMessage.textContent = errorToastMessageText;

    errorToast.classList.add("show");
    closeToastButton.addEventListener("click", async () => {
      errorToast.classList.remove("show");
      await chrome.runtime.sendMessage({ action: "closeToast", type: "error" });
    });
  }

  function setClosePopupButton() {
    const closePopup = document.getElementById(elements.closePopup)!;
    closePopup.setAttribute(
      "title",
      chrome.i18n.getMessage("popupCloseButton")
    );
    closePopup.addEventListener("click", () => window.close());
  }

  function setEventListeners() {
    const extensionId = chrome.runtime.id;
    const links = [
      { id: elements.authorLink, url: "https://github.com/Yedidya10" },
      {
        id: elements.buyMeACoffee,
        url: "https://www.buymeacoffee.com/yedidya",
      },
      {
        id: elements.version,
        url: `chrome-extension://${extensionId}/whatsNewPage/whatsNew.html`,
      },
      {
        id: elements.feedbackLink,
        url: `https://chromewebstore.google.com/detail/${extensionId}/support`,
      },
      {
        id: elements.rateUsLink,
        url: `https://chromewebstore.google.com/detail/${extensionId}/reviews`,
      },
    ];

    links.forEach((link) => {
      const element = document.getElementById(link.id)!;
      element.addEventListener("click", () => openTab(link.url));
    });
  }

  function setFeedbackLink() {
    const feedbackLink = document.getElementById(elements.feedbackLink)!;
    const feedbackText = chrome.i18n.getMessage("feedbackTitle") || "Feedback";
    const bagReportText = chrome.i18n.getMessage("bugReportTitle") || "Report a Bug";
    feedbackLink.textContent = `${feedbackText} / ${bagReportText}`;
  }

  function setVersion() {
    const versionElement = document.getElementById(elements.version)!;
    versionElement.textContent = `v${versionNumber}`;
  }

  function setRateUsLinkText() {
    const rateUsLink = document.getElementById(elements.rateUsLink)!;
    const rateUsText = chrome.i18n.getMessage("rateUsTitle") || "Rate Us";
    rateUsLink.textContent = `⭐ ${rateUsText}`;
  }

  function openTab(url: string): void {
    chrome.tabs.create({ url });
  }

  await setupPopup();
})();
