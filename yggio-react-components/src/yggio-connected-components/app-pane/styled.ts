import styled from 'styled-components';

const NotFoundNote = styled.p`
  color: #555;
  font-size: 20px;
  margin-top: 30%;
  text-align: center;
`;

const BackLink = styled.p`
  margin: 15px 0 15px 0;
  color: #004799;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: black;
    color: #002c5e;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  margin: 0 0 40px 0;
`;

interface AppIconProps {
  showBackground: boolean;
}

const AppIcon = styled.div<AppIconProps>`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px 0 0;
  flex-shrink: 0;
  background: ${({showBackground}) => (showBackground ? '#ddd' : 'none')};
`;

const TopMiddleSection = styled.div`
  flex-grow: 1;
`;

const TopRightSection = styled.div`
  width: 200px;
  height: 120px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AppName = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 2px 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AppTagline = styled.p`
  margin: 0;
  font-size: 13px;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
`;

const Heading = styled.p`
  font-size:  13px;
  font-weight: bold;
  color: #333;
  margin: 30px 0 8px 0;
`;

const Description = styled.p`
  font-size:  13px;
  margin: 0;
  line-height: 1.7;
  max-width: 800px;
`;

const ScreenshotsContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 0 0 30px 0;
  display: flex;
`;

const ScreenshotsLeftSection = styled.div`
  background: #eee;
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const ScreenshotsRightSection = styled.div`
  width: 140px;
  height: 100%;
  margin: 0 0 0 14px;
`;

const MiniScreenshot = styled.div`
  background: #eee;
  width: 100%;
  height: 60px;
  margin: 0 0 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SelectedScreenshotMarker = styled.div`
  width: 7px;
  height: 100%;;
  background: green;
  position: absolute;
  top:  0px;
  left: 0px;
`;

const Email = styled.p`
  margin: 0;
  font-size: 14px;
  font-style: italic;
`;

export {
  NotFoundNote,
  BackLink,
  TopContainer,
  AppIcon,
  TopMiddleSection,
  TopRightSection,
  AppName,
  AppTagline,
  TagsContainer,
  Heading,
  Description,
  ScreenshotsContainer,
  ScreenshotsLeftSection,
  ScreenshotsRightSection,
  SelectedScreenshotMarker,
  MiniScreenshot,
  Email,
};
