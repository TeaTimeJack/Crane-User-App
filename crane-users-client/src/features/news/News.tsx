

const News = () => {
  return (
    <div>
      <h2>News</h2>
        <div className="row">

          <div className="col s12 m6">
            <div className="card">
              <div className="card-image">
                <img className="materialboxed" src="https://ynet-pic1.yit.co.il/cdn-cgi/image/f=auto,w=740,q=75/picserver6/crop_images/2025/11/24/HJjW0YZbbe/HJjW0YZbbe_0_197_685_514_0_x-large.jpg"/>
                <span className="card-title purple-text text-darken-4"></span>
                <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
              </div>
              <div className="card-content">
                <h6>נער נתקע על עגורן בגובה 36 קומות בירושלים  תיעוד החילוץ הדרמטי</h6>
                <p>24/11/2025 9:50AM</p>
              </div>
              <div className="card-action">
                <a className="btn" href="https://www.ynet.co.il/news/article/sy9kvuwzzx?utm_source=taboola_internal&utm_medium=referral&utm_content=internal" target="blank">To The Articale</a>
              </div>
            </div>
          </div>

          <div className="col s12 m6">
            <div className="card">
              <div className="card-image">
                <img className="materialboxed" src="https://ynet-pic1.yit.co.il/cdn-cgi/image/f=auto,w=740,q=75/picserver6/crop_images/2022/02/13/BkAyeOIJq/BkAyeOIJq_0_75_1280_721_0_x-large.jpg"/>
                <span className="card-title purple-text text-darken-4"></span>
                <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
              </div>
              <div className="card-content">
                <h6>מכת התאונות באתרי הבנייה: "רק כשיש טרגדיות הנושא עולה לכותרות"</h6>
                <p>06/05/2025 6:56AM</p>
              </div>
              <div className="card-action">
                <a className="btn" href="https://www.ynet.co.il/economy/article/rjaf27uxxg" target="blank">To The Articale</a>
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default News
