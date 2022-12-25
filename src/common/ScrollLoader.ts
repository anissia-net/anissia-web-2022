type ScrollCallback = (sl: ScrollLoader) => void

class ScrollLoader {

  constructor() {
    this._init();
  }

  private _measure = 0.3;
  private _callback: ScrollCallback = () => {};
  private _on = false;
  private _event = () => {};

  public get endY(): number {
    return document.body.scrollHeight;
  }

  public get nowY(): number {
    return window.innerHeight + window.scrollY;
  }

  public get isReload() {
    return (this.endY - (window.innerHeight * this._measure)) <= this.nowY;
  }

  public next(isNext: boolean = true) {
    if ((this._on = isNext)) {
      this._event();
    }
  }

  public destroy() {
    this._on = false;
    window.removeEventListener('scroll', this._event, true);
    window.removeEventListener('resize', this._event, true);
  }

  public callback(scrollCallback: ScrollCallback): ScrollLoader {
    this._callback = scrollCallback;
    return this;
  }

  public measure(leftPercentOfNextLoad: number) {
    if (leftPercentOfNextLoad >= 0.1 && leftPercentOfNextLoad <= 0.8) {
      this._measure = leftPercentOfNextLoad;
    } else {
      alert('measure is wrong : 0.8 >= measure >= 0.1');
    }
  }

  private _init() {
    this._event = (() => {
      if (this._on && this.isReload) {
        this._on = false;
        this._callback(this);
      }
    }).bind(this);

    window.addEventListener('scroll', this._event, true);
    window.addEventListener('resize', this._event, true);
  }
}

export default function(): ScrollLoader {
  return new ScrollLoader();
};
