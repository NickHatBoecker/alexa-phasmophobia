/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const Skill = require('skill.js');

const GHOST_SLOT = 'geist';
const PROOF_SLOT = 'beweis';

const PROOF_BOOK = 'Geisterbuch';
const PROOF_BOX = 'Geisterbox';
const PROOF_EMF = 'EMF';
const PROOF_FREEZING_TEMPERATURES = 'Gefriertemperaturen';
const PROOF_FINGERPRINTS = 'Fingerabdrücke';
const PROOF_ORBS = 'Geisterkugeln';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Willkommen zum Geister Journal von Phasmophobia.';

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
        let speakOutput = 'Tut mir leid, diesen Geist kenne ich nicht.';

        try {
            const ghostName = getName(handlerInput, GHOST_SLOT);
            if (!ghostName) {
                throw "Ghost not found"
            }
            speakOutput = Skill.ghosts.find(x => x.name.toLowerCase() === ghostName).nameResult;
        } catch (e) {
            // do nothing
            speakOutput = e.message
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
        let speakOutput = 'Tut mir leid, diesen Geist kenne ich nicht.';

        try {
            const ghostName = getName(handlerInput, GHOST_SLOT);
            if (!ghostName) {
                throw "Ghost not found"
            }
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
        let speakOutput = 'Tut mir leid, diesen Beweis kenne ich nicht.';

        try {
            const proofName = getName(handlerInput, PROOF_SLOT);
            if (!proofName) {
                throw "Proof not found"
            }

            const ghosts = Skill.ghosts.filter(ghost => filterGhostByProof(ghost, proofName));
            if (!ghosts.length) {
                speakOutput = `Ich konnte keinen Geist mit dem Beweis "${proofName}" finden.`;
            } else if (ghosts.length === 1) {
                speakOutput = `Es könnte ${ghosts[0].indefiniteArticle} sein.`
            } else {
                speakOutput = `Es könnte ${ghosts.map(x => x.indefiniteArticle).join(', ')} sein.`
            }
        } catch (e) {
            // do nothing
        }

        return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
    }
}

const GhostResponseBookIntentHandler = {
    canHandle (handlerInput) {
        const type = handlerInput.requestEnvelope.request.type;
        const intentName = handlerInput.requestEnvelope.request.intent.name;

        return type === 'IntentRequest' && intentName === 'GhostResponseBook';
    },
    handle (handlerInput) {
        let speakOutput = 'Tut mir leid, ich habe dich nicht verstanden.';

        try {
            const ghosts = Skill.ghosts.filter(x => x.respondsToGhostbook).map(x => x.indefiniteArticle)

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

const GhostResponseBoxIntentHandler = {
    canHandle (handlerInput) {
        const type = handlerInput.requestEnvelope.request.type;
        const intentName = handlerInput.requestEnvelope.request.intent.name;

        return type === 'IntentRequest' && intentName === 'GhostResponseBox';
    },
    handle (handlerInput) {
        let speakOutput = 'Tut mir leid, ich habe dich nicht verstanden.';

        try {
            const ghosts = Skill.ghosts.filter(x => x.respondsToGhostbox).map(x => x.indefiniteArticle)

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

const NameGhostsIntentHandler = {
    canHandle (handlerInput) {
        const type = handlerInput.requestEnvelope.request.type;
        const intentName = handlerInput.requestEnvelope.request.intent.name;

        return type === 'IntentRequest' && intentName === 'NameGhosts';
    },
    handle (handlerInput) {
        const ghosts = Skill.ghosts
        const speakOutput = `Es gibt ${ghosts.map(x => x.indefiniteArticle).join(', ')}.`;

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
        const speakOutput = 'Du kannst mich folgende Dinge fragen: "Alexa, frag geisterjournal welcher Geist Fingerabdrücke hinterlässt". Oder "Alexa, sag geisterjournal es ist das Phantom". Oder "Alexa, frag geisterjournal woran man den Dämon erkennt".';

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
        const speakOutput = 'Bis zum nächsten Mal!';

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
        name = resolveSynonyms(slot);
    }
    return name;
}

/**
 * Check if the given slot value matches a synonym.
 */
const resolveSynonyms = slot => {
    let resolvedName = slot.value.toLowerCase();

    try {
        const hasMatch = slot.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_MATCH';
        const resolved = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;

        if (hasMatch && resolved) {
            resolvedName = resolved;
        }
    } catch (e) {
        // Do nothing
    }

    return resolvedName;
}

const isEmf          = proof => PROOF_EMF.toLowerCase() === proof.toLowerCase();
const isFingerPrint  = proof => PROOF_FINGERPRINTS.toLowerCase() === proof.toLowerCase();
const isFreezing     = proof => PROOF_FREEZING_TEMPERATURES.toLowerCase() === proof.toLowerCase();
const isGhostBox     = proof => PROOF_BOX.toLowerCase() === proof.toLowerCase();
const isGhostBook    = proof => PROOF_BOOK.toLowerCase() === proof.toLowerCase();
const isGhostOrbs    = proof => PROOF_ORBS.toLowerCase() === proof.toLowerCase();

const filterGhostByProof = (ghost, proof) => {
    if (isEmf(proof)) {
        return ghost.respondsToEmf;
    }
    if (isFingerPrint(proof)) {
        return ghost.respondsToFingerprints;
    }
    if (isFreezing(proof)) {
        return ghost.respondsToFreezingTemparatures;
    }
    if (isGhostBox(proof)) {
        return ghost.respondsToGhostbox;
    }
    if (isGhostBook(proof)) {
        return ghost.respondsToGhostbook;
    }
    if (isGhostOrbs(proof)) {
        return ghost.respondsToGhostOrbs;
    }
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
    GhostResponseBookIntentHandler,
    GhostResponseBoxIntentHandler,
    NameGhostsIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler)
.addErrorHandlers(
    ErrorHandler)
.withCustomUserAgent('nhb/phasmophobia/v0.0.1')
.lambda();
