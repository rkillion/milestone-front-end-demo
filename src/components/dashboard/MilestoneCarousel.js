import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import styled from 'styled-components';
import Badge from '@mui/material/Badge';
import { CalendarDateDisplay, CaptionMedium, FlexRow, tableStyles, themeColors, Typography } from '../../styleExports';

export default function MilestoneCarousel({ milestones }) {
    return (
        <CarouselProvider
          naturalSlideWidth={3}
          naturalSlideHeight={1}
          totalSlides={milestones.length}
          visibleSlides={3}
        //   hasMasterSpinner={true} use this if you end up having images
          isIntrinsicHeight={true}
          style={{
                borderTop: tableStyles.border,
                borderRight: tableStyles.border,
                borderBottom: tableStyles.border,
              padding: "25px 20px 10px 40px",
              flexGrow: 2
          }}
        >
            <Slider style={{
                
            }}>
                {milestones.map((milestone,arrayIndex)=>{
                    return (
                        <Slide 
                            key={milestone.id} 
                            index={arrayIndex}
                            style={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <FlexRow style={{
                                alignItems: "center"
                            }}>
                                <StyledBadge badgeContent={milestone.action_required ? "!" : null}>
                                    <CalendarDateDisplay date={milestone.date}/>
                                </StyledBadge>
                                <CaptionMedium style={{
                                    paddingLeft: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    height: "70px"
                                }}>
                                    {milestone.title}
                                </CaptionMedium>
                            </FlexRow>
                        </Slide>
                    )
                })}
                {/* <Slide index={0} width="25"><Typography>I am the first Slide</Typography>.</Slide>
                <Slide index={1} width="25">I am the second Slide.</Slide>
                <Slide index={2} width="25">I am the third Slide.</Slide>
                <Slide index={3} width="25">I am the fourth Slide.</Slide>
                <Slide index={4} width="25">I am the fifth Slide.</Slide>
                <Slide index={5} width="25">I am the sixth Slide.</Slide> */}
            </Slider>
            <div style={{
                position: "relative",
                top: -35,
                zIndex: 0,
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-between"
            }}>
            <ButtonBack style={carouselButtonStyle("left")}><Typography style={buttonTypographyStyle}>{"<"}</Typography></ButtonBack>
            <ButtonNext style={carouselButtonStyle("right")}><Typography style={buttonTypographyStyle}>{">"}</Typography></ButtonNext>
            </div>
        </CarouselProvider>
    );
}

const carouselButtonStyle = (side) => {
    return {
    border: "0px",
    background: null,
    // shadow: null,
    backgroundColor: "white",
    zIndex: 2,
    position: "relative",
    left: side==="left" ? -40 : 0
}}

const buttonTypographyStyle = {
    // color: themeColors.primaryLuckyPoint,
    fontSize: 40,
    lineHeight: "0%",
    backgroundColor: null
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      color: "#FFFFFF",
      backgroundColor: themeColors.alertsBittersweet
    },
  }));
