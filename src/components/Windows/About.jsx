import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import WindowFrame from "./WindowFrame/WindowFrame";
import {
  focusAbout,
  blurAbout,
  minimizeAbout,
  exitAbout,
} from "../../store/actions/actions";
import aboutImage from "../../assets/taskbar-icons/about.png";
import Button from "../Button";
import windows from "../../assets/about-images/windows.png";

const StyledContainer = styled.div`
  padding: 15px;
  .images img {
    width: 80px;
    height: 90px;
  }
  .container {
    display: flex;
    .text {
      padding-left: 15px;
      flex: 2;
      line-height: 18px;
      a {
        text-decoration: underline;
        color: rgb(0, 0, 127);
      }
      h1 {
        font-size: 15px;
        margin: 0;
      }
    }
  }
  .button-container {
    padding-top: 15px;
    text-align: right;
  }
`;

function About({
  about,
  onAboutFocus,
  onAboutBlur,
  onAboutMinimize,
  onAboutExit,
}) {
  useEffect(() => {
    window.addEventListener("click", aboutBlur);
    return () => window.removeEventListener("click", aboutBlur);
    // eslint-disable-next-line
  }, []);

  function aboutBlur(event) {
    if (
      !document.querySelector("#About").contains(event.target) &&
      !document.querySelector("#about-button").contains(event.target)
    ) {
      onAboutBlur();
    } else {
      onAboutFocus();
    }
  }

  const displayContent = about.show ? (
    <WindowFrame
      id="About"
      x="140"
      y="100"
      width="400"
      height="285"
      img={aboutImage}
      title="About Windows"
      blurred={about.blurred}
      showMenu={false}
      onMinimize={onAboutMinimize}
      onExit={onAboutExit}
      isMinimized={about.minimized}
      initialX={500}
      initialY={120}
    >
      <StyledContainer>
        <div className="container">
          <div className="images">
            <img src={windows} alt="Windows" draggable="false" />
          </div>
          {/* <div className="text">
            Vinastalgia <br />
            <br />
            Built By:
            <a href="https://hanvdao.com/" target="_blank">
              Han Dao
            </a>
            <hr />
            "Vinastalgia" is an immersive digital space that is used as a
            platform for the showcasing of Vietnamese cultural toys and objects.
            The aim is to bring these items to life in a virtual environment
            through 3D visualizations, enabling users to explore their
            craftsmanship and design elements. In addition to the visuals,
            curated narratives and stories are provided, establishing an
            intimate connection with each item and offering a tangible and
            personal narrative experience. In the context of a rapidly evolving
            Vietnam, where nostalgic artifacts have been commercialized, the
            goal is to preserve and promote the rich cultural heritage by
            digitizing traditional items and making them accessible to a wider
            audience.
            <br />
          </div> */}
        </div>
        <div className="button-container">
          <Button pad="35" clicked={onAboutExit}>
            OK
          </Button>
        </div>
      </StyledContainer>
    </WindowFrame>
  ) : null;

  return displayContent;
}

const mapStateToProps = (state) => {
  return {
    about: state.about,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAboutBlur: () => dispatch(blurAbout()),
    onAboutFocus: () => dispatch(focusAbout()),
    onAboutMinimize: () => dispatch(minimizeAbout()),
    onAboutExit: () => dispatch(exitAbout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
