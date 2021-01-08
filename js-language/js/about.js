import {getVocabulary, changeLang} from './getVocabulary.js';
const items = [$("#about-header"), $("#about-text")];
getVocabulary("about", items);
changeLang("about", items);