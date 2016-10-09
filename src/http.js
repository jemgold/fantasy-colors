import Task from 'data.task';

// get :: url -> Task Response
const get = url =>
  new Task((rej, res) => fetch(url).then(res, rej))

// json :: Response -> Task JSON
const json = response =>
  new Task((rej, res) => response.json().then(res, rej))

// getJSON :: url -> Task JSON
export const getJSON = url => get(url).chain(json);
