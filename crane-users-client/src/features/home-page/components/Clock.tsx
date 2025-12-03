import { useState, useEffect } from 'react';

const useCurrentTime = (): string => {
  const formatTime = (date: Date): string => {

    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hourCycle: 'h23' 
    });
  };

  const [currentTime, setCurrentTime] = useState<string>(() => formatTime(new Date()));

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(timerId);
  }, []); 

  return currentTime;
};

const Clock = () => {
  const time = useCurrentTime();

  return (
    <div className="row">
        <div className="col s12">
            <div className="card blue-grey darken-1">
                <div className="white-text">
                <h1>{time}</h1>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Clock;

