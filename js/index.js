//ONLY FOR SIMULATING DATA FETCHING
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//simulate fetched data
const mp3FileInfo = {
  fileName: "recording1.mp3",
  fileSize: "31000 MB",
  fileType: "mp3",
  fileTypeExtension: "mp3",
  sampleRate: 44100,
  channelMode: "Stereo",
  duration: "0:03:13",
  channels: 2,
  creatorTool: "Adobe Audition CC 2018.1 (Windows)",
  createDate: "2014:11:18 14:08:34",
  modifyDate: "2014:11:18 14:24:23",
  rawHeader:
    "10 44 33 04 00 00 00 01 00 00 54 54 58 6F 49 44 33 04 00 00 00 01 00 ...",
  deepfakePercentage: 60,
  transcript:
    "Test1 Smoke from hundreds of wildfires in Canada is triggering air quality alerts throughout the US. Skylines from Maine to Maryland to Minnesota are gray and smoggy. And in some places, the air quality warnings include the warning to stay inside. We wanted to better understand what's happening here and why, so we called Peter DiCarlo, an associate professor in the department of Environmental Health and Engineering at Johns Hopkins University. Good morning. Professor good morning. So what is it about the conditions right now that have caused this round of wildfires to affect so many people so far away? more..",
  sentiment:
    "Test2 Smoke from hundreds of wildfires in Canada is triggering air quality alerts throughout the US. Skylines from Maine to Maryland to Minnesota are gray and smoggy. And in some places, the air quality warnings include the warning to stay inside. We wanted to better understand what's happening here and why, so we called Peter DiCarlo, an associate professor in the department of Environmental Health and Engineering at Johns Hopkins University. Good morning. Professor good morning. So what is it about the conditions right now that have caused this round of wildfires to affect so many people so far away? more..",
  topic:
    "Test3 Smoke from hundreds of wildfires in Canada is triggering air quality alerts throughout the US. Skylines from Maine to Maryland to Minnesota are gray and smoggy. And in some places, the air quality warnings include the warning to stay inside. We wanted to better understand what's happening here and why, so we called Peter DiCarlo, an associate professor in the department of Environmental Health and Engineering at Johns Hopkins University. Good morning. Professor good morning. So what is it about the conditions right now that have caused this round of wildfires to affect so many people so far away? more..",
  summary:
    "Test4 Smoke from hundreds of wildfires in Canada is triggering air quality alerts throughout the US. Skylines from Maine to Maryland to Minnesota are gray and smoggy. And in some places, the air quality warnings include the warning to stay inside. We wanted to better understand what's happening here and why, so we called Peter DiCarlo, an associate professor in the department of Environmental Health and Engineering at Johns Hopkins University. Good morning. Professor good morning. So what is it about the conditions right now that have caused this round of wildfires to affect so many people so far away? more..",
};

//------------------------------------------------------------------

function showLoader() {
  document.getElementById("loader-container").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loader-container").style.display = "none";
}

sessionStorage.setItem("data", JSON.stringify(mp3FileInfo));