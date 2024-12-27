import React, { useEffect, useState } from 'react'
import { saveDomainName, getDomains, delDomain, saveStyleAndScript, getStylesAndScript } from '~utitls/helping';
import { MdDelete } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import "./styles.css";
const index = () => {
    let [domainName, setDomainName] = useState('')
    let [styles, setStyles] = useState('');
    let [script, setScript] = useState('');
   let [domainList, setDomainList] = useState([]);

    let handleSave = async () => {
      if(domainName !== '' && styles !== '' || script !== '') {
       try {
        console.log("handleSave was called");
        await saveDomainName(domainName.trim());
        await saveStyleAndScript(domainName.trim(), styles.trim(), script.trim());
        setTimeout(() => {
          getDomains(setDomainList);
        }, 1000)
       } catch (error) {
        
       }
      }else{
        alert("first fill domain input + style || script")
      }
      console.log(styles);
      console.log(script);
      setDomainName("");
      setStyles('');
      setScript('');
    }
  

    useEffect(() => {
       getDomains(setDomainList);
       chrome.storage.local.get(null, (allData) => {
        console.log("All storage data: ", allData);
      });
    }, []);
   
    let handleUpdate = async (domain) => {
      try {
        let result: any = await getStylesAndScript(domain);
        
        if (result.success) { // Check if the result indicates success
          console.log("Success:", result);
          console.log("Styles:", result.data.styles);
          console.log("Script:", result.data.script);
          setDomainName(domain);
          setStyles(result.data.styles);
          setScript(result.data.script);
        } else {
          console.log("No data found for domain:", domain);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    

  return (
    <div>
      <h1>Options</h1>
      <div id="form">
        <input value={domainName} onChange={(e) => {setDomainName(e.target.value)}} type="text" id="domain" placeholder='Enter you domain' />
        <textarea value={styles} onChange={(e) => {setStyles(e.target.value)}} name="styles"  id="styles" placeholder='Enter your styles'></textarea>
        <textarea value={script} onChange={(e) => {setScript(e.target.value)}} name="script"  id="script" placeholder='Enter your script'></textarea>
        <button className='btn' onClick={handleSave} id="save">Save</button>
      </div>
      <ul className='domainList'>
      {domainList.map((domain, index) => (
          <li  key={index}>{ domain } <button className="del-btn btn" onClick={() => {delDomain(domain.trim(), setDomainList);}}><MdDelete /></button>
          <button className='btn update-btn' onClick={() => handleUpdate(domain)}><FaCode /></button>
          </li>
        ))}
        </ul> 
    </div>
  )
}

export default index
