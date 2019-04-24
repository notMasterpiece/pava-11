import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const VDropzone = ({title, selectImage}) => {
    return (
        <div>
            <UploadWrap>
                {
                    title &&
                    <UploadName>
                        {title}
                    </UploadName>
                }
                <input
                    onChange={selectImage}
                    name={'avatar'}
                    type="file"
                />
            </UploadWrap>
        </div>
    );
};

const UploadName = styled.h2`
  font-size: 15px;
  margin-bottom: 8px;
`;
const UploadWrap = styled.div`
  
`;

VDropzone.defaultProps = {
    title: false,
};

VDropzone.propTypes = {
    selectImage: PropTypes.func.isRequired,
    title: PropTypes.any,
};

export default VDropzone;