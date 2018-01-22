// Import class Component from React
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Axios from 'axios';

import AlbumDetail from './AlbumDetail';

// Class Component (lifecycle methods)
class AlbumList extends Component {

    state = { albums: [] };

    componentWillMount() {
        Axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        .then(response => this.setState({ albums: response.data }));
    }

    renderAbums() {
        return this.state.albums.map(album => 
            <AlbumDetail key={album.title} album={album} />
        );
    }

    render() { 
        console.log(this.state);

        return (
            <ScrollView>
                {this.renderAbums()}
            </ScrollView>
        );
    }
}

export default AlbumList;
