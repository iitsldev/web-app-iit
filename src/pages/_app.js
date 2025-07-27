import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import Image from 'next/image';
import iitImageLoader from '../../public/IIT-2.png';

import { store } from '../app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import '../styles/globals.css';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { useEffect } from 'react';
import { setIsPreLoadedToTrue } from '../slices/basketSlice';

const progress = new ProgressBar({
  size: 3,
  color: '#966304',
  className: '',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

const MyApp = ({ Component, pageProps }) => {
  const result = useSelector((state) => state.basket.isPreLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!result) {
      setTimeout(() => {
        dispatch(setIsPreLoadedToTrue());
      }, 1000);
    }
  }, [result]);

  return !result ? (
    <div className="preloaderWrapper">
      {/* <img
        className="d-block w-100 preLoader-max-width"
        src="/IIT-2.svg"
        alt="International Institue of Theravada"
      /> */}
      <Image
        src={iitImageLoader}
        alt="International Institue of Theravada"
        className="d-block w-100 preLoader-max-width"
        width={520}
      />
      <div className="loader">
        <div className="loading"></div>
      </div>
    </div>
  ) : (
    <div>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </div>
  );

  // return (
  //   <div className="preloaderWrapper">
  //     <Image
  //       src={iitImageLoader}
  //       alt="International Institue of Theravada"
  //       className="d-block w-100 preLoader-max-width"
  //       width={320}
  //       // height={500} automatically provided
  //       // blurDataURL="data:..." automatically provided
  //       // placeholder="blur" // Optional blur-up while loading
  //     />
  //     <h1>TESTING</h1>
  //     <div className="loader">
  //       <div className="loading"></div>
  //     </div>
  //   </div>
  // );
};

export default store.withRedux(MyApp);
