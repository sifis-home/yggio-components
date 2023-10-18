import React, {useEffect} from 'react';
import {eq} from 'lodash/fp';
import {
  CSSTransition,
} from 'react-transition-group';
import {
  ImagePreviewContainer,
  ImagePreview,
  ImagePreviewCloser, ImagePreviewMetaData,
} from './styled';

/**
 *
 * @param file
 * @param src
 * @param alt
 * @param show
 * @param toggle
 * @returns {*}
 * @constructor
 */
const ImagePreviewer = (
  {
    file,
    src,
    alt,
    show,
    toggle,
  }
) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  /**
   * Close image previewer with ESC key
   * @param keyCode
   */
  const handleKeyPress = ({keyCode}) => {
    if (show && eq(keyCode, 27)) {
      toggle();
    }
  };

  /**
   * Render image previewer
   * @param state
   * @returns {*}
   */
  const renderPreviewer = state => {
    // Convert to KiloByte
    const base = 1024 ** 1;
    const fileSize = file && file.size
      ? (file.size / base).toFixed(2)
      : 0;

    return (
      <ImagePreviewContainer
        onClick={() => toggle()}
        state={state}
      >
        <ImagePreviewCloser
          onClick={evt => {
            evt.stopPropagation();
            toggle();
          }}
        >
          ✕
        </ImagePreviewCloser>
        <ImagePreviewMetaData>
          <span>{file && file.name}</span>
          <span>{fileSize}KB</span>
        </ImagePreviewMetaData>
        <ImagePreview
          onClick={evt => evt.stopPropagation()}
          src={src}
          alt={alt}
        />
      </ImagePreviewContainer>
    );
  };

  return (
    <CSSTransition
      in={show}
      timeout={200}
      unmountOnExit
      mountOnEnter
    >
      {renderPreviewer}
    </CSSTransition>
  );
};

export default ImagePreviewer;
