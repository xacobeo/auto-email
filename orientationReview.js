function orientationReview() {
 
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('OrientationReview');
  let range = sheet.getDataRange();
  let values = range.getDisplayValues();
  let lastRow = range.getLastRow();
  let curDate = values[0][8];
  let anyMatches = false;
  let message = "";
  let email = Session.getActiveUser().getEmail();  
  let targetRecipient= "";
  let i;
  let logContent = '';
  
  
  for (i = 1; i < lastRow; i++)  //starts from first row of data after headers
  {  
    let sendDate = values[i][6];  //get index value for send date

   //if today matches the send date, send an email
  
    if (sendDate.toString() == curDate.toString()) 
    {  
      let newHireName = values[i][0];   	 
      let newHireEmail = values[i][1];   
      let orientationEndDate = values[i][2];     	
      let supervisorName = values[i][3];		
      let supervisorEmail = values[i][4];	
      let hrCCEmail= values[i][5];		
      let sendEmailDate = sendDate;

    //email message
      message = "Dear <b>" + newHireName + "</b>," + 
        " <br/><br/>Thank you for sharing your life with L'Arche St. Louis for nearly three months!  Your official orientation period ends on <b>" + orientationEndDate + "." +
          " </b> <br/> <br/> At the three month mark, we take time to complete a review.  Please visit the Community Hub to find instructions on how to begin that process. If you have any questions, please let me know.<br/><br/>Peace,<br/>Andy<br/>";
      
      // if there is a match, set anyMatches to true so email gets sent
      anyMatches = true;  
      
      // footer for check log message
      logContent += "Content No. " + i  + targetRecipient + " -- " + message + " ++++++++++++++++++++<br/>";
 
     // API to send the email 
    MailApp.sendEmail({
     to: newHireEmail,
      cc: hrCCEmail + ',' + supervisorEmail,
     subject: 'Orientation Review',
     htmlBody: message});  
    }  
  }  // ends for loop
  
  Logger.log(logContent);
}



