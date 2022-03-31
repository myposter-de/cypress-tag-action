"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineTags = void 0;
const tags_1 = require("./tags");
const determineTags = (props) => {
    const tags = [];
    try {
        const tagsValues = Object.keys(tags_1.Tags);
        const isMaster = tagsValues.indexOf(props.branchName);
        if (isMaster >= 0) {
            tags.push(tagsValues[isMaster]);
        }
        else {
            const isEvent = tagsValues.indexOf(props.eventName);
            if (isEvent >= 0) {
                tags.push(tagsValues[isEvent]);
            }
        }
        if (props.tickets.length) {
            const ticketsSeparated = props
                .tickets
                .split(',')
                .map(ticket => ticket.trim());
            tags.push(...ticketsSeparated);
        }
    }
    catch (e) {
        console.log(e);
    }
    return tags.join(',');
};
exports.determineTags = determineTags;
