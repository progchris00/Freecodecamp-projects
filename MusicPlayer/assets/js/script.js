const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const shuffleButton = document.getElementById("shuffle");

// All sorting button types
const sortButtonTypes = document.querySelectorAll(".sort-btn-type")

const sortButton = document.getElementById("sort-btn");
const sortButtonsContainer = document.getElementById("sort-types");

const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "ZQuincy Larson",
        duration: "4:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
      },
      {
        id: 1,
        title: "Can't Stay Down",
        artist: "XQuincy Larson",
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
        artist: "EQuincy Larson",
        duration: "3:12",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
      },
      {
        id: 6,
        title: "Walking on Air",
        artist: "DQuincy Larson",
        duration: "3:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
      },
      {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "CQuincy Larson",
        duration: "3:52",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
      },
      {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "EQuincy Larson",
        duration: "3:10",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
      },
      {
        id: 9,
        title: "Chasing That Feeling",
        artist: "HQuincy Larson",
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


// Function for playing a song
const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);  // Finds the first song with the same id

  // Assign src and title to the audio object
  audio.src = song.src;
  audio.title = song.title;

  // When the play button is clicked, 
  // If there is no song currently playing or song is changed, reset the audio current time to 0 
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  // else, play the song where it is stopped, paused
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }

  userData.currentSong = song;
  playButton.classList.add("playing");
  highlightCurrentSong();
  setPlayerDisplay();
  audio.play();
}

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

const sortPlaylist = (criteria) => {
  userData?.songs.sort((a, b) => {
    if (a[criteria] < b[criteria]) {
      return -1
    }

    if (a[criteria] > b[criteria]) {
      return 1
    }
    return 0

  });
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  pauseSong();
  setPlayerDisplay();
  // setPlayButtonAccessibleText();

  return userData?.songs
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;

  playButton.classList.remove("playing");
  audio.pause()
}

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    playSong(userData?.songs[currentSongIndex + 1].id);
    // Since on sorted playlist, "Can't stay down" is the first one (id:1), adding 1 will play the next on its id,
    // What we want is to play the next song on the array and not particularly the one next to its id.
  }
}

const playPreviousSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    // Not included in the tutorial, the code condition below is added as my own version
    if (userData?.currentSong.id !== 1) {
      const currentSongIndex = getCurrentSongIndex();
      playSong(userData?.songs[currentSongIndex - 1].id);
    }
  }
}

// This variable will get and store the index of the current song on the mutated song array
// This is useful when the playlist is shuffled.
const getCurrentSongIndex = () => userData.songs.indexOf(userData.currentSong);

playButton.addEventListener("click", () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(`song-${userData?.currentSong.id}`)

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  // Set the attribute to true only if there is songToHighlight.
  // songToHighlight is set to null when shuffle button is activated.
  if (songToHighlight)
  songToHighlight.setAttribute("aria-current", "true");
};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");

  const currentSongTitle = userData?.currentSong?.title;
  const currentSongArtist = userData?.currentSong?.artist;

  // Using ternary operator, set the textContent if the currentSong properties are not null
  // This is important when shuffling the songs.

  // Once this function is called again on the shuffle function, 
  //  if this condition is not present, it will always set the text content to title even 
  //  if the currentSong is null
  playingSong.textContent = currentSongTitle ? currentSongTitle : "";
  songArtist.textContent = currentSongArtist ? currentSongArtist : "";
};

const shuffle = () => {
  userData.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

// Additional feature: Sorting by criteria

sortButtonTypes.forEach((button) => {
  button.addEventListener("click", () => {
    const sortingCriteria = button.value
    renderSongs(sortPlaylist(sortingCriteria));
  })
});

// Event to show and hide the sorting types button
sortButton.addEventListener("click", () => {
  if (sortButtonsContainer.style.display === "") {
    sortButtonsContainer.style.display = "block";
  } else {
    sortButtonsContainer.style.display = "";
  }
});

// Additional feature: enables hiding dropdown menu when clicking outside
// instead of just when clicking the sort button only
// Hiding menu when clicking outside
document.addEventListener("click", e => {
  if (!sortButtonsContainer.contains(e.target) && e.target !== sortButton) {
    sortButtonsContainer.style.display = ""
  }
})

pauseButton.addEventListener("click", pauseSong);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);
shuffleButton.addEventListener("click", shuffle);

// optional chaining (?.) returns undefined
// instead of throwing an error

// No need to pass an argument on sortBySongTitle function
//  because it is already using userData?.songs inside it.
// Now, the return value of the sortBySongTitle is what is past to the renderSongs

// By default, load the songs based on the original position.
renderSongs(userData?.songs);