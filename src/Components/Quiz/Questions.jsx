import React from 'react';

class Questions extends React.Component {
  render() {
    return (
      <>
        <div className="container-answers">
          <div className="row-left-ans">
            <button
              type="button"
              disabled={this.props.styleInfo.buttonDisabled}
              onClick={() => {
                this.props.onClickCheck(1);
              }}
              className={this.props.styleInfo.styleAns1}
              style={{ marginRight: '5%' }}
            >
              {this.props.question.respuestas.ans1}
            </button>

            <button
              type="button"
              disabled={this.props.styleInfo.buttonDisabled}
              onClick={() => {
                this.props.onClickCheck(3);
              }}
              className={this.props.styleInfo.styleAns3}
              style={{ marginRight: '5%' }}
            >
              {this.props.question.respuestas.ans3}
            </button>
          </div>
          <div className="row-right-ans">
            <button
              type="button"
              disabled={this.props.styleInfo.buttonDisabled}
              onClick={() => {
                this.props.onClickCheck(2);
              }}
              className={this.props.styleInfo.styleAns2}
              style={{ marginLeft: '5%' }}
            >
              {this.props.question.respuestas.ans2}
            </button>
            <button
              type="button"
              disabled={this.props.styleInfo.buttonDisabled}
              onClick={() => {
                this.props.onClickCheck(4);
              }}
              className={this.props.styleInfo.styleAns4}
              style={{ marginLeft: '5%' }}
            >
              {this.props.question.respuestas.ans4}
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Questions;
