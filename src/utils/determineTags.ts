import { Tags } from './tags';

export interface DetermineTagsProps {
  branchName: string;
  eventName: string;
  tickets: string;
  triggeredBy: string;
}

const determineTags = (props: DetermineTagsProps) => {
  const tags: Array<string> = [];
  try {
    const tagsValues = (<any>Object).keys(Tags);

    const isMaster = tagsValues.indexOf(props.branchName);

    if (isMaster >= 0) {
      tags.push(Tags.master);
    }

    const isEvent = tagsValues.indexOf(props.eventName);

    if (isEvent >= 0) {
      tags.push(Tags.schedule);
    }

    if (props.tickets.length) {
      const ticketsSeparated: Array<string> = props.tickets
        .split(',')
        .map(ticket => ticket.trim());
      tags.push(...ticketsSeparated);
    }

    if (props.triggeredBy === 'deployment') {
      tags.push(Tags.deployment);
    }
  } catch (e) {
    console.log(e);
  }

  return tags.join(',');
};

export { determineTags };
