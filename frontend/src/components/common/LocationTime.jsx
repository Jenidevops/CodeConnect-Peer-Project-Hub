import { useState, useEffect } from 'react';
import { FiMapPin, FiClock } from 'react-icons/fi';

const LocationTime = () => {
  const [location, setLocation] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocoding using a free API
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            setLocation({
              city: data.city || data.locality,
              country: data.countryName,
              countryCode: data.countryCode
            });
          } catch (error) {
            console.error('Error getting location:', error);
            setLocation({ city: 'Unknown', country: '' });
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocation({ city: 'Location disabled', country: '' });
          setLoading(false);
        }
      );
    } else {
      setLocation({ city: 'Not supported', country: '' });
      setLoading(false);
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-dark-400">
        <div className="flex items-center space-x-1">
          <FiMapPin className="text-base" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 text-sm">
      {/* Location */}
      {location && (
        <div className="flex items-center space-x-1 text-gray-600 dark:text-dark-300">
          <FiMapPin className="text-base text-primary-500" />
          <span className="font-medium">
            {location.city}
            {location.country && `, ${location.countryCode || location.country}`}
          </span>
        </div>
      )}

      {/* Time */}
      <div className="flex items-center space-x-1 text-gray-600 dark:text-dark-300">
        <FiClock className="text-base text-primary-500" />
        <span className="font-mono font-medium">
          {formatTime(currentTime)}
        </span>
      </div>
    </div>
  );
};

export default LocationTime;
