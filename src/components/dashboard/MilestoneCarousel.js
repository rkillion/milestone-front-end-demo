import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import styled from 'styled-components';
import Badge from '@mui/material/Badge';
import { CalendarDateDisplay, CaptionMedium, FlexRow, tableStyles, themeColors, Typography } from '../../styleExports';
import { useEffect, useState } from 'react';
import { style } from '@mui/system';

export default function MilestoneCarousel({ milestones }) {
     //the width of the slides needs to get steadily larger/smaller as the screen expands, retracts, then jump when the slide number changes

    const [clientWidth,setClientWidth] = useState(window.innerWidth);
    function getSlideNum() {
        let [num,min,max] = [0,0,0];
        if (clientWidth>=660) {
            num = 1;
            min = 3.5;
            max = 6;
        }
        if (clientWidth>=835) {
            num=2;
            min = 3;
            max = 4;
        }
        if (clientWidth>=1010) {
            num=3;
        }
        return [num,min,max];
    }

    let [slideNum, minSlideWidth, maxSlideWidth] = getSlideNum();
    let breakWidth = Math.min(660+((slideNum-1)*175),1185)
    let slideWidth = clientWidth>=1185 ? 4 : minSlideWidth+(((clientWidth-breakWidth)/175)*(maxSlideWidth-minSlideWidth));
    if (clientWidth<660) {
        slideNum = 1;
        slideWidth = 3.5;
    }

    function debounce(fn, ms) { //a function for clearing and applying a timer- used to reset the variable in state for the window size
        let timer
        return () => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            timer = null
            fn.apply(this, arguments)
          }, ms)
        };
      }
    //   console.log(clientWidth);
    useEffect(()=>{
        const debouncedHandleResize = debounce(function handleResize() {
                setClientWidth(window.innerWidth)
            }, 50)
      
          window.addEventListener('resize', debouncedHandleResize)
      
          return () => {
            window.removeEventListener('resize', debouncedHandleResize);   
          }
    },[]);

    return (
        <CarouselProvider
          naturalSlideWidth={slideWidth}
          naturalSlideHeight={1}
          totalSlides={milestones.length}
          visibleSlides={slideNum}
        //   hasMasterSpinner={true} use this if you end up having images
          isIntrinsicHeight={false}
          style={{
                borderTop: tableStyles.border,
                borderRight: tableStyles.border,
                borderBottom: tableStyles.border,
              padding: "25px 20px 10px 40px",
              flexGrow: 2
          }}
        >
            <Slider style={{
                // width: "100%"
            }}>
                {milestones.map((milestone,arrayIndex)=>{
                    return (
                        <Slide 
                            key={milestone.id} 
                            index={arrayIndex}
                            style={{
                                // width: "100%",
                                display: "flex",
                                flexFlow: "row nowrap",
                                alignItems: "center",
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
            </Slider>
            <div style={{
                position: "relative",
                top: -35,
                zIndex: 0,
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-between"
            }}>
            <ButtonBack style={carouselButtonStyle("left",clientWidth)}><Typography style={buttonTypographyStyle}>{"<"}</Typography></ButtonBack>
            <ButtonNext style={carouselButtonStyle("right",clientWidth)}><Typography style={buttonTypographyStyle}>{">"}</Typography></ButtonNext>
            </div>
        </CarouselProvider>
    );
}

const carouselButtonStyle = (side,clientWidth) => {
    let styleConfig = {
        border: "0px",
        background: null,
        backgroundColor: "white",
        zIndex: 2
    }
    if (clientWidth<660) {
        styleConfig.position = "relative";
        styleConfig.left = side==="left" ? -40 : 0;
    } else {
        styleConfig.position= "fixed";
        styleConfig.top= 180;
        styleConfig.left= side==="left" ? 295 : Math.min(1185-125,Math.max(660-125,clientWidth-125))
    }
    return styleConfig
}

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
