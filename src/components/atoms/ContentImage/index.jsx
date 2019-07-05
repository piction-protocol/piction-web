import styled from 'styled-components';

const ContentImage = styled.div.attrs({
  role: 'img',
})`
  display: flex;
  position: relative;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &::after {
    content: '';
    padding-top: ${({ ratio }) => 1 / ratio * 100}%;
  }
`;

export default ContentImage;
