const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
      },
      {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
      },
      {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
      },
      {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
      },
      {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
      },
      {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
      },
      {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
      },
      {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
      },
      {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
      },
      {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
      },
    ];

const audio = new Audio();

// Object to keep track of the song s
// the song that is currently playing
// the time of the current song
let userData = {
    songs: [...allSongs],   // (...) called the spread operator and is used to mutate the original array, can also be used to concatenate two arrays
    currentSong: null,
    songCurrentTime: 0,
};


// Function used to display the songs in the UI
// uses arrow function, and a function expression: a function that is assigned to a variable
const renderSongs = (array) => {
  // Map method iterate through an array and return a new array
  // map takes a function as an argument, this is called callback function
  const songsHTML = array.map((songs) => {
    return `<li id="song-${songs.id}" class="playlist-song">
      <button class="playlist-song-info">
        <span class="playlist-song-title">${songs.title}</span>
        <span class="playlist-song-artist">${songs.artist}</span>
        <span class="playlist-song-duration">${songs.duration}</span>
      </button>
      <button class="playlist-song-delete"></button>
    </li>`;
  }).join("") // the return value is array so using join will turn it to list and remove the comma
  playlistSongs.innerHTML = songsHTML;
}

// Function used to sort the songs by title
// the sort method uses a compareFn to determine the order of the elements
const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1   //returns -1 if a comes before b
    }

    if (a.title > b.title) {
      return 1    // return 1 if a comes after b
    }
      
    return 0    //return 0 if a and b is the same

  });
  return userData?.songs
} ;


// optional chaining (?.) returns undefined
// instead of throwing an e
renderSongs(sortSongs(userData?.songs));