import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../assets/styles/slider.css';
import { Animated } from 'react-animated-css';

const ImageCarousel = ({ images = [], focusIn, home=false }) => {
  const [selected, setSelected] = useState('desktop');

  const filteredMobileImages = images.filter((image) => {
    return image.type !== 'desktop';
  });

  const filteredDesktopImages = images.filter((image) => {
    return image.type === 'desktop';
  });

  const createSlides = (imageList) => {
    return imageList.map((image, idx) => (
      <div key={idx}>
        <img
          src={image.image}
          className={image.type === 'desktop' ? 'image_desktop' : 'image_mobile'}
          alt={`Image ${idx}`}
        />
      </div>
    ));
  };

  const mobleSlides = createSlides(filteredMobileImages);
  const desktopSlides = createSlides(filteredDesktopImages);

  const sliderSettings = {
    dots: window.innerWidth > 968,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: selected === 'mobile' && window.innerWidth > 968 ? 3 : 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false, 
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleCar, setIsVisibleCar] = useState(false);
  const [isVisibleButtons, setIsVisibleButtons] = useState(false);
  const sectionRef = React.createRef();
  const carRef = React.createRef();
  const buttonsRef = React.createRef();

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else setIsVisible(false);
        });
      },
      { threshold: 0.1 }
    );

    sectionObserver.observe(sectionRef.current);

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleCar(true);
          } else setIsVisibleCar(false)
        });
      },
      { threshold: 0.1 }
    );

    sectionObserver.observe(carRef.current);

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisibleButtons(true);
          } else setIsVisibleButtons(false)
        });
      },
      { threshold: 0.1 }
    );

    sectionObserver.observe(buttonsRef.current);

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <div className='images_container container'>
      <div ref={sectionRef}>
      <Animated animationIn='fadeInDown' isVisible={isVisible}>
      {
        home ? (
          <h2 className="title_software">Solución Completa para la <span className="primary-purple">Gestión Veterinaria</span></h2> 
        ) : <h2 className='title_software'>Una manera simple de gestionar tu <span className="primary-purple">{focusIn}</span></h2>
      }
      <p className='descripton_software'>Todos nuestros productos están diseñados para ser usado desde diferentes dispositivos, ya sea de escritorio o móviles con un diseño intuitivo y optimizado para mejorar la eficiencia de tu negocio</p>
      </Animated>
      </div>
      <div className="buttons_container" ref={buttonsRef}>
        <Animated animationIn='fadeInUp' isVisible={isVisibleButtons}>
          <button
            className={selected === 'desktop' ? 'selection_button active' : 'selection_button'}
            onClick={() => setSelected('desktop')}
          >
            Escritorio
          </button>
          <button
            className={selected === 'mobile' ? 'selection_button active' : 'selection_button'}
            onClick={() => setSelected('mobile')}
          >
            Móvil
          </button>
        </Animated>
      </div>
      <div className='carouselContainer' ref={carRef} data-inviewport="scale-in">
          <Slider {...sliderSettings} >
            { selected === 'desktop' ? desktopSlides : mobleSlides }
          </Slider>
      </div>
    </div>
  );
};

export default ImageCarousel;