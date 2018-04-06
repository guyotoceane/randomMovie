import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Picker,
  TextInput,
  Alert,
  Linking,
} from 'react-native';

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isStart: true,
      type: 'movie',
      count: 0,
      key: 'c2ad602e',
    };
  }

  componentDidMount() {}
  back = () => {
    this.setState({ isStart: true });
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
      'http://www.omdbapi.com/?apikey=' +
        this.state.key +
        '&i=tt' +
        this.stru(this.random(0, 1000000))
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isStart: false,
            isLoading: true,
            dataSource: responseJson,
            count: this.state.count + 1,
          },
          function() {
            if (responseJson.Response === 'False') {
              Alert.alert('Error database', responseJson.Error);
              this.setState({
                isStart: true,
              });
            } else if (
              responseJson.imdbRating === 'N/A' ||
              parseFloat(responseJson.imdbRating) <= 6.5 ||
              responseJson.Type != this.state.type
            ) {
              this.new();
            } else {
              this.setState({
                isLoading: false,
                count: 0,
              });
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
          <Text
            style={{ color: '#0B748B' }}
            onPress={() =>
              Linking.openURL('http://www.omdbapi.com/apikey.aspx')}>
            Generate a key for a better user experience
          </Text>
          <TextInput
            style={{ height: 40, width: 150 }}
            placeholder={this.state.key}
            onChangeText={key => this.setState({ key })}
          />
          <Picker
            style={{ width: 150 }}
            selectedValue={this.state.type}
            onValueChange={type => this.setState({ type: type })}>
            <Picker.Item label="Movie" value="movie" />
            <Picker.Item label="Serie" value="series" />
          </Picker>
          <Button
            style={{ width: 150 }}
            color="#0B748B"
            onPress={this.new}
            title={'Random ' + this.state.type}
          />

        </View>
      );
    } else if (this.state.isLoading) {
      return (
        <View style={ styles.center }>
          <ActivityIndicator />
          <Text style={{ textAlign : 'center' }}>
            Loading ... {this.state.count} {this.state.dataSource.ImdbID}
          </Text>
          <Button color="#0B748B" onPress={this.back} title="Back" />
        </View>
      );
    }

    return (
      <ScrollView style={{ flex: 1, paddingTop: 30 }}>
        <View style={styles.back}>
          <Button color="#0B748B" onPress={this.back} title="Back" />
        </View>

        <View style={styles.center}>

          <Button
            color="#0B748B"
            onPress={this.new}
            title={'Random ' + this.state.type}
          />

          <Text style={styles.title}>{this.state.dataSource.Title}</Text>
        </View>
        <View style={styles.paraGeneral}>
          <View>
            <Text style={styles.text}>Type : {this.state.dataSource.Type}</Text>
            <Text style={styles.text}>
              Rating : {this.state.dataSource.imdbRating}
            </Text>
            <Text style={styles.text}>Year : {this.state.dataSource.Year}</Text>
            <Text style={styles.text}>
              Genre : {this.state.dataSource.Genre}
            </Text>
          </View>
          <View>
            <Image
              style={styles.poster}
              source={{ uri: this.state.dataSource.Poster }}
            />
          </View>
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
    alignItems: 'center',
  },
  back: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  para: {
    paddingTop: 15,
  },
  paraGeneral: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  poster: {
    paddingTop: 15,
    paddingBottom: 100,
    width: 120,
    height: 180,
  },
});
