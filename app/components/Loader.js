import { useEffect } from 'react';


const Loader = () => {

  const setPreloader = (percentFrom, percentTo) => {
    const preloaderDiv = document.getElementById('preloader-div');
    preloaderDiv.style.width = `${percentFrom}%`;
    document.getElementById('preloader').style.display = 'block';

    const animation = preloaderDiv.animate([
      { width: `${percentFrom}%` },
      { width: `${percentTo}%` }
    ], {
      duration: 1000,
      fill: 'forwards'
    });

    animation.onfinish = () => {
      document.getElementById('preloader').style.display = 'none';
    };
  };

  const handlePageUnload = () => {
    setPreloader(0, 10);
  };

  const handlePageLoad = () => {
    setPreloader(10, 100);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handlePageUnload);
      document.addEventListener('DOMContentLoaded', handlePageLoad);

      handlePageLoad(); // Trigger on initial load

      return () => {
        window.removeEventListener('beforeunload', handlePageUnload);
        document.removeEventListener('DOMContentLoaded', handlePageLoad);
      };
    }
  }, []);

  return (
    <>
    <div id="preloader" style={{
      display: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '5px',
      zIndex: 9999
    }}>
      <div id="preloader-div">&nbsp;</div>
    </div>
    </>
  );
};

export default Loader;
