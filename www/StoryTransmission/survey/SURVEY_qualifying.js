var qualifyingTaskSurvey = {
 pages: [
  {
   elements: [
    {
     type: "radiogroup",
     choices: [
      {
       value: "us",
       text: "United States of America"
      },
      {
       value: "uk",
       text: "United Kingdom of Great Britain and Northern Ireland"
      }
     ],
     hasOther: true,
     isRequired: true,
     name: "qualCountry",
     otherText: "Other (please specify)",
     title: "In what country do you currently live?"
    },
    {
     type: "radiogroup",
     choices: [
      {
       value: "us",
       text: "United States of America"
      },
      {
       value: "uk",
       text: "United Kingdom of Great Britain and Northern Ireland"
      }
     ],
     isRequired: true,
     name: "qualCountryOther",
     title: "Which version of the questionnaire would have questions most appropriate for your personal history (e.g. education system, English dialect)?",
     visible: false,
     visibleIf: "{qualCountry} = 'other'"
    },
    {
     type: "dropdown",
     name: "qualUsStateCounty",
     visible: false,
     visibleIf: "{qualCountry} = 'us'",
     title: "In which state did you spend the majority of your childhood (0-12 years)?",
     isRequired: true,
     hasOther: true,
     choices: [
      {
       value: "ak",
       text: "Alabama"
      },
      {
       value: "al",
       text: "Alaska"
      },
      {
       value: "az",
       text: "Arizona"
      },
      {
       value: "ar",
       text: "Arkansas"
      },
      {
       value: "ca",
       text: "California"
      },
      {
       value: "co",
       text: "Colorado"
      },
      {
       value: "ct",
       text: "Connecticut"
      },
      {
       value: "de",
       text: "Delaware"
      },
      {
       value: "fl",
       text: "Florida"
      },
      {
       value: "ga",
       text: "Georgia"
      },
      {
       value: "hi",
       text: "Hawaii"
      },
      {
       value: "id",
       text: "Idaho"
      },
      {
       value: "il",
       text: "Illinois"
      },
      {
       value: "in",
       text: "Indiana"
      },
      {
       value: "ia",
       text: "Iowa"
      },
      {
       value: "ks",
       text: "Kansas"
      },
      {
       value: "ky",
       text: "Kentucky"
      },
      {
       value: "la",
       text: "Louisiana"
      },
      {
       value: "me",
       text: "Maine"
      },
      {
       value: "md",
       text: "Maryland"
      },
      {
       value: "ma",
       text: "Massachusetts"
      },
      {
       value: "mi",
       text: "Michigan"
      },
      {
       value: "mn",
       text: "Minnesota"
      },
      {
       value: "ms",
       text: "Mississippi"
      },
      {
       value: "mo",
       text: "Missouri"
      },
      {
       value: "mt",
       text: "Montana"
      },
      {
       value: "ne",
       text: "Nebraska"
      },
      {
       value: "nv",
       text: "Nevada"
      },
      {
       value: "nh",
       text: "New Hampshire"
      },
      {
       value: "nj",
       text: "New Jersey"
      },
      {
       value: "nm",
       text: "New Mexico"
      },
      {
       value: "ny",
       text: "New York"
      },
      {
       value: "nc",
       text: "North Carolina"
      },
      {
       value: "nd",
       text: "North Dakota"
      },
      {
       value: "oh",
       text: "Ohio"
      },
      {
       value: "ok",
       text: "Oklahoma"
      },
      {
       value: "or",
       text: "Oregon"
      },
      {
       value: "pa",
       text: "Pennsylvania"
      },
      {
       value: "ri",
       text: "Rhode Island"
      },
      {
       value: "sc",
       text: "South Carolina"
      },
      {
       value: "sd",
       text: "South Dakota"
      },
      {
       value: "tn",
       text: "Tennessee"
      },
      {
       value: "tx",
       text: "Texas"
      },
      {
       value: "ut",
       text: "Utah"
      },
      {
       value: "vt",
       text: "Vermont"
      },
      {
       value: "va",
       text: "Virginia"
      },
      {
       value: "wa",
       text: "Washington"
      },
      {
       value: "wv",
       text: "West Virginia"
      },
      {
       value: "wi",
       text: "Wisconsin"
      },
      {
       value: "wy",
       text: "Wyoming"
      },
      {
       value: "dc",
       text: "District of Columbia"
      },
      {
       value: "pr",
       text: "Puerto Rico"
      },
      {
       value: "gu",
       text: "Guam"
      },
      {
       value: "as",
       text: "American Samoa"
      },
      {
       value: "vi",
       text: "U.S. Virgin Islands"
      },
      {
       value: "mp",
       text: "Northern Mariana Islands"
      }
     ]
    },
    {
     type: "dropdown",
     name: "qualUkStateCounty",
     visible: false,
     visibleIf: "{qualCountry} = 'uk'",
     title: "In which county did you spend the majority of your childhood (0-12 years)?",
     isRequired: true,
     hasOther: true,
     choices: [
      {
       value: "abd",
       text: "Aberdeenshire"
      },
      {
       value: "ald",
       text: "Alderney"
      },
      {
       value: "agy",
       text: "Anglesey"
      },
      {
       value: "ans",
       text: "Angus"
      },
      {
       value: "arl",
       text: "Argyllshire"
      },
      {
       value: "avn",
       text: "Avon"
      },
      {
       value: "ayr",
       text: "Ayrshire"
      },
      {
       value: "ban",
       text: "Banffshire"
      },
      {
       value: "bdf",
       text: "Bedfordshire"
      },
      {
       value: "brk",
       text: "Berkshire"
      },
      {
       value: "bew",
       text: "Berwickshire"
      },
      {
       value: "bor",
       text: "Borders"
      },
      {
       value: "bre",
       text: "Breconshire"
      },
      {
       value: "bkm",
       text: "Buckinghamshire"
      },
      {
       value: "but",
       text: "Bute"
      },
      {
       value: "cae",
       text: "Caernarvonshire"
      },
      {
       value: "cai",
       text: "Caithness"
      },
      {
       value: "cam",
       text: "Cambridgeshire"
      },
      {
       value: "cgn",
       text: "Cardiganshire"
      },
      {
       value: "cmn",
       text: "Carmarthenshire"
      },
      {
       value: "cen",
       text: "Central"
      },
      {
       value: "chs",
       text: "Cheshire"
      },
      {
       value: "clk",
       text: "Clackmannanshire"
      },
      {
       value: "clv",
       text: "Cleveland"
      },
      {
       value: "cwd",
       text: "Clwyd"
      },
      {
       value: "ant",
       text: "Co. Antrim"
      },
      {
       value: "arm",
       text: "Co. Armagh"
      },
      {
       value: "dow",
       text: "Co. Down"
      },
      {
       value: "dur",
       text: "Co. Durham"
      },
      {
       value: "fer",
       text: "Co. Fermanagh"
      },
      {
       value: "ldy",
       text: "Co. Londonderry"
      },
      {
       value: "tyr",
       text: "Co. Tyrone"
      },
      {
       value: "con",
       text: "Cornwall"
      },
      {
       value: "cul",
       text: "Cumberland"
      },
      {
       value: "cma",
       text: "Cumbria"
      },
      {
       value: "den",
       text: "Denbighshire"
      },
      {
       value: "dby",
       text: "Derbyshire"
      },
      {
       value: "dev",
       text: "Devon"
      },
      {
       value: "dor",
       text: "Dorset"
      },
      {
       value: "dgy",
       text: "Dumfries and Galloway"
      },
      {
       value: "dfs",
       text: "Dumfries-shire"
      },
      {
       value: "dnb",
       text: "Dunbartonshire"
      },
      {
       value: "dfd",
       text: "Dyfed"
      },
      {
       value: "eln",
       text: "East Lothian"
      },
      {
       value: "ery",
       text: "East Riding of Yorkshire"
      },
      {
       value: "sxe",
       text: "East Sussex"
      },
      {
       value: "ess",
       text: "Essex"
      },
      {
       value: "fif",
       text: "Fife"
      },
      {
       value: "fln",
       text: "Flintshire"
      },
      {
       value: "gla",
       text: "Glamorgan"
      },
      {
       value: "gls",
       text: "Gloucestershire"
      },
      {
       value: "gmp",
       text: "Grampian"
      },
      {
       value: "gtm",
       text: "Greater Manchester"
      },
      {
       value: "gsy",
       text: "Guernsey"
      },
      {
       value: "gnt",
       text: "Gwent"
      },
      {
       value: "gwn",
       text: "Gwynedd"
      },
      {
       value: "ham",
       text: "Hampshire"
      },
      {
       value: "hwr",
       text: "Hereford and Worcester"
      },
      {
       value: "hef",
       text: "Herefordshire"
      },
      {
       value: "hrt",
       text: "Hertfordshire"
      },
      {
       value: "hld",
       text: "Highland"
      },
      {
       value: "hum",
       text: "Humberside"
      },
      {
       value: "hun",
       text: "Huntingdonshire"
      },
      {
       value: "inv",
       text: "Inverness-shire"
      },
      {
       value: "iow",
       text: "Isle of Wight"
      },
      {
       value: "jsy",
       text: "Jersey"
      },
      {
       value: "ken",
       text: "Kent"
      },
      {
       value: "kcd",
       text: "Kincardineshire"
      },
      {
       value: "krs",
       text: "Kinross-shire"
      },
      {
       value: "kkd",
       text: "Kirkcudbrightshire"
      },
      {
       value: "lks",
       text: "Lanarkshire"
      },
      {
       value: "lan",
       text: "Lancashire"
      },
      {
       value: "lei",
       text: "Leicestershire"
      },
      {
       value: "lin",
       text: "Lincolnshire"
      },
      {
       value: "ltn",
       text: "Lothian"
      },
      {
       value: "mer",
       text: "Merionethshire"
      },
      {
       value: "msy",
       text: "Merseyside"
      },
      {
       value: "mgm",
       text: "Mid Glamorgan"
      },
      {
       value: "mln",
       text: "Midlothian"
      },
      {
       value: "mon",
       text: "Monmouthshire"
      },
      {
       value: "mgy",
       text: "Montgomeryshire"
      },
      {
       value: "mor",
       text: "Morayshire"
      },
      {
       value: "nai",
       text: "Nairn"
      },
      {
       value: "nfk",
       text: "Norfolk"
      },
      {
       value: "nry",
       text: "North Riding of Yorkshire"
      },
      {
       value: "nyk",
       text: "North Yorkshire"
      },
      {
       value: "nth",
       text: "Northamptonshire"
      },
      {
       value: "nbl",
       text: "Northumberland"
      },
      {
       value: "ntt",
       text: "Nottinghamshire"
      },
      {
       value: "oki",
       text: "Orkney"
      },
      {
       value: "oxf",
       text: "Oxfordshire"
      },
      {
       value: "pee",
       text: "Peebles-shire"
      },
      {
       value: "pem",
       text: "Pembrokeshire"
      },
      {
       value: "per",
       text: "Perth"
      },
      {
       value: "pow",
       text: "Powys"
      },
      {
       value: "rad",
       text: "Radnorshire"
      },
      {
       value: "rfw",
       text: "Renfrewshire"
      },
      {
       value: "roc",
       text: "Ross and Cromarty"
      },
      {
       value: "rox",
       text: "Roxburghshire"
      },
      {
       value: "rut",
       text: "Rutland"
      },
      {
       value: "srk",
       text: "Sark"
      },
      {
       value: "sel",
       text: "Selkirkshire"
      },
      {
       value: "shi",
       text: "Shetland"
      },
      {
       value: "sal",
       text: "Shropshire"
      },
      {
       value: "som",
       text: "Somerset"
      },
      {
       value: "sgm",
       text: "South Glamorgan"
      },
      {
       value: "syk",
       text: "South Yorkshire"
      },
      {
       value: "sts",
       text: "Staffordshire"
      },
      {
       value: "sti",
       text: "Stirlingshire"
      },
      {
       value: "std",
       text: "Strathclyde"
      },
      {
       value: "sfk",
       text: "Suffolk"
      },
      {
       value: "sry",
       text: "Surrey"
      },
      {
       value: "ssx",
       text: "Sussex"
      },
      {
       value: "sut",
       text: "Sutherland"
      },
      {
       value: "tay",
       text: "Tayside"
      },
      {
       value: "twr",
       text: "Tyne and Wear"
      },
      {
       value: "war",
       text: "Warwickshire"
      },
      {
       value: "wgm",
       text: "West Glamorgan"
      },
      {
       value: "wln",
       text: "West Lothian"
      },
      {
       value: "wmd",
       text: "West Midlands"
      },
      {
       value: "wry",
       text: "West Riding of Yorkshire"
      },
      {
       value: "sxw",
       text: "West Sussex"
      },
      {
       value: "wyk",
       text: "West Yorkshire"
      },
      {
       value: "wis",
       text: "Western Isles"
      },
      {
       value: "wes",
       text: "Westmorland"
      },
      {
       value: "wig",
       text: "Wigtownshire"
      },
      {
       value: "wil",
       text: "Wiltshire"
      },
      {
       value: "wor",
       text: "Worcestershire"
      },
      {
       value: "yks",
       text: "Yorkshire"
      },
      {
       value: "bot",
       text: "British Overseas Territories"
      }
     ]
    },
    {
     type: "text",
     name: "qualOtherStateCounty",
     visible: false,
     visibleIf: "{qualCountry} = 'other'",
     title: "In which state, county, or other administrative division did you spend the majority of your childhood (0-12 years)?",
     isRequired: true,
     placeHolder: "State/County/Administrative Division"
    },
    {
     type: "text",
     name: "qualTown",
     title: "What is the name of the town, city, or other settlement in which you spent the majority of your childhood (0-12 years)?",
     isRequired: true,
     placeHolder: "Town/City/Settlement"
    }
   ],
   name: "qualTask"
  }
 ]
}