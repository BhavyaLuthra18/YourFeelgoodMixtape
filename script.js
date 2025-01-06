//ARRAY TO STORE ALL THE SONGS..........

const songJSON = [
  {
    id: 1,
    Name: "Blue eyes",
    artist: "YO YO Honey Singh",
    img: "./songimages/blueeyes.jpeg",
    genre: "pop",
    source: "./songaudios/blueEyes.mp3",
  },
  {
    id: 2,
    Name: "Lucky Boy",
    artist: "Vishal-Shekhar",
    img: "./songimages/Luckyboy.jpeg",
    genre: "pop",
    source: "./songaudios/Luckyboy.mp3",
  },
  {
    id: 3,
    Name: "humraah",
    artist: "sachet Tandon",
    img: "./songimages/humraah.jpeg",
    genre: "rock",
    source: "./songaudios/Humraah.mp3",
  },
  {
    id: 4,
    Name: "Rock On",
    artist: "Farhan Akhtar",
    img: "./songimages/rockon.jpeg",
    genre: "rock",
    source: "./songaudios/rockon.mp3",
  },
  {
    id: 5,
    Name: "Ambarsariya",
    artist: "Sona Mohapatra",
    img: "./songimages/Ambarsariya.jpeg",
    genre: "rock",
    source: "./songaudios/Ambarsariya.mp3",
  },
  {
    id: 6,
    Name: "Tu Ake Dekhle",
    artist: "King",
    img: "./songimages/tuakedekhle.jpeg",
    genre: "hip-hop",
    source: "./songaudios/Tuaakedekhle.mp3",
  },
  {
    id: 7,
    Name: "Samjho Na",
    artist: "Aditya Rikhaari",
    img: "./songimages/samjhoNa.jpeg",
    genre: "romantic",
    source: "./songaudios/Samjho Na.mp3",
  },
  {
    id: 8,
    Name: "Heeriye",
    artist: "jasleen royal & Arijit Singh",
    img: "./songimages/heeriye.jpeg",
    genre: "romantic",
    source: "./songaudios/Heeriye.mp3",
  },
  {
    id: 9,
    Name: "ishq Hai",
    artist: "Aditya Rikhari",
    img: "./songimages/ishqhai.jpeg",
    genre: "romantic",
    source: "./songaudios/Ishq Hai.mp3",
  },
  {
    id: 10,
    Name: "Ghoomey",
    artist: "Jubin Nautiyal",
    img: "./songimages/ghoomey.jpeg",
    genre: "romantic",
    source: "./songaudios/Ghoomey.mp3",
  },
];

//TOGGLE THEME BUTTON  (goes from dark to light and light to darkkk)

function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  const btnIcon = document.getElementById("btnIcon");

  if (currentTheme === "light") {
    body.setAttribute("data-theme", "dark");
    btnIcon.className = "fa fa-sun-o";
  } else {
    body.setAttribute("data-theme", "light");
    btnIcon.className = "fa fa-moon-o";
  }
}

let btn = document.getElementById("btn");
let btnIcon = document.getElementById("btnIcon");
let btnText = document.getElementById("btnText");

btn.onclick = toggleTheme;

//SONG SEARCH SECTION.................
//SEARCH TAB TO SEARCH FOR A SONG AND CLICKING ON THAT SONG WILL PLAY THAT SONG IN THE SONGS SECTION
// Function to search for a song by name
function searchSong(query) {
  const filteredSongs = query
    ? songJSON.filter((song) =>
        song.Name.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  displaySearchResults(filteredSongs, "song", query);
}

// Function to display search results
function displaySearchResults(results, type, query) {
  const resultsListId =
    type === "song"
      ? "song-search-results-list"
      : "playlist-search-results-list";
  const searchResultsList = document.getElementById(resultsListId);
  searchResultsList.innerHTML = "";

  if (query && results.length === 0) {
    // No results found
    const noResultsMessage = document.createElement("li");
    noResultsMessage.textContent = "This song is not available";
    searchResultsList.appendChild(noResultsMessage);
    return;
  }

  if (query && results.length > 0) {
    results.forEach((result) => {
      const listItem = document.createElement("li");
      listItem.style.display = "flex"; // To align the image and text side by side
      listItem.style.alignItems = "center";
      listItem.style.marginBottom = "10px";

      // Add song image
      const songImage = document.createElement("img");
      songImage.src = result.img; // Assuming `result.imageUrl` contains the image URL
      songImage.alt = `${result.Name} cover`;
      songImage.style.width = "50px";
      songImage.style.height = "50px";
      songImage.style.marginRight = "10px";
      songImage.style.objectFit = "cover";
      songImage.style.borderRadius = "5px"; // Optional for rounded edges

      // Add song text
      const songText = document.createElement("span");
      songText.textContent = `${result.Name} by ${result.artist}`;

      listItem.appendChild(songImage);
      listItem.appendChild(songText);

      listItem.addEventListener("click", () => {
        if (type === "song") {
          // Clicked on a song
          currentSong = result;
          updateSongCard();
        } else {
          // Clicked on a playlist
          displayCurrentPlaylist(result);
        }
      });
      searchResultsList.appendChild(listItem);
    });
  }
}

// Add event listeners for song and playlist search input fields
const songSearchInput = document.getElementById("song-search-input");
const searchSongButton = document.getElementById("search-song-button");

searchSongButton.addEventListener("click", function () {
  const query = songSearchInput.value.trim();
  searchSong(query);
});

// Add event listener to clear the search results when the input field is cleared
songSearchInput.addEventListener("input", function () {
  const query = songSearchInput.value.trim();

  // If the input is cleared, reset the search results
  if (!query) {
    const searchResultsList = document.getElementById(
      "song-search-results-list"
    );
    searchResultsList.innerHTML = ""; // Clear the displayed results
  } else {
    searchSong(query); // Search songs as the input changes
  }
});

//SONG CARD SECTION............
//initializaling First Song Selected song Index(eg set it to first Song)
let currentSong = null; // Store the currently selected song object
let currentSongIndex = 0;
// Function to update the Song Card with the currently selected song
function updateSongCard() {
  const songImage = document.getElementById("song-image");
  const songName = document.getElementById("song-name");
  const artistName = document.getElementById("artist-name");

  // Check if a song is selected
  if (currentSong) {
    // Update the Song Card with the selected song's details
    songImage.src = currentSong.img || "./songimages/ishqhai.jpeg"; // Default image URL if img is not provided
    songName.textContent = currentSong.Name;
    artistName.textContent = currentSong.artist;
  } else {
    // If no song is selected, clear the Song Card
    songImage.src = "./songimages/samjhoNa.jpeg"; // Default image when no song is selected
    songName.textContent = "";
    artistName.textContent = "";
  }
}

// CONTROL BUTTONS (NEXT,PREVIOUS)
document.addEventListener("DOMContentLoaded", function () {
  const prevButton = document.getElementById("Prev");
  const nextButton = document.getElementById("Next");

  //ADDING EVENT LISTENER TO NEXT AND PREVIOUS BUTTON
  // Event listener for the "Next" button
  nextButton.addEventListener("click", function () {
    currentSongIndex++;
    if (currentSongIndex >= songJSON.length) {
      currentSongIndex = 0; // Wrap to the first song when reaching the end
    }
    currentSong = songJSON[currentSongIndex];
    updateSongCard();
    playAudio();
  });

  // Event listener for the "Previous" button
  prevButton.addEventListener("click", function () {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = songJSON.length - 1; // Wrap to the last song when at the beginning
    }
    currentSong = songJSON[currentSongIndex];
    updateSongCard();
    playAudio();
  });
});

//AUDIO FUNCTION (TO PLAY AND LOAD)
function playAudio() {
  const audioElement = document.getElementById("audio");
  console.log(currentSong);
  if (currentSong && currentSong.source) {
    audioElement.src = currentSong.source;
    audioElement.load();
    audioElement.play();
  }
}

//FILTER SECTION  (WOULD FILTER SONGS ACCORDING TO THE GENRE)
function filterSongsByGenre(genre) {
  if (genre === "all") {
    return songJSON;
  } else {
    return songJSON.filter((song) => song.genre === genre);
  }
}

//UPDATING SONG LIST FUNCTION
//Creating a function to update the song list
function updatedSongList(genre) {
  const filteredSongs = filterSongsByGenre(genre);
  const songList = document.getElementById("song-list");
  songList.innerHTML = "";
  filteredSongs.forEach((song) => {
    const listItem = document.createElement("li");
    listItem.textContent = song.Name; // Use `textContent` to set the text content of the list item
    songList.appendChild(listItem);
  });
}
//Adding EventListener for filter DropDown Menu...........
const filterDropdown = document.getElementById("filter");

filterDropdown.addEventListener("change", function () {
  const selectedGenre = filterDropdown.value;
  updatedSongList(selectedGenre);
});

document.addEventListener("DOMContentLoaded", function () {
  updatedSongList("all");
});

//SONG LIST FOR ALL SONGS
// Initialize the song list with all songs
document.addEventListener("DOMContentLoaded", function () {
  updatedSongList("all");

  // Get the song list element
  const songList = document.getElementById("song-list");
  const songCard = document.getElementById("song-card");

  // Add an event listener to the song list to handle clicks on list items
  songList.addEventListener("click", function (event) {
    const clickedListItem = event.target;
    if (clickedListItem.tagName === "LI") {
      const songName = clickedListItem.textContent;
      const song = songJSON.find((song) => song.Name === songName);
      if (song) {
        currentSong = song;
        updateSongCard();
        playAudio();
      }
    }
  });
});

// CREATE PLAYLIST FUNCTION
// Function to create a new playlist
function createPlaylist(playlistName) {
  const newPlaylist = { name: playlistName, songs: [] };
  playlists.push(newPlaylist);
  displayPlaylists();
}

// ADD TO PLAYLIST FOR(PLAYLISTNAME,SONG)
function addToPlaylist(playlistName, song) {
  const playlist = playlists.find((pl) => pl.name === playlistName);
  if (playlist) {
    playlist.songs.push(song);
    displayPlaylists();
  }
}

// DISPLAY PLAYLIST FUNCTION
// Function to display playlists and songs on the UI
function displayPlaylists() {
  const playlistList = document.getElementById("playlist-list");
  playlistList.innerHTML = "";

  // Display all playlists and their songs
  playlist.forEach((playlist) => {
    const playlistItem = document.createElement("li");
    playlistItem.textContent = playlist.name;
    playlistItem.addEventListener("click", () => {
      displayCurrentPlaylist(playlist);
    });
    playlistList.appendChild(playlistItem);
  });
}

//DISPLAY SONGS FUNCTION
// Function to display a list of songs
function displaySongs(genre) {
  const songList = document.getElementById("song-list");
  songList.innerHTML = "";

  // Display songs based on the selected genre
  if (genre === "all") {
    songJSON.forEach((song) => {
      const songItem = document.createElement("li");
      songItem.textContent = song.Name;
      songItem.addEventListener("click", () => {
        currentSong = song;
        updateSongCard();
      });
      songList.appendChild(songItem);
    });
  } else {
    const filteredSongs = songJSON.filter((song) => song.genre === genre);
    filteredSongs.forEach((song) => {
      const songItem = document.createElement("li");
      songItem.textContent = song.Name;
      songItem.addEventListener("click", () => {
        currentSong = song;
        updateSongCard();
      });
      songList.appendChild(songItem);
    });
  }
}
//UPDATING SONG CARD WITH SELECTED SONG
// Function to update the song card with the currently selected song
function updateSongCard() {
  const songImage = document.getElementById("song-image");
  const songName = document.getElementById("song-name");
  const artistName = document.getElementById("artist-name");
  const audioElement = document.getElementById("audio");

  if (currentSong) {
    songImage.src = currentSong.img || "./songimages/Luckyboy.jpeg";
    songName.textContent = currentSong.Name || "Lucky Boy";
    artistName.textContent = currentSong.artist || "Vishal-Shekhar";

    audioElement.src = currentSong.source || "./songaudios/Luckyboy.mp3";
    audioElement.load();
    audioElement.play();
  } else {
    // Clear the song card if no song is selected
    songImage.src = "./songimages/Luckyboy.jpeg";
    songName.textContent = "Lucky Boy";
    artistName.textContent = "Vishal-Shekhar";
    audioElement.src = "./songaudios/Luckyboy.mp3";
  }
}

// Data structure to store playlists and their songs
const myPlaylists = [];

//SAVING OF CREATED PLAYLIST
// Function to save a new playlist
function createPlaylist(playlistName) {
  const newPlaylist = { name: playlistName, songs: [] };
  myPlaylists.push(newPlaylist);
  savePlaylists(); // Save playlists after creating a new one
  displayPlaylists(); // Refresh the playlist UI
}
//SAVING OF ADD TO PLAYLIST FUNCTION
// Function to add a song to a playlist and save it
function addToPlaylist(playlistName, song) {
  const playlist = myPlaylists.find((pl) => pl.name === playlistName);
  if (playlist) {
    playlist.songs.push(song);
    savePlaylists(); // Save playlists after adding a song
    displayPlaylists(); // Refresh the playlist UI
  }
}
//DISPLAY PLAYLIST FUNCTION
// Function to display playlists and songs on the UI
function displayPlaylists() {
  const playlistList = document.getElementById("playlist-list");
  playlistList.innerHTML = "";

  // Display all playlists and their songs
  myPlaylists.forEach((playlist) => {
    const playlistItem = document.createElement("li");
    playlistItem.textContent = playlist.name;
    playlistItem.addEventListener("click", () => {
      displayCurrentPlaylist(playlist);
    });
    playlistList.appendChild(playlistItem);
  });
}

// Saving the playlists and songs (LOCAL STORAGE);
// Function to save playlists and songs to local storage
function savePlaylists() {
  try {
    localStorage.setItem("playlists", JSON.stringify(myPlaylists));
  } catch (error) {
    console.error("Error saving data to local storage:", error);
  }
}
//LOADPLAYLIST FUNCTION
// Function to load playlists and songs from local storage
function loadPlaylists() {
  try {
    const storedPlaylists = localStorage.getItem("playlists");
    if (storedPlaylists) {
      myPlaylists.length = 0; // Clear the existing playlists
      const parsedPlaylists = JSON.parse(storedPlaylists);
      parsedPlaylists.forEach((playlist) => myPlaylists.push(playlist));
    }
  } catch (error) {
    console.error("Error loading data from local storage:", error);
  }
}

// Adding an event listener to the "Create Playlist" button
document.addEventListener("DOMContentLoaded", function () {
  const createPlaylistButton = document.getElementById(
    "create-playlist-button"
  );
  createPlaylistButton.addEventListener("click", function () {
    const playlistNameInput = document.getElementById("playlist-name-input");
    const playlistName = playlistNameInput.value.trim();
    if (playlistName) {
      createPlaylist(playlistName);
      playlistNameInput.value = "";
    }
  });

  // Adding event listener to the "Add to Playlist" button
  const addToPlaylistButton = document.getElementById("add-to-playlist");
  addToPlaylistButton.addEventListener("click", function () {
    if (currentSong) {
      const playlistName = prompt(
        "Enter the name of the playlist to add the song to:"
      );
      if (playlistName) {
        addToPlaylist(playlistName, currentSong);
      }
    } else {
      alert("Please select a song to add to the playlist.");
    }
  });

  // Adding event listener to the genre filter dropdown
  const filterDropdown = document.getElementById("filter");
  filterDropdown.addEventListener("change", function () {
    const selectedGenre = filterDropdown.value;
    displaySongs(selectedGenre);
  });

  // Initialize the UI and load saved playlists
  loadPlaylists();
  displayPlaylists();
  displaySongs("all");
  updateSongCard();
});
//SHOW SONGS FUNCTION
// Function to display songs based on the selected genre
function showSongs(genre) {
  const songList = document.getElementById("song-list");
  songList.innerHTML = "";

  // Filter songs based on the selected genre or display all songs if 'all' is selected
  const filteredSongs =
    genre === "all"
      ? songJSON
      : songJSON.filter((song) => song.genre === genre);

  // Display the filtered songs in the song list
  filteredSongs.forEach((song) => {
    const listItem = document.createElement("li");
    listItem.textContent = song.Name;
    listItem.addEventListener("click", () => {
      currentSong = song;
      updateSongCard();
    });
    songList.appendChild(listItem);
  });
}

// Add event listener to the genre filter dropdown

filterDropdown.addEventListener("change", function () {
  const selectedGenre = filterDropdown.value;
  showSongs(selectedGenre);
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the song list with all songs
  showSongs("all");
});

//RENDERING CURRENT SELECTED SONG
// Function to render the "currently selected song" in the song card and play it
function renderCurrentSong(song) {
  const songImage = document.getElementById("song-image");
  const songName = document.getElementById("song-name");
  const artistName = document.getElementById("artist-name");
  const audioElement = document.getElementById("audio");

  if (song) {
    // Update song card details
    songImage.src = song.img || "./songimages/default.jpg";
    songName.textContent = song.Name;
    artistName.textContent = song.artist;

    // Play the selected song
    if (song.source) {
      audioElement.src = song.source;
      audioElement.load();
      audioElement.play();
    }
  } else {
    // Clear the song card if no song is selected
    songImage.src = "./songimages/default.jpg";
    songName.textContent = "";
    artistName.textContent = "";
    audioElement.src = "";
  }
}

// Add event listener to the song list to handle clicks on list items
const songList = document.getElementById("song-list");
songList.addEventListener("click", function (event) {
  const clickedListItem = event.target;
  if (clickedListItem.tagName === "LI") {
    const songName = clickedListItem.textContent;
    const song = songJSON.find((song) => song.Name === songName);
    renderCurrentSong(song);
  }
});

//RENDERING OF SONGS IN "CURRENT PLAYLISTS"

// Function to render the songs of a playlist in the "Current Playlist" section
function renderPlaylistSong(playlist) {
  const currentPlaylistSongs = document.getElementById(
    "current-playlist-songs"
  );
  currentPlaylistSongs.innerHTML = "";

  const playlistNameHeader = document.createElement("h1");
  playlistNameHeader.textContent = playlist.name;
  currentPlaylistSongs.appendChild(playlistNameHeader);

  playlist.songs.forEach((song) => {
    const songItem = document.createElement("li");
    songItem.textContent = song.Name;
    currentPlaylistSongs.appendChild(songItem);
  });
}

// Function to handle clicks on playlist items
function handlePlaylistClick(playlist) {
  renderPlaylistSong(playlist);
}

//DISPLAYING OF THE SONG IN "CURRENT PLAYLIST"
// Function to display the songs of a playlist in the "Current Playlist" section
function displayCurrentPlaylist(playlist) {
  const currentPlaylistSection = document.getElementById("current-playlist");
  currentPlaylistSection.innerHTML = "";

  const playlistNameHeader = document.createElement("h1");
  playlistNameHeader.textContent = playlist.name;
  currentPlaylistSection.appendChild(playlistNameHeader);

  const songsList = document.createElement("ul");
  playlist.songs.forEach((song, index) => {
    const songItem = document.createElement("li");
    songItem.style.display = "flex"; // Align the image and text horizontally
    songItem.style.alignItems = "center"; // Center vertically
    songItem.style.marginBottom = "10px";
    songItem.style.cursor = "pointer"; // Indicate it's clickable

    // Create the song image
    const songImage = document.createElement("img");
    songImage.src = song.img;
    songImage.alt = `${song.Name} cover`;
    songImage.style.width = "50px";
    songImage.style.height = "50px";
    songImage.style.marginRight = "4px";
    songImage.style.borderRadius = "5px";
    songImage.style.objectFit = "cover";

    // Add song name
    const songText = document.createElement("span");
    songText.textContent = song.Name;

    // Create a "Remove" button for each song
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.style.marginLeft = "10px";
    removeButton.style.padding = "5px 10px"; // 10px padding for the button
    removeButton.style.backgroundColor = "red"; // Red background
    removeButton.style.color = "white"; // White text color for contrast
    removeButton.style.border = "none"; // Remove default border
    removeButton.style.borderRadius = "5px"; // Optional: rounded corners
    removeButton.style.fontSize = "16px"; // Smaller button text
    removeButton.style.cursor = "pointer"; // Indicate it's clickable

    // Add event listener to remove the song
    removeButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering the song click event
      // Remove the song from the playlist and update the UI
      playlist.songs.splice(index, 1);
      displayCurrentPlaylist(playlist);
    });

    // Add click event to play the song
    songItem.addEventListener("click", () => {
      const audioPlayer = document.getElementById("audio-player");
      const currentSongName = document.getElementById("current-song-name");

      // Set the audio source and play
      audioPlayer.src = song.file; // Assuming each song has a `file` property for the audio URL
      currentSongName.textContent = `Now Playing: ${song.Name}`;
      audioPlayer.play();
    });

    // Append image, text, and button to the song item
    songItem.appendChild(songImage);
    songItem.appendChild(songText);
    songItem.appendChild(removeButton);

    songsList.appendChild(songItem);
  });
  currentPlaylistSection.appendChild(songsList);
}
