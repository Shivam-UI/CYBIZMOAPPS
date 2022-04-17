import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Slider,
    TouchableOpacity,
} from 'react-native';

function pad(n, width, z = 0) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => ([
    pad(Math.floor(position / 60), 2),
    pad(position % 60, 2),
]);

const SeekBar = ({
    trackLength,
    currentPosition,
    onSeek,
    onSlidingStart,
}) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { color: '#000', fontWeight: '800', fontSize: 13 }]}>
                    {parseInt(currentPosition) === parseInt('-1') ? '0' : currentPosition}
                </Text>
                <View style={{ flex: 1 }} />
                <Text style={[styles.text, { width: 20, color: '#00ccff', fontWeight: 'bold', fontSize: 13 }]}>
                    {parseInt(trackLength === '' ? trackLength - 0 : trackLength - 1)}
                </Text>
            </View>
            <Slider
                maximumValue={Math.max(trackLength, 2, currentPosition + 1)}
                onSlidingStart={onSlidingStart}
                // onSlidingComplete={this.bind()}
                onValueChange={onSeek}
                value={currentPosition}
                minimumTrackTintColor={'#00ccff'}
                maximumTrackTintColor={'#aaa'}
                thumbStyle={styles.thumb}
                trackStyle={styles.track}
            />
        </View>
    );
};

export default SeekBar;

const styles = StyleSheet.create({
    slider: {
        marginTop: -12,
    },
    container: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 25,
    },
    track: {
        height: 5,
        borderRadius: 2,
    },
    thumb: {
        width: 15,
        height: 15,
        borderRadius: 5,
        backgroundColor: 'green',
    },
    text: {
        color: 'rgba(255, 255, 255, 0.72)',
        fontSize: 12,
        textAlign: 'center',
    }
});