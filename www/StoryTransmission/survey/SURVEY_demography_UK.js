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
  },
  {
   elements: [
    {
     type: "text",
     isRequired: true,
     name: "ukTownChildhood",
     placeHolder: "Town/City, County/State/Province, Country",
     title: "Where did you spend the majority of your childhood (0-12 years)? (Please provide Town/City, County/State/Province, Country.)"
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
     name: "ukTownNow",
     placeHolder: "Town/City, County/State/Province, Country",
     title: "Where do you live now (have lived or intend to live for more than 3 continuous months)?  (Please provide Town/City, County/State/Province, Country.)"
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
     name: "ukTownOther",
     title: "Have you lived in other places in the UK for more than 3 continuous months?"
    },
    {
     type: "comment",
     isRequired: true,
     name: "ukTownOtherSpecify",
     placeHolder: "Town/City, County",
     title: "Where else have you lived in the UK for more than 3 continuous months? (List all that apply. Please provide Town/City, County.)",
     visible: false,
     visibleIf: "{ukTownOther} = '1'"
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
     name: "ukTownOutside",
     title: "Have you lived or traveled outside of the UK for more than 3 continuous months?"
    },
    {
     type: "comment",
     isRequired: true,
     name: "ukTownOutsideSpecify",
     placeHolder: "Town/City, County/State/Province, Country",
     title: "Where have you lived or traveled outside of the UK for more than 3 continuous months? (List all that apply. Please provide Town/City, County/State/Province, Country.)",
     visible: false,
     visibleIf: "{ukTownOutside} = '1'"
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
       value: "northeastern",
       text: "Northeastern (e.g. Geordie, Mackem, Northumbrian)"
      },
      {
       value: "northwestern",
       text: "Northwestern (e.g. Cheshire, Cumbrian, Mancunian, Scouse)"
      },
      {
       value: "yorkshire",
       text: "Yorkshire and the Humber"
      },
      {
       value: "eastmidlands",
       text: "East Midlands"
      },
      {
       value: "westmidlands",
       text: "West Midlands (e.g. Black Country, Brummie)"
      },
      {
       value: "eastanglian",
       text: "East Anglian"
      },
      {
       value: "standardsouthern",
       text: "Standard Southern"
      },
      {
       value: "london",
       text: "London"
      },
      {
       value: "estuaryenglish",
       text: "Estuary English"
      },
      {
       value: "southeastern",
       text: "Southeastern"
      },
      {
       value: "westcountry",
       text: "West Country (e.g. Bristolian)"
      },
      {
       value: "anglocornish",
       text: "Anglo-Cornish"
      },
      {
       value: "welsh",
       text: "Welsh"
      },
      {
       value: "irish",
       text: "Irish"
      },
      {
       value: "scottish",
       text: "Scottish"
      },
      {
       value: "american",
       text: "American"
      }
     ],
     hasOther: true,
     isRequired: true,
     name: "ukAccent",
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
       text: "No formal qualifications"
      },
      {
       value: "gcse",
       text: "GCSEs or equivalent"
      },
      {
       value: "alevel",
       text: "A-Levels or equivalent"
      },
      {
       value: "university",
       text: "3-year/university degree (e.g. bachelor’s degree) or equivalent"
      },
      {
       value: "advanced",
       text: "Advanced degree beyond 3-year degree (e.g. master’s, PhD, medical doctor, law degree) or equivalent"
      }
     ],
     isRequired: true,
     name: "ukEducation",
     title: "What is your highest level of education?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "none",
       text: "No formal qualifications"
      },
      {
       value: "gcse",
       text: "GCSEs or equivalent"
      },
      {
       value: "alevel",
       text: "A-Levels or equivalent"
      },
      {
       value: "university",
       text: "3-year/university degree (e.g. bachelor’s degree) or equivalent"
      },
      {
       value: "advanced",
       text: "Advanced degree beyond 3-year degree (e.g. master’s, PhD, medical doctor, law degree) or equivalent"
      }
     ],
     isRequired: true,
     name: "ukEducationSpouse",
     title: "What is your spouse's highest level of education?",
     visible: false,
     visibleIf: "{marriage} = 'married'"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "none",
       text: "No formal qualifications"
      },
      {
       value: "gcse",
       text: "GCSEs or equivalent"
      },
      {
       value: "alevel",
       text: "A-Levels or equivalent"
      },
      {
       value: "university",
       text: "3-year/university degree (e.g. bachelor’s degree) or equivalent"
      },
      {
       value: "advanced",
       text: "Advanced degree beyond 3-year degree (e.g. master’s, PhD, medical doctor, law degree) or equivalent"
      },
      {
       value: "unknown",
       text: "Unknown"
      }
     ],
     isRequired: true,
     name: "ukEducationMother",
     title: "What is your mother's highest level of education?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "none",
       text: "No formal qualifications"
      },
      {
       value: "gcse",
       text: "GCSEs or equivalent"
      },
      {
       value: "alevel",
       text: "A-Levels or equivalent"
      },
      {
       value: "university",
       text: "3-year/university degree (e.g. bachelor’s degree) or equivalent"
      },
      {
       value: "advanced",
       text: "Advanced degree beyond 3-year degree (e.g. master’s, PhD, medical doctor, law degree) or equivalent"
      },
      {
       value: "unknown",
       text: "Unknown"
      }
     ],
     isRequired: true,
     name: "ukEducationFather",
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
       value: "lt11",
       text: "Less than £11,000"
      },
      {
       value: "11",
       text: "£11,000 to £24,999"
      },
      {
       value: "25",
       text: "£25,000 to £39,999"
      },
      {
       value: "40",
       text: "£40,000 to £54,999"
      },
      {
       value: "55",
       text: "£55,000 to £69,999"
      },
      {
       value: "70",
       text: "£70,000 to £84,999"
      },
      {
       value: "85",
       text: "£85,000 to £99,999"
      },
      {
       value: "100",
       text: "£100,000 to £114,999"
      },
      {
       value: "115",
       text: "£115,000 to £129,999"
      },
      {
       value: "130",
       text: "£130,000 to £149,999"
      },
      {
       value: "150",
       text: "£150,000 or more"
      }
     ],
     isRequired: true,
     name: "ukIncome",
     title: "What is your family’s approximate annual household income before taxes?"
    }
   ],
   name: "demo4",
   title: "About You (4/4)"
  },
  {
   elements: [
    {
     type: "comment",
     name: "finalcomments",
     title: "Final comments:  Do you have any comments about the experiment that you would like to send to the experimenters? Did you experience any problems or difficulties?"
    }
   ],
   name: "Final comments"
  }
 ]
}