// made with http://surveyjs.org/builder/

var storyOrderConsentSurveyJSON = {
 pages: [
  {
   name: "page1",
   elements: [
    {
     type: "radiogroup",
     name: "consentReceivedInfo",
     isRequired: true,
     title: "I have received information about the study",
     choices: [
      {
       value: "Yes",
       text: "Yes"
      },
      {
       value: "No",
       text: "No"
      }
     ]
    },
    {
     type: "radiogroup",
     name: "consentWithdraw",
     isRequired: true,
     title: "I understand that I am free to withdraw from this study without having to give a reason at any time",
     choices: [
      {
       value: "Yes",
       text: "Yes"
      },
      {
       value: "No",
       text: "No"
      }
     ]
    },
    {
     type: "radiogroup",
     name: "consentVideo",
     isRequired: true,
     title: "I consent to having video recorded of me",
     choices: [
      {
       value: "Yes",
       text: "Yes"
      },
      {
       value: "No",
       text: "No"
      }
     ]
    },
    {
     type: "radiogroup",
     name: "consentFacePixel",
     isRequired: true,
     title: "I would like my face to be pixelated in any recordings of me that may be disseminated",
     choices: [
      {
       value: "Yes",
       text: "Yes"
      },
      {
       value: "No",
       text: "No"
      }
     ]
    },
    {
     type: "radiogroup",
     name: "consentTakePartInStudy",
     isRequired: true,
     title: "I consent to take part in this study",
     choices: [
      {
       value: "Yes",
       text: "Yes"
      },
      {
       value: "No",
       text: "No"
      }
     ]
    }
   ]
  }
 ]
}


var storyOrderEndSurveyJSON = {
 pages: [
  {
   name: "page1",
   elements: [
    {
     type: "text",
     name: "question1",
     title: "How did you find the experiment?"
    },
    {
     type: "text",
     name: "question2",
     title: "You will be invited to take part in the third part of the study by email. Please provide your email address below:"
    }
   ]
  }
 ]
}