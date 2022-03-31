import { Tags } from './tags';

export interface DetermineTagsProps {
  branchName: string;
  eventName: string;
  tickets: string;
}

const determineTags = (props: DetermineTagsProps) => {
  const tags: Array<string> = [];
  try {
    const tagsValues = (<any>Object).keys(Tags);

    const isMaster = tagsValues.indexOf(props.branchName);

    if (isMaster >= 0) {
      tags.push(tagsValues[isMaster]);
    } else {
      const isEvent = tagsValues.indexOf(props.eventName);

      if (isEvent >= 0) {
        tags.push(tagsValues[isEvent]);
      }
    }

    if (props.tickets.length) {
      const ticketsSeparated: Array<string> = props.tickets
        .split(',')
        .map(ticket => ticket.trim());
      tags.push(...ticketsSeparated);
    }
  } catch (e) {
    console.log(e);
  }

  return tags.join(',');
};

export { determineTags };
