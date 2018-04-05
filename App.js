import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Picker
} from 'react-native';

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      isStart:true,
      type:'movie',
      count: 0,
    };
  }

  componentDidMount() {
    
  }
  back = () => {
    this.setState({isStart: true});
  };
  
  random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  stru = num => {
    var str = '' + num;
    var frmt = '0000000';
    return frmt.substring(0, frmt.length - str.length) + str;
  };

  new = () => {
    
    fetch(
      'http://www.omdbapi.com/?apikey=d59b6cb9&i=tt' +
        this.stru(this.random(0, 1000000))
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isStart: false,
            isLoading: true,
            dataSource: responseJson,
            count: this.state.count+1,
          },
          function() {
            if(responseJson.imdbRating === "N/A" || parseFloat(responseJson.imdbRating)<=6.5 || responseJson.Type != this.state.type ){
              this.new();
            } else{
              this.setState(
                {
                  isLoading: false,
                  count: 0,
                })
            }
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {

if (this.state.isStart) {
      return (
        <View style={styles.center}>
        <Picker
            style={{width: 200}} 
            selectedValue={this.state.type}
            onValueChange={(type) => this.setState({type: type})}>
            <Picker.Item label="Movie" value="movie" /> 
            <Picker.Item label="Serie" value="series" />
          </Picker>
          <Button onPress={this.new} title={'Random ' + this.state.type} />
        </View>
      );
    }else if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
           <Text style={styles.text}>Number test : {this.state.count}</Text>
        </View>
      );
    }

    return (
      <ScrollView style={{ flex: 1, paddingTop: 30 }}>

        <View style={styles.center}>
         <Button onPress={this.back} title="Back" />
          <Button onPress={this.new} title={'Random ' + this.state.type} />
          <View style={styles.para}>
              <Image
              style={styles.poster}
              source={{uri: this.state.dataSource.Poster}}
            />
          </View>
          <Text style={styles.title}>{this.state.dataSource.Title}</Text>
        </View>
        <View style={styles.para}>
          <Text style={styles.text}>Type : {this.state.dataSource.Type}</Text>
          <Text style={styles.text}>Rating : {this.state.dataSource.imdbRating}</Text>
          <Text style={styles.text}>Year : {this.state.dataSource.Year}</Text>
          <Text style={styles.text}>Genre : {this.state.dataSource.Genre}</Text>
        </View>
        <View style={styles.para}>
          <Text style={styles.text}>
            Director : {this.state.dataSource.Director}
          </Text>
          <Text style={styles.text}>
            Writer : {this.state.dataSource.Writer}
          </Text>
          <Text style={styles.text}>
            Actors : {this.state.dataSource.Actors}
          </Text>
        </View>
        <View style={styles.para}>
          <Text style={styles.text}>Plot : {this.state.dataSource.Plot}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#e1395a',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  para: {
    paddingTop: 15,
  },
  poster: {
    paddingTop: 15,
    paddingBottom: 100,
    width: 120, 
    height: 180
  },
});