//UI--------------------------------------------------------------------------------
function activeTab(tabID) {
  const navLinks = [
    document.getElementById("deepfake-tab"),
    document.getElementById("metadata-tab"),
    document.getElementById("content-analysis-tab"),
  ];
  navLinks.forEach((link) => link.classList.remove("active"));
  const activeLink = navLinks.find((link) => link.id === tabID);
  if (activeLink) {
    activeLink.classList.add("active");
  }

  //tabs content
  const tabsContent = Array.from(
    document.getElementsByClassName("tab-content")
  );
  tabsContent.forEach((link) => link.classList.add("hidden"));
  const activeTabContent = tabsContent.find(
    (content) =>
      (tabID === "deepfake-tab" && content.id === "deepfake-section") ||
      (tabID === "metadata-tab" && content.id === "metadata-section") ||
      (tabID === "content-analysis-tab" &&
        content.id === "content-analysis-section")
  );
  if (activeTabContent) {
    activeTabContent.classList.remove("hidden");
  }
}

//triggers
window.addEventListener("load", () => {
  activeTab("deepfake-tab");
});
document.getElementById("deepfake-tab").addEventListener("click", () => {
  activeTab("deepfake-tab");
});
document.getElementById("metadata-tab").addEventListener("click", () => {
  activeTab("metadata-tab");
});
document
  .getElementById("content-analysis-tab")
  .addEventListener("click", () => {
    activeTab("content-analysis-tab");
  });

//content analysis tabs
function displayContent(section) {
  //reinitialize the classlist for buttons
  const buttons = document.getElementsByClassName("sidebar-button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
    buttons[i].classList.add("link-dark");
  }
  const currentTab = document.getElementById(section);
  currentTab.classList.remove("link-dark");
  currentTab.classList.add("active");

  //reinitialize the classlist for contents
  const contents = document.getElementsByClassName("sidebar-content");
  for (let i = 0; i < contents.length; i++) {
    contents[i].classList.remove("hidden");
  }

  // Scroll to the selected section
  const element = document.getElementById(`${section}-content`);
  element.scrollIntoView({ behavior: "smooth" });
}

//triggers
window.addEventListener("load", function () {
  displayContent("transcript");
});

document.getElementById("transcript").addEventListener("click", () => {
  displayContent("transcript");
});
document.getElementById("sentiment").addEventListener("click", () => {
  displayContent("sentiment");
});
document.getElementById("topic").addEventListener("click", () => {
  displayContent("topic");
});
document.getElementById("summary").addEventListener("click", () => {
  displayContent("summary");
});

//DATA + APIS ----------------------------------------------------------------------

let data = {};

function loadDataFromStorage() {
  data = JSON.parse(sessionStorage.getItem("data"));
}

//display data in html content
function loadContent() {
  const page = window.location.hash.slice(1);
  switch (page) {
    case "":
      loadDeepfakeDetectionTabContent();
    case "metadata":
      loadMetadataTabContent();
    case "content-analysis":
      loadContentAnalysisTabContent();
  }
}

function loadDeepfakeDetectionTabContent() {
  const percentage = 37;

  //get html element
  const indicatorContainer = document.getElementById(
    "progress_indicator-container"
  );
  const indicatorData = document.getElementById("progress_indicator-data");
  const deepfakeMessage = document.getElementById("deepfake-message");
  const fileNameLabel = document.getElementById("file_name-label");

  //progress indicator
  let counter = 0;
  let interval = setInterval(() => {
    if (counter <= percentage) {
      indicatorData.innerHTML = `${counter}% Deepfake Probability`;
      indicatorContainer.classList.remove(
        "progress_indicator-green",
        "progress_indicator-yellow",
        "progress_indicator-red"
      );
      if (counter >= 60) {
        indicatorContainer.classList.add("progress_indicator-red");
      } else if (counter < 60 && counter >= 50) {
        indicatorContainer.classList.add("progress_indicator-yellow");
      } else {
        indicatorContainer.classList.add("progress_indicator-green");
      }
      counter++;
    } else {
      clearInterval(interval);
    }
  }, 30);

  //deepfake message
  if (percentage >= 80) {
    deepfakeMessage.innerHTML =
      "<i class=\"bi bi-x-octagon-fill\"></i> <b>The Audio is <span style=\"color:#ae2727cc;\">Not Safe</span></b>: Deepfake Content Detected.";
  } else if (percentage < 80 && percentage >= 40) {
    deepfakeMessage.innerHTML =
      "<i class=\"bi bi-exclamation-triangle-fill\"></i> <b>The Audio Might Be <span style=\"color:#e5d139;\">Altered</span></b>: Possible Deepfake Content Detected.";
  } else {
    deepfakeMessage.innerHTML =
      "<i class=\"bi bi-check-circle-fill\"></i> <b>The Audio is <span style=\"color:#28a745;\">Safe</span></b>: No Deepfake Content Detected.";
  }

  //file name label
  fileNameLabel.innerHTML = data.fileName;
}

function loadMetadataTabContent() {
  //get html element
  const fileName = document.getElementById("file-name");
  const fileSize = document.getElementById("file-size");
  const fileType = document.getElementById("file-type");
  const fileTypeExtension = document.getElementById("file-type-extension");
  const sampleRate = document.getElementById("sample-rate");
  const channelMode = document.getElementById("channel-mode");
  const duration = document.getElementById("duration");
  const channels = document.getElementById("channels");
  const creatorTool = document.getElementById("creator-tool");
  const createDate = document.getElementById("create-date");
  const modifyDate = document.getElementById("modify-date");
  const rawHeaderInput = document.getElementById("raw-header-input");

  //modify these data
  fileName.innerHTML = data.fileName;
  fileSize.innerHTML = data.fileSize;
  fileType.innerHTML = data.fileType;
  fileTypeExtension.innerHTML = data.fileTypeExtension;
  sampleRate.innerHTML = data.sampleRate;
  channelMode.innerHTML = data.channelMode;
  duration.innerHTML = data.duration;
  channels.innerHTML = data.channels;
  creatorTool.innerHTML = data.creatorTool;
  createDate.innerHTML = data.createDate;
  modifyDate.innerHTML = data.modifyDate;
  rawHeaderInput.value = data.rawHeader;
}

function loadContentAnalysisTabContent() {
  //get html element
  const transcriptData = document.getElementById("transcript-data");
  const sentimentData = document.getElementById("sentiment-data");
  const topicData = document.getElementById("topic-data");
  const summaryData = document.getElementById("summary-data");

  //modify these data
  transcriptData.innerHTML = data.transcript;
  sentimentData.innerHTML = data.sentiment;
  topicData.innerHTML = data.topic;
  summaryData.innerHTML = data.summary;
}

window.onload = () => {
  loadDataFromStorage();
  loadContent();
};

window.onhashchange = () => {
  loadContent();
};

const errorTag = document.getElementById("error-message");

function reanalyzeFile() {
  sendFIle(errorTag);
}

document.getElementById("reanalysis-button").addEventListener("click", () => {
  reanalyzeFile();
});

function copyTextToClipboard() {
  const inputField = document.getElementById("raw-header-input");
  const text = inputField.value;

  if (!navigator.clipboard) {
    alert("Please use a modern browser");
  } else {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text successfully copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy text");
      });
  }
}

document
  .getElementById("copy_to_clipboard-button")
  .addEventListener("click", () => {
    copyTextToClipboard();
  });

const shareData = {
  title: "MDN",
  text: "Learn web development on MDN!",
  url: "https://developer.mozilla.org",
};

const btn = document.querySelector("#share-icon");
const resultPara = document.querySelector(".result");

// Share must be triggered by "user activation"
btn.addEventListener("click", async () => {
  try {
    await navigator.share(shareData);
    resultPara.textContent = "MDN shared successfully";
  } catch (err) {
    resultPara.textContent = `Error: ${err}`;
  }
});
