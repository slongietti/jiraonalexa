'use strict';

//sdk for Alexa
const Alexa = require('alexa-sdk');
//API manager for JIRA
const JIRA = require('./JIRA');

//not required. set to undefined if not used.
const APP_ID = undefined;

//Initialize Slot Variables
var IssueKey = ''
var IssueDescription = ''

//The handle holds all of the intents 
const handlers = {
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    //Begin Custom Intents
    'GetIssueIntent': function() {
      ClearVariables();
      //capture slot values and send to API
      IssueKey = this.event.request.intent.slots.IssueKey.value;
      IssueDescription = this.event.request.intent.slots.IssueDescription.value;
};

//Add event handler for intents and execute async handler
exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function ClearVariables()
{
IssueKey = '';
IssueDescription = '';
return;
}
