let helpers = {
	transformThreeD: function(e, x, xUnit, y, yUnit, z, zUnit) {
		e.style.webkitTransform = "translate3d(" + x + xUnit + ", " + y + yUnit + ", " + z + zUnit + ")";
		   e.style.MozTransform = "translate3d(" + x + xUnit + ", " + y + yUnit + ", " + z + zUnit + ")";
		     e.style.OTransform = "translate3d(" + x + xUnit + ", " + y + yUnit + ", " + z + zUnit + ")";
		  		e.style.transform = "translate3d(" + x + xUnit + ", " + y + yUnit + ", " + z + zUnit + ")";
	},
  transformRotate: function(e, value) {
    e.style.webkitTransform = 'rotate(' + value + 'deg) translateZ(0)';
    e.style.MozTransform    = 'rotate(' + value + 'deg) translateZ(0)';
    e.style.OTransform      = 'rotate(' + value + 'deg) translateZ(0)';
    e.style.transform       = 'rotate(' + value + 'deg) translateZ(0)';
  },
  position: function(base, range, relativeY, offset) {
    let returnVal = base + helpers.limit(0, 1, relativeY - offset) * range;
    return returnVal;
  },
  limit: function(min, max, value) {
    return Math.max(min, Math.min(max, value));
  },
  prefix(obj, prop, value) {
    let prefs = ['webkit', 'Moz', 'O', 'ms'];
    for (let pref in prefs) {
      if ({}.hasOwnProperty.call(prefs, pref)) {
        obj[prefs[pref] + prop] = value;
      }
    }
  }
};

let { transformThreeD, transformRotate, position, prefix } = helpers;
let { findDOMNode } = ReactDOM;

let logo = "https://s3.amazonaws.com/underbelly/playground/rio/logo.png",
    cardbox = {
      lid     : "https://s3.amazonaws.com/underbelly/playground/rio/lid-lip.png",
      lidBack : "https://s3.amazonaws.com/underbelly/playground/rio/lid-open.png",
      front   : "https://s3.amazonaws.com/underbelly/playground/rio/box-front-01.png",
      card    : "https://s3.amazonaws.com/underbelly/playground/rio/card.png"
    },
    hero = "https://s3.amazonaws.com/underbelly/playground/rio/two-cards.jpg";

const images = {
  'logo': 'https://s3.amazonaws.com/underbelly/website/work/run-it-once/hero/logo.svg',
  'hero': 'https://s3.amazonaws.com/underbelly/website/work/run-it-once/hero/hero.jpg',
  'cardbox': {
    'lid':     'https://s3.amazonaws.com/underbelly/website/work/run-it-once/hero/lid-lip.png',
    'lidBack': 'https://s3.amazonaws.com/underbelly/website/work/run-it-once/hero/lid-open.png',
    'front':   'https://s3.amazonaws.com/underbelly/website/work/run-it-once/hero/box-front-01.png',
    'card':    'https://s3.amazonaws.com/underbelly/website/work/run-it-once/hero/card.png'
  },
  'deck': {
    'one':   'https://s3.amazonaws.com/underbelly/website/work/run-it-once/deck/01.png',
    'two':   'https://s3.amazonaws.com/underbelly/website/work/run-it-once/deck/02.png',
    'three': 'https://s3.amazonaws.com/underbelly/website/work/run-it-once/deck/03.png',
    'four':  'https://s3.amazonaws.com/underbelly/website/work/run-it-once/deck/04.png',
    'five':  'https://s3.amazonaws.com/underbelly/website/work/run-it-once/deck/05.png',
    'six':   'https://s3.amazonaws.com/underbelly/website/work/run-it-once/deck/06.png'
  },
  'gallery': {
    'one':   'https://s3.amazonaws.com/underbelly/website/work/run-it-once/gallery/01-no-border.jpg',
    'two':   'https://s3.amazonaws.com/underbelly/website/work/run-it-once/gallery/02-no-border.jpg',
    'three': 'https://s3.amazonaws.com/underbelly/website/work/run-it-once/gallery/03-no-border.jpg'
  },
  'cards': {
    'one':   'https://s3.amazonaws.com/underbelly/website/work/run-it-once/cards/1.png',
    'two':   'https://s3.amazonaws.com/underbelly/website/work/run-it-once/cards/2.png',
    'three': 'https://s3.amazonaws.com/underbelly/website/work/run-it-once/cards/3.png'
  },
  'gallery2': {
    'one':   'https://s3.amazonaws.com/underbelly/website/work/run-it-once/gallery2/01-no-border.jpg',
    'two':   'https://s3.amazonaws.com/underbelly/website/work/run-it-once/gallery2/02-no-border.jpg',
    'three': 'https://s3.amazonaws.com/underbelly/website/work/run-it-once/gallery2/03-no-border.jpg'
  },
  'lifestyle': 'https://s3.amazonaws.com/underbelly/website/work/fluid/lifestyle/01.jpg',
  'seeMore': {
    'one':   'https://s3.amazonaws.com/underbelly/website/work/see-more/hive.jpg',
    'two':   'https://s3.amazonaws.com/underbelly/website/work/see-more/just-family.jpg',
    'three': 'https://s3.amazonaws.com/underbelly/website/work/see-more/nsac.jpg',
    'four':  'https://s3.amazonaws.com/underbelly/website/work/see-more/rent-tree.jpg'
  }
};
class RioHero extends React.Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.update   = this.update.bind(this);
    this.onLoad   = this.onLoad.bind(this);
    this.requestTick = this.requestTick.bind(this);

    this.state = { 'loaded': false };
  }
  copmonentDidUpdate() {
    this.height = this.element.clientHeight;
  }
  componentDidMount() {
    this.lastKnownScroll = 0;
    this.ticking         = false;
    this.dimensions      = this.element.getBoundingClientRect();
    this.cardboxNodes    = document.querySelectorAll('.cardbox__item');
    this.cardboxArray    = [].slice.call(this.cardboxNodes);
    this.viewportHeight  = window.innerHeight || document.documentElement.clientHeight;

    window.addEventListener('scroll', this.onScroll, false);
    window.addEventListener('resize', this.onResize, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
    window.removeEventListener('resize', this.onResize, false);
  }
  onScroll() {
    if (this.props.parallax) {
      this.requestTick();
    }
  }
  onResize() {
    this.lastKnownScroll = window.pageYOffset;
    this.dimensions      = this.element.getBoundingClientRect();
    this.viewportHeight  = window.innerHeight || document.documentElement.clientHeight;
    this.requestTick();
  }
  requestTick() {
    if (!this.ticking) {
      this.ticking = true;
      window.requestAnimationFrame(this.update);
      this.dimensions      = this.element.getBoundingClientRect();
      this.lastKnownScroll = window.pageYOffset;
    }
  }
  onLoad() {
    this.setState({ 'loaded': true });
  }
  update() {
    let scroll        = this.lastKnownScroll;
    let cardboxBottom = this.dimensions.bottom;
    let context       = (scroll - this.viewportHeight) * -1;
    let relativeY     = scroll / this.dimensions.height;
    let movement1     = this.dimensions.height * 0.11;
    let movement2     = this.dimensions.height * -0.11;
    let movement3     = this.dimensions.height * -0.05;
    let movement4     = this.dimensions.height * 0.01;
    let movement5     = this.dimensions.height * 0.165;

    if (context >= 0 && cardboxBottom >= 0) {
      transformThreeD(this.cardboxArray[0], -50, '%', position(0, movement1, relativeY,        0), 'px', 0, 'px');
      transformThreeD(this.cardboxArray[1], -50, '%', position(0, movement1, relativeY,        0), 'px', 0, 'px');
      transformThreeD(this.cardboxArray[2], -50, '%', position(0, movement2, relativeY * 2,    0), 'px', 0, 'px');
      transformThreeD(this.cardboxArray[3], -50, '%', position(0, movement3, relativeY * 2,    0), 'px', 0, 'px');
      transformThreeD(this.cardboxArray[4], -50, '%', position(0, movement4, relativeY * 2,    0), 'px', 0, 'px');
      transformThreeD(this.cardboxArray[5], -50, '%', position(0, movement5, relativeY * 1.35, 0), 'px', 0, 'px');
    }
    this.ticking = false;
  }
  render() {
    let { logo, cardbox } = this.props;
    let loaded = this.state.loaded ? "loaded" : "";
    return (
      <div ref={(ref) => this.element = ref} className="parallax-container hero--rio">
        <div id="cardBox" className={`cardbox-container cardbox-container--intro ${loaded}`}>
          <div className="rio-logo">
            <div className="rio-logo__inner">
              <img src={logo} />
            </div>
          </div>
          <div className="cardbox">
            <img src={cardbox.lid}     className="cardbox__item cardbox__item--lid" />
            <img src={cardbox.lidBack} className="cardbox__item cardbox__item--lidback" />
            <img src={cardbox.card}    className="cardbox__item cardbox__item--card" />
            <img src={cardbox.card}    className="cardbox__item cardbox__item--card" />
            <img src={cardbox.card}    className="cardbox__item cardbox__item--card" />
            <img onLoad={this.onLoad} src={cardbox.front}   className="cardbox__item cardbox__item--front" />
          </div>
        </div>
      </div>
    );
  }
}

class TwoCards extends React.Component {
  constructor(props) {
    super(props);

    this.onLoad = this.onLoad.bind(this);

    this.state = { loaded: false }
  }
  componentDidMount() {
    let img = document.createElement('img');
    img.src = this.props.hero;
    img.onload = this.onLoad;
    this.src = img.src;
  }
  onLoad() {
    this.setState({ loaded: true });
  }
  render() {
    let { hero } = this.props;
    let loaded = this.state.loaded ? "loaded" : "";
    let style = {
      backgroundImage: `url(${this.src})`
    }
    return (
      <section style={style} className={`two-cards ${loaded}`}></section>
    )
  }
}

class Deck extends React.Component {
  constructor(props) {
    super(props);

    this.onScroll    = this.onScroll.bind(this);
    this.onResize    = this.onResize.bind(this);
    this.update      = this.update.bind(this);
    this.requestTick = this.requestTick.bind(this);
  }
  componentDidMount() {
    this.ticking        = false;
    this.element        = findDOMNode(this.refs.deck);
    this.fade           = findDOMNode(this.refs.fade);
    this.fadeDimensions = this.fade.getBoundingClientRect();
    this.dimensions     = this.element.getBoundingClientRect();
    this.deckNodes      = document.querySelectorAll('.deck-cards__item');
    this.deckArray      = [].slice.call(this.deckNodes);
    this.viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    this.windowWidth    = window.innerWidth || document.documentElement.clientWidth;

    window.addEventListener('scroll', this.onScroll, false);
    window.addEventListener('resize', this.onResize, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
    window.removeEventListener('resize', this.onResize, false);
  }
  onScroll() {
    if (this.props.parallax) {
      this.requestTick();
    }
  }
  onResize() {
    this.dimensions     = this.element.getBoundingClientRect();
    this.fadeDimensions = this.fade.getBoundingClientRect();
    this.viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    this.windowWidth    = window.innerWidth || document.documentElement.clientWidth;
    this.requestTick();
  }
  requestTick() {
    if (!this.ticking) {
      this.ticking = true;
      window.requestAnimationFrame(this.update);
      this.dimensions     = this.element.getBoundingClientRect();
      this.fadeDimensions = this.fade.getBoundingClientRect();
    }
  }
  update() {
    let { viewportHeight, dimensions, fadeDimensions, windowWidth } = this;
    let relativeYHelper = dimensions.height > viewportHeight ? dimensions.height : viewportHeight;
    let deckTop     = dimensions.top;
    let deckBottom  = dimensions.bottom;
    let context     = (deckTop - viewportHeight) * -1;
    let fadeContext = (fadeDimensions.top - viewportHeight) * -1;
    let relativeY   = context / (relativeYHelper * 2);
    let values      = [];

    windowWidth <= 768 ? values = [[25], [-50, -145]] : values = [[100], [0, -320]];

    if (context >= 0 && deckBottom >= 0) {
      transformThreeD(this.deckArray[0], values[1][0], '%', position(values[0][0], values[1][1], relativeY,        0), 'px', 0, 'px');
      transformThreeD(this.deckArray[1], values[1][0], '%', position(values[0][0], values[1][1], relativeY * 0.8,  0), 'px', 0, 'px');
      transformThreeD(this.deckArray[2], values[1][0], '%', position(values[0][0], values[1][1], relativeY * 0.6,  0), 'px', 0, 'px');
      transformThreeD(this.deckArray[3], values[1][0], '%', position(values[0][0], values[1][1], relativeY * 0.4,  0), 'px', 0, 'px');
      transformThreeD(this.deckArray[4], values[1][0], '%', position(values[0][0], values[1][1], relativeY * 0.2,  0), 'px', 0, 'px');
      transformThreeD(this.deckArray[5], values[1][0], '%', position(values[0][0], values[1][1], relativeY * 0.1,  0), 'px', 0, 'px');
    }

    if (fadeContext >= this.viewportHeight * 0.1) {
      this.fade.style.opacity = 1;
      this.fade.style.webkitTransform = 'translateY(0)';
      this.fade.style.MozTransform = 'translateY(0)';
      this.fade.style.transform = 'translateY(0)';
    } else {
      this.fade.style.opacity = 0;
      this.fade.style.webkitTransform = 'translateY(50px)';
      this.fade.style.MozTransform = 'translateY(50px)';
      this.fade.style.transform = 'translateY(50px)';
    }

    this.ticking = false;
  }
  render() {
    let { deck } = this.props;
    return (
      <div className="parallax-container deck" ref="deck">
        <div className="deck-container">
          <div ref="fade" className="deck-container__item deck-copy">
            <h1>Backstory</h1>
            <p>Run It Once, created by legendary poker player Phil Galfond, is a place for poker enthusiasts to gather and contribute professional-level strategy with others in the poker community. Besides the wealth of knowledge available at Run It Once, RIO’s brand is one classy act. With a clean, professional, and luxurious logo its no wonder their site is one of the best looking (and functioning) poker communities out there.</p>
            <p>At Underbelly, we’re suckers for playing card designs. That’s one of the many reasons we were stoked to partner with Phil and the Run It Once crew on designing the first official Run It Once card deck.</p>
          </div>
          <div className="deck-container__item deck-cards">
            <img src={deck.one}   className="deck-cards__item" />
            <img src={deck.two}   className="deck-cards__item" />
            <img src={deck.three} className="deck-cards__item" />
            <img src={deck.four}  className="deck-cards__item" />
            <img src={deck.five}  className="deck-cards__item" />
            <img src={deck.six}   className="deck-cards__item" />
          </div>
        </div>
      </div>
    );
  }
}

class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.onScroll    = this.onScroll.bind(this);
    this.onResize    = this.onResize.bind(this);
    this.update      = this.update.bind(this);
    this.requestTick = this.requestTick.bind(this);
  }
  componentDidMount() {
    this.ticking        = false;
    this.element        = findDOMNode(this.refs.cards);
    this.dimensions     = this.element.getBoundingClientRect();
    this.cardsNodes     = document.querySelectorAll('.cards-cards__item');
    this.cardsArray     = [].slice.call(this.cardsNodes);
    this.fade           = findDOMNode(this.refs.fade);
    this.fadeDimensions = this.fade.getBoundingClientRect();
    this.viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    this.windowWidth    = window.innerWidth || document.documentElement.clientWidth;

    window.addEventListener('scroll', this.onScroll, false);
    window.addEventListener('resize', this.onResize, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
    window.removeEventListener('resize', this.onResize, false);
  }
  onScroll() {
    if (this.props.parallax) {
      this.requestTick();
    }
  }
  onResize() {
    this.dimensions     = this.element.getBoundingClientRect();
    this.fadeDimensions = this.fade.getBoundingClientRect();
    this.viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    this.windowWidth    = window.innerWidth || document.documentElement.clientWidth;
    if (this.props.parallax) {
      this.requestTick();
    }
  }
  requestTick() {
    if (!this.ticking) {
      this.ticking = true;
      window.requestAnimationFrame(this.update);
      this.dimensions     = this.element.getBoundingClientRect();
      this.fadeDimensions = this.fade.getBoundingClientRect();
    }
  }
  update() {
    let relativeYHelper = this.dimensions.height > this.viewportHeight ? this.dimensions.height : this.viewportHeight;
    let cardsTop    = this.dimensions.top;
    let cardsBottom = this.dimensions.bottom;
    let context     = (cardsTop - this.viewportHeight) * -1;
    let relativeY   = context / (relativeYHelper * 2);
    let fadeContext = (this.fadeDimensions.top - this.viewportHeight) * -1;

    if (context >= 0 && cardsBottom >= 0) {
      transformRotate(this.cardsArray[0], position(15,  -15, relativeY, 0));
      transformRotate(this.cardsArray[1], position(-15,  15, relativeY, 0));
      transformRotate(this.cardsArray[2], position(15,  -15, relativeY, 0));
    }

    if (fadeContext >= this.viewportHeight * 0.1) {
      this.fade.style.opacity = 1;
      this.fade.style.webkitTransform = 'translateY(0)';
      this.fade.style.MozTransform = 'translateY(0)';
      this.fade.style.transform = 'translateY(0)';
    } else {
      this.fade.style.opacity = 0;
      this.fade.style.webkitTransform = 'translateY(50px)';
      this.fade.style.MozTransform = 'translateY(50px)';
      this.fade.style.transform = 'translateY(50px)';
    }

    this.ticking = false;
  }
  render() {
    let { cards } = this.props;
    return (
      <div className="parallax-container cards" ref="cards">
        <div className="cards-container">
          <div ref="fade" className="cards-container__item cards-copy">
            <p>Matching the palatial look and feel of Run It Once’s brand was no small feat. We took multiple approaches before finally landing on a style that was sleek, geometric, and modern. Each suit was designed with a unique personality to give the deck depth and variety while still remaining true to RIO’s brand. Diamonds crafted to be rugged and adventurous, spades strong and ruthless, clubs secretive and seductive, and hearts trustworthy and approachable.</p>
            <p>The finished product is a world-class, unique deck of cards worthy of the most talented professional poker hands. However, no need to worry; you don’t have to have a bracelet under your belt to enjoy these cards. Anyone can purchase these beauties directly from RIO’s site- even if you’re one of those casual, low-stakes, hold-em folks. If you’re anything like us, you can’t pass up a hot deck of cards.</p>
          </div>
          <div className="card-container__item cards-cards">
            <img src={cards.one}   className="cards-cards__item" />
            <img src={cards.two}   className="cards-cards__item" />
            <img src={cards.three} className="cards-cards__item" />
          </div>
        </div>
      </div>
    );
  }
}

class RunItOnce extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'parallax0': false,
      'parallax1': false,
      'parallax2': false,
      'parallax3': false
    };

    this.scrollManager = this.scrollManager.bind(this);
    this.requestTick = this.requestTick.bind(this);
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    this.ticking = false;
    this.parallaxNodeList = document.querySelectorAll('.parallax-container');
    this.parallaxArray = [].slice.call(this.parallaxNodeList);
    this.dimensions0 = this.parallaxArray[0].getBoundingClientRect();
    this.dimensions1 = this.parallaxArray[1].getBoundingClientRect();
    this.dimensions2 = this.parallaxArray[2].getBoundingClientRect();
    this.viewportHeight  = window.innerHeight || document.documentElement.clientHeight;

    window.addEventListener('scroll', this.scrollManager);
    window.addEventListener('resize', this.scrollManager);
  }
  comonentWillUnmount() {
    window.removeEventListener('scroll', this.scrollManager);
    window.removeEventListener('resize', this.scrollManager);
  }
  scrollManager() {
    this.requestTick();
  }
  requestTick() {
    if (!this.ticking) {
      this.ticking = true;
      window.requestAnimationFrame(this.update);
      this.dimensions0 = this.parallaxArray[0].getBoundingClientRect();
      this.dimensions1 = this.parallaxArray[1].getBoundingClientRect();
      this.dimensions2 = this.parallaxArray[2].getBoundingClientRect();
      this.viewportHeight  = window.innerHeight || document.documentElement.clientHeight;
    }
  }
  update() {
    this.context0 = (this.dimensions0.top - this.viewportHeight) * -1;
    this.context1 = (this.dimensions1.top - this.viewportHeight) * -1;
    this.context2 = (this.dimensions2.top - this.viewportHeight) * -1;

    if (this.context0 >= 0 && this.dimensions0.bottom >= 0 && !this.state.parallax0) {
      this.setState({ 'parallax0': true });
    } else if (this.state.parallax0 && (this.dimensions0.bottom <= 0 || this.context0 <= 0)) {
      this.setState({ 'parallax0': false });
    }

    if (this.context1 >= 0 && this.dimensions1.bottom >= 0 && !this.state.parallax1) {
      this.setState({ 'parallax1': true });
    } else if (this.state.parallax1 && (this.dimensions1.bottom <= 0 || this.context1 <= 0)) {
      this.setState({ 'parallax1': false });
    }

    if (this.context2 >= 0 && this.dimensions2.bottom >= 0 && !this.state.parallax2) {
      this.setState({ 'parallax2': true });
    } else if (this.state.parallax2 && (this.dimensions2.bottom <= 0 && this.context2 <= 0)) {
      this.setState({ 'parallax2': false });
    }

    this.ticking = false;
  }
  render() {
    return (
      <div className="case-study run-it-once">
          <RioHero logo={images.logo} cardbox={images.cardbox} parallax={this.state.parallax0} />
          <TwoCards hero={images.hero} />
          <Deck deck={images.deck} parallax={this.state.parallax1} />
          <Cards cards={images.cards} parallax={this.state.parallax2} />
      </div>
    );
  }
}


ReactDOM.render(<RunItOnce images={images} helpers={helpers} />, document.getElementById("app"));
