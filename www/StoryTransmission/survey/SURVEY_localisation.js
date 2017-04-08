// made with http://surveyjs.org/builder/

var localisationSurvey = {
    pages: [{
        name: "page2",
        questions: [{
            type: "radiogroup",
            choices: [{
                value: "USA",
                text: "United States of America"
            }, {
                value: "UK",
                text: "United Kingdom of Great Britain and Northern Ireland"
            }, {
                value: "Other",
                text: "Other (please specify)"
            }],
            isRequired: true,
            name: "localisation",
            title: "In what country do you currently live?"
        }, {
            type: "radiogroup",
            choices: [{
                value: "USA",
                text: "United States of America"
            }, {
                value: "UK",
                text: "United Kingdom of Great Britain and Northern Ireland"
            }],
            isRequired: true,
            name: "localisation2",
            title: "Which version of the questionnaire would have questions most appropriate for your personal history (e.g. education system, English dialect)?",
            visible: false,
            visibleIf: "{localisation} = 'Other'"
        }]
    }]
}