import styled from 'styled-components';

const ContentImage = styled.div.attrs({
  role: 'img',
})`
  display: flex;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    flex: 1;
    padding-top: ${({ ratio }) => 1 / ratio * 100}%;
    background-image: url(${({ image }) => image});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export default ContentImage;
