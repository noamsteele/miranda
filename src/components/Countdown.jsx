import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isArrived: false
  });

  useEffect(() => {
    // Target date: January 1, 2027
    const targetDate = new Date('2027-01-01T00:00:00');

    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isArrived: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isArrived: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-container">
      <div className="countdown-header">
        <span className="accent-tag">The Next Big Chapter</span>
        <h3>Amsterdam Adventure</h3>
        <p className="countdown-subtitle">Target: January 1, 2027 ✈️🇳🇱</p>
      </div>
      
      {timeLeft.isArrived ? (
        <div className="arrival-msg animate-pulse">
          🎉 The Amsterdam Adventure is here! 🇳🇱✨
        </div>
      ) : (
        <div className="timer-grid">
          <div className="timer-card">
            <span className="timer-val">{timeLeft.days}</span>
            <span className="timer-label">Days</span>
          </div>
          <div className="timer-card">
            <span className="timer-val">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="timer-label">Hours</span>
          </div>
          <div className="timer-card">
            <span className="timer-val">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="timer-label">Mins</span>
          </div>
          <div className="timer-card">
            <span className="timer-val className='text-accent'">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="timer-label">Secs</span>
          </div>
        </div>
      )}
      <div className="countdown-footer">
        <p>"Because you're the only person I'd alter my life path for."</p>
      </div>
    </div>
  );
}
