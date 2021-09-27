export const giphyService  = {
  getRandomGif : async () => {
    let res = await fetch('https://api.giphy.com/v1/gifs/random?api_key=YytbGmRIV5sYtk2LggPk3lbIKgtut1hD&tag=&rating=pg-13');
    let data = await res.json();
    return data.data.images.original.mp4;
  }
};

