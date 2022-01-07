import styled from "styled-components";

// colors
export const themeColors = {
    secondaryGrey: "#808080",
    secondaryDarkCerulean: "#005684",
    primaryLuckyPoint: "#1D2951",
    gridBorder: "#CEDCE3",
    primaryAccessibleBlack: "#00131A",
    secondaryPattensBlue: "#d2e7f2",
    alertsBittersweet: "#FF5B5B",
    primaryDarkCyan: "#099699"
}

//typography
export const HFourBold = styled.span`
    padding: 20px;
    font-family: Quicksand;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    color: ${themeColors.secondaryDarkCerulean};
`

export const HFiveMedium = styled.span`
    font-family: Quicksand;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
`

export const SubheadingMedium = styled.span`
    font-family: Quicksand;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    color: ${themeColors.primaryAccessibleBlack}
`

export const ParagraphMedium = styled.span`
    font-family: Quicksand;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 120%;
`

export const DisclaimerBold = styled.span`
    font-family: Quicksand;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
`
export const CaptionMedium = styled.span`
    font-family: Quicksand;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: ${themeColors.primaryAccessibleBlack}
`

export const Typography = styled.span`
    font-family: Quicksand;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 120%;
`

export const InternalLink = styled.span`
    color: ${themeColors.secondaryDarkCerulean};
    &:hover {
        color: ${themeColors.primaryLuckyPoint}
    };
    cursor: pointer
`

//sections
export const PageSection = styled.div`
    margin: 20px;
`

export const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`

//tables
export const tableStyles = {border: `1px solid ${themeColors.gridBorder}`}

//dates

export function CalendarDateDisplay({ date }) {
    return (
        <FlexColumn style={{
            width: "52px"
        }}>
            <DisclaimerBold style={{
                padding: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#FFFFFF",
                backgroundColor: themeColors.secondaryDarkCerulean,
                borderRadius: "4px 4px 0px 0px"
            }}>
                {shortMonths[date.getMonth()].toUpperCase()}
            </DisclaimerBold>
            <HFiveMedium style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: themeColors.primaryAccessibleBlack,
                border: `1px solid ${themeColors.secondaryPattensBlue}`,
                borderTop: "0px",
                borderRadius: "0px 0px 4px 4px"
            }}>
                {date.getDate()}
            </HFiveMedium>
        </FlexColumn>
    )
}
export const shortMonths = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];