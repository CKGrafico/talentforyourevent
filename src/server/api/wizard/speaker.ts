import { useQuery } from 'h3';
import { MAX_SPEAKERS_TO_REVEAL } from '~/models';
import { addRevealedToUser, getSpeakerFromId, getUserEvent, getUserFromServer } from '~/server/services';

export default async (req, res) => {
  const user = await getUserFromServer(req);
  const query = useQuery(req);

  if (!query['id']) {
    return null;
  }

  const userEvent = await getUserEvent(user.login);
  const lastUsersSearchIds = userEvent.lastUsersSearchIds?.split(',');

  if (lastUsersSearchIds?.length < 1) {
    return null;
  }

  if (userEvent.revealedNow >= MAX_SPEAKERS_TO_REVEAL) {
    throw 'Cannot reveal more in this query';
  }

  const currentSpeakerId = Number(lastUsersSearchIds[Number(query['id'])]);
  const speaker = await getSpeakerFromId(currentSpeakerId);
  await addRevealedToUser(user.login);

  return {
    twitter: speaker.twitter,
    github: speaker.github,
    biography: speaker.biography
  };
};
