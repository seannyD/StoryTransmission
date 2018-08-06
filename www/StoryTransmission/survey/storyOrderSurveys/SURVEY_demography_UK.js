// made with http://surveyjs.org/builder/

var demographyUK = {
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
       value: "asian",
       text: "Asian or Asian British"
      },
      {
       value: "black",
       text: "Black, African, Caribbean, or Black British"
      },
      {
       value: "arab",
       text: "Arab British"
      }
     ],
     hasOther: true,
     isRequired: true,
     name: "ukEthnicity",
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