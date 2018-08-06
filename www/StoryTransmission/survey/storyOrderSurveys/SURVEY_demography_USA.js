// made with http://surveyjs.org/builder/

var demographyUSA = {
 pages: [
  {
   elements: [
    {
     type: "text",
     inputType: "number",
     isRequired: true,
     name: "age",
     title: "What is your age?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "male",
       text: "Male"
      },
      {
       value: "female",
       text: "Female"
      },
      {
       value: "nonbinary",
       text: "Non-binary/Indeterminate"
      }
     ],
     hasOther: true,
     isRequired: true,
     name: "gender",
     otherText: "Not Listed (please specify)",
     title: "What gender do you identify as?"
    },
    {
     type: "checkbox",
     choices: [
      {
       value: "white",
       text: "White"
      },
      {
       value: "hispanic",
       text: "Hispanic, Latino, or Spanish origin"
      },
      {
       value: "black",
       text: "Black or African American"
      },
      {
       value: "asian",
       text: "Asian"
      },
      {
       value: "native",
       text: "Native American or Alaska Native"
      },
      {
       value: "middleeastern",
       text: "Middle Eastern or North African"
      },
      {
       value: "pacific",
       text: "Native Hawaiian or other Pacific Islander"
      }
     ],
     hasOther: true,
     isRequired: true,
     name: "usEthnicity",
     otherText: "Not Listed (please specify)",
     title: "What do you consider to be your ethnicity? (Check all that apply.)"
    },
    {
     type: "text",
     name: "ethnicitySpecific",
     title: "Please also write in your specific ethnic group(s)."
    }
   ],
   name: "demo1",
   title: "About You (1/4)"
  }
 ]
}