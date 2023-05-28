import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import WindowFrame from "./WindowFrame/WindowFrame";
import {
  focusNotepad,
  blurNotepad,
  minimizeNotepad,
  exitNotepad,
} from "../../store/actions/actions";
import notepadImage from "../../assets/taskbar-icons/notepad.png";

const images = [
  "https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_750/f_auto,q_auto/v1649720751/Web_Assets/blog/Mario_1/Mario_1-gif?_i=AA",
  "https://i.pinimg.com/originals/4c/ba/be/4cbabe0e15b50dce0730e5b6564c6b1d.gif",
  "https://64.media.tumblr.com/b4a256c22cedaf9cd20f077e442f26aa/tumblr_pmd5ls6T251xvlbmno2_500.gif",
  "https://thumbs.gfycat.com/BlandThinGermanwirehairedpointer-max-1mb.gif",
  // Add more image URLs as needed
];

function MediaPlayer({
  mediaPlayer,
  onNotepadFocus,
  onNotepadBlur,
  onNotepadMinimize,
  onNotepadExit,
}) {
  const inputRef = React.createRef();

  useEffect(() => {
    // window.addEventListener("click", notepadBlur);
    // inputRef.current.focus();
    // return () => window.removeEventListener("click", notepadBlur);
  }, []);

  //   function notepadBlur(event) {
  //     if (
  //       !document.querySelector("#MediaPlayer").contains(event.target) &&
  //       !document.querySelector("#notepad-button").contains(event.target)
  //     ) {
  //       onNotepadBlur();
  //     } else {
  //       onNotepadFocus();
  //     }
  //   }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 5 seconds (adjust as needed)

    return () => clearInterval(timer);
  }, [images.length]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const displayContent = mediaPlayer.show ? (
    <WindowFrame
      id="MediaPlayer"
      initialX={window.innerWidth * 0.7}
      initialY={450}
      width="350"
      height="200"
      img={notepadImage}
      title="Untitled - Notepad"
      blurred={mediaPlayer.blurred}
      //   showMenu={true}
      //   onMinimize={onNotepadMinimize}
      //   onExit={onNotepadExit}
      onMinimize={() => {}}
      onExit={() => {}}
      isMinimized={mediaPlayer.minimized}
    >
      <img
        style={{ objectFit: "contain", width: "100%" }}
        src={images[currentImageIndex]}
      />
    </WindowFrame>
  ) : null;

  return displayContent;
}

const mapStateToProps = (state) => {
  return {
    mediaPlayer: state.mediaPlayer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNotepadBlur: () => dispatch(blurNotepad()),
    onNotepadFocus: () => dispatch(focusNotepad()),
    onNotepadMinimize: () => dispatch(minimizeNotepad()),
    onNotepadExit: () => dispatch(exitNotepad()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer);
