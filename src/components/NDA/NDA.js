import React, { useState } from 'react';
import './NDA.scss';
// Signature Canvas: https://www.npmjs.com/package/react-signature-canvas
// Allows user to sign with their finger
import SignatureCanvas from 'react-signature-canvas';

// Pull current date from the OS
function GetCurrentDate() {
  let now = new Date();
  let options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  let date = new Intl.DateTimeFormat('en-US', options).format(now);
  console.log(date);
  return date;
}

// Pull current time from the OS
function GetCurrentTime() {
  let now = new Date();
  let options = {
    hour: 'numeric',
    minute: 'numeric'
  };
  let time = new Intl.DateTimeFormat('en-US', options).format(now);
  console.log(time);
  return time;
}

function NDA(props) {

  const [time, setTime] = useState(GetCurrentTime());
  const [date, setDate] = useState(GetCurrentDate());

  return (
      <div className="Container">
        {/* Optional header or instructions for NDA */}
        {/* The NDA-pdf div is what will be rendered into a pdf and uploaded to OneDrive */}
        <div className="Header">
          <div className="Header-Content">
              <div className="item back"></div>
              <div className="item"><p>Please sign an NDA</p></div>
              <div className="item next-active">
                {/* Call the updateRender function in App.js onClick and pass it "NDA" for updateRender */}
                <button className="finish" onClick={props.updateRender.bind(this, "NDA")} ></button>
              </div>
          </div>
        </div>

        <div className="NDA" id="nda-pdf" >
          <h2>CONFIDENTIALITY AND NONDISCLOSURE AGREEMENT</h2>
          <br />
          <div className="content">
            <ol>
              <li><strong>Parties.</strong><br />This Confidentiality and Nondisclosure Agreement (the <strong>"Agreement"</strong>) is entered into by Walter Dorwin Teague Associates, Incorporated (<strong>“TEAGUE”</strong>) and the undersigned individual or company (<strong>“RECIPIENT”</strong>), each having the address set forth below. TEAGUE and RECIPIENT hereby agree as follows:</li>
              <li><strong>Confidential Information.</strong><br />RECIPIENT and TEAGUE are evaluating or are engaged in a business relationship or in a pre-employment interview and selection process (the <b>"Project(s)"</b>), during which TEAGUE may disclose to RECIPIENT or RECIPIENT may otherwise learn or observe certain valuable confidential and proprietary information of TEAGUE.  Any and all information disclosed by TEAGUE which by its nature is considered proprietary or confidential, and which is disclosed to RECIPIENT in any manner, shall be considered confidential information regardless of whether such information is specifically labeled as such (<b>"Confidential Information"</b>).</li>
              <li><strong>Agreement to Maintain Confidentiality.</strong><br />
              RECIPIENT shall:
              <ul>
                <li><strong>A.</strong> protect and safeguard the confidentiality of all such Confidential Information and hold all such Confidential Information in strictest confidence;</li>
                <li><strong>B.</strong> not to use or disclose such Confidential Information except in connection with the Project or any related transactions between the parties, including without limitation, to reverse engineer, disassemble, decompile or design around TEAGUE's proprietary services, products and/or confidential intellectual property;</li>
                <li><strong>C.</strong> if applicable, limit the disclosure of Confidential Information to those employees, agents or other third parties necessary for the Project who (i) need to know the Confidential Information to assist RECIPIENT, or act on its behalf, in relation to the Project; (ii) are informed in writing by RECIPIENT of the confidential nature of the Confidential Information; and (iii) are subject, in writing, to confidentiality duties or obligations to RECIPIENT that are no less restrictive than the terms and conditions of this Agreement; and</li>
                <li><strong>D.</strong> comply with all applicable on-site access, remote access and related security rules and procedures of TEAGUE and maintain physical and data security measures in accordance with applicable law or regulation and of a nature and scope to prevent unauthorized access to such Confidential Information.</li>
              </ul>
              </li>
              <li><strong>Exceptions to Confidential Information.</strong> Confidential Information shall not include any information which (a) was publicly available at the time of disclosure or became available without breach of this Agreement by RECIPIENT, its agents, employees, service providers, or representatives; (b) was in RECIPIENT’s possession prior to disclosure, as evidenced by RECIPIENT’s written records, and was not the subject of an earlier confidential relationship with TEAGUE; (c) was rightfully acquired by RECIPIENT from a third party who was lawfully in possession of the information and was under no obligation to TEAGUE to maintain its confidentiality; and (d) is independently developed by RECIPIENT without access to Confidential Information.</li>
              <li><strong>Restricted Parties Screening; Access to TEAGUE Facilities and Systems.</strong> To comply with antiboycott and embargo laws, TEAGUE conducts screening of all entities and individuals who are granted access to TEAGUE’s facilities and/or electronic systems against various restricted parties lists published by the U.S. Government administrative agencies. To the extent RECIPIENT is being given access to any of TEAGUE’s facilities and/or systems pursuant to this Agreement, RECIPIENT acknowledges TEAGUE’s screening procedures and expressly allows TEAGUE to conduct such screening with respect to RECIPIENT by any means TEAGUE has in place. Additionally, TEAGUE may be required to obtain citizenship, place of birth, or other information of RECIPIENT or its personnel with electronic or physical access. RECIPIENT shall provide such information to the extent consistent with applicable law.</li>
              <li><strong>Required Disclosure.</strong> If RECIPIENT is required to disclose Confidential Information pursuant to a judicial order or other compulsion of law, RECIPIENT shall (a) limit the disclosure to only that information which is required to be disclosed by such order or legal requirement, (b) provide to TEAGUE prompt notice of such order, and (c) reasonably assist TEAGUE in obtaining a protective order if requested by TEAGUE.</li>
              <li><strong>Term and Termination.</strong> This Agreement is effective as of the date of execution by RECIPIENT and may be terminated by either party at any time upon written notice. RECIPIENT’s obligations with respect to Confidential Information that qualifies as a trade secret under applicable laws cannot be terminated and continues for as long as such information qualifies as such. RECIPIENT’s obligations with respect to all other Confidential Information shall extent for five years from the date of termination.</li>
              <li><strong>Non-Solicitation.</strong> During the term of this Agreement, and for a period of three (3) years after termination, RECIPIENT will not directly or indirectly (a) hire, recruit, solicit, cause or otherwise encourage any employee of TEAGUE to leave his or her employment and work for TEAGUE; (b) solicit, divert, or in any other manner persuade or attempt to persuade any TEAGUE client or supplier to alter or discontinue its relationship with TEAGUE; or (c) except on TEAGUE’s behalf, directly or indirectly supply to any TEAGUE client any service that is at the same time available by TEAGUE except to the extent RECIPIENT does not use any Confidential Information to identify such TEAGUE client or to communicate or negotiate with such TEAGUE client.</li>
              <li><strong>Breach and Remedies.</strong> If RECIPIENT breaches the term(s) of this Agreement, TEAGUE shall have the right to (a) terminate this Agreement and/or demand the immediate return of all Confidential Information; (b) seek to recover its actual damages incurred because of such breach, including, without limitation, its attorneys fees and costs of suit; (c) seek to obtain injunctive relief without the need to post a bond or prove actual damages to prevent such breach or to otherwise enforce the terms of this Agreement; and (d) pursue any other remedy available at law or in equity.  Failure to properly demand compliance or performance of any term of this Agreement shall not constitute a waiver of TEAGUE’s rights hereunder.</li>
              <li><strong>Disclaimer of Other Relationships.</strong> This Agreement does not create a relationship of agency, partnership, joint venture or license between the Parties.  This Agreement does not obligate either party to purchase anything from or sell anything to the other party, and each party acknowledges the other party may enter into (a) other similar activities and/or (b) business relationships with third parties, provided no Confidential Information is disclosed or used by RECIPIENT.</li>
              <li><strong>Governing Law, Venue and Jurisdiction.</strong> The construction, enforceability, validity, and interpretation of this Agreement shall be deemed in accordance with the laws of the State of Washington, exclusive of conflict of law rules.  Should either party choose to seek an order of immediate relief, RECIPIENT consents to exclusive jurisdiction and venue in the federal or state courts sitting in King County, Washington. RECIPIENT waives all defenses of lack of personal jurisdiction and forum non-conveniens.</li>
              <li><strong>Entire Agreement; Amendments.</strong> This agreement supersedes all previous agreements between the parties regarding the Confidential Information and cannot be canceled, assigned or modified without the prior written consent of both Parties.</li>
              <li><strong>Assignment.</strong> This Agreement and the rights and obligations granted to and undertaken by the parties shall not be assignable or transferable, in whole in part, without the prior written consent of the other party.</li>
              <li><strong>Authority; Counterparts.</strong> To the extent RECIPIENT is a legal entity, the individual executing this Agreement on behalf of RECIPIENT is duly authorized to bind RECIPEINT.  This Agreement may be executed in duplicate counterparts (and the parties hereby adopt as original any facsimile or .pdf copy of an original signature), each of which shall be deemed an original and both of which together shall constitute but one and the same instrument.</li>
            </ol>
          </div >
        </div>
        {/* End of NDA-pdf div */}
        <div className="NDA-signature-container">
          <div className="NDA-signature">
          <SignatureCanvas canvasProps={{className: 'sigCanvas'}} />
          <div className="NDA-signed">
            {props.firstName} {props.lastName} on {date} {time}
          </div>
        </div>
        </div>
      </div>
    )
}

export default NDA;
