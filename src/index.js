import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import returnMusicData from './data';

const music = returnMusicData();

var prefix = "";
var suffix = "";
var thestate, thevalue, pos, thex, they, largest, smallest, val1, val2, val3, val4,val5, range, netValue, dividedRange, color1, color2, color3, color4, color5, stroke1, stroke2, stroke3, stroke4, stroke5;
var arrayValues = [];
var type = "Rank";


music.sort(function (a, b) {

    var aConcat = a["Year"] + a[type];
    var bConcat = b["Year"] + b[type];

    if (aConcat > bConcat) {
        return 1;
    } else if (aConcat < bConcat) {
        return -1;
    } else {
        return 0;
    }

});

const condensed = town => {
	return "box "+town.split(" ").join("").split("-").join("").split("/").join("").toLowerCase();
}

const SongItem = ({rank, year, artist, song, genre, youtube}) => {
	return (

		<div className={condensed(genre)}></div>

	)
}

class FullSong extends React.Component {
	render() {
		const { songs } = this.props
		return (
			<div className="boxes">
				{songs.map(
					(song, i) =>
						<SongItem
							key={i}
							rank={song.Rank} 
							year={song.Year} 
							artist={song.Artist}
							song={song.Song}
							genre={song.Genre}
							youtube={song.Youtube}/>
				)}
			</div>
		)
	}
}

export default class Table extends React.Component {

  createTable = (music) => {
    let table = []

    // Outer loop to create parent
    for (var k=2015; k>1984; k--) {
      let yearData = [];
      let children = [];
      //Inner loop to create children

      for (let j = 0; j < music.length; j++) {
        if (music[j].Year === k) {
        	//children.push(<td key={i+j+1}>d</td>)
        	yearData.push(music[j]);
        }
      }



      //Create the parent and add the children
      table.push(<FullSong songs={yearData}/>)
    }
    return table
  }


  render() {
    return(
      <table>
        {this.createTable(music)}
      </table>
    )
  }

}


ReactDOM.render(
	<div>
		<div id="chart"></div>
		<div id="main"></div>
		<Table />
	</div>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
