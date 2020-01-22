import {
  getMinMediaQueries,
  getExclusiveMediaQueries,
  mergeResponsiveCSS,
  isCSSinOrder,
  responsiveMargin,
  responsivePadding,
  responsiveWidth,
  responsiveHeight,
  responsiveTextAlign
} from "./css";

describe("getMinMediaQueries", () => {
  it("no breakpoints", () => {
    expect(getMinMediaQueries(undefined)).toStrictEqual({});
    expect(getMinMediaQueries({})).toStrictEqual({});
  });

  it("5 breakpoints", () => {
    expect(
      getMinMediaQueries({
        xs: "380px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px"
      })
    ).toStrictEqual({
      xs: "@media (min-width: 380px)",
      sm: "@media (min-width: 576px)",
      md: "@media (min-width: 768px)",
      lg: "@media (min-width: 992px)",
      xl: "@media (min-width: 1200px)"
    });
  });
});

describe("getExclusiveMediaQueries", () => {
  it("0 breakpoints", () => {
    expect(getExclusiveMediaQueries(undefined)).toStrictEqual({});
    expect(getExclusiveMediaQueries({})).toStrictEqual({});
  });

  it("1 breakpoint", () => {
    expect(
      getExclusiveMediaQueries({
        md: "768px"
      })
    ).toStrictEqual({
      default: "(max-width: 767px)",
      md: "(min-width: 768px)"
    });
  });

  it("> 1 breakpoint", () => {
    expect(
      getExclusiveMediaQueries({
        xs: "380px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px"
      })
    ).toStrictEqual({
      default: "(max-width: 379px)",
      xs: "(min-width: 380px) and (max-width: 575px)",
      sm: "(min-width: 576px) and (max-width: 767px)",
      md: "(min-width: 768px) and (max-width: 991px)",
      lg: "(min-width: 992px) and (max-width: 1199px)",
      xl: "(min-width: 1200px)"
    });
  });
});

describe("mergeResponsiveCSS", () => {
  it("merges media queries", () => {
    expect(
      mergeResponsiveCSS(
        {
          margin: "4px",
          "@media (min-width: 576px)": {
            maxWidth: "540px",
            marginLeft: "auto",
            marginRight: "auto"
          }
        },
        {
          padding: "12px",
          margin: "0px",
          "@media (min-width: 576px)": {
            padding: "0px"
          },
          "@media (min-width: 768px)": {
            margin: "32px",
            padding: "16px 48px"
          }
        }
      )
    ).toStrictEqual({
      margin: "0px",
      padding: "12px",
      "@media (min-width: 576px)": {
        maxWidth: "540px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "0px"
      },
      "@media (min-width: 768px)": {
        margin: "32px",
        padding: "16px 48px"
      }
    });
  });
});

describe("isCSSinOrder", () => {
  it("in order - only default css", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        fontSize: "14px",
        height: "12px"
      })
    ).toBe(true);
  });

  it("in order - only media queries", () => {
    expect(
      isCSSinOrder({
        "@media (min-width: 380px)": {
          height: "24px"
        },
        "@media (min-width: 768px)": {
          fontSize: "21px"
        },
        "@media (min-width: 1200px)": {
          height: "200px"
        }
      })
    ).toBe(true);
  });

  it("in order - default css and media queries", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        height: "12px",
        "@media (min-width: 380px)": {
          height: "24px"
        },
        "@media (min-width: 576px)": {
          width: "100px",
          height: "24px"
        },
        "@media (min-width: 768px)": {
          fontSize: "21px"
        },
        "@media (min-width: 992px)": {},
        "@media (min-width: 1200px)": {
          height: "200px"
        }
      })
    ).toBe(true);
  });

  it("not in order - default css after media queries", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        "@media (min-width: 380px)": {
          height: "24px"
        },
        "@media (min-width: 576px)": {
          width: "100px",
          height: "24px"
        },
        "@media (min-width: 768px)": {
          fontSize: "21px"
        },
        height: "12px",
        "@media (min-width: 992px)": {},
        "@media (min-width: 1200px)": {
          height: "200px"
        }
      })
    ).toBe(false);
  });

  it("not in order - media queries not in ascending order", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        height: "12px",
        "@media (min-width: 380px)": {
          height: "24px"
        },
        "@media (min-width: 576px)": {
          width: "100px",
          height: "24px"
        },
        "@media (min-width: 992px)": {},
        "@media (min-width: 768px)": {
          fontSize: "21px"
        },
        "@media (min-width: 1200px)": {
          height: "200px"
        }
      })
    ).toBe(false);
  });
});

describe("responsiveMargin", () => {
  it("valid margin", () => {
    expect(responsiveMargin({ margin: "4 -5 1 -8" })).toStrictEqual({
      margin: "16px -20px 4px -32px"
    });
  });

  it("invalid margin", () => {
    expect(responsiveMargin({ margin: "" })).toStrictEqual({});
  });
});

describe("responsivePadding", () => {
  it("valid padding", () => {
    expect(responsivePadding({ padding: "1" })).toStrictEqual({
      padding: "4px"
    });
  });

  it("invalid padding", () => {
    expect(responsivePadding({ padding: true })).toStrictEqual({});
  });
});

describe("responsiveWidth", () => {
  it("valid width", () => {
    expect(responsiveWidth({ width: "12" })).toStrictEqual({
      width: "56px"
    });
    expect(responsiveWidth({ width: "auto" })).toStrictEqual({
      width: "auto"
    });
    expect(responsiveWidth({ width: "100%" })).toStrictEqual({
      width: "100%"
    });
  });

  it("invalid width", () => {
    expect(responsiveWidth({ width: "" })).toStrictEqual({});
  });
});

describe("responsiveHeight", () => {
  it("valid height", () => {
    expect(responsiveHeight({ height: "12" })).toStrictEqual({
      height: "56px"
    });
    expect(responsiveHeight({ height: "auto" })).toStrictEqual({
      height: "auto"
    });
    expect(responsiveHeight({ height: "100%" })).toStrictEqual({
      height: "100%"
    });
  });

  it("invalid height", () => {
    expect(responsiveHeight({ height: "" })).toStrictEqual({});
  });
});

describe("responsiveTextAlign", () => {
  it("valid textAlign", () => {
    expect(responsiveTextAlign({ textAlign: "inherit" })).toStrictEqual({
      textAlign: "inherit"
    });
    expect(responsiveTextAlign({ textAlign: "left" })).toStrictEqual({
      textAlign: "left"
    });
    expect(responsiveTextAlign({ textAlign: "center" })).toStrictEqual({
      textAlign: "center"
    });
    expect(responsiveTextAlign({ textAlign: "right" })).toStrictEqual({
      textAlign: "right"
    });
  });

  it("invalid textAlign", () => {
    expect(responsiveTextAlign({ textAlign: "bottom" })).toStrictEqual({});
  });
});
