import { brotliDecompress } from "zlib";
import {getStylesAndScript} from "~utitls/helping";

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status == "complete") {
//         chrome.storage.local.get("allDomains", (result) => {
//             if (result.allDomains) {
//                 console.log("tab.url: ", tab.url);
//                 console.log("allDomains: ", result);
//                 result.allDomains.forEach((domain) => {
//                     if (tab.url.includes(domain)) {
//                         chrome.storage.local.get([domain], (res) => {
//                             console.log("Res: ", res);
//                             let script = res[domain]?.script;  // Safely access script value
//                             if (script) {
//                                 // Create a function that dynamically executes the script content
//                                 chrome.scripting.executeScript({
//                                     target: { tabId: tabId },
//                                     func: (scriptContent) => {
//                                         // Dynamically create and append the script
//                                         const scriptElem = document.createElement('script');
//                                         scriptElem.textContent = scriptContent;
//                                         document.body.appendChild(scriptElem); // Appends the script to execute it
//                                     },
//                                     args: [script],  // Pass the script content as an argument
//                                 });
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     }
// });




function getDomains(){
    chrome.storage.local.get("allDomains", (result) => {
          if(result.allDomains){
            return result.allDomains;
          }     
    })
 }