import React from 'react';
import moment from 'moment';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' };

class GalleryItemWrap extends React.Component {

    render() {
        const {item} = this.props;
        const {date, images} = item;

        const childElements = images.map(function(element){
            return (
                <li className="image-element-class">
                    <a href={element}><img src={element} /></a>
                </li>
            );
        });

        return (
            <div className='gallery-item'>
                <time><strong>Дата створення: </strong>{date}</time>
                <Masonry
                    className={'my-gallery-class'} // default ''
                    elementType={'ul'} // default 'div'
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    imagesLoadedOptions={imagesLoadedOptions} // default {}
                >
                    {childElements}
                </Masonry>
            </div>
        );
    }
}

export default GalleryItemWrap;
