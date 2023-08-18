import React, { useEffect, useState } from 'react'
import './Slider.scss'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { sliderData } from './Slider-data'

export const Slider = () => {
    const [currentSlider, setCurrentSlider] = useState(0)
    const sliderLength = sliderData.length
    const autoScroll = true;
    let slideInterval;

    const nextSlide = () => {
        setCurrentSlider(currentSlider === sliderLength - 1 ? 0 : currentSlider + 1)
    }

    const prevSlide = () => {
        setCurrentSlider(currentSlider === 0 ? sliderLength - 1 : currentSlider - 1)
    }

    useEffect(() => {
        setCurrentSlider(0)
    }, [])

    useEffect(() => {
        if (autoScroll) {
            const auto = () => {
                slideInterval = setInterval(nextSlide, 5000)
            }
            auto()
        }
        return () => clearInterval(slideInterval)
    }, [currentSlider, slideInterval, autoScroll])

    return (
        <div className='slider'>
            <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
            <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />

            {
                sliderData.map((slide, index) => {
                    const { image, heading, desc } = slide
                    return (
                        <div key={index} className={index === currentSlider ? 'slide current' : 'slide'}>
                            {
                                <>
                                    <img src={image} alt='slide' />
                                    <div className='content'>
                                        <h2>{heading}</h2>
                                        <p>{desc}</p>
                                        <hr />
                                        <a className='--btn --btn-primary' href='#product'>Shop Now</a>
                                    </div>
                                </>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
