import { useQuery } from 'h3';
import { getSpeakerFromId, getUserEvent, getUserFromServer } from '~/server/services';

export default async (req, res) => {
  const user = await getUserFromServer(req);
  const query = useQuery(req);

  if (!query['id']) {
    return null;
  }

  const userEvent = await getUserEvent(user.login);
  const lastUsersSearchIds = userEvent.lastUsersSearchIds?.split(',');

  if (lastUsersSearchIds?.length > 1) {
    return null;
  }

  const currentSpeakerId = Number(lastUsersSearchIds[Number(query['id'])]);
  const speaker = await getSpeakerFromId(currentSpeakerId);

  return {
    twitter: speaker.twitter,
    biography: speaker.biography
  };
};
