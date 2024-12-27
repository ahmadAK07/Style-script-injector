
chrome.storage.local.get("allDomains", (result) => {
    if (result.allDomains) {
        console.log("allDomains: ", result);
        result.allDomains.forEach((domain) => {
         
          if(window.location.href.includes(domain)){
            chrome.storage.local.get([domain], (res) => {
                console.log("Res: ", res);
                let script = res[domain]?.script;  // Safely access script value
                let styles = res[domain]?.styles;  // Safely access script value

                console.log(script);
                console.log(styles);
                run(script, styles.trim());
            });
          }
           
        });
    }
});

function run(jsScript, cssStyle){
    let style = document.createElement("style");
    style.innerText = cssStyle;
    console.log("style: " , style);
    document.body.appendChild(style);
   setTimeout(jsScript, 1000)
}