

async function saveDomainName(domainName){
   chrome.storage.local.get("allDomains", (result) => {
       if(result.allDomains){
         let allDomains = result.allDomains;
         if(!allDomains.includes(domainName)){
           allDomains.push(domainName);
           chrome.storage.local.set({allDomains: allDomains}, () => {
            console.log("allDomains array updated",  allDomains);
           });
         }
       }
       else{
         chrome.storage.local.set({allDomains: [domainName]}, () => {
            console.log("allDomains array created", domainName);;
         })
       }
   });

}

function getDomains(setdomains){
   chrome.storage.local.get("allDomains", (result) => {
         if(result.allDomains){
            setdomains(result.allDomains);
         }     
   })
}


async function getStylesAndScript(domain) {
   return new Promise((resolve, reject) => {
     chrome.storage.local.get([domain], (result) => {
       console.log("result in getStylesAndScript: ", result);
       if (result[domain]) {
         let data = {
           styles: result[domain].styles || "",
           script: result[domain].script || ""
         };
         resolve({ success: true, data });
       } else {
         resolve({ success: false });
       }
     });
   });
 }
 

function delDomain(domain, setdomainList){
    chrome.storage.local.get("allDomains", (result) => {
      if(result.allDomains){
         if(result.allDomains.includes(domain)){
            let domainList = result.allDomains;
            let indexOf = domainList.indexOf(domain);
            domainList.splice(indexOf, 1);
            chrome.storage.local.set({allDomains: domainList}, () => {
               console.log("domain deleted and list updated", domainList);
               getDomains(setdomainList);
               delDomainStylesAndScript(domain);
            })
         }
      }
    })
}

function delDomainStylesAndScript(domain){
   chrome.storage.local.remove([domain], () => {
      console.log("domain deleleted")
   });
}


 

async function saveStyleAndScript(domain, styles, script) {
   console.log("domain in saveStyleAndScript: ", domain);
 
   // chrome.storage.local.get([domain], (result) => {
   //   console.log("result in saveStyleAndScript: ", result);
 
   //   if (!result[domain]) {
       // Create a new entry for this domain
       chrome.storage.local.set(
         { [domain]: { styles, script } },
         () => {
           console.log("Styles & script have been saved:", styles, script);
         }
       );
   //   } 
   //   else {
   //     // Update existing styles and script for this domain
   //     let existingData = result[domain];
   //     let finalStyles = (existingData.styles || "") + "\n" + styles;
   //     let finalScript = (existingData.script || "") + "\n" + script;
 
   //     chrome.storage.local.set(
   //       { [domain]: { styles: finalStyles, script: finalScript } },
   //       () => {
   //         console.log(
   //           "Styles & script have been updated in local storage:",
   //           finalStyles,
   //           finalScript
   //         );
   //       }
   //     );
   //   }
   // });
 }
 



export {saveDomainName, getDomains, delDomain, saveStyleAndScript, getStylesAndScript}