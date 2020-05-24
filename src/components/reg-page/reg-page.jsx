const RegPage = ({handler}) => {

  return (
    <main className="main-registration html-wrapper">
      <section className="main-registration__wapper">
        <div className="main-registration__form-wrapper">
          <div className="main-registration__heading">
          <svg className="main-registration__form-icon" width="64" height="64">
              <use xlinkHref="#chat-icon"></use>
            </svg>
            <p className="main-registration__heading-caption">Light Chat</p>

            <button 
              className="main-registration__button-close"
              onClick={() => {
                handler(false)
              }}
            >
              Close
            </button>
          </div>
          <form className="main-registration__form">

            <label 
              className="main-registration__form-label"
              htmlFor="first-name"
            >
              First Name
            </label>
            <input
              className="main-registration__form-input" 
              type="text" 
              id="first-name"
              placeholder="Required"
              minLength="3"
              maxLength="30"
            />

            <label 
              className="main-registration__form-label"
              htmlFor="second-name"
            >
              Second name
            </label>
            <input
              className="main-registration__form-input" 
              type="text"
              id="second-name"
              minLength="3"
              maxLength="30"
            />

            <label 
              className="main-registration__form-label"
              htmlFor="nick-name"
            >
              User name
            </label>
            <input 
              className="main-registration__form-input"
              type="text"
              id="nick-name"
              minLength="5"
              maxLength="30"
            />

            <label 
              className="main-registration__form-label"
              htmlFor="email"
            >
              Email
            </label>
            <input 
              className="main-registration__form-input"
              type="text"
              id="email"
              minLength="5"
              maxLength="40"
            />

            <button
              className="main-registration__form-submit"
              type="submit"
            >
              Check in
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegPage;