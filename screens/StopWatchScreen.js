import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ControlPanel } from '../StopWatch/ControlPanel';
import LapResults from '../StopWatch/LapResults';
import { displayTime } from '../StopWatch/DisplayTime';

const StopWatchScreen = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState([]);
  const timer = useRef(null);


  const handleLeftButtonPress = useCallback(() => {
    if (isRunning) {
      setResults((prevResults) => [time, ...prevResults]);
    } else {
      setResults([]);
      setTime(0);
    }
  }, [isRunning, time]);

  const handleRightButtonPress = useCallback(() => {
    if (!isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);

      timer.current = interval;
    } else {
      clearInterval(timer.current);
    }
    setIsRunning((prevState) => !prevState);
  }, [isRunning]);

  const handleGoBack = useCallback(() => {
    if (!isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 10);

      timer.current = interval;
    } else {
      clearInterval(timer.current);
    }
    setIsRunning((prevState) => !prevState);
  }, [isRunning]);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: 'black',
      }}
    >
      <View
        style={{
          width: '90%',
          alignItems: 'center',
          alignSelf: 'center',
          top: 20
        }}
      >
        <Text style={{ fontSize: 50, color: 'white' }}>
          {displayTime(time)}
        </Text>
      </View>
      <View>
        <ControlPanel
          isRunning={isRunning}
          handleLeftButtonPress={handleLeftButtonPress}
          handleRightButtonPress={handleRightButtonPress}
          handleGoBack={handleGoBack}
          handleCheckPoint={() => results[0] !== undefined || null ? setTime(results[0]) : alert('No CheckPoint')}
        />
      </View>
      <View>
        <LapResults
          results={results}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default StopWatchScreen;
