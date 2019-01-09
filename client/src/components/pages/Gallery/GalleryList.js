import React, {Component} from 'react';
import GalleryItemWrap from './GalleryItem';

class GalleryList extends Component {


    render() {
        const {gallery} = this.props;
        debugger

        return (
            <div className="body p-b-0">
                <div id="aniimated-thumbnials" className="list-unstyled row clearfix">

                    {
                        gallery.map(g => <GalleryItemWrap key={g.date} item={g} /> )
                    }

                </div>
            </div>
        );
    }
}

export default GalleryList;
