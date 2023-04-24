import { createClient } from 'pexels';

const client = createClient('4Gkq0ZuJgevDtGOJesppgO5V4tZZ4TZLTBvtO1aX6fgmzxPXGIxmkFg0');

// All requests made with the client will be authenticated

client.photos.show({ id: 2014422 }).then(photo => console.log("picture is ready"));

