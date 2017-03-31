// made with http://surveyjs.org/builder/

var demographyUK = {
 pages: [
  {
   name: "page1",
   questions: [
    {
     type: "text",
     inputType: "number",
     isRequired: true,
     name: "age",
     title: "UK UK UK What is your age?"
    },
    {
     type: "radiogroup",
     choices: [
      "Male",
      "Female"
     ],
     hasOther: true,
     isRequired: true,
     name: "gender",
     title: "What gender do you identify as?"
    },
    {
     type: "checkbox",
     choices: [
      "White",
      {
       value: "Black",
       text: "Black or African American"
      },
      {
       value: "Hispanic",
       text: "Hispanic, Latino, or Spanish origin"
      },
      {
       value: "NativeAmerican",
       text: "Native American or Alaska Native"
      },
      "Asian",
      {
       value: "Hawaiian",
       text: "Native Hawaiian or other Pacific Islander"
      }
     ],
     hasOther: true,
     isRequired: true,
     name: "ethnicity",
     title: "What do you consider to be your ethnicity? (Check all that apply.)"
    },
    {
     type: "text",
     isRequired: true,
     name: "ethicGroup",
     title: "Please also write in your specific ethnic group(s)"
    }
   ]
  },
  {
   name: "page2",
   questions: [
    {
     type: "text",
     name: "Town",
     placeHolder: "Town/City",
     title: "Where did you spend the majority of your childhood (0-12 years)? (Please provide Town/City, State/Province, Country.)"
    },
    {
     type: "text",
     isRequired: true,
     name: "State",
     placeHolder: "State/Province"
    },
    { 
     type: "dropdown", 
     name: "country", 
     placeHolder: "Choose your country",
     isRequired: true,
     title: "Country",
        choicesByUrl: {url: "http://services.groupkt.com/country/get/all", path: "RestResponse;result", valueName: "name"} 
    },
    {
      type: "radiogroup",
      title: "How would you describe the place where you grew up?",
      isRequired: true,
      name: "birthTownSize",
      choices: [
        "Large city with 250,000 or more people",
        "City with 100,000 to 249,999 people",
        "City with 50,000 to 99,999 people",
        "Small city with 25,000 to 49,999 people",
        "Town with 10,000 to 24,999 people",
        "Town with 5,000 to 9,999 people",
        "Small town or village with fewer than 5,000 people"
     ]
    }
   ]
  }
 ]
}