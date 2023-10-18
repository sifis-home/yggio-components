import styled from 'styled-components';

const InteractiveLayerContainer = styled.div`
width: 100%;
height: 100%;
position: relative;
user-select: none;
cursor: ${({position}) => (position ? 'grabbing' : 'default')};
`;

export {
  InteractiveLayerContainer,
};
