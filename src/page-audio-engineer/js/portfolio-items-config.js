class ContentFactory {
  static createFromSelection(portfolioItemEl) {
    const { config } = new ContentFactory(portfolioItemEl);

    switch (config.embedType) {
      case ContentFactory.TYPES.BANDCAMP:
        return new BandcampPortfolioItem(config);
      case ContentFactory.TYPES.NO_EMBED:
        return new NonEmbedPortfolioItem(config);
      default:
        return new PortfolioItemDescription(config);
    }
  }
  static get TYPES() {
    return {
      BANDCAMP: "bandcamp",
      NO_EMBED: "none"
    };
  }
  static get CONFIGS() {
    return [
      {
        id: "CPTTWBD",
        artist: "Calum Pratt",
        album: "This Time Will Be Different",
        mediaId: 3027591022,
        embedType: ContentFactory.TYPES.BANDCAMP,
        embedLink:
          "https://calumpratt.bandcamp.com/album/this-time-will-be-different",
        description:
          "The second full length work from British singer-songwriter, long-time collaborator, confidant and proper mate Calum Pratt. Our proudest moment to date.",
      },
      {
        id: "SHSR",
        artist: "Sam Hanlan",
        album: "Sharp Relief",
        mediaId: 585253199,
        embedType: ContentFactory.TYPES.BANDCAMP,
        embedLink: "https://samhanlan.bandcamp.com/album/sharp-relief",
        description:
          "My debut adventure as an acoustic-driven singer-songwriter. All songs except one were written over the past years living in Berlin, and this record bears the fingerprints of many brilliant people I've met here so far. <br/><br/><b>Credits:</b><br/>Performer</br>Recording Engineer<br/>Producer<br/>Mix Engineer"
      },
      {
        id: "FAS",
        artist: "Freedom. and Such",
        album: "Windbreaker",
        mediaId: 1696239963,
        embedType: ContentFactory.TYPES.BANDCAMP,
        embedLink: "http://freedomandsuch.bandcamp.com/album/windbreaker-ep",
        description:
          "My alias project, based on odd voice memo phone recordings and found sounds. Windbreaker was self-produced across several years and features various important people that are properly thanked on the Bandcamp page.<br/><br/><b>Credits:</b><br/>Performer<br/>Recording Engineer<br/>Producer<br/>Mix Engineer"
      },
      {
        id: "CAL",
        artist: "Children and Lions",
        album: "<em>eponymous</em>",
        mediaId: 3820938401,
        embedType: ContentFactory.TYPES.BANDCAMP,
        embedLink: "http://childrenandlions.bandcamp.com/album/children-lions",
        description:
          "Post-rock band, produced and recorded with an emphasis on big, live space. The record was made in the Dorking Quaker Hall, over many days tracking and living in the space. Electronic production added post tracking.<br/><br/><b>Credits:</b><br/>Performer</br>Recording Engineer<br/>Producer<br/>Mix Engineer"
      },
      {
        id: "CPA",
        artist: "Calum Pratt",
        album: "Adift",
        embedType: ContentFactory.TYPES.BANDCAMP,
        mediaId: 3005936806,
        embedLink: "http://calumpratt.bandcamp.com/album/adrift",
        description:
          "Solo acoustic songwriter, long term collaborator, often studio assistant, always a great friend.<br/>Studio recording with old sixties strategy in its production - dead acoustic with tape recording nuance.<br/><br/><b>Credits:</b><br/>Recording Engineer<br/>Producer<br/>Mix Engineer"
      },
      {
        id: "3PS",
        artist: "Three Pairs of Shoes",
        album: "<em>eponymous</em>",
        embedType: ContentFactory.TYPES.BANDCAMP,
        mediaId: 1714583907,
        embedLink:
          "http://threepairsofshoes.bandcamp.com/album/three-pairs-of-shoes",
        description:
          "Folk-rock collective, recorded with Lewis Griffiths, Hugo Goggin and the band in the rafters of an old Cardiff church. Combining folk lore with modern folk, providing a unique and siren sound.<br/><br/><b>Credits:</b><br/>Performer<br/>Recording Engineer<br/>Co-Producer<br/>Mix Engineer"
      },
      {
        id: "GF",
        artist: "Gregk Foley",
        album: "Grit &amp; Gold",
        embedType: ContentFactory.TYPES.BANDCAMP,
        mediaId: 883109027,
        embedLink: "http://gritandgold.bandcamp.com/album/grit-gold-ep",
        description:
          "Solo acoustic songwriter, recorded around the house of Ricky Tobin in various crevices and spaces. Working with lean, sharp acoustic guitar - capturing and mixing the EP with maximum precision and clarity.<br/><br/><b>Credits:</b><br/>Recording Engineer<br/>Producer<br/>Mix Engineer"
      },
      {
        id: "BS",
        artist: "Bella Spinks",
        album: "Personal Demons",
        embedType: ContentFactory.TYPES.NO_EMBED,
        description:
          "Solo singer songwriter. Brighton-based, Bella was one of the first musicians I ever produced and recorded. Memories of prepared pianos, harpsichords, churches and a very snowy winter behind this production which is part of a greater collection of recordings.<br/><br/><b>Credits:</b><br/>Performer<br/>Recording Engineer<br/>Producer<br/>Mix Engineer"
      },
      {
        id: "DL",
        artist: "Danielle Lewis",
        album: "Paper Hearts",
        embedType: ContentFactory.TYPES.NO_EMBED,
        description:
          "Solo acoustic songwriter. Having met in Cardiff while I was on staff waiting tables, Paper Hearts was recorded at my studio, produced with a treatment that lets her breathtaking voice shine.<br/><br/><b>Credits:</b><br/>Performer<br/>Recording Engineer<br/>Producer<br/>Mix Engineer"
      },
      {
        id: "OT",
        artist: "Ornament Tournaments",
        album: "Tacheles",
        mediaId: 2751977321,
        embedType: ContentFactory.TYPES.BANDCAMP,
        embedLink: "http://ornamenttournaments.bandcamp.com/album/tacheles",
        description:
          "Math rock trio. Horsham rascals whose carefully composed slap-happy sound made for a roomy rock record featuring sessions in the Dorking Quaker Hall, my studio and a conservatory.<br/><br/><b>Credits:</b><br/>Performer<br/>Recording Engineer<br/>Producer<br/>Mix Engineer"
      },
      {
        id: "CPE",
        artist: "Calum Pratt",
        album: "Essential Nature",
        mediaId: 1240848739,
        embedType: ContentFactory.TYPES.BANDCAMP,
        embedLink: "http://calumpratt.bandcamp.com/album/essential-nature",
        description:
          "Solo acoustic songwriter, studio recording taking in a host of orchestral elements in this debut from Calum.<br/><br/><b>Credits:</b><br/>Performer<br/>Recording Engineer<br/>Producer<br/>Mix Engineer"
      }
    ];
  }
  constructor(portfolioItemEl) {
    this._portfolioItemEl = portfolioItemEl;
  }
  get config() {
    const config = ContentFactory.CONFIGS.find(({ id }) => id === this.id);
    return config || {};
  }
  get id() {
    if (!this._portfolioItemEl) return "";

    return this._portfolioItemEl.id.replace("portfolio-item-", "");
  }
}

class PortfolioItemDescription {
  constructor({ artist, album, id, description }) {
    this.id = id || "";
    this._artist = artist || "";
    this._album = album || "";
    this._description = description || "";
  }
  get documentFragment() {
    return document.createDocumentFragment();
  }
  get _artistProfileDocumentFragment() {
    const docFrag = document.createDocumentFragment();
    const artistProfile = document.createElement("div");
    const artist = document.createElement("h1");
    const album = document.createElement("h2");
    const description = document.createElement("p");

    artistProfile.className = "artist-profile";

    artist.innerHTML = this._artist;
    album.innerHTML = this._album;
    description.innerHTML = this._description;

    artistProfile.appendChild(artist);
    artistProfile.appendChild(album);
    artistProfile.appendChild(description);

    docFrag.appendChild(artistProfile);

    return docFrag;
  }
}

class PortfolioItemEmbed extends PortfolioItemDescription {
  constructor(config) {
    super(config);

    this._link = config.embedLink || "";
    this._mediaId = config.mediaId || "";
  }
}

class NonEmbedPortfolioItem extends PortfolioItemDescription {
  constructor(config) {
    super(config);
  }
  get documentFragment() {
    return this._artistProfileDocumentFragment;
  }
}

class BandcampPortfolioItem extends PortfolioItemEmbed {
  constructor(config) {
    super(config);
  }
  get documentFragment() {
    const docFrag = document.createDocumentFragment();
    const albumEmbed = document.createElement("div");

    albumEmbed.className = "album-embed";
    albumEmbed.innerHTML = this._iframeHtml;

    docFrag.appendChild(albumEmbed);
    docFrag.appendChild(this._artistProfileDocumentFragment);

    return docFrag;
  }
  get _embedLinkInnerHtml() {
    return `${this._album} by ${this._artist}`;
  }
  get _iframeHtml() {
    const viewportWidthBreakpointPx = 425;
    if (window.innerWidth >= viewportWidthBreakpointPx)
      return this._iframeLargeHtml;
    if (window.innerWidth < viewportWidthBreakpointPx)
      return this._iframeSmallHtml;
    return "";
  }
  get _iframeLargeHtml() {
    return `<div class="iframe-large-wrap">
            <div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 100%; padding-top: 144px;">
                <iframe src="https://bandcamp.com/EmbeddedPlayer/album=${this._mediaId}/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/transparent=true/" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no" allow="encrypted-media"><a href="${this._link}">${this._embedLinkInnerHtml}</a></iframe>
            </div>
        </div>`;
  }
  get _iframeSmallHtml() {
    return `<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=${this._mediaId}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="${this._link}">${this._embedLinkInnerHtml}</a></iframe>`;
  }
}

export default ContentFactory.createFromSelection;
