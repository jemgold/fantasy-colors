import daggy from 'daggy';

// RemoteData :: NotAsked | Loading | Failure a | Success b
export const RemoteData = daggy.taggedSum({
  NotAsked: [],
  Loading: [],
  Failure: ['error'],
  Success: ['items'],
});
