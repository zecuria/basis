import React, { useMemo } from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useListType, { ListTypeProvider } from "../hooks/useListType";
import useTextStyle, { TextStyleProvider } from "../hooks/useTextStyle";
import {
  responsiveMarginType,
  responsivePropType,
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { mergeProps } from "../utils/component";
import { responsiveMargin } from "../utils/css";

const TYPES = ["unordered", "ordered", "steps"];
const VARIANTS = ["default", "danger"];
const TEXT_STYLES = ["subtitle1", "subtitle2", "body1", "body2"];

const DEFAULT_PROPS = {
  type: "unordered",
  variant: "default",
  textStyle: "body1",
};

List.TYPES = TYPES;
List.VARIANTS = VARIANTS;
List.TEXT_STYLES = TEXT_STYLES;
List.DEFAULT_PROPS = DEFAULT_PROPS;

function Item({ children, testId }) {
  const theme = useTheme();
  const { type, variant } = useListType();
  const { textStyle } = useTextStyle();

  return (
    <li
      css={{
        ...theme[`listItem.${type}`],
        ...theme[`listItem.${type}.${textStyle}`],
        "::before": {
          ...theme[`listItem.${type}::before`],
          ...theme[`listItem.${type}.${variant}::before`],
        },
        "& ul, & ol": theme[`list.${type}.nested`],
        "& ol li::before": theme[`listItem.${type}.nested::before`],
        "& ol ol": theme[`list.${type}.nested.nested`],
        "& ol ol li::before": theme[`listItem.${type}.nested.nested::before`],
      }}
      data-testid={testId}
    >
      {children}
    </li>
  );
}

Item.propTypes = {
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

function List(props) {
  const theme = useTheme();
  const {
    type: inheritedListType,
    variant: inheritedVariantType,
  } = useListType();
  const { textStyle: inheritedTextStyle } = useTextStyle();
  const inheritedProps = {
    type: inheritedListType,
    variant: inheritedVariantType,
    textStyle: inheritedTextStyle,
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    type: (type) => TYPES.includes(type),
    variant: (variant) => VARIANTS.includes(variant),
    textStyle: (textStyle) => TEXT_STYLES.includes(textStyle),
  });
  const { type, variant, textStyle, children, testId } = mergedProps;
  const listInfo = useMemo(
    () => ({
      type,
      variant,
    }),
    [type, variant]
  );
  const responsivePropsCSS = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    margin: responsiveMargin,
  });
  const ListComponent = type === "unordered" ? "ul" : "ol";
  const items = React.Children.toArray(children).filter(
    // Ignore all children that aren't List.Item
    (child) => child.type === Item
  );

  let list = (
    <ListComponent
      css={{
        ...theme.list,
        ...theme[`list.${type}`],
        ...theme.getTextStyleCSS(textStyle),
        ...responsivePropsCSS,
      }}
      data-testid={testId}
    >
      {items}
    </ListComponent>
  );

  if (textStyle) {
    list = <TextStyleProvider value={textStyle}>{list}</TextStyleProvider>;
  }

  return <ListTypeProvider value={listInfo}>{list}</ListTypeProvider>;
}

List.propTypes = {
  ...responsiveMarginType,
  ...responsivePropType("textStyle", PropTypes.oneOf(TEXT_STYLES)),
  type: PropTypes.oneOf(TYPES),
  variant: PropTypes.oneOf(VARIANTS),
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

List.Item = Item;

export default List;
