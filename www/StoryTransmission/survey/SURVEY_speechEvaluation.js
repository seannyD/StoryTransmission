var speechEvaluationSurvey ={
 pages: [
  {
   elements: [
    {
     type: "matrix",
     columns: [
      {
       value: "1",
       text: "Strongly Disagree"
      },
      {
       value: "2",
       text: "Disagree         "
      },
      {
       value: "3",
       text: "Somewhat Disagree"
      },
      {
       value: "4",
       text: "Somewhat   Agree  "
      },
      {
       value: "5",
       text: "Agree            "
      },
      {
       value: "6",
       text: "Strongly   Agree  "
      }
     ],
     isAllRowRequired: true,
     isRequired: true,
     name: "prestigeScale",
     rows: [
      "prestigious",
      "powerful",
      "high social status",
      "wealthy",
      "reputable",
      "respected",
      "intelligent",
      "educated",
      "friendly",
      "kind",
      "good-natured",
      "warm",
      "comforting",
      "aggressive",
      "active",
      "confident",
      "enthusiastic"
     ],
     title: "The speaker sounds..."
    },
    {
     type: "matrix",
     columns: [
      {
       value: "1",
       text: "Not At All  "
      },
      {
       value: "2",
       text: "Not Much    "
      },
      {
       value: "3",
       text: "Somewhat Not"
      },
      {
       value: "4",
       text: "Somewhat So "
      },
      {
       value: "5",
       text: "Very Much   "
      },
      {
       value: "6",
       text: "Absolutely  "
      }
     ],
     isAllRowRequired: true,
     isRequired: true,
     name: "chengScale",
     rows: [
      "People respect and admire him.",
      "People do NOT want to be like him.",
      "He enjoys having control over other people.",
      "People always expect him to be successful.",
      "He often tries to get his own way regardless of what other people may want.",
      "People do NOT value his opinion.",
      "He is willing to use aggressive tactics to get his way.",
      "He is held in high esteem by people.",
      "He tries to control others rather than permit them to control him.",
      "He does NOT have a forceful or dominant personality.",
      "People know it is better to let him have his way.",
      "He does NOT enjoy having authority over other people.",
      "His unique talents and abilities are recognized by other people.",
      "He is considered an expert on some matters by people.",
      "People seek his advice on a variety of matters.",
      "People are afraid of him.",
      "Other people do NOT enjoy hanging out with him."
     ],
     title: "Please indicate the extent to which each statement accurately describes this particular person."
    }
   ],
   name: "speechEval",
   title: "Speech Evaluation"
  }
 ]
}