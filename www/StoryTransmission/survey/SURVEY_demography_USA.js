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
  },
  {
   elements: [
    {
     type: "text",
     isRequired: true,
     name: "usTownChildhood",
     placeHolder: "Town/City, State/Province, Country",
     title: "Where did you spend the majority of your childhood (0-12 years)? (Please provide Town/City, State/Province, Country.)"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "250000",
       text: "Settlement with 250,000 or more people"
      },
      {
       value: "100000",
       text: "Settlement with 100,000 to 249,999 people"
      },
      {
       value: "50000",
       text: "Settlement with 50,000 to 99,999 people"
      },
      {
       value: "25000",
       text: "Settlement with 25,000 to 49,999 people"
      },
      {
       value: "10000",
       text: "Settlement with 10,000 to 24,999 people"
      },
      {
       value: "5000",
       text: "Settlement with 5,000 to 9,999 people"
      },
      {
       value: "lt5000",
       text: "Settlement with fewer than 5,000 people"
      }
     ],
     isRequired: true,
     name: "townChildhoodSize",
     title: "How would you describe the size of the place where you grew up?"
    },
    {
     type: "text",
     isRequired: true,
     name: "usTownNow",
     placeHolder: "Town/City, State/Province, Country",
     title: "Where do you live now (have lived or intend to live for more than 3 continuous months)? (Please provide Town/City, State/Province, Country.)"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "250000",
       text: "Settlement with 250,000 or more people"
      },
      {
       value: "100000",
       text: "Settlement with 100,000 to 249,999 people"
      },
      {
       value: "50000",
       text: "Settlement with 50,000 to 99,999 people"
      },
      {
       value: "25000",
       text: "Settlement with 25,000 to 49,999 people"
      },
      {
       value: "10000",
       text: "Settlement with 10,000 to 24,999 people"
      },
      {
       value: "5000",
       text: "Settlement with 5,000 to 9,999 people"
      },
      {
       value: "lt5000",
       text: "Settlement with fewer than 5,000 people"
      }
     ],
     isRequired: true,
     name: "townNowSize",
     title: "How would you describe the size of the place where you live now?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "1",
       text: "Yes"
      },
      {
       value: "0",
       text: "No"
      }
     ],
     isRequired: true,
     name: "usTownOther",
     title: "Have you lived in other places in the US for more than 3 continuous months?"
    },
    {
     type: "comment",
     isRequired: true,
     name: "usTownOtherSpecify",
     placeHolder: "Town/City, State",
     title: "Where else have you lived in the US for more than 3 continuous months? (List all that apply. Please provide Town/City, State.)",
     visible: false,
     visibleIf: "{usTownOther} = '1'"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "1",
       text: "Yes"
      },
      {
       value: "0",
       text: "No"
      }
     ],
     isRequired: true,
     name: "usTownOutside",
     title: "Have you lived or traveled outside of the US for more than 3 continuous months?"
    },
    {
     type: "comment",
     isRequired: true,
     name: "usTownOutsideSpecify",
     placeHolder: "Town/City, State/Province, Country",
     title: "Where have you lived or traveled outside of the US for more than 3 continuous months? (List all that apply. Please provide Town/City, State/Province, Country.)",
     visible: false,
     visibleIf: "{usTownOutside} = '1'"
    }
   ],
   name: "demo2",
   title: "About You (2/4)"
  },
  {
   elements: [
    {
     type: "radiogroup",
     choices: [
      {
       value: "1",
       text: "Yes"
      },
      {
       value: "0",
       text: "No"
      }
     ],
     isRequired: true,
     name: "english",
     title: "Do you consider English to be one of your native languages?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "1",
       text: "Yes"
      },
      {
       value: "0",
       text: "No"
      }
     ],
     isRequired: true,
     name: "otherLanguages",
     title: "Do you speak any other languages fluently (as well as a native speaker)?"
    },
    {
     type: "comment",
     isRequired: true,
     name: "otherLanguagesSpecify",
     title: "Which other languages do you speak fluently (as well as a native speaker)?",
     visible: false,
     visibleIf: "{otherLanguages} = 1"
    },
    {
     type: "checkbox",
     choices: [
      {
       value: "generalamerican",
       text: "General American"
      },
      {
       value: "northcentral",
       text: "North Central (e.g. ND, northern MN, upper MI)"
      },
      {
       value: "northern",
       text: "Northern (e.g. MI, southern MN, upstate NY)"
      },
      {
       value: "midland",
       text: "Midland (e.g. KS, MO, IL, IN)"
      },
      {
       value: "western",
       text: "Western (e.g. CO, WY, ID, UT)"
      },
      {
       value: "southern",
       text: "Southern (e.g. TN, AL, MS, AR)"
      },
      {
       value: "easternnewengland",
       text: "Eastern New England (e.g. Boston, NH, ME)"
      },
      {
       value: "newyorkcity",
       text: "New York City"
      },
      {
       value: "westernpennsylvania",
       text: "Western Pennsylvania (e.g. Pittsburgh)"
      },
      {
       value: "midatlantic",
       text: "Mid-Atlantic (e.g. Baltimore, Philadelphia, south NJ)"
      },
      {
       value: "southeastern",
       text: "Southeastern (e.g. FL)"
      },
      {
       value: "canadian",
       text: "Canadian"
      },
      {
       value: "british",
       text: "British"
      }
     ],
     hasOther: true,
     isRequired: true,
     name: "usAccent",
     otherText: "Other (please specify)",
     title: "What regional accent(s) or dialect(s) of English do you consider yourself to have? (Check all that apply.)"
    },
    {
     type: "comment",
     name: "accentSpecify",
     title: "Please also write in your specific accent(s) or dialect(s)."
    }
   ],
   name: "demo3",
   title: "About You (3/4)"
  },
  {
   elements: [
    {
     type: "radiogroup",
     choices: [
      {
       value: "never",
       text: "Never married"
      },
      {
       value: "partner",
       text: "Living with a partner"
      },
      {
       value: "married",
       text: "Married or civil union or partnership"
      },
      {
       value: "separated",
       text: "Separated"
      },
      {
       value: "divorced",
       text: "Divorced"
      },
      {
       value: "widowed",
       text: "Widowed"
      }
     ],
     isRequired: true,
     name: "marriage",
     title: "What is your marital status?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "none",
       text: "Less than high school diploma"
      },
      {
       value: "highschool",
       text: "High school diploma or GED"
      },
      {
       value: "associates",
       text: "2-year associate’s degree or trade school"
      },
      {
       value: "bachelors",
       text: "4-year college degree (e.g. bachelor’s degree)"
      },
      {
       value: "advanced",
       text: "Advanced degree beyond 4-year degree (e.g. master’s, PhD, medical doctor, law degree)"
      }
     ],
     isRequired: true,
     name: "usEducation",
     title: "What is your highest level of education?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "none",
       text: "Less than high school diploma"
      },
      {
       value: "highschool",
       text: "High school diploma or GED"
      },
      {
       value: "associates",
       text: "2-year associate’s degree or trade school"
      },
      {
       value: "bachelors",
       text: "4-year college degree (e.g. bachelor’s degree)"
      },
      {
       value: "advanced",
       text: "Advanced degree beyond 4-year degree (e.g. master’s, PhD, medical doctor, law degree)"
      }
     ],
     isRequired: true,
     name: "usEducationSpouse",
     title: "What is your spouse's highest level of education?",
     visible: false,
     visibleIf: "{marriage} = 'married'"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "none",
       text: "Less than high school diploma"
      },
      {
       value: "highschool",
       text: "High school diploma or GED"
      },
      {
       value: "associates",
       text: "2-year associate’s degree or trade school"
      },
      {
       value: "bachelors",
       text: "4-year college degree (e.g. bachelor’s degree)"
      },
      {
       value: "advanced",
       text: "Advanced degree beyond 4-year degree (e.g. master’s, PhD, medical doctor, law degree)"
      },
      {
       value: "unknown",
       text: "Unknown"
      }
     ],
     isRequired: true,
     name: "usEducationMother",
     title: "What is your mother's highest level of education?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "none",
       text: "Less than high school diploma"
      },
      {
       value: "highschool",
       text: "High school diploma or GED"
      },
      {
       value: "associates",
       text: "2-year associate’s degree or trade school"
      },
      {
       value: "bachelors",
       text: "4-year college degree (e.g. bachelor’s degree)"
      },
      {
       value: "advanced",
       text: "Advanced degree beyond 4-year degree (e.g. master’s, PhD, medical doctor, law degree)"
      },
      {
       value: "unknown",
       text: "Unknown"
      }
     ],
     isRequired: true,
     name: "usEducationFather",
     title: "What is your father's highest level of education?"
    },
    {
     type: "text",
     isRequired: true,
     name: "occupationTitle",
     title: "What is the title of your current or most recent occupation?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "professional",
       text: "Management or professional (e.g. finance, engineering, education, research, law, medicine)"
      },
      {
       value: "service",
       text: "Service (e.g. healthcare support, police and corrections, food service, personal care)"
      },
      {
       value: "sales",
       text: "Sales or office (e.g. retail, marketing, clerical)"
      },
      {
       value: "trades",
       text: "Natural resource extraction, construction, or maintenance (e.g. farming, forestry, skilled trades, repair)"
      },
      {
       value: "production",
       text: "Production, transportation, or material moving (e.g. processing, assembly, driving)"
      },
      {
       value: "homemaker",
       text: "Homemaker or stay-at-home parent"
      },
      {
       value: "student",
       text: "Student"
      }
     ],
     isRequired: true,
     name: "occupationCategory",
     title: "How would you categorize your current or most recent occupation?"
    },
    {
     type: "text",
     isRequired: true,
     name: "occupationSpouseTitle",
     title: "What is the title of your spouse's current or most recent occupation?",
     visible: false,
     visibleIf: "{marriage} = 'married'"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "professional",
       text: "Management or professional (e.g. finance, engineering, education, research, law, medicine)"
      },
      {
       value: "service",
       text: "Service (e.g. healthcare support, police and corrections, food service, personal care)"
      },
      {
       value: "sales",
       text: "Sales or office (e.g. retail, marketing, clerical)"
      },
      {
       value: "trades",
       text: "Natural resource extraction, construction, or maintenance (e.g. farming, forestry, skilled trades, repair)"
      },
      {
       value: "production",
       text: "Production, transportation, or material moving (e.g. processing, assembly, driving)"
      },
      {
       value: "homemaker",
       text: "Homemaker or stay-at-home parent"
      },
      {
       value: "student",
       text: "Student"
      }
     ],
     isRequired: true,
     name: "occupationSpouseCategory",
     title: "How would you categorize your spouse's current or most recent occupation?",
     visible: false,
     visibleIf: "{marriage} = 'married'"
    },
    {
     type: "text",
     isRequired: true,
     name: "occupationMotherTitle",
     title: "What is the title of your mother's current or most recent occupation?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "professional",
       text: "Management or professional (e.g. finance, engineering, education, research, law, medicine)"
      },
      {
       value: "service",
       text: "Service (e.g. healthcare support, police and corrections, food service, personal care)"
      },
      {
       value: "sales",
       text: "Sales or office (e.g. retail, marketing, clerical)"
      },
      {
       value: "trades",
       text: "Natural resource extraction, construction, or maintenance (e.g. farming, forestry, skilled trades, repair)"
      },
      {
       value: "production",
       text: "Production, transportation, or material moving (e.g. processing, assembly, driving)"
      },
      {
       value: "homemaker",
       text: "Homemaker or stay-at-home parent"
      },
      {
       value: "student",
       text: "Student"
      },
      {
       value: "unknown",
       text: "Unknown"
      }
     ],
     isRequired: true,
     name: "occupationMotherCategory",
     title: "How would you categorize your mother's current or most recent occupation?"
    },
    {
     type: "text",
     isRequired: true,
     name: "occupationFatherTitle",
     title: "What is the title of your father's current or most recent occupation?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "professional",
       text: "Management or professional (e.g. finance, engineering, education, research, law, medicine)"
      },
      {
       value: "service",
       text: "Service (e.g. healthcare support, police and corrections, food service, personal care)"
      },
      {
       value: "sales",
       text: "Sales or office (e.g. retail, marketing, clerical)"
      },
      {
       value: "trades",
       text: "Natural resource extraction, construction, or maintenance (e.g. farming, forestry, skilled trades, repair)"
      },
      {
       value: "production",
       text: "Production, transportation, or material moving (e.g. processing, assembly, driving)"
      },
      {
       value: "homemaker",
       text: "Homemaker or stay-at-home parent"
      },
      {
       value: "student",
       text: "Student"
      },
      {
       value: "unknown",
       text: "Unknown"
      }
     ],
     isRequired: true,
     name: "occupationFatherCategory",
     title: "How would you categorize your father's current or most recent occupation?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "lt10",
       text: "Less than $10,000"
      },
      {
       value: "10",
       text: "$10,000 to $29,999"
      },
      {
       value: "30",
       text: "$30,000 to $49,999"
      },
      {
       value: "50",
       text: "$50,000 to $69,999"
      },
      {
       value: "70",
       text: "$70,000 to $89,999"
      },
      {
       value: "90",
       text: "$90,000 to $109,999"
      },
      {
       value: "110",
       text: "$110,000 to $129,999"
      },
      {
       value: "130",
       text: "$130,000 to $149,999"
      },
      {
       value: "150",
       text: "$150,000 to $199,999"
      },
      {
       value: "200",
       text: "$200,000 to $249,999"
      },
      {
       value: "250",
       text: "$250,000 or more"
      }
     ],
     isRequired: true,
     name: "usIncome",
     title: "What is your family’s approximate annual household income before taxes?"
    }
   ],
   name: "demo4",
   title: "About You (4/4)"
  }
 ]
}