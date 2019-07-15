// import React, { Component } from 'react';
// import './App.css';

// let defaultStyle = {
//   color: '#fff'
// };
// let fakeServerData = {
//   user: {
//     name: 'David'
//   }
// };

// class Aggregate extends Component {
//   render() {
//     return(
//       <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
//         <h2>Number Text</h2>
//       </div>
//     );
//   }
// }

// class Filter extends Component {
//   render() {    
//     return (
//       <div style={defaultStyle}>
//         <img />
//         <input type="text"/>
//       </div>
//     );
//   }
// }

// class Playlist extends Component {
//   render() {
//     return (
//       <div style={{...defaultStyle, display: "inline-block", width: "20%"}}>
//         <img/>
//         <h3>Playlist Name</h3>
//         <ul>
//           <li>Song 1</li>
//           <li>Song 2</li>
//           <li>Song 3</li>
//         </ul>
//       </div>
//     );
//   }
// }

// function App() {
//   // constructor() {
//   //   super();
//   //   this.state = {serverData: {}}
//   // }
//   // componentDidMount() {
//   //   this.setState({serverData: fakeServerData});
//   // }
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1 style={{...defaultStyle, 'font-size':'54px'}}>{fakeServerData.user.name}'s Playlist</h1>
//         <Aggregate/>
//         <Aggregate/>
//         <Filter/>
//         <Playlist/>
//         <Playlist/>
//         <Playlist/>
//         <Playlist/>
//       </header>
//     </div>
//   );
// }

// // class App extends Component() {
// //   constructor(props) {
// //     super(props);
// //     this.state = {serverData: {}}
// //   }
// //   componentDidMount() {
// //     this.setState({serverData: fakeServerData});
// //   }
// //   render() {
// //     return (
// //       <div className="App">
// //       <header className="App-header">
// //         <h1 style={{...defaultStyle, 'font-size':'54px'}}>
// //           {this.state.serverData.user && this.state.serverData.user.name}'s Playlist
// //         </h1>
// //         <Aggregate/>
// //         <Aggregate/>
// //         <Filter/>
// //         <Playlist/>
// //         <Playlist/>
// //         <Playlist/>
// //         <Playlist/>
// //       </header>
// //     </div>
// //     );
// //   }
// // }

// // class App extends React.Component() {
// //   constructor(props) {
// //     super(props);
// //     this.state = {serverData: {}}
// //   }
// //   componentDidMount() {
// //     this.setState({serverData: fakeServerData});
// //   }
// //   render() {
// //     return (
// //       <div className="App">
// //       <header className="App-header">
// //         <h1 style={{...defaultStyle, 'font-size':'54px'}}>
// //           {this.state.serverData.user && this.state.serverData.user.name}'s Playlist
// //         </h1>
// //         <Aggregate/>
// //         <Aggregate/>
// //         <Filter/>
// //         <Playlist/>
// //         <Playlist/>
// //         <Playlist/>
// //         <Playlist/>
// //       </header>
// //     </div>
// //     );
// //   }
// // }

// export default App;






import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};
let fakeServerData = {
  user: {
    name: 'David',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Cannelloni Makaroni', duration: 1236},
          {name: 'Rosa helikopter', duration: 70000}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Cannelloni Makaroni', duration: 1236},
          {name: 'Rosa helikopter', duration: 70000}
        ]
      },
      {
        name: 'Another playlist - the best!',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Hallelujah', duration: 1236},
          {name: 'Rosa helikopter', duration: 70000}
        ]
      },
      {
        name: 'Playlist - yeah!',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Cannelloni Makaroni', duration: 1236},
          {name: 'Hej Hej Monika', duration: 70000}
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img/>
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => 
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {

    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter onTextChange={text => {
              this.setState({filterString: text})
            }}/>
          {this.state.serverData.user.playlists.filter(playlist => 
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase())
          ).map(playlist => 
            <Playlist playlist={playlist} />
          )}
        </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;