import styled from "styled-components";

// colors
export const themeColors = {
    secondaryGrey: "#808080",
    secondaryDarkCerulean: "#005684",
    primaryLuckyPoint: "#1D2951",
    gridBorder: "#CEDCE3",
    primaryAccessibleBlack: "#00131A"
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

//tables
export const tableStyles = {border: `1px solid ${themeColors.gridBorder}`}