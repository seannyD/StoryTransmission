
var storyOrderEndSurveyJSON = {
 pages: [
  {
   name: "page1",
   elements: [
    {
     type: "text",
     name: "question1",
     title: "In your opinion, what is the most important scene in your co-created story?",
     isRequired: true
    },
    {
     type: "radiogroup",
     name: "question2",
     title: "We understand that gender is a fluid concept. For the purposes of this research, which of the genders below do you most identify with?",
     isRequired: true,
     choices: [
      {
       value: "item1",
       text: "Man"
      },
      {
       value: "item2",
       text: "Woman"
      }
     ]
    },
    {
     type: "text",
     name: "question3",
     title: "What is your age",
     isRequired: true,
     inputType: "number"
    },
    {
     type: "radiogroup",
     name: "question4",
     title: "Do you consider yourself to be native-level English speaker?",
     isRequired: true,
     choices: [
      {
       value: "item1",
       text: "Yes"
      },
      {
       value: "item2",
       text: "No"
      }
     ]
    },
    {
     type: "text",
     name: "question5",
     title: "You will be invited to take part in the third part of the study by email. Please provide your email address below:",
     isRequired: true,
     validators: [
      {
       type: "email"
      }
     ],
     inputType: "email"
    }
   ]
  }
 ]
}
