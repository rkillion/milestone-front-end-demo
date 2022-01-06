import { flexbox } from '@mui/system';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Typography } from '../../styleExports';

export default function MilestoneCarousel() {
    return (
        <CarouselProvider
          naturalSlideWidth={8}
          naturalSlideHeight={2}
          totalSlides={6}
          visibleSlides={3}
        //   hasMasterSpinner={true} use this if you end up having images
          isIntrinsicHeight={false}
          style={{
              padding: "20px",
              flexGrow: 2
          }}
        >
            <Slider>
                <Slide index={0} width="25"><Typography>I am the first Slide</Typography>.</Slide>
                <Slide index={1} width="25">I am the second Slide.</Slide>
                <Slide index={2} width="25">I am the third Slide.</Slide>
                <Slide index={3} width="25">I am the fourth Slide.</Slide>
                <Slide index={4} width="25">I am the fifth Slide.</Slide>
                <Slide index={5} width="25">I am the sixth Slide.</Slide>
            </Slider>
            <div style={{
                position: "relative",
                top: -20,
                zIndex: 1,
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-between"
            }}>
            <ButtonBack style={carouselButtonStyle}>{"<"}</ButtonBack>
            <ButtonNext style={carouselButtonStyle}>{">"}</ButtonNext>
            </div>
        </CarouselProvider>
    );
}

const carouselButtonStyle = {
    border: "0px",
    backGround: "white",
    shadow: null,
    backgroundColor: "white"
}
