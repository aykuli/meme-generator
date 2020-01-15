import React, { Component } from 'react';
import htmlToImage from 'html-to-image';

export default class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topTxt: '',
      bottomTxt: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs: [],
    };

    this.getRandomImg = this.getRandomImg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.export = this.export.bind(this);
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(res => {
        const { memes } = res.data;

        this.setState({ allMemeImgs: memes });
      });
  }

  getRandomImg() {
    const len = this.state.allMemeImgs.length;
    const num = Math.round(-0.5 + Math.random() * (len + 1));
    this.setState(prevState => {
      return {
        randomImg: prevState.allMemeImgs[num].url,
      };
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(() => {
      return {
        [name]: value,
      };
    });
  }

  export() {
    htmlToImage.toJpeg(document.querySelector('.meme'), { quality: 0.95 }).then(function(dataUrl) {
      var link = document.createElement('a');
      link.download = 'image.jpeg';
      link.href = dataUrl;
      link.click();
    });
  }

  render() {
    // prettier-ignore
    return (
        <div className="memeGen__wrap">
            <div className="memeGen">
                <form>
                    <input  className="memeGen__input memeGen__input--top" 
                            type="text"
                            placeholder="Your top text"
                            name="topTxt"
                            value={this.state.topTxt}
                            onChange={this.handleChange} />

                    <input  className="memeGen__input memeGen__input--bottom" 
                            type="text"
                            placeholder="Your bottom text"
                            name="bottomTxt"
                            value={this.state.bottomTxt}
                            onChange={this.handleChange} />
                </form>
                <button onClick={this.getRandomImg}
                        className="memeGen__btn">Gen</button>
            </div>
            <div className="meme">
                <img className="meme__img" src={`${this.state.randomImg}`}/>
                <p className="meme__txt meme__txt--top">{this.state.topTxt}</p>
                <p className="meme__txt meme__txt--bottom">{this.state.bottomTxt}</p>
            </div>
            <button className="export" onClick={this.export}>Save</button>
        </div>
    );
  }
}
