/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const Skill = require('skill.js');

const GHOST_SLOT = 'geist';
const PROOF_SLOT = 'beweis';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * Numerate proofs for given ghost
 */
const NameResultIntentHandler = {
    canHandle (handlerInput) {
        const type = handlerInput.requestEnvelope.request.type;
        const intentName = handlerInput.requestEnvelope.request.intent.name;

        return type === 'IntentRequest' && intentName === 'NameResult';
    },
    handle (handlerInput) {
        const ghostName = getGhostName(handlerInput, GHOST_SLOT);

        let speakOutput = 'Tut mir leid, diesen Geist kenne ich nicht.';
        try {
            speakOutput = Skill.ghosts.find(x => x.name.toLowerCase() === ghostName).nameResult;
        } catch (e) {
            // do nothing
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/**
 * Spill some information about the ghost
 */
const GhostDescriptionIntentHandler = {
    canHandle (handlerInput) {
        const type = handlerInput.requestEnvelope.request.type;
        const intentName = handlerInput.requestEnvelope.request.intent.name;

        return type === 'IntentRequest' && intentName === 'GhostDescription';
    },
    handle (handlerInput) {
        const ghostName = getGhostName(handlerInput, GHOST_SLOT);

        let speakOutput = 'Tut mir leid, diesen Geist kenne ich nicht.';
        try {
            speakOutput = Skill.ghosts.find(x => x.name.toLowerCase() === ghostName).description;
        } catch (e) {
            // do nothing
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
}

/**
 * Spill some information about the ghost
 */
const GhostResponseIntentHandler = {
    canHandle (handlerInput) {
        const type = handlerInput.requestEnvelope.request.type;
        const intentName = handlerInput.requestEnvelope.request.intent.name;

        return type === 'IntentRequest' && intentName === 'GhostResponse';
    },
    handle (handlerInput) {
        const proofName = getProofName(handlerInput, PROOF_SLOT);

        let speakOutput = 'Tut mir leid, diesen Beweis kenne ich nicht.';
        try {
            const ghosts = []
            Skill.ghosts.find(ghost => {
                // TODO add if
                ghosts.push(`${ghost.indefiniteArticle} ${ghost.name}`)
            })

            if (ghosts.length === 1) {
                speakOutput = `Es könnte ${ghosts[0]} sein.`
            } else {
                speakOutput = `Es könnte ${ghosts.join(', ')} sein.`
            }
        } catch (e) {
            // do nothing
        }

        return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Du findest alle Befehler auf in der Beschreibung dieses Skills';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Ciao!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Tut mir leid, ich habe dich nicht verstanden. Bitte versuche es erneut.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const getName = (handlerInput, slotName) => {
    const slot = handlerInput.requestEnvelope.request.intent.slots[slotName];

    let name = '';
    if (slot && slot.value) {
        name = slot.value.toLowerCase();
    }

    return name;
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        NameResultIntentHandler,
        GhostDescriptionIntentHandler,
        GhostResponseIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('nhb/phasmophobia/v0.0.1')
    .lambda();
