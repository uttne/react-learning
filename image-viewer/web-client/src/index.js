import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessCount: 0,
      isUpdate: false,
    };
  }
  render() {
    const srcUrl =
      "https://localhost:5001/image/data.png?" + this.state.accessCount;
    return (
      <div className="image-view">
        <div>
          <img src={srcUrl} alt="view data" />
        </div>
        <div>
          <button onClick={() => this.updateImage()}>
            update {this.state.accessCount}
          </button>
          <button onClick={() => this.startUpdate()}>start</button>

          <button onClick={() => this.stopUpdate()}>stop</button>
        </div>
      </div>
    );
  }
  updateImage() {
    const accessCount = this.state.accessCount + 1;
    this.setState({ accessCount: accessCount });
  }
  startUpdate() {
    this.setState({ isUpdate: true });

    this.timer = setInterval(() => {
      this.updateImage();
    }, 50);
  }
  stopUpdate() {
    this.setState({ isUpdate: false });
    clearInterval(this.timer);
  }
  componentWillUnmount() {
    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:

    clearInterval(this.timer);
  }

  componentDidMount() {
    // componentDidMount is called by react when the component
    // has been rendered on the page. We can set the interval here:
    if (this.state.isUpdate === false) {
      return;
    }
    this.timer = setInterval(() => {
      this.updateImage();
    }, 50);
  }
}

// ========================================

ReactDOM.render(<ImageView />, document.getElementById("root"));
