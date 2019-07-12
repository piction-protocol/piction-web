import styled from 'styled-components';

const ContentImage = styled.div.attrs({
  role: 'img',
})`
  display: flex;
  position: relative;
  overflow: hidden;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &::after {
    content: '';
    flex: 1;
    padding-top: ${({ ratio }) => 1 / ratio * 100}%;
  }
`;

export default ContentImage;
